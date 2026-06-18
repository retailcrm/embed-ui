import { expect, test } from '@playwright/test'

import { DefaultSandbox } from '../src/enum'

const externalExtensionUrl = process.env.SANDBOX_EXTENSION_URL ?? ''
const externalExtensionPageCode = process.env.SANDBOX_EXTENSION_PAGE_CODE ?? 'returns'
const externalExtensionTarget = process.env.SANDBOX_EXTENSION_TARGET ?? 'order/card:common.after'

test.skip(
  !externalExtensionUrl,
  'Set SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% to run real extension e2e.'
)

type HostHttpPayload = {
  filters?: {
    orderNumber?: string;
  };
} & Record<string, unknown>

type SandboxSnapshot = {
  contexts: {
    'order/card': {
      number: string;
    };
  };
  host: {
    http: Array<{
      action: string;
      payload?: HostHttpPayload | string;
      response: {
        status: number;
      };
    }>;
    location: {
      pathname: string;
      search: string;
    };
    navigation: Array<{
      kind: string;
    }>;
  };
}

const createReturnsPageUrl = () => {
  const params = new URLSearchParams({
    extensionUrl: DefaultSandbox.Url,
    fixture: DefaultSandbox.Fixture,
    manifestUrl: externalExtensionUrl,
    mode: 'page',
    pageCode: externalExtensionPageCode,
    target: 'order/card:common.before',
    targets: [
      'order/card:common.before',
      externalExtensionTarget,
    ].join(','),
    widgetId: DefaultSandbox.WidgetId,
  })

  return `/?${params.toString()}`
}

declare global {
  interface Window {
    __CRM_EMBED_SANDBOX__: {
      snapshot(): SandboxSnapshot;
    };
  }
}

test('filters real returns extension and records host state changes', async ({ page }) => {
  await page.goto(createReturnsPageUrl())

  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' }))
    .toContainText(`Страница: ${externalExtensionPageCode}`)
  await expect(page.getByRole('button', { name: 'Создать возврат' })).toBeVisible()
  await expect(page.locator('body')).toContainText('Список возвратов')
  await expect(page.locator('body')).toContainText('Найдено: 6')

  await page.getByPlaceholder('Например 100245').fill('100245')
  await page.getByRole('button', { name: 'Применить' }).click()

  await expect(page.locator('body')).toContainText('Найдено: 1')
  await expect(page.locator('body')).toContainText('№100245')
  await expect(page.locator('body')).not.toContainText('№100241')

  await expect.poll(async () => page.evaluate(() => {
    const snapshot = window.__CRM_EMBED_SANDBOX__.snapshot()
    const returnsCalls = snapshot.host.http.filter(record => record.action === '/returns')
    const lastReturnsCall = returnsCalls.at(-1)

    return typeof lastReturnsCall?.payload === 'object'
      ? lastReturnsCall.payload.filters?.orderNumber
      : null
  })).toBe('100245')

  const snapshot = await page.evaluate(() => window.__CRM_EMBED_SANDBOX__.snapshot()) as SandboxSnapshot
  const returnsCalls = snapshot.host.http.filter(record => record.action === '/returns')
  const lastReturnsCall = returnsCalls.at(-1)

  expect(lastReturnsCall?.response.status).toBe(200)
  expect(typeof lastReturnsCall?.payload === 'object'
    ? lastReturnsCall.payload.filters?.orderNumber
    : null
  ).toBe('100245')
  expect(snapshot.host.navigation.some(record => record.kind === 'replace-query')).toBe(true)
  expect(snapshot.host.location.pathname).toBe('/orders/215/edit')
  expect(snapshot.host.location.search).toBe('?order=100245')

  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()
  const devPanel = page.getByRole('dialog', { name: 'Управление песочницей' })
  const contextSnapshot = await page.evaluate(() => window.__CRM_EMBED_SANDBOX__.snapshot().contexts)
  const contextOverride = {
    ...contextSnapshot,
    'order/card': {
      ...contextSnapshot['order/card'],
      number: '999C',
    },
  }

  await devPanel.getByRole('textbox', { name: 'Context JSON' }).fill(JSON.stringify(contextOverride, null, 2))
  await devPanel.getByRole('button', { name: 'Применить контекст' }).click()

  await expect.poll(async () => page.evaluate(() => (
    window.__CRM_EMBED_SANDBOX__.snapshot().contexts['order/card'].number
  ))).toBe('999C')

  await devPanel.getByRole('button', { name: 'Сбросить состояние' }).click()

  await expect.poll(async () => page.evaluate(() => (
    window.__CRM_EMBED_SANDBOX__.snapshot().contexts['order/card'].number
  ))).toBe('215C')
})

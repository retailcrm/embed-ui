import type { Locator, Page } from '@playwright/test'

import { expect, test } from '@playwright/test'

import { DefaultSandbox } from '../src'

function readEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key]?.trim()

    if (value) return value
  }

  return ''
}

const pageExtensionUrl = readEnv('SANDBOX_PAGE_EXTENSION_URL', 'SANDBOX_EXTENSION_URL')
const pageExtensionCode = readEnv('SANDBOX_PAGE_EXTENSION_CODE', 'SANDBOX_EXTENSION_PAGE_CODE') || 'returns'
const widgetExtensionUrl = readEnv('SANDBOX_WIDGET_EXTENSION_URL', 'SANDBOX_EXTENSION_URL')
const widgetExtensionTarget = readEnv('SANDBOX_WIDGET_EXTENSION_TARGET', 'SANDBOX_EXTENSION_TARGET')
  || 'order/card:common.after'
const extensionFixture = readEnv('SANDBOX_EXTENSION_FIXTURE') || DefaultSandbox.Fixture

type SandboxSnapshot = {
  host: {
    http: Array<{
      action: string;
      response: {
        status: number;
      };
      uuid?: string;
    }>;
  };
}

declare global {
  interface Window {
    __CRM_EMBED_SANDBOX__: {
      snapshot(): SandboxSnapshot;
    };
  }
}

test('applies widget config and mounts extension', async ({ page }) => {
  test.skip(
    !widgetExtensionUrl,
    'Set SANDBOX_WIDGET_EXTENSION_URL=%extension-url%/extension/%extension-id% to run widget mount e2e.'
  )

  await page.goto('/')

  await openDevPanel(page)
  const devPanel = page.getByRole('dialog', { name: 'Управление песочницей' })

  await devPanel.getByRole('textbox', { name: 'Manifest / URL расширения' }).fill(widgetExtensionUrl)
  await selectFixture(page, devPanel, extensionFixture)
  await ensureTargetSelected(devPanel, widgetExtensionTarget)
  await devPanel.getByRole('button', { name: 'Применить', exact: true }).click()

  await expect(page).toHaveURL(/mode=widget/)
  await expect(page).toHaveURL(new RegExp(`targets=.*${encodeURIComponent(widgetExtensionTarget)}`))

  const widgetMount = page.getByRole('region', { name: `Цель виджета: ${widgetExtensionTarget}` })

  await expect(widgetMount).toBeVisible()
  await expect(widgetMount).not.toHaveText(widgetExtensionTarget)
})

test('applies page config and mounts extension', async ({ page }) => {
  test.skip(
    !pageExtensionUrl,
    'Set SANDBOX_PAGE_EXTENSION_URL=%extension-url%/extension/%extension-id% or SANDBOX_EXTENSION_URL to run page mount e2e.'
  )

  await page.goto('/')

  await openDevPanel(page)
  const devPanel = page.getByRole('dialog', { name: 'Управление песочницей' })

  await devPanel.getByRole('textbox', { name: 'Manifest / URL расширения' }).fill(pageExtensionUrl)
  await selectMode(page, devPanel, 'Страница')
  await selectFixture(page, devPanel, extensionFixture)
  await devPanel.getByRole('textbox', { name: 'Код страницы' }).fill(pageExtensionCode)
  await devPanel.getByRole('button', { name: 'Применить', exact: true }).click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(new RegExp(`pageCode=${encodeURIComponent(pageExtensionCode)}`))
  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' }))
    .toContainText(`Страница: ${pageExtensionCode}`)

  const pageMount = page.getByRole('region', { name: `Страница расширения: ${pageExtensionCode}` })

  await expect(pageMount).toBeVisible()
  await expect.poll(async () => pageMount.evaluate(element => element.textContent?.trim() ?? ''))
    .not.toBe('')

  const snapshot = await page.evaluate(() => window.__CRM_EMBED_SANDBOX__.snapshot()) as SandboxSnapshot

  expect(snapshot.host.http.every(record => record.response.status >= 200)).toBe(true)
})

const openDevPanel = async (page: Page) => {
  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()
  await expect(page.getByRole('dialog', { name: 'Управление песочницей' })).toBeVisible()
}

const selectFixture = async (
  page: Page,
  devPanel: Locator,
  fixture: string
) => {
  if (fixture === DefaultSandbox.Fixture) return

  const fixtureOptionName = fixture === 'order-with-delivery'
    ? 'Заказ с доставкой'
    : fixture

  await devPanel.getByRole('combobox', { name: 'Фикстура' }).click()
  await page.getByRole('listbox', { name: 'Фикстура' }).getByRole('option', { name: fixtureOptionName }).click()
}

const selectMode = async (
  page: Page,
  devPanel: Locator,
  optionName: string
) => {
  await devPanel.getByRole('combobox', { name: 'Режим' }).click()
  await page.getByRole('listbox', { name: 'Режим' }).getByRole('option', { name: optionName }).click()
}

const ensureTargetSelected = async (devPanel: Locator, target: string) => {
  const targetCheckbox = devPanel.getByRole('checkbox', { name: target })

  if (!(await targetCheckbox.isChecked())) {
    await targetCheckbox.check()
  }
}

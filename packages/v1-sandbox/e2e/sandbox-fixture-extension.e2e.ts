import type { SandboxLaunchInput } from '@/automation'

import { expect, test } from '@playwright/test'

import { launchSandboxExtension } from '@/automation/playwright'

const readEnv = (key: string): string | undefined => {
  const value = process.env[key]?.trim()

  return value || undefined
}

const extensionUrl = new URL(
  '/index.html',
  readEnv('SANDBOX_FIXTURE_BASE_URL') ?? 'http://127.0.0.1:4274'
).href

test('mounts fixture extension in built sandbox and renders remote details', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    await dialog.dismiss()
  })

  await page.goto('/')

  const launchConfig = {
    fixture: 'order-basic',
    manifestUrl: extensionUrl,
    mode: 'widget',
    targets: ['order/card:common.after'],
  } satisfies SandboxLaunchInput

  await launchSandboxExtension(page, launchConfig)

  const { contentType, script, status } = await page.evaluate(async (url) => {
    const response = await fetch(url, {
      credentials: 'include',
    })
    const html = await response.text()
    const script = new DOMParser()
      .parseFromString(html, 'text/html')
      .head
      .querySelector('script[src]')
      ?.getAttribute('src')

    return {
      contentType: response.headers.get('content-type'),
      script,
      status: response.status,
    }
  }, extensionUrl)

  expect(status).toBe(200)
  expect(contentType).toContain('text/html')
  expect(script).toBeTruthy()

  const widgetMount = page.getByRole('region', {
    name: 'Цель виджета: order/card:common.after',
  })

  await expect(widgetMount).toBeVisible()
  await expect(widgetMount).toContainText('Order fixture demo', {
    timeout: 15_000,
  })

  await expect(
    widgetMount.getByRole('button', { name: 'Open order demo' })
  ).toBeVisible()

  const details = widgetMount.getByRole('region', {
    name: 'Order details',
  })

  await expect(details).toBeVisible()
  await expect(details).toContainText(
    'Order #215C'
  )
  await expect(details).toContainText(
    'Target: order/card:common.after'
  )
})

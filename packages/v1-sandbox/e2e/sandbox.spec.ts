import { expect, test } from '@playwright/test'

const localDemoUrl = '/?manifestUrl=&extensionUrl=/src/demo-extension/index.ts'

test('shows onboarding when extension source is not configured', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('sandbox-extension-onboarding')).toBeVisible()
  await expect(page.getByTestId('sandbox-extension-onboarding')).toContainText('Подключите внешнее расширение')
  await expect(page.getByTestId('demo-extension')).toHaveCount(0)
})

test('renders multiple widgets in targets and records host activity', async ({ page }, testInfo) => {
  await page.goto(`${localDemoUrl}&targets=order/card:common.before,order/card:common.after`)

  const commonBefore = page.getByTestId('target-order-card-common-before')
  const commonAfter = page.getByTestId('target-order-card-common-after')

  await expect(page).toHaveTitle(/v1-sandbox/)
  await expect(page.getByTestId('sandbox-rail')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar-skeleton')).toHaveCount(10)
  await expect(page.getByTestId('sandbox-content')).toBeVisible()
  await expect(page.getByTestId('sandbox-page')).toBeVisible()
  await expect(page.getByTestId('host-run-mode')).toContainText('Widgets: 2')

  const openContentBox = await page.getByTestId('sandbox-content').boundingBox()

  await page.getByTestId('sandbox-sidebar-toggle').click()
  await expect(page.getByTestId('sandbox-sidebar')).toHaveAttribute('data-open', 'false')
  await expect(page.getByTestId('sandbox-rail')).toBeVisible()
  await expect.poll(async () => {
    const closedContentBox = await page.getByTestId('sandbox-content').boundingBox()

    return closedContentBox?.x ?? 0
  }).toBeLessThan(openContentBox?.x ?? 0)

  const closedContentBox = await page.getByTestId('sandbox-content').boundingBox()
  const railBox = await page.getByTestId('sandbox-rail').boundingBox()

  expect(closedContentBox?.x).toBeGreaterThan(railBox?.width ?? 0)

  await page.getByTestId('sandbox-sidebar-toggle').click()
  await expect(page.getByTestId('sandbox-sidebar')).toHaveAttribute('data-open', 'true')

  await expect(commonBefore).toContainText('order/card:common.before')
  await expect(commonBefore.getByTestId('demo-extension-target')).toContainText('Target: order/card:common.before')
  await expect(commonBefore.getByTestId('demo-extension-order-number')).toContainText('Order: 215C')
  await expect(commonBefore.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(commonAfter).toContainText('order/card:common.after')
  await expect(commonAfter.getByTestId('demo-extension-target')).toContainText('Target: order/card:common.after')
  await expect(commonAfter.getByTestId('demo-extension-order-number')).toContainText('Order: 215C')
  await expect(commonAfter.getByTestId('demo-extension-order-status')).toContainText('Status: new')

  await expect(page.getByTestId('sandbox-dev-panel')).toHaveCount(0)
  await page.getByTestId('sandbox-dev-panel-toggle').click()
  await expect(page.getByTestId('sandbox-dev-panel')).toBeVisible()
  await expect(page.getByTestId('sandbox-state-snapshot')).toContainText('"status": "new"')

  await page.getByTestId('sandbox-http-ping').click()
  await page.getByTestId('sandbox-go-to').click()
  await page.getByTestId('sandbox-push-query').click()
  await page.getByTestId('sandbox-replace-query').click()

  await expect(page.getByTestId('sandbox-host-activity')).toContainText('httpCall')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('sandbox.demo.ping -> 200')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('go-to')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('push-query')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('replace-query')

  await page.getByTestId('sandbox-reset-state').click()

  await expect(commonBefore.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(commonAfter.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('Нет действий')

  await expect(page.getByTestId('demo-extension')).toHaveCount(2)
  await page.getByTestId('sandbox-reload-extension').click()
  await expect(page.getByTestId('demo-extension')).toHaveCount(2)
  await expect(page.getByTestId('sandbox-controls')).toHaveCount(0)
  await expect(page.getByTestId('sandbox-order-workspace')).toHaveCount(0)

  await page.getByTestId('sandbox-dev-panel-close').click()
  await expect(page.getByTestId('sandbox-dev-panel')).toHaveCount(0)

  const screenshot = await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath('sandbox-context-update-widgets.png'),
  })

  await testInfo.attach('sandbox-context-update-widgets', {
    body: screenshot,
    contentType: 'image/png',
  })
})

test('renders extension page from public url contract', async ({ page }) => {
  await page.goto(`${localDemoUrl}&mode=page&pageCode=orders-dashboard`)

  await expect(page.getByTestId('host-run-mode')).toContainText('Page: orders-dashboard')
  await expect(page.getByTestId('sandbox-page-canvas')).toBeVisible()
  await expect(page.getByTestId('sandbox-page-canvas')).not.toContainText('page:orders-dashboard')
  await expect(page.getByTestId('demo-page-extension')).toBeVisible()
  await expect(page.getByTestId('demo-page-code')).toContainText('Page code: orders-dashboard')
  await expect(page.getByTestId('demo-page-order-number')).toContainText('Order: 215C')
  await expect(page.getByTestId('demo-page-order-status')).toContainText('Status: new')

  await page.getByTestId('demo-page-header-action').click()
  await expect(page.getByTestId('demo-page-order-status')).toContainText('Status: header action clicked')
})

test('applies fixture and page mode controls through public url contract', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('sandbox-dev-panel-toggle').click()
  await page.getByTestId('sandbox-mode-select').selectOption('page')
  await page.getByTestId('sandbox-page-code-input').fill('orders-dashboard')
  await page.getByTestId('sandbox-fixture-select').selectOption('order-with-delivery')
  await page.getByTestId('sandbox-apply-config').click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(/fixture=order-with-delivery/)
  await expect(page.getByTestId('demo-page-extension')).toBeVisible()
  await expect(page.getByTestId('demo-page-order-number')).toContainText('Order: 214C')
})

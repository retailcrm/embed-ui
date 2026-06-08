import { expect, test } from '@playwright/test'

test('renders multiple widgets in targets and reacts to host context changes', async ({ page }, testInfo) => {
  await page.goto('/')

  const commonBefore = page.getByTestId('target-order-card-common-before')
  const commonAfter = page.getByTestId('target-order-card-common-after')

  await expect(page).toHaveTitle(/v1-sandbox/)
  await expect(page.getByTestId('sandbox-rail')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar')).toContainText('Продажи')
  await expect(page.getByTestId('sandbox-sidebar')).toContainText('Заказы')
  await expect(page.getByTestId('sandbox-page')).toBeVisible()
  await expect(page.getByTestId('host-run-mode')).toContainText('Widgets: 2')
  await expect(commonBefore).toContainText('order/card:common.before')
  await expect(commonBefore.getByTestId('demo-extension-target')).toContainText('Target: order/card:common.before')
  await expect(commonBefore.getByTestId('demo-extension-order-number')).toContainText('Order: 215C')
  await expect(commonBefore.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(commonAfter).toContainText('order/card:common.after')
  await expect(commonAfter.getByTestId('demo-extension-target')).toContainText('Target: order/card:common.after')
  await expect(commonAfter.getByTestId('demo-extension-order-number')).toContainText('Order: 215C')
  await expect(commonAfter.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: new')
  await expect(page.getByTestId('sandbox-dev-panel')).toBeVisible()
  await expect(page.getByTestId('sandbox-state-snapshot')).toContainText('"status": "new"')

  await page.getByTestId('host-toggle-status').click()

  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: client-confirmed')
  await expect(commonBefore.getByTestId('demo-extension-order-status')).toContainText('Status: client-confirmed')
  await expect(commonAfter.getByTestId('demo-extension-order-status')).toContainText('Status: client-confirmed')
  await expect(page.getByTestId('sandbox-state-snapshot')).toContainText('"status": "client-confirmed"')

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

  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: new')
  await expect(commonBefore.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(commonAfter.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(page.getByTestId('sandbox-host-activity')).toContainText('Нет действий')

  await expect(page.getByTestId('demo-extension')).toHaveCount(2)
  await page.getByTestId('sandbox-reload-extension').click()
  await expect(page.getByTestId('demo-extension')).toHaveCount(2)
  await expect(page.getByTestId('sandbox-controls')).toHaveCount(0)
  await expect(page.getByTestId('sandbox-order-workspace')).toHaveCount(0)

  const screenshot = await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath('sandbox-context-update-widgets.png'),
  })

  await testInfo.attach('sandbox-context-update-widgets', {
    body: screenshot,
    contentType: 'image/png',
  })
})

test('renders extension page and reacts to host context changes', async ({ page }) => {
  await page.goto('/?mode=page&pageCode=orders-dashboard')

  await expect(page.getByTestId('host-run-mode')).toContainText('Page: orders-dashboard')
  await expect(page.getByTestId('sandbox-page-canvas')).toContainText('page:orders-dashboard')
  await expect(page.getByTestId('demo-page-extension')).toBeVisible()
  await expect(page.getByTestId('demo-page-code')).toContainText('Page code: orders-dashboard')
  await expect(page.getByTestId('demo-page-order-number')).toContainText('Order: 215C')
  await expect(page.getByTestId('demo-page-order-status')).toContainText('Status: new')

  await page.getByTestId('host-toggle-status').click()

  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: client-confirmed')
  await expect(page.getByTestId('demo-page-order-status')).toContainText('Status: client-confirmed')
})

test('applies fixture and page mode controls through public url contract', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('sandbox-mode-select').selectOption('page')
  await page.getByTestId('sandbox-page-code-input').fill('orders-dashboard')
  await page.getByTestId('sandbox-fixture-select').selectOption('order-with-delivery')
  await page.getByTestId('sandbox-apply-config').click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(/fixture=order-with-delivery/)
  await expect(page.getByTestId('demo-page-extension')).toBeVisible()
  await expect(page.getByTestId('demo-page-order-number')).toContainText('Order: 214C')
})

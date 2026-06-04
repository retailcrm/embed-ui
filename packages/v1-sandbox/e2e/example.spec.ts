import { expect, test } from '@playwright/test'

test('renders widget in target and reacts to host context changes', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/v1-sandbox/)
  await expect(page.getByTestId('sandbox-rail')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar')).toContainText('Продажи')
  await expect(page.getByTestId('sandbox-sidebar')).toContainText('Заказы')
  await expect(page.getByTestId('sandbox-page')).toBeVisible()
  await expect(page.getByTestId('target-order-card-common-after')).toContainText('order/card:common.after')
  await expect(page.getByTestId('demo-extension-target')).toContainText('Target: order/card:common.after')
  await expect(page.getByTestId('demo-extension-order-number')).toContainText('Order: 215C')
  await expect(page.getByTestId('demo-extension-order-status')).toContainText('Status: new')
  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: new')

  await page.getByTestId('host-toggle-status').click()

  await expect(page.getByTestId('host-order-status')).toContainText('CRM status: client-confirmed')
  await expect(page.getByTestId('demo-extension-order-status')).toContainText('Status: client-confirmed')
  await expect(page.getByTestId('sandbox-controls')).toHaveCount(0)
  await expect(page.getByTestId('sandbox-order-workspace')).toHaveCount(0)

  const screenshot = await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath('sandbox-context-update-widget.png'),
  })

  await testInfo.attach('sandbox-context-update-widget', {
    body: screenshot,
    contentType: 'image/png',
  })
})

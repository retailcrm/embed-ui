import { expect, test } from '@playwright/test'

test('shows onboarding when extension source is not configured', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('sandbox-extension-onboarding')).toBeVisible()
  await expect(page.getByTestId('sandbox-extension-onboarding')).toContainText('Подключите внешнее расширение')
})

test('renders sandbox shell and records host activity without bundled extension', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/v1-sandbox/)
  await expect(page.getByTestId('sandbox-rail')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar')).toBeVisible()
  await expect(page.getByTestId('sandbox-sidebar-skeleton')).toHaveCount(10)
  await expect(page.getByTestId('sandbox-content')).toBeVisible()
  await expect(page.getByTestId('sandbox-page')).toBeVisible()
  await expect(page.getByTestId('host-run-mode')).toContainText('Виджеты: 2')

  const viewportHeight = page.viewportSize()?.height ?? 0

  expect(viewportHeight).toBeGreaterThan(0)

  await expect.poll(async () => {
    const railBox = await page.getByTestId('sandbox-rail').boundingBox()

    return Math.round(railBox?.height ?? 0)
  }).toBe(viewportHeight)
  await expect.poll(async () => {
    const sidebarBox = await page.getByTestId('sandbox-sidebar').boundingBox()

    return Math.round(sidebarBox?.height ?? 0)
  }).toBe(viewportHeight)

  await page.getByTestId('sandbox-page').evaluate((element) => {
    const scrollProbe = document.createElement('div')

    scrollProbe.dataset.testid = 'sandbox-scroll-probe'
    scrollProbe.style.height = '1800px'

    element.append(scrollProbe)
  })
  await expect.poll(async () => page.getByTestId('sandbox-content').evaluate((element) => (
    element.scrollHeight > element.clientHeight
  ))).toBe(true)
  await expect.poll(async () => page.evaluate(() => document.scrollingElement?.scrollHeight ?? 0))
    .toBeLessThanOrEqual(viewportHeight)

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

test('applies fixture and page mode controls through public url contract', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('sandbox-dev-panel-toggle').click()
  await page.getByTestId('sandbox-mode-select').selectOption('page')
  await page.getByTestId('sandbox-page-code-input').fill('orders-dashboard')
  await page.getByTestId('sandbox-fixture-select').selectOption('order-with-delivery')
  await page.getByTestId('sandbox-apply-config').click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(/fixture=order-with-delivery/)
  await expect(page.getByTestId('sandbox-extension-onboarding')).toBeVisible()
  await expect(page.getByTestId('host-run-mode')).toContainText('Страница: orders-dashboard')
})

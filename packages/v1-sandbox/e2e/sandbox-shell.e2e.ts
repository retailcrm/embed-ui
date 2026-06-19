import { expect, test } from '@playwright/test'

test('shows onboarding when extension source is not configured', async ({ page }) => {
  await page.goto('/')

  const onboarding = page.getByRole('region', { name: 'Подключите внешнее расширение' })

  await expect(onboarding).toBeVisible()
  await expect(onboarding).toContainText('Подключите внешнее расширение')
  await expect(onboarding).toContainText('%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%')
  await expect(onboarding.getByRole('button', { name: 'Открыть песочницу' })).toBeVisible()
  await expect(onboarding.getByRole('textbox')).toHaveCount(0)
})

test('renders sandbox shell and opens controls drawer without bundled extension', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/v1-sandbox/)
  const rail = page.locator('[id$="-sandbox-rail"]')
  const collapseSidebar = page.getByRole('button', { name: 'Свернуть боковую панель' })
  const sidebarId = await collapseSidebar.getAttribute('aria-controls')

  expect(sidebarId).toBeTruthy()

  const sidebar = page.locator(`[id="${sidebarId}"]`)
  const content = page.getByRole('main', { name: 'Контент песочницы' })
  const extensionCanvas = page.getByRole('region', { name: 'Область расширения' })

  await expect(rail).toBeVisible()
  await expect(sidebar).toBeVisible()
  await expect(sidebar.getByRole('navigation')).toBeVisible()
  await expect(content).toBeVisible()
  await expect(extensionCanvas).toBeVisible()
  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' })).toContainText('Виджеты: 2')
  await expect(page.locator('[data-testid]')).toHaveCount(0)

  const viewportHeight = page.viewportSize()?.height ?? 0

  expect(viewportHeight).toBeGreaterThan(0)

  await expect.poll(async () => {
    const railBox = await rail.boundingBox()

    return Math.round(railBox?.height ?? 0)
  }).toBe(viewportHeight)
  await expect.poll(async () => {
    const sidebarBox = await sidebar.boundingBox()

    return Math.round(sidebarBox?.height ?? 0)
  }).toBe(viewportHeight)

  await extensionCanvas.evaluate((element) => {
    const scrollProbe = document.createElement('div')

    scrollProbe.style.height = '1800px'

    element.append(scrollProbe)
  })
  await expect.poll(async () => content.evaluate((element) => (
    element.scrollHeight > element.clientHeight
  ))).toBe(true)
  await expect.poll(async () => page.evaluate(() => document.scrollingElement?.scrollHeight ?? 0))
    .toBeLessThanOrEqual(viewportHeight)

  const openContentBox = await content.boundingBox()

  await collapseSidebar.click()
  await expect(page.getByRole('button', { name: 'Развернуть боковую панель' })).toHaveAttribute('aria-expanded', 'false')
  await expect(rail).toBeVisible()
  await expect.poll(async () => {
    const closedContentBox = await content.boundingBox()

    return closedContentBox?.x ?? 0
  }).toBeLessThan(openContentBox?.x ?? 0)

  const closedContentBox = await content.boundingBox()
  const railBox = await rail.boundingBox()

  expect(closedContentBox?.x).toBeGreaterThan(railBox?.width ?? 0)
  await page.waitForTimeout(300)

  const expandSidebar = page.getByRole('button', { name: 'Развернуть боковую панель' })

  await expandSidebar.click()
  await expect(page.getByRole('button', { name: 'Свернуть боковую панель' })).toHaveAttribute('aria-expanded', 'true')
  await expect(sidebar).toBeVisible()

  await expect(page.getByRole('dialog', { name: 'Управление песочницей' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()
  const devPanel = page.getByRole('dialog', { name: 'Управление песочницей' })

  await expect(devPanel).toBeVisible()
  await expect(devPanel).toContainText('Доставка JS-модуля')
  await expect(devPanel.getByRole('textbox', { name: 'Manifest / URL расширения' })).toBeVisible()
  await expect(devPanel.getByRole('button', { name: 'Применить', exact: true })).toBeVisible()
  await expect(devPanel.getByRole('button', { name: 'Применить контекст' })).toBeDisabled()
  await expect(devPanel.getByRole('button', { name: 'Перезапустить расширение' })).toHaveCount(0)
  await expect(devPanel.getByRole('button', { name: 'Сбросить состояние' })).toHaveCount(0)
  await expect(devPanel).not.toContainText('Действия Host API')
  await expect(devPanel).not.toContainText('Активность хоста')
  await expect(devPanel).not.toContainText('Снимок состояния')

  await devPanel.getByRole('button', { name: 'Close dialog' }).click()
  await expect(page.getByRole('dialog', { name: 'Управление песочницей' })).toHaveCount(0)

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

  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()
  const devPanel = page.getByRole('dialog', { name: 'Управление песочницей' })

  await devPanel.getByRole('combobox', { name: 'Режим' }).click()
  await page.getByRole('listbox', { name: 'Режим' }).getByRole('option', { name: 'Страница' }).click()
  await devPanel.getByRole('textbox', { name: 'Код страницы' }).fill('orders-dashboard')
  await devPanel.getByRole('combobox', { name: 'Фикстура' }).click()
  await page.getByRole('listbox', { name: 'Фикстура' }).getByRole('option', { name: 'Заказ с доставкой' }).click()
  await devPanel.getByRole('button', { name: 'Применить', exact: true }).click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(/fixture=order-with-delivery/)
  await expect(page.getByRole('region', { name: 'Подключите внешнее расширение' })).toBeVisible()
  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' })).toContainText('Страница: orders-dashboard')
})

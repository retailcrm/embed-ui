import { expect, test } from '@playwright/test'

test('shows onboarding when extension source is not configured', async ({ page }) => {
  await page.goto('/')

  const onboarding = page.getByRole('region', { name: 'Подключите внешнее расширение' })

  await expect(onboarding).toBeVisible()
  await expect(onboarding).toContainText('Подключите внешнее расширение')
  await expect(onboarding).toContainText('%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%')
  await expect(onboarding.getByRole('button', { name: 'Открыть песочницу' })).toBeVisible()
  await expect(onboarding.getByRole('textbox')).toHaveCount(0)
})

test('renders sandbox shell and records host activity without bundled extension', async ({ page }, testInfo) => {
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

  const expandSidebar = page.getByRole('button', { name: 'Развернуть боковую панель' })

  await expandSidebar.click()
  await expect(page.getByRole('button', { name: 'Свернуть боковую панель' })).toHaveAttribute('aria-expanded', 'true')
  await expect(sidebar).toBeVisible()

  await expect(page.getByRole('complementary', { name: 'Управление песочницей' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Песочница' }).click()
  const devPanel = page.getByRole('complementary', { name: 'Управление песочницей' })

  await expect(devPanel).toBeVisible()
  await expect(devPanel.getByRole('region', { name: 'Снимок состояния' })).toContainText('"status": "new"')

  await devPanel.getByRole('button', { name: 'httpCall' }).click()
  await devPanel.getByRole('button', { name: 'goTo' }).click()
  await devPanel.getByRole('button', { name: 'pushQuery' }).click()
  await devPanel.getByRole('button', { name: 'replaceQuery' }).click()

  const hostActivity = devPanel.getByRole('region', { name: 'Активность хоста' })

  await expect(hostActivity).toContainText('httpCall')
  await expect(hostActivity).toContainText('sandbox.demo.ping -> 200')
  await expect(hostActivity).toContainText('go-to')
  await expect(hostActivity).toContainText('push-query')
  await expect(hostActivity).toContainText('replace-query')

  await devPanel.getByRole('button', { name: 'Закрыть управление песочницей' }).click()
  await expect(page.getByRole('complementary', { name: 'Управление песочницей' })).toHaveCount(0)

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

  await page.getByRole('button', { name: 'Песочница' }).click()
  const devPanel = page.getByRole('complementary', { name: 'Управление песочницей' })

  await devPanel.getByRole('button', { name: 'Режим: Виджеты' }).click()
  await devPanel.getByRole('listbox', { name: 'Режим' }).getByRole('option', { name: 'Страница' }).click()
  await devPanel.getByRole('textbox', { name: 'Код страницы' }).fill('orders-dashboard')
  await devPanel.getByRole('button', { name: 'Фикстура: Базовый заказ' }).click()
  await devPanel.getByRole('listbox', { name: 'Фикстура' }).getByRole('option', { name: 'Заказ с доставкой' }).click()
  await devPanel.getByRole('button', { name: 'Применить' }).click()

  await expect(page).toHaveURL(/mode=page/)
  await expect(page).toHaveURL(/fixture=order-with-delivery/)
  await expect(page.getByRole('region', { name: 'Подключите внешнее расширение' })).toBeVisible()
  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' })).toContainText('Страница: orders-dashboard')
})

test('alerts when page mode is selected for iframe extension manifest', async ({ page }) => {
  await page.route('http://extension.test/manifest.json', async (route) => {
    await route.fulfill({
      body: JSON.stringify({
        entrypoint: 'http://extension.test/script',
        runner: 'iframe',
        targets: ['order/card:common.after'],
        uuid: 'iframe-extension',
      }),
      contentType: 'application/json',
    })
  })

  const dialogPromise = page.waitForEvent('dialog')
  const navigationPromise = page.goto('/?manifestUrl=http%3A%2F%2Fextension.test%2Fmanifest.json&mode=page&pageCode=returns')
  const dialog = await dialogPromise

  expect(dialog.message()).toContain('Неверный режим запуска')
  expect(dialog.message()).toContain('legacy iframe-расширение поддерживает только widget targets')

  await dialog.accept()
  await navigationPromise

  await expect(page.getByRole('status', { name: 'Режим запуска песочницы' })).toContainText('Страница: returns')
})

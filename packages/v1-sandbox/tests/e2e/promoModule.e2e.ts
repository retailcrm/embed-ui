import { expect, test } from '@playwright/test'

import { isSandboxOrderTarget } from '@/scenario'

import { launchSandboxExtension } from '@/automation/playwright'

import { readExtensionDescriptor } from '../__utils__/extensions'

const descriptor = readExtensionDescriptor('promoModule')
const [pageCode] = descriptor.pages
const target = descriptor.targets.find(isSandboxOrderTarget)

if (!pageCode) throw new Error('promoModule runtime descriptor has no page.')

test('keeps context actions disabled without a connected extension', async ({ page }) => {
  const runtimeErrors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text())
  })
  page.on('pageerror', error => runtimeErrors.push(error.message))

  await page.goto('/')
  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()

  const dialog = page.getByRole('dialog', { name: 'Управление песочницей' })
  const applyContext = dialog.getByRole('button', {
    name: 'Применить контекст',
    exact: true,
  })

  await dialog.getByRole('button', { name: 'Отменить изменения' }).click()
  await expect(applyContext).toBeDisabled()
  await dialog.getByLabel('JSON контекста текущего запуска').fill('{}')
  await expect(applyContext).toBeDisabled()
  await expect(dialog.getByText('Расширение не подключено')).toBeVisible()
  expect(runtimeErrors.filter(message => message.includes('document is not defined'))).toEqual([])
})

test('loads promo module page extension', async ({ page }) => {
  await page.goto('/tests/__bootstrap__/index.html')
  await launchSandboxExtension(page, {
    mode: 'page',
    descriptor,
    pageCode,
  })

  await expect(page).toHaveURL(url => url.search === '')
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible()
})

test('loads promo module widget extension from target descriptor', async ({ page }) => {
  test.skip(!target, 'promoModule runtime descriptor has no widget target.')

  await page.goto('/tests/__bootstrap__/index.html')
  await launchSandboxExtension(page, {
    mode: 'widget',
    descriptor,
  })

  const widgetMount = page.getByRole('region', {
    name: `Место встраивания виджета: ${target}`,
  })

  await expect(widgetMount).toBeVisible()

  const openPromos = widgetMount.getByRole('button', { name: 'Акции' })

  await expect(openPromos).toBeVisible()
  await openPromos.click()

  const drawer = page.locator('.ui-v1-modal-sidebar').filter({ hasText: 'Акции' })

  await expect(drawer).toBeVisible()
  await expect(drawer).toContainText('Номер заказа')
  await expect(drawer).toContainText('#215C')
  await expect(drawer).toContainText('3 товара в заказе')
})

test('restarts promo widget with manually changed context', async ({ page }) => {
  test.skip(!target, 'promoModule runtime descriptor has no widget target.')

  await page.goto('/tests/__bootstrap__/index.html')
  await launchSandboxExtension(page, {
    mode: 'widget',
    descriptor,
    targets: target ? [target] : [],
  })
  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()

  const dialog = page.getByRole('dialog', { name: 'Управление песочницей' })
  const contextEditor = dialog.getByLabel('JSON контекста текущего запуска')
  const context = JSON.parse(await contextEditor.inputValue()) as {
    'order/card': Record<string, unknown>;
  }

  context['order/card'].number = '999C'
  await contextEditor.fill(JSON.stringify(context, null, 2))
  await dialog.getByRole('button', {
    name: 'Применить контекст',
    exact: true,
  }).click()

  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(
    'Контекст применён. Расширение перезапущено.'
  )).toBeVisible()
  await expect(dialog.getByText('Контекст изменён вручную')).toBeVisible()

  const runSummary = page.getByRole('region', { name: 'Текущий запуск' })

  await expect(runSummary.getByText('Изменён вручную')).toBeVisible()
  await dialog.getByRole('button', { name: 'Close dialog' }).click()

  const widgetMount = page.getByRole('region', {
    name: `Место встраивания виджета: ${target}`,
  })

  await widgetMount.getByRole('button', { name: 'Акции' }).click()

  const drawer = page.locator('.ui-v1-modal-sidebar').filter({ hasText: 'Акции' })

  await expect(drawer).toContainText('#999C')
})

test('applies DevPanel configuration and restores it on reload with a clean URL', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Подключите внешнее расширение' })).toBeVisible()
  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()

  const dialog = page.getByRole('dialog', { name: 'Управление песочницей' })

  await dialog.getByRole('button', { name: 'JSON', exact: true }).click()
  await dialog.getByLabel('JSON дескриптора', { exact: true }).fill(JSON.stringify(descriptor))
  await dialog.getByRole('combobox', { name: 'Режим', exact: true }).click()
  await page.getByRole('option', { name: 'Страница', exact: true }).click()
  await expect(dialog.getByLabel('JSON дескриптора', { exact: true })).toHaveValue(JSON.stringify(descriptor))
  await dialog.getByRole('button', { name: 'Применить', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()
  await expect(page).toHaveURL(url => url.pathname === '/' && url.search === '')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()
  await expect(page).toHaveURL(url => url.search === '')

  await page.getByRole('button', { name: 'Открыть управление песочницей' }).click()
  await dialog.getByRole('button', { name: 'JSON', exact: true }).click()
  await dialog.getByLabel('JSON дескриптора', { exact: true }).fill('{')
  await dialog.getByRole('button', { name: 'Применить', exact: true }).click()
  await expect(dialog.getByRole('alert')).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()
})

test('launches and replaces an extension without persisting configuration or navigation', async ({ page }) => {
  const navigationUrls: string[] = []

  page.on('request', request => {
    if (request.isNavigationRequest()) navigationUrls.push(request.url())
  })
  await page.goto('/tests/__bootstrap__/index.html')
  await launchSandboxExtension(page, { descriptor, mode: 'page', pageCode, targets: [] })
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()

  await launchSandboxExtension(page, { descriptor, mode: 'widget' })
  await expect(page.getByRole('button', { name: 'Акции', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toHaveCount(0)
  expect(navigationUrls).toHaveLength(1)
  expect(await page.evaluate(() => window.localStorage.length)).toBe(0)
  await expect(page).toHaveURL(url => url.search === '')

  await page.reload()
  await expect(page.getByRole('heading', { name: 'Подключите внешнее расширение' })).toBeVisible()
})

test('launches widgets through the public bridge using descriptor targets', async ({ page }) => {
  await page.goto('/tests/__bootstrap__/index.html')
  await launchSandboxExtension(page, { descriptor, mode: 'widget' })

  const widget = page.getByRole('region', {
    name: 'Место встраивания виджета: order/card:common.after',
  })

  await expect(widget.getByRole('button', { name: 'Акции' })).toBeVisible()
  await expect(page.getByRole('region', {
    name: 'Место встраивания виджета: order/card:common.before',
  })).toHaveCount(0)
  await expect(page).toHaveURL(url => url.search === '')
})

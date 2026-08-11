import { expect, test } from '@playwright/test'

import { createSandboxPagePath, createSandboxWidgetPath } from '../__utils__/sandbox'
import { getExtensionPageCodes, getExtensionTargets } from '../__utils__/extensions'
import { hasSandboxExtensionBaseUrl } from '../__utils__/sandbox'
import { readExtensionFixture } from '../__utils__/extensions'

const extension = readExtensionFixture('promoModule')
const [pageCode] = getExtensionPageCodes(extension)
const [target] = getExtensionTargets(extension)

test.skip(!hasSandboxExtensionBaseUrl(), 'SANDBOX_EXTENSION_URL is required.')

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
  test.skip(!pageCode, 'promoModule fixture has no page descriptor.')

  await page.goto(createSandboxPagePath(extension, pageCode))

  await expect(page).toHaveURL(/mode=page/u)
  await expect(page).toHaveURL(new RegExp(`pageCode=${pageCode}`, 'u'))
  await expect(page.getByRole('heading', { name: 'Настройки акций' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible()
})

test('loads promo module widget extension from target descriptor', async ({ page }) => {
  test.skip(!target, 'promoModule fixture has no widget target.')

  await page.goto(createSandboxWidgetPath(extension, target))

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
  test.skip(!target, 'promoModule fixture has no widget target.')

  await page.goto(createSandboxWidgetPath(extension, target))
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

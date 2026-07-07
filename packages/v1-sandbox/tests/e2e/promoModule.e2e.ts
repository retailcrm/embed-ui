import { expect, test } from '@playwright/test'

import { createSandboxPagePath, createSandboxWidgetPath } from '../__utils__/sandbox'
import { getExtensionPageCodes, getExtensionTargets } from '../__utils__/extensions'
import { hasSandboxExtensionBaseUrl } from '../__utils__/sandbox'
import { readExtensionFixture } from '../__utils__/extensions'

const extension = readExtensionFixture('promoModule')
const [pageCode] = getExtensionPageCodes(extension)
const [target] = getExtensionTargets(extension)

test.skip(!hasSandboxExtensionBaseUrl(), 'SANDBOX_EXTENSION_URL is required.')

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
    name: `Цель виджета: ${target}`,
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

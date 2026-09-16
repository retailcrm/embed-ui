import { expect, test } from '@playwright/test'

import { createSandboxPagePath } from '@/automation/playwright'

import { readExtensionDescriptor } from '../__utils__/extensions'
import { readSandboxSnapshot } from '../__utils__/sandbox'

const descriptor = readExtensionDescriptor('returnsModule')
const [pageCode] = descriptor.pages

if (!pageCode) throw new Error('returnsModule runtime descriptor has no page.')
if (!descriptor.stylesheet) throw new Error('returnsModule delivery test requires a stylesheet.')

test('loads returns page extension, filters, opens and saves return', async ({ page }) => {
  const entrypointResponse = page.waitForResponse(
    response => response.url() === descriptor.entrypoint
  )
  const stylesheetResponse = page.waitForResponse(
    response => response.url() === descriptor.stylesheet
  )

  await page.goto(createSandboxPagePath({
    descriptor,
    pageCode,
    sandboxPath: '/tests/__bootstrap__/index.html',
  }))

  await expect(page).toHaveURL(/mode=page/u)
  await expect(page).toHaveURL(new RegExp(`pageCode=${pageCode}`, 'u'))
  await expect(page).toHaveURL(/descriptor=/u)
  expect((await entrypointResponse).status()).toBe(200)
  expect((await stylesheetResponse).status()).toBe(200)
  await expect(page.getByRole('button', { name: 'Возвраты' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Создать возврат' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Список возвратов' })).toBeVisible()
  await expect.poll(() => page.getByRole('heading', {
    name: 'Список возвратов',
  }).evaluate((heading) => {
    const pageSection = heading.closest('section')

    return pageSection ? getComputedStyle(pageSection).display : null
  })).toBe('flex')
  await expect.poll(async () => {
    const snapshot = await readSandboxSnapshot(page)

    return snapshot.host.http.find(record => record.action === '/returns')?.response
  }).toMatchObject({ status: 200 })
  await expect(page.locator('body')).toContainText(/Найдено:\s*\d+/u)

  await page.getByPlaceholder('Например 100245').fill('100245')
  await page.getByRole('button', { name: 'Применить' }).click()

  await expect(page.locator('body')).toContainText('Найдено: 2')
  const filteredRow = page.getByRole('row', { name: /№100245/u }).first()

  await expect(filteredRow).toBeVisible()
  await filteredRow.getByRole('button', { name: 'Открыть' }).click()

  const drawer = page.getByRole('dialog')

  await expect(drawer).toBeVisible()
  await expect(drawer.getByRole('heading', { name: /Возврат #/u })).toBeVisible()
  await expect(drawer).toContainText('№100245')
  await drawer.getByRole('button', { name: 'Сохранить' }).click()
  await expect(drawer).toBeHidden()
  await expect(page.locator('body')).toContainText('Найдено: 2')

  const snapshot = await readSandboxSnapshot(page)
  const actions = snapshot.host.http.map(record => record.action)
  const returnsRequests = snapshot.host.http.filter(record => record.action === '/returns')

  expect(actions).toEqual(expect.arrayContaining(['/returns', '/return', '/returns/save']))
  expect(returnsRequests.length).toBeGreaterThanOrEqual(3)
  expect(snapshot.host.http.every(record => record.response.status === 200)).toBe(true)
})

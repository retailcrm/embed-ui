import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/v1-sandbox/)
})

test('renders sandbox smoke page', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('sandbox-title')).toHaveText('v1-sandbox smoke page')
  await expect(page.getByTestId('sandbox-status')).toHaveText('ready')
})

test('updates status after button click', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('sandbox-button').click()
  await expect(page.getByTestId('sandbox-status')).toHaveText('clicked')
})

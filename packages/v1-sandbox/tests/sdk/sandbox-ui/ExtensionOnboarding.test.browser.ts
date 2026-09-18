import type { VueWrapper } from '@vue/test-utils'

import { afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { page } from 'vitest/browser'
import { test, vi } from 'vitest'
import { within } from '@testing-library/dom'

import ExtensionOnboarding from '@/components/ExtensionOnboarding.vue'

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

test('copies the descriptor and centers the hint below the copy button', async () => {
  await page.viewport(1280, 900)

  const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
  const root = document.createElement('div')
  root.style.marginLeft = '100px'
  document.body.append(root)

  wrapper = mount(ExtensionOnboarding, {
    attachTo: root,
    props: { openDevPanel: () => {} },
    global: {
      plugins: [createI18n({ legacy: false, locale: 'ru-RU' })],
    },
  })

  const copy = page.getByRole('button', { name: 'Скопировать', exact: true })
  await copy.hover()

  const hint = page.getByRole('tooltip')
  await expect.element(hint).toBeVisible()
  await expect.element(hint).toHaveTextContent('Скопировать')

  await expect.poll(() => {
    const buttonRect = copy.element().getBoundingClientRect()
    const hintRect = hint.element().getBoundingClientRect()

    return hintRect.top >= buttonRect.bottom
      && Math.abs((hintRect.left + hintRect.right - buttonRect.left - buttonRect.right) / 2) <= 2
  }).toBe(true)

  await copy.click()

  const descriptor = within(root).getByText(/"entrypoint":/u).textContent
  await expect.poll(() => writeText.mock.calls[0]?.[0]).toBe(descriptor)
  await expect.element(hint).toHaveTextContent('Скопировано')
})

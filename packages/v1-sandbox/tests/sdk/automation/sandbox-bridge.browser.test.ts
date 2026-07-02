import type { MountedSandbox } from '@/automation/browser'

import { afterEach, expect } from 'vitest'
import { screen } from '@testing-library/dom'
import { test } from 'vitest'

import { mountSandbox } from '@/automation/browser'

let sandbox: MountedSandbox | null = null

const resetDocument = () => {
  sandbox?.unmount()
  sandbox = null
  document.body.innerHTML = ''
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
}

afterEach(() => {
  resetDocument()
})

test('exposes mounted sandbox launch bridge', async () => {
  sandbox = await mountSandbox()

  expect(await screen.findByText('Подключите внешнее расширение')).toBeInstanceOf(HTMLElement)

  expect(sandbox.bridge.getLaunchConfig()).toMatchObject({
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'orders-dashboard',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
    widgetId: 'sandbox-widget',
  })

  const launchUrl = new URL(sandbox.bridge.createLaunchUrl({
    fixture: 'order-with-delivery',
    manifestUrl: 'http://extension.test/extension/module-id',
    mode: 'page',
    pageCode: 'returns-dashboard',
    targets: ['order/card:common.after'],
  }))

  expect(launchUrl.searchParams.get('fixture')).toBe('order-with-delivery')
  expect(launchUrl.searchParams.get('manifestUrl')).toBe('http://extension.test/extension/module-id')
  expect(launchUrl.searchParams.get('mode')).toBe('page')
  expect(launchUrl.searchParams.get('pageCode')).toBe('returns-dashboard')
  expect(launchUrl.searchParams.get('target')).toBe('order/card:common.after')
})

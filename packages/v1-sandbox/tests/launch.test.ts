import { expect, test } from 'vitest'

import {
  DEFAULT_SANDBOX_EXTENSION_URL,
  DEFAULT_SANDBOX_WIDGET_ID,
  parseSandboxLaunchConfig,
} from '@/launch'

test('parses sandbox launch config from url params', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    target: 'order/card:delivery.before',
    widgetId: 'delivery-widget',
  }))

  expect(config).toEqual({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    target: 'order/card:delivery.before',
    widgetId: 'delivery-widget',
  })
})

test('falls back to safe defaults for empty and unsupported values', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '',
    target: 'customer/card:phone',
    widgetId: '',
  }))

  expect(config).toEqual({
    extensionUrl: DEFAULT_SANDBOX_EXTENSION_URL,
    fixture: 'order-basic',
    target: 'order/card:common.before',
    widgetId: DEFAULT_SANDBOX_WIDGET_ID,
  })
})

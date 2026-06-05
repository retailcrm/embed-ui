import { expect, test } from 'vitest'

import {
  DEFAULT_SANDBOX_EXTENSION_URL,
  DEFAULT_SANDBOX_PAGE_CODE,
  DEFAULT_SANDBOX_WIDGET_ID,
  parseSandboxLaunchConfig,
} from '@/launch'

test('parses sandbox launch config from url params', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    mode: 'widget',
    target: 'order/card:delivery.before',
    widgetId: 'delivery-widget',
  }))

  expect(config).toEqual({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    mode: 'widget',
    pageCode: DEFAULT_SANDBOX_PAGE_CODE,
    targets: ['order/card:delivery.before'],
    widgetId: 'delivery-widget',
  })
})

test('parses multiple widget targets and page mode', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    mode: 'page',
    pageCode: 'orders-dashboard',
    targets: 'order/card:common.before,order/card:common.after,unknown',
  }))

  expect(config).toEqual({
    extensionUrl: DEFAULT_SANDBOX_EXTENSION_URL,
    fixture: 'order-basic',
    mode: 'page',
    pageCode: 'orders-dashboard',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
    widgetId: DEFAULT_SANDBOX_WIDGET_ID,
  })
})

test('falls back to safe defaults for empty and unsupported values', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '',
    mode: 'unknown',
    target: 'customer/card:phone',
    widgetId: '',
  }))

  expect(config).toEqual({
    extensionUrl: DEFAULT_SANDBOX_EXTENSION_URL,
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: DEFAULT_SANDBOX_PAGE_CODE,
    targets: ['order/card:common.before'],
    widgetId: DEFAULT_SANDBOX_WIDGET_ID,
  })
})

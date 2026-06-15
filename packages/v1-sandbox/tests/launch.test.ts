import { expect, test } from 'vitest'

import {
  createDefaultSandboxManifestUrl,
  DEFAULT_SANDBOX_EXTENSION_URL,
  DEFAULT_SANDBOX_MANIFEST_URL,
  DEFAULT_SANDBOX_PAGE_CODE,
  DEFAULT_SANDBOX_WIDGET_ID,
  parseSandboxLaunchConfig,
} from '@/dev/launch'

test('does not use bundled extension entrypoint by default', () => {
  expect(DEFAULT_SANDBOX_EXTENSION_URL).toBe('')
  expect(DEFAULT_SANDBOX_MANIFEST_URL).toBe('')
})

test('does not assume bundled external extension server', () => {
  expect(createDefaultSandboxManifestUrl()).toBe('')
})

test('parses sandbox launch config from url params', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    manifestUrl: '/extension/manifest.json',
    mode: 'widget',
    target: 'order/card:delivery.before',
    widgetId: 'delivery-widget',
  }))

  expect(config).toEqual({
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    manifestUrl: '/extension/manifest.json',
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
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: DEFAULT_SANDBOX_MANIFEST_URL,
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
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: DEFAULT_SANDBOX_MANIFEST_URL,
    mode: 'widget',
    pageCode: DEFAULT_SANDBOX_PAGE_CODE,
    targets: ['order/card:common.before'],
    widgetId: DEFAULT_SANDBOX_WIDGET_ID,
  })
})

test('allows empty manifest url to use direct extension fallback', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    extensionUrl: '/extension.js',
    manifestUrl: '',
  }))

  expect(config.manifestUrl).toBe('')
  expect(config.extensionUrl).toBe('/extension.js')
})

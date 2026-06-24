import { expect, test } from 'vitest'

import { createDefaultSandboxManifestUrl } from '@/dev/launch'
import { DefaultSandbox } from '@/enum'
import { parseSandboxLaunchConfig } from '@/dev/launch'

test('does not use bundled extension entrypoint by default', () => {
  expect(DefaultSandbox.Url).toBe('')
})

test('does not assume bundled external extension server', () => {
  expect(createDefaultSandboxManifestUrl()).toBe('')
})

test('parses sandbox launch config from url params', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    code: 'returnsModule',
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    manifestUrl: '/extension/manifest.json',
    mode: 'widget',
    target: 'order/card:delivery.before',
    widgetId: 'delivery-widget',
  }))

  expect(config).toEqual({
    code: 'returnsModule',
    extensionUrl: '/extension.js',
    fixture: 'order-with-delivery',
    manifestUrl: '/extension/manifest.json',
    mode: 'widget',
    pageCode: DefaultSandbox.PageCode,
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
    code: '',
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: DefaultSandbox.Url,
    mode: 'page',
    pageCode: 'orders-dashboard',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
    widgetId: DefaultSandbox.WidgetId,
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
    code: '',
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: DefaultSandbox.Url,
    mode: 'widget',
    pageCode: DefaultSandbox.PageCode,
    targets: ['order/card:common.before'],
    widgetId: DefaultSandbox.WidgetId,
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

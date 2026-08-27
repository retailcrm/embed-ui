import { expect, test } from 'vitest'

import {
  createDefaultSandboxManifestUrl,
  DEFAULT_SANDBOX_TARGET,
  DefaultSandbox,
  parseSandboxLaunchConfig,
  updateSandboxLaunchQuery,
} from '@/scenario'

test('does not use bundled extension entrypoint by default', () => {
  expect(DefaultSandbox.Url).toBe('')
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

test('round-trips descriptor and uses its widget targets by default', () => {
  const descriptor = {
    baseUrl: 'https://extension.test/runtime/',
    code: 'descriptor-widget',
    entrypoint: 'worker.js',
    pages: [],
    stylesheet: null,
    targets: ['order/card:common.after' as const],
  }
  const url = updateSandboxLaunchQuery({
    descriptor,
    extensionUrl: 'http://legacy.test/extension/demo',
    fixture: 'order-basic',
    manifestUrl: 'http://legacy.test/extension/demo',
    mode: 'widget',
    pageCode: 'orders-dashboard',
    targets: descriptor.targets,
    widgetId: 'sandbox-widget',
  }, 'http://sandbox.test/')
  const parsed = parseSandboxLaunchConfig(new URLSearchParams({
    descriptor: url.searchParams.get('descriptor') ?? '',
  }))

  expect(url.searchParams.has('extensionUrl')).toBe(false)
  expect(url.searchParams.has('manifestUrl')).toBe(false)
  expect(parsed.descriptor).toEqual(descriptor)
  expect(parsed.targets).toEqual(['order/card:common.after'])
})

test('rejects invalid descriptors without falling back to legacy url', () => {
  expect(() => parseSandboxLaunchConfig(new URLSearchParams({
    descriptor: JSON.stringify({
      entrypoint: '/relative.js',
      pages: [],
      stylesheet: null,
      targets: [],
      uuid: 'demo',
    }),
    manifestUrl: 'http://extension.test/extension/demo',
  }))).toThrow('Invalid extension descriptor')
})

test('removes stale descriptor when serializing legacy config', () => {
  const url = updateSandboxLaunchQuery({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: 'http://extension.test/extension/demo',
    mode: 'widget',
    pageCode: 'orders-dashboard',
    targets: ['order/card:common.after'],
    widgetId: 'sandbox-widget',
  }, `http://sandbox.test/?descriptor=${encodeURIComponent('{}')}`)

  expect(url.searchParams.has('descriptor')).toBe(false)
  expect(url.searchParams.get('manifestUrl')).toBe('http://extension.test/extension/demo')
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

test('updates sandbox launch query from config', () => {
  const url = updateSandboxLaunchQuery({
    extensionUrl: '',
    fixture: 'order-with-delivery',
    manifestUrl: 'http://extension.test/extension/module-id',
    mode: 'page',
    pageCode: 'returns',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
    widgetId: 'returns-widget',
  }, 'http://sandbox.test/?old=value')

  expect(url.href).toBe(
    'http://sandbox.test/?old=value'
    + '&extensionUrl='
    + '&fixture=order-with-delivery'
    + '&manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fmodule-id'
    + '&mode=page'
    + '&pageCode=returns'
    + '&target=order%2Fcard%3Acommon.before'
    + '&targets=order%2Fcard%3Acommon.before%2Corder%2Fcard%3Acommon.after'
    + '&widgetId=returns-widget'
  )
})

test('uses default target when updating query without targets', () => {
  const url = updateSandboxLaunchQuery({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: '',
    targets: [],
    widgetId: 'sandbox-widget',
  }, 'http://sandbox.test/')

  expect(url.searchParams.get('target')).toBe(DEFAULT_SANDBOX_TARGET)
  expect(url.searchParams.get('targets')).toBe('')
})

test('uses option target when query target is missing', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams(), {
    targets: ['order/card:common.after'],
  })

  expect(config.targets).toEqual(['order/card:common.after'])
})

test('updates current browser query when base is omitted', () => {
  window.history.replaceState(null, '', '/existing')

  const url = updateSandboxLaunchQuery({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: '',
    targets: ['order/card:common.before'],
    widgetId: 'sandbox-widget',
  })

  expect(url.pathname).toBe('/existing')
})

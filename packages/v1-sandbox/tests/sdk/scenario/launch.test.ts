import { expect, test } from 'vitest'

import {
  DEFAULT_SANDBOX_TARGET,
  DefaultSandbox,
  parseSandboxLaunchConfig,
  updateSandboxLaunchQuery,
} from '@/scenario'

const descriptor = {
  runner: 'worker' as const,
  entrypoint: 'https://extension.test/runtime/worker.js',
  pages: ['returns'],
  stylesheet: null,
  targets: ['order/card:common.after' as const],
}

test('parses sandbox launch config from url params', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    fixture: 'order-with-delivery',
    mode: 'widget',
    target: 'order/card:delivery.before',
  }))

  expect(config).toEqual({
    fixture: 'order-with-delivery',
    mode: 'widget',
    pageCode: DefaultSandbox.PageCode,
    targets: ['order/card:delivery.before'],
  })
})

test('parses multiple widget targets and page mode', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    mode: 'page',
    pageCode: 'orders-dashboard',
    targets: 'order/card:common.before,order/card:common.after,unknown',
  }))

  expect(config).toEqual({
    fixture: 'order-basic',
    mode: 'page',
    pageCode: 'orders-dashboard',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
  })
})

test('round-trips descriptor and uses its widget targets by default', () => {
  const descriptor = {
    runner: 'worker' as const,
    entrypoint: 'https://extension.test/runtime/worker.js',
    pages: [],
    stylesheet: null,
    targets: ['order/card:common.after' as const],
  }
  const url = updateSandboxLaunchQuery({
    descriptor,
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: 'orders-dashboard',
    targets: descriptor.targets,
  }, 'http://sandbox.test/')
  const parsed = parseSandboxLaunchConfig(new URLSearchParams({
    descriptor: url.searchParams.get('descriptor') ?? '',
  }))

  expect(url.searchParams.has('extensionUrl')).toBe(false)
  expect(url.searchParams.has('manifestUrl')).toBe(false)
  expect(parsed.descriptor).toEqual(descriptor)
  expect(parsed.targets).toEqual(['order/card:common.after'])
})

test('rejects invalid descriptors', () => {
  expect(() => parseSandboxLaunchConfig(new URLSearchParams({
    descriptor: JSON.stringify({
      entrypoint: '/relative.js',
      pages: [],
      stylesheet: null,
      targets: [],
    }),
  }))).toThrow('Invalid extension descriptor')
})

test('falls back to safe defaults for empty and unsupported values', () => {
  const config = parseSandboxLaunchConfig(new URLSearchParams({
    mode: 'unknown',
    target: 'customer/card:phone',
  }))

  expect(config).toEqual({
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: DefaultSandbox.PageCode,
    targets: ['order/card:common.before'],
  })
})

test('updates sandbox launch query from a descriptor configuration', () => {
  const config = {
    descriptor,
    fixture: 'order-with-delivery',
    mode: 'page' as const,
    pageCode: 'returns',
    targets: ['order/card:common.before' as const, 'order/card:common.after' as const],
  }
  const url = updateSandboxLaunchQuery(config, 'http://sandbox.test/?debug=true')

  expect(parseSandboxLaunchConfig(url.searchParams)).toEqual(config)
  expect(url.searchParams.get('debug')).toBe('true')
})

test('uses default target when updating query without targets', () => {
  const url = updateSandboxLaunchQuery({
    descriptor,
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: '',
    targets: [],
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
    descriptor,
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: '',
    targets: ['order/card:common.before'],
  })

  expect(url.pathname).toBe('/existing')
})

test('does not accept a URL as an extension descriptor', () => {
  expect(() => parseSandboxLaunchConfig(new URLSearchParams({
    descriptor: 'https://extension.test/script',
  }))).toThrow('Invalid extension descriptor JSON')
  expect(() => updateSandboxLaunchQuery(parseSandboxLaunchConfig(new URLSearchParams())))
    .toThrow('Invalid extension descriptor')
})

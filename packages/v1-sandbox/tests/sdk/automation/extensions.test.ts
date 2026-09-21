import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

import { readExtensionDescriptor } from '../../__utils__/extensions'

afterEach(() => {
  vi.unstubAllEnvs()
})

test('reads the returns runtime descriptor by extension name without a uuid', () => {
  vi.stubEnv('SANDBOX_RUNTIME_EXTENSION_URL', 'http://127.0.0.1:4173/')

  expect(readExtensionDescriptor('returnsModule')).toEqual({
    entrypoint: 'http://127.0.0.1:4173/runtime/returnsModule/entrypoint.js',
    pages: ['returns'],
    runner: 'worker',
    stylesheet: 'http://127.0.0.1:4173/runtime/returnsModule/stylesheet.css',
    targets: [],
  })
})

test('reads the promo descriptor independently of returns', () => {
  vi.stubEnv('SANDBOX_RUNTIME_EXTENSION_URL', 'http://127.0.0.1:4173/')

  const descriptor = readExtensionDescriptor('promoModule')

  expect(descriptor.entrypoint).toBe('http://127.0.0.1:4173/runtime/promoModule/entrypoint.js')
  expect(descriptor.pages).toContain('settings')
  expect(descriptor.targets).toContain('order/card:common.after')
  expect(descriptor).not.toHaveProperty('uuid')
})

test('reports an unknown extension fixture', () => {
  expect(() => readExtensionDescriptor('missingModule')).toThrow('Extension descriptor not found')
})

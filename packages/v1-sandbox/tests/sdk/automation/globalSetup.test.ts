import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

import { verifyConfiguredExtensionServer } from '../../__bootstrap__/globalSetup'

const descriptor = {
  baseUrl: 'http://extension.test',
  code: 'promoModule',
  entrypoint: '/extension/id/script',
  pages: ['settings'],
  stylesheet: '/extension/id/stylesheet',
  targets: [],
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

test('checks descriptor resources before e2e scenarios', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 200 }))

  vi.stubEnv('SANDBOX_EXTENSION_DESCRIPTOR', JSON.stringify(descriptor))
  vi.stubGlobal('fetch', fetchMock)

  await verifyConfiguredExtensionServer()

  expect(fetchMock).toHaveBeenNthCalledWith(
    1,
    new URL('http://extension.test/extension/id/script'),
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  )
  expect(fetchMock).toHaveBeenNthCalledWith(
    2,
    new URL('http://extension.test/extension/id/stylesheet'),
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  )
})

test('reports unavailable extension server before e2e scenarios', async () => {
  vi.stubEnv('SANDBOX_EXTENSION_DESCRIPTOR', JSON.stringify(descriptor))
  vi.stubGlobal('fetch', vi.fn(async () => {
    throw new Error('connect ECONNREFUSED')
  }))

  await expect(verifyConfiguredExtensionServer()).rejects.toThrow(
    '[sandbox:e2e] Extension server is unavailable. Start it and verify descriptor entrypoint: http://extension.test/extension/id/script'
  )
})

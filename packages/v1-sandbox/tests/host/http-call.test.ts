import { expect, test, vi } from 'vitest'

import { createOrderSandboxController } from '@/dev/fixtures'

test('records host http calls and returns controlled fallback response', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    descriptorUuid: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns', {
    source: 'unit-test',
  })

  expect(response.status).toBe(503)
  expect(JSON.parse(response.body)).toMatchObject({
    message: 'Sandbox cannot proxy host.httpCall without extension backend URL.',
    ok: false,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/returns',
    payload: {
      source: 'unit-test',
    },
    response: {
      status: 503,
    },
    uuid: 'returnsModule',
  })
})

test('returns controlled fallback response for unknown http calls without backend url', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/unknown-endpoint', {
    source: 'unit-test',
  })

  expect(response.status).toBe(503)
  expect(JSON.parse(response.body)).toMatchObject({
    message: 'Sandbox cannot proxy host.httpCall without extension backend URL.',
    ok: false,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/unknown-endpoint',
    payload: {
      source: 'unit-test',
    },
    response: {
      status: 503,
    },
  })
})

test('returns controlled fallback response for list-like http calls without backend url', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    descriptorUuid: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns', {
    filters: {
      status: 'new',
    },
    page: 2,
    perPage: 6,
  })

  expect(response.status).toBe(503)
  expect(JSON.parse(response.body)).toMatchObject({
    message: 'Sandbox cannot proxy host.httpCall without extension backend URL.',
    ok: false,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/returns',
    response: {
      status: 503,
    },
    uuid: 'returnsModule',
  })
})

test('proxies host http calls to extension backend when base url is available', async () => {
  const fetcher = vi.fn(async () => new Response(JSON.stringify({
    returns: [{ id: 7001 }],
  }), {
    status: 200,
  }))

  vi.stubGlobal('fetch', fetcher)

  try {
    const sandbox = createOrderSandboxController('order-basic', {
      descriptorUuid: 'returnsModule',
      httpCallBaseUrl: 'http://extension-host.test',
    })
    const response = await sandbox.endpointApi.httpCall('/returns', {
      filters: {
        status: 'new',
      },
      page: 1,
      perPage: 8,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.body)).toEqual({
      returns: [{ id: 7001 }],
    })
    expect(fetcher).toHaveBeenCalledOnce()

    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit]
    const body = init.body as URLSearchParams

    expect(url).toBe('http://extension-host.test/returns')
    expect(init).toMatchObject({
      method: 'POST',
    })
    expect(JSON.parse(body.get('payload') ?? '')).toEqual({
      filters: {
        status: 'new',
      },
      page: 1,
      perPage: 8,
    })
    expect(sandbox.state.host.http.at(-1)).toMatchObject({
      action: '/returns',
      response: {
        status: 200,
      },
      uuid: 'returnsModule',
    })
  } finally {
    vi.unstubAllGlobals()
  }
})

test('returns controlled fallback response for count-like http calls without backend url', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    descriptorUuid: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns-count')

  expect(response.status).toBe(503)
  expect(JSON.parse(response.body)).toMatchObject({
    message: 'Sandbox cannot proxy host.httpCall without extension backend URL.',
    ok: false,
  })
})

test('returns controlled response when http middleware fails', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    httpMiddleware: () => {
      throw new Error('boom')
    },
  })
  const response = await sandbox.endpointApi.httpCall('/any-endpoint')

  expect(response.status).toBe(500)
  expect(JSON.parse(response.body)).toMatchObject({
    error: 'boom',
    ok: false,
  })
  expect(sandbox.state.host.http.at(-1)?.response.status).toBe(500)
})

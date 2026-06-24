import { expect, test, vi } from 'vitest'

import {
  createOrderSandboxController,
  getOrderSandboxFixture,
  orderSandboxFixtures,
} from '@/dev/fixtures'

test('returns default fixture for unknown fixture code', () => {
  expect(getOrderSandboxFixture('unknown')).toBe(orderSandboxFixtures['order-basic'])
})

test('creates order sandbox controller from fixture and supports reset snapshot', () => {
  const sandbox = createOrderSandboxController('order-with-delivery')

  expect(sandbox.state.contexts['order/card'].number).toBe('214C')
  expect(sandbox.state.contexts['order/card']['delivery.address']).toBe('Москва, ул. Ленина, 10')
  expect(sandbox.state.contexts['order/card'].items).toHaveLength(3)

  const snapshot = sandbox.snapshot()

  sandbox.setField('order/card', 'customer.firstName', 'Changed')
  sandbox.setLocation({ pathname: '/changed' })

  expect(sandbox.state.contexts['order/card']['customer.firstName']).toBe('Changed')
  expect(sandbox.state.host.location.pathname).toBe('/changed')

  sandbox.reset(snapshot)

  expect(sandbox.state.contexts['order/card']['customer.firstName']).toBe('Игорь')
  expect(sandbox.state.host.location.pathname).toBe('/orders/215/edit')
})

test('provides crm routing data used by external widgets', () => {
  const sandbox = createOrderSandboxController('order-basic')
  const routing = sandbox.state.contexts.settings['system.routing']

  expect(routing.routes.crm_users_edit).toBeDefined()
  expect(routing.routes.crm_manager_show).toBeDefined()
})

test('records host http calls and returns generic fallback response', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    moduleCode: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns', {
    source: 'unit-test',
  })

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toMatchObject({
    action: '/returns',
    ok: true,
    payload: {
      source: 'unit-test',
    },
    uuid: 'returnsModule',
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/returns',
    payload: {
      source: 'unit-test',
    },
    response: {
      status: 200,
    },
    uuid: 'returnsModule',
  })
})

test('returns ok fallback response for unknown http calls', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/unknown-endpoint', {
    source: 'unit-test',
  })

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toMatchObject({
    action: '/unknown-endpoint',
    ok: true,
    payload: {
      source: 'unit-test',
    },
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/unknown-endpoint',
    payload: {
      source: 'unit-test',
    },
    response: {
      status: 200,
    },
  })
})

test('returns generic paginated response for list-like http calls', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    moduleCode: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns', {
    filters: {
      status: 'new',
    },
    page: 2,
    perPage: 6,
  })

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toEqual({
    page: 2,
    perPage: 6,
    returns: [],
    total: 0,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/returns',
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
      httpCallBaseUrl: 'http://extension-host.test',
      moduleCode: 'returnsModule',
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
      cache: 'no-store',
      credentials: 'include',
      method: 'POST',
    })
    expect(init.headers).toMatchObject({
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
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

test('returns zero count response for count-like http calls', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    moduleCode: 'returnsModule',
  })
  const response = await sandbox.endpointApi.httpCall('/returns-count')

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toEqual({
    count: 0,
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

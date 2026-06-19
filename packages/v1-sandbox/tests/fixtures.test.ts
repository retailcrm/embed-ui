import { expect, test } from 'vitest'

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

test('handles order http calls through fixture-backed middleware', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/returns', {
    filters: {
      orderNumber: '100245',
    },
  })

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toMatchObject({
    returns: [
      {
        order: {
          number: '100245',
        },
      },
    ],
    total: 1,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/returns',
    response: {
      status: 200,
    },
  })
})

test('handles order notes http calls through fixture-backed middleware', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/api/order-notes/list?orderId=215')
  const countResponse = await sandbox.endpointApi.httpCall('/api/order-notes/count?orderId=215')
  const body = JSON.parse(response.body) as {
    count: number;
    notes: Array<{
      orderId: number;
    }>;
    total: number;
  }

  expect(response.status).toBe(200)
  expect(body.count).toBe(2)
  expect(body.total).toBe(2)
  expect(body.notes).toHaveLength(2)
  expect(body.notes.every(note => note.orderId === 215)).toBe(true)
  expect(countResponse.status).toBe(200)
  expect(JSON.parse(countResponse.body)).toEqual({
    count: 2,
  })
})

test('handles prefixed receipts and returns http calls through fixture-backed middleware', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const receiptsResponse = await sandbox.endpointApi.httpCall('/api/orders/215/receipts?limit=20')
  const returnsCountResponse = await sandbox.endpointApi.httpCall('/api/returns/count', {
    filters: {
      orderNumber: '100245',
    },
  })
  const receiptsBody = JSON.parse(receiptsResponse.body) as {
    count: number;
    receipts: unknown[];
    total: number;
  }

  expect(receiptsResponse.status).toBe(200)
  expect(receiptsBody.count).toBe(2)
  expect(receiptsBody.total).toBe(2)
  expect(receiptsBody.receipts).toHaveLength(2)
  expect(returnsCountResponse.status).toBe(200)
  expect(JSON.parse(returnsCountResponse.body)).toEqual({
    count: 1,
  })
})

test('returns zero count fallback for unknown count http calls', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/unknown-counter-count')

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toEqual({
    count: 0,
  })
  expect(sandbox.state.host.http.at(-1)).toMatchObject({
    action: '/unknown-counter-count',
    response: {
      status: 200,
    },
  })
})

test('returns ok fallback response for unknown http calls', async () => {
  const sandbox = createOrderSandboxController('order-basic')
  const response = await sandbox.endpointApi.httpCall('/unknown-endpoint', {
    source: 'unit-test',
  })

  expect(response.status).toBe(200)
  expect(JSON.parse(response.body)).toEqual({
    ok: true,
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

test('returns controlled response when http middleware fails', async () => {
  const sandbox = createOrderSandboxController('order-basic', {
    httpMiddlewares: [
      () => {
        throw new Error('boom')
      },
    ],
  })
  const response = await sandbox.endpointApi.httpCall('/returns')

  expect(response.status).toBe(500)
  expect(JSON.parse(response.body)).toMatchObject({
    error: 'boom',
    ok: false,
  })
  expect(sandbox.state.host.http.at(-1)?.response.status).toBe(500)
})

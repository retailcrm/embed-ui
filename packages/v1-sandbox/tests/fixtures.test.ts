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

  const snapshot = sandbox.snapshot()

  sandbox.setField('order/card', 'customer.firstName', 'Changed')
  sandbox.setLocation({ pathname: '/changed' })

  expect(sandbox.state.contexts['order/card']['customer.firstName']).toBe('Changed')
  expect(sandbox.state.host.location.pathname).toBe('/changed')

  sandbox.reset(snapshot)

  expect(sandbox.state.contexts['order/card']['customer.firstName']).toBe('Игорь')
  expect(sandbox.state.host.location.pathname).toBe('/orders/215/edit')
})

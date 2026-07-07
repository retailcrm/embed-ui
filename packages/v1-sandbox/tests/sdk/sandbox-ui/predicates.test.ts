import { expect, test } from 'vitest'

import { isContextName, isRecord, isWorkerReadyMessage } from '@/app/predicates'

test('checks known context names', () => {
  const contexts = {
    'order/card': {},
    'user/current': {},
  }

  expect(isContextName(contexts, 'order/card')).toBe(true)
  expect(isContextName(contexts, 'customer/card')).toBe(false)
})

test('checks record-like values', () => {
  expect(isRecord({ ok: true })).toBe(true)
  expect(isRecord(null)).toBe(false)
  expect(isRecord([])).toBe(false)
  expect(isRecord('value')).toBe(false)
})

test('checks worker ready message shape', () => {
  expect(isWorkerReadyMessage({
    type: 'sandbox:worker-ready',
  })).toBe(true)
  expect(isWorkerReadyMessage({
    type: 1,
  })).toBe(false)
  expect(isWorkerReadyMessage(null)).toBe(false)
})

import { expect, test } from 'vitest'

import { areJsonValuesEqual, isContextJsonEqual } from '@/app/contextJson'

test('compares JSON objects independently of key order and formatting', () => {
  const contexts = {
    'order/card': {
      id: 215,
      number: '215C',
    },
    settings: {
      'system.locale': 'ru-RU',
    },
  }

  expect(isContextJsonEqual(`{
    "settings": { "system.locale": "ru-RU" },
    "order/card": { "number": "215C", "id": 215 }
  }`, contexts)).toBe(true)
})

test('keeps array order significant and treats invalid JSON as changed', () => {
  expect(areJsonValuesEqual(
    { items: ['first', 'second'] },
    { items: ['second', 'first'] }
  )).toBe(false)
  expect(isContextJsonEqual('{', {})).toBe(false)
})

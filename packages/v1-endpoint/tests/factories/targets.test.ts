import { expect, test } from 'vitest'

import { defineTarget } from '../../src/common/targets'

test('defineTarget returns typed target shape', () => {
  const target = defineTarget('order/card:common.before', ['order/card', 'user/current', 'settings'] as const)

  expect(target.id).toBe('order/card:common.before')
  expect(target.contexts).toEqual(['order/card', 'user/current', 'settings'])
  expect(target.customContexts).toEqual([])
  expect(target.actions).toEqual([])
})

test('defineTarget accepts target config shape', () => {
  const target = defineTarget('order/card:common.before', {
    contexts: ['order/card', 'order/card:settings', 'user/current', 'settings'] as const,
    customContexts: ['order'] as const,
    actions: ['order/card'] as const,
  })

  expect(target.id).toBe('order/card:common.before')
  expect(target.contexts).toEqual(['order/card', 'order/card:settings', 'user/current', 'settings'])
  expect(target.customContexts).toEqual(['order'])
  expect(target.actions).toEqual(['order/card'])
})

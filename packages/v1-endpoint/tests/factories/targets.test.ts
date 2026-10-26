import { expect, test } from 'vitest'

import { defineTarget, targets } from '../../src/common/targets'

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

test.each([
  'ticket/view:header.after',
  'ticket/view:common.before',
  'ticket/view:customer.after',
  'ticket/view:issues.after',
] as const)('provides the ticket viewer contract at %s', (id) => {
  expect(targets[id]).toEqual({
    id,
    contexts: ['ticket/view', 'ticket/view:settings', 'user/current', 'settings'],
    customContexts: [],
    actions: ['ticket/view'],
  })
})

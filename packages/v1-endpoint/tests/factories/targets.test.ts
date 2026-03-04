import { expect, test } from 'vitest'

import { defineTarget } from '../../src/common/targets'

test('defineTarget returns typed target shape', () => {
  const target = defineTarget('order/card:common.before', ['order/card', 'user/current', 'settings'] as const)

  expect(target.id).toBe('order/card:common.before')
  expect(target.contexts).toEqual(['order/card', 'user/current', 'settings'])
})

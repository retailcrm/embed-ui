import type { ContextSchema } from '@retailcrm/embed-ui-v1-types/context'

import {
  actions as orderActions,
  schema as orderSchema,
} from '@/common/order/card'

import { schema as orderSettingsSchema } from '@/common/order/card-settings'
import { schema as customerSchema } from '@/common/customer/card'
import { schema as customerPhoneSchema } from '@/common/customer/card-phone'
import { schema as userSchema } from '@/common/user/current'

import {
  describe,
  expect,
  test,
} from 'vitest'

type FieldDescriptor = {
  accepts: (value: unknown) => boolean;
  defaults: () => unknown;
}

const schemaContracts: [string, ContextSchema][] = [
  ['customer', customerSchema],
  ['customer phone', customerPhoneSchema],
  ['user', userSchema],
  ['order settings', orderSettingsSchema],
  ['order', orderSchema],
]

describe('context schema contracts', () => {
  test.each(schemaContracts)('keeps %s schema defaults compatible with accepts predicates', (_name, schema) => {
    Object.values(schema).forEach((field) => {
      const descriptor = field as unknown as FieldDescriptor
      const defaults = descriptor.defaults()

      expect(typeof descriptor.accepts(defaults)).toBe('boolean')
      expect(typeof descriptor.accepts(undefined)).toBe('boolean')

      if (Array.isArray(defaults)) {
        expect(typeof descriptor.accepts([...defaults])).toBe('boolean')
      }
    })
  })

  test('keeps order action argument and result predicates executable', () => {
    expect(orderActions.createItem.accepts([{ productId: 1, offerId: 2 }])).toBe(true)
    expect(orderActions.createItem.expects(10)).toBe(true)

    expect(orderActions.changeItemPrice.accepts([0, 10])).toBe(true)
    expect(orderActions.changeItemPrice.expects(undefined)).toBe(true)

    expect(orderActions.changeItemPriceType.accepts([0, null])).toBe(true)
    expect(orderActions.changeItemPriceType.expects(undefined)).toBe(true)

    expect(orderActions.changeItemDiscount.accepts([0, { amount: 10 }])).toBe(true)
    expect(orderActions.changeItemDiscount.accepts([0, { percent: 15 }])).toBe(true)
    expect(orderActions.changeItemDiscount.expects(undefined)).toBe(true)

    expect(orderActions.changeItemQuantity.accepts([0, 2])).toBe(true)
    expect(orderActions.changeItemQuantity.expects(undefined)).toBe(true)

    expect(orderActions.changeItemStatus.accepts([0, 'new'])).toBe(true)
    expect(orderActions.changeItemStatus.expects(undefined)).toBe(true)

    expect(orderActions.removeItem.accepts([0])).toBe(true)
    expect(orderActions.removeItem.expects(undefined)).toBe(true)
  })
})

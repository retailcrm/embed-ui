import type { Schema } from '~types/context/order/card'

import { defineContext } from '@/context/store'

import {
  isNull,
  isString,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'customer.email': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.phone': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'delivery.address': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
}

export const useContext = defineContext('order/card', schema)

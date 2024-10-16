import type { Schema } from '~types/context/customer/card-phone'

import { defineContext } from '@/context/store'

import {
  isNumber,
  isString,
} from '@/predicates'

export const schema: Schema = {
  value: {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  index: {
    accepts: isNumber,
    defaults: () => 0,
    readonly: true,
  },
}

export const useContext = defineContext('customer/card:phone', schema)

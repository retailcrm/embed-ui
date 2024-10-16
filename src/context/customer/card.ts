import type { Schema } from '~types/context/customer/card'

import { defineContext } from '@/context/store'

import {
  isNull,
  isNumber,
  isString,
  arrayOf,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'externalId': {
    accepts: isString,
    defaults: () => null,
    readonly: true,
  },
  'email': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'phones': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
}

export const useContext = defineContext('customer/card', schema)

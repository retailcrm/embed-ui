import type { Schema } from '~types/context/user/current'

import { defineContext } from '@/context/store'

import {
  arrayOf,
  isNull,
  isString,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'email': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'firstName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'lastName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'patronymic': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'groupCodes': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
}

export const useContext = defineContext('user/current', schema)

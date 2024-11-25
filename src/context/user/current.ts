import type { Schema } from '~types/context/user/current'

import { defineContext } from '@/context/store'

import {
  isNull,
  isNumber,
  isString,
  arrayOf,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'lastName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'firstName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'patronymic': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'email': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'permissions': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
}

export const useContext = defineContext('user/current', schema)

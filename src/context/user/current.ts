import type { Schema } from '~types/context/user/current'

import { defineContext } from '@/context/store'

import {
  arrayOf,
  isNull,
  isNumber,
  isString,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'email': {
    accepts: isString,
    defaults: () => '',
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
  'permissions': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
}

export const useContext = defineContext('user/current', schema)

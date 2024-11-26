import type {
  Locale,
  Schema,
} from '~types/context/settings'

import { defineContext } from './store'

import {
  isExactly,
  oneOf,
} from '@/predicates'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]
export const schema: Schema = {
  'system.locale': {
    accepts: oneOf(...locales.map(isExactly)),
    defaults: () => 'en-GB',
    readonly: true,
  },
}

export const useContext = defineContext('settings', schema)

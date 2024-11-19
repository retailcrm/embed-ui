import type {
  Locale,
  Schema,
} from '~types/context/settings'

import { defineContext } from './store'

import {
  withMeta,
} from '@/predicates'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]

export const isLocale = withMeta(
  (value: unknown): value is Locale => locales.includes(value as Locale),
  locales.map(l => `'${l}'`).join(' | ')
)

export const schema: Schema = {
  'system.locale': {
    accepts: isLocale,
    defaults: () => 'en-GB',
    readonly: true,
  },
}

export const useContext = defineContext('settings', schema)

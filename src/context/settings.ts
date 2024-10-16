import type {
  Locale,
  Schema,
} from '~types/context/settings'

import { defineContext } from './store'

import {
  isString,
  withMeta,
} from '@/predicates'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]

export const isLocale = withMeta(
  (value: unknown): value is Locale => locales.includes(value as Locale),
  locales.map(l => `'${l}'`).join(' | ')
)

export const schema: Schema = {
  'order.templates.number.api': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'order.templates.number.crm': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'system.locale': {
    accepts: isLocale,
    defaults: () => 'en-GB',
    readonly: true,
  },
}

export const useContext = defineContext('settings', schema)

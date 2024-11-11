import type { ReadonlyField } from './schema'

export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'

export type Schema = {
  'order.templates.number.api': ReadonlyField<string>;
  'order.templates.number.crm': ReadonlyField<string>;
  'system.locale': ReadonlyField<Locale>;
}

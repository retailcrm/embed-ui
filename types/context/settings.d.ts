import type { ReadonlyField } from './schema'

export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'
export type Schema = {
  'system.locale': ReadonlyField<Locale>;
}

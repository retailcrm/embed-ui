import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'
export type Schema = {
  'system.locale': ReadonlyField<Locale>;
}

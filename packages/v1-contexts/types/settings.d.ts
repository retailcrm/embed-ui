import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'
import type { RoutingData } from '@omnicajs/symfony-router'

export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'
export type Schema = {
  'image.workers': ReadonlyField<string[]>;
  'system.locale': ReadonlyField<Locale>;
  'system.routing': ReadonlyField<RoutingData>;
}

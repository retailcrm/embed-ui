import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type {
  Locale,
  Schema,
} from '~types/settings'

import {
  isExactly,
  oneOf,
} from '@/predicates'

export const id = 'settings'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]

export const schema: Schema = {
  'system.locale': {
    accepts: oneOf(...locales.map(isExactly)),
    defaults: () => 'en-GB',
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'system.locale': {
    description: {
      'en-GB': 'Current system\'s locale',
      'es-ES': 'Configuración regional actual del sistema',
      'ru-RU': 'Текущая локаль системы',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/settings\'',
  call: 'const settings = useContext()',
}

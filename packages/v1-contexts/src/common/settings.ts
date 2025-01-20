import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type {
  Locale,
  Schema,
} from '~types/settings'

import {
  arrayOf,
  isString,
  isExactly,
  oneOf,
} from '@/predicates'

export const id = 'settings'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]

export const schema: Schema = {
  'image.workers': {
    accepts: arrayOf(isString),
    defaults: () => [],
    readonly: true,
  },
  'system.locale': {
    accepts: oneOf(...locales.map(isExactly)),
    defaults: () => 'en-GB',
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'image.workers': {
    description: {
      'en-GB': 'A list of servers that process images.',
      'es-ES': 'Una lista de servidores que procesan imágenes.',
      'ru-RU': 'Список серверов, обрабатывающих изображения.',
    },
  },
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

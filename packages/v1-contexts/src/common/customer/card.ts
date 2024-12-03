import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/customer/card'

import {
  isNull,
  isNumber,
  isString,
  arrayOf,
  oneOf,
} from '@/predicates'

export const id = 'customer/card'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'externalId': {
    accepts: isString,
    defaults: () => null,
    readonly: true,
  },
  'email': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'phones': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'id': {
    description: {
      'en-GB': 'Customer ID',
      'es-ES': 'ID del cliente',
      'ru-RU': 'ID клиента',
    },
  },
  'externalId': {
    description: {
      'en-GB': 'Customer external ID',
      'es-ES': 'ID externo del cliente',
      'ru-RU': 'Внешний ID клиента',
    },
  },
  'email': {
    description: {
      'en-GB': 'Customer email',
      'es-ES': 'Correo electrónico del cliente',
      'ru-RU': 'Email клиента',
    },
  },
  'phones': {
    description: {
      'en-GB': 'Customer phone list',
      'es-ES': 'Lista de teléfonos del cliente',
      'ru-RU': 'Список телефонов клиента',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/customer/card\'',
  call: 'const customer = useContext()',
}

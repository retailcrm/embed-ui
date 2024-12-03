import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/customer/card-phone'

import {
  isNumber,
  isString,
} from '@/predicates'

export const id = 'customer/card:phone'

export const schema: Schema = {
  value: {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  index: {
    accepts: isNumber,
    defaults: () => 0,
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'value': {
    description: {
      'en-GB': 'Customer phone',
      'es-ES': 'Teléfono del cliente',
      'ru-RU': 'Телефон клиента',
    },
  },
  'index': {
    description: {
      'en-GB': 'Serial number of the phone in the list',
      'es-ES': 'Número de serie del teléfono en la lista',
      'ru-RU': 'Порядковый номер телефона в списке',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/customer/card-phone\'',
  call: 'const phone = useContext()',
}

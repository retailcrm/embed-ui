import type { ContextSchemaDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { ContextSchemaUsage } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { Schema } from '~types/order/mg-settings'

import {
  arrayOf,
  isBoolean,
  isNull,
  isString,
  oneOf,
} from '@/predicates'

import { isStatus } from '@/predicates/order/common'

export const id = 'order/mg:settings'

export const schema: Schema = {
  'defaultUnit': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'duplicatesAllowed': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'quantityIsFractional': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'priceEditable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'availableStatuses': {
    accepts: arrayOf(isStatus),
    defaults: () => [],
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'defaultUnit': {
    description: {
      'en-GB': 'Default quantity unit of measurement',
      'es-ES': 'Unidad de medida de cantidad predeterminada',
      'ru-RU': 'Единица измерения количества по-умолчанию',
    },
  },
  'duplicatesAllowed': {
    description: {
      'en-GB': 'Possibility of adding the same SKUs to the order as different items',
      'es-ES': 'La posibilidad de añadir las mismas variantes como diferentes productos al pedido',
      'ru-RU': 'Возможность добавлять в заказ одинаковые торговые предложения как разные позиции',
    },
  },
  'quantityIsFractional': {
    description: {
      'en-GB': 'Integer or fractional quantity of items',
      'es-ES': 'Cantidad entera o fraccionada de productos',
      'ru-RU': 'Целое или дробное количество товара',
    },
  },
  'priceEditable': {
    description: {
      'en-GB': 'Ability to edit item prices',
      'es-ES': 'Capacidad de editar precios de artículos',
      'ru-RU': 'Возможность редактировать цену товарных позиций',
    },
  },
  'availableStatuses': {
    description: {
      'en-GB': 'List of available order item statuses',
      'es-ES': 'Lista de estados disponibles de los artículos del pedido',
      'ru-RU': 'Доступные статусы товарных позиций заказа',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/mg-settings\'',
  call: 'const orderSettings = useContext()',
}

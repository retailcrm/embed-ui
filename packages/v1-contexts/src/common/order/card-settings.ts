import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/order/card-settings'

import {
  arrayOf,
  isBoolean,
  isNull,
  isString,
  oneOf,
} from '@/predicates'

export const id = 'order/card:settings'

export const schema: Schema = {
  'changePriceTypeByPriority': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'changePriceTypeIfUnavailable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
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
  'productsRemoveAllowed': {
    accepts: isBoolean,
    defaults: () => true,
    readonly: true,
  },
  'productsMarkingEnabled': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'propertiesToShow.additional': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
  'propertiesToShow.base': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
  'purchasePriceEditable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'purchasePriceVisible': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'reserveDeliveryNoteEditable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'reserveInvoiceEditable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'reserveShipmentDateEditable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'reserveTelephonyEnabled': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'showArticle': {
    accepts: isBoolean,
    defaults: () => true,
    readonly: true,
  },
  'showPriceTypes': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'useStores': {
    accepts: isBoolean,
    defaults: () => true,
    readonly: true,
  },
  'useReserve': {
    accepts: isBoolean,
    defaults: () => true,
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'changePriceTypeByPriority': {
    description: {
      'en-GB': 'Change price type for the order item when item quantity is changed',
      'es-ES': 'Cambiar el tipo de precio para el producto del pedido cuando se cambia la cantidad del producto',
      'ru-RU': 'Изменять тип цены для товара в заказе, при изменении количества товара',
    },
  },
  'changePriceTypeIfUnavailable': {
    description: {
      'en-GB': 'Change the price type for the product/service in the order, if the current type is not available',
      'es-ES': 'Cambie el tipo de precio para el producto/servicio en el pedido, si el tipo actual no está disponible',
      'ru-RU': 'Изменять тип цены для товара в заказе, при изменении количества товара',
    },
  },
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
  'productsRemoveAllowed': {
    description: {
      'en-GB': 'Ability to delete items from the order',
      'es-ES': 'Posibilidad de eliminar artículos del pedido',
      'ru-RU': 'Возможность удалять товарные позиции из заказа',
    },
  },
  'productsMarkingEnabled': {
    description: {
      'en-GB': 'Possibility of working with marked products',
      'es-ES': 'Posibilidad de trabajar con productos marcados',
      'ru-RU': 'Возможность работы с маркированными товарами',
    },
  },
  'propertiesToShow.additional': {
    description: {
      'en-GB': 'Additional product fields displayed in the product list',
      'es-ES': 'Campos adicionales de productos que se muestran en la lista de productos',
      'ru-RU': 'Дополнительные поля товаров, выводимые в списке товарных позиций',
    },
  },
  'propertiesToShow.base': {
    description: {
      'en-GB': 'Basic product fields displayed in the product list',
      'es-ES': 'Campos básicos de productos que se muestran en la lista de productos',
      'ru-RU': 'Базовые поля товаров, выводимые в списке товарных позиций',
    },
  },
  'purchasePriceEditable': {
    description: {
      'en-GB': 'Ability to edit purchase prices in the product list',
      'es-ES': 'Capacidad de editar precios de compra en la lista de productos',
      'ru-RU': 'Возможность редактирования закупочных цен в списке товарных позиций',
    },
  },
  'purchasePriceVisible': {
    description: {
      'en-GB': 'Display purchase prices in the product list',
      'es-ES': 'Mostrar precios de compra en la lista de productos',
      'ru-RU': 'Отображать закупочные цены в списке товарных позиций',
    },
  },
  'reserveDeliveryNoteEditable': {
    description: {
      'en-GB': 'Ability to edit delivery note number when reserving products',
      'es-ES': 'Posibilidad de editar el número de albarán al reservar productos',
      'ru-RU': 'Возможность редактирования номера накладной при бронировании товаров',
    },
  },
  'reserveInvoiceEditable': {
    description: {
      'en-GB': 'Ability to edit invoice number when reserving products',
      'es-ES': 'Posibilidad de editar el número de factura al reservar productos',
      'ru-RU': 'Возможность редактирования номера счет-фактуры при бронировании товара',
    },
  },
  'reserveShipmentDateEditable': {
    description: {
      'en-GB': 'Ability to edit shipment date when reserving products',
      'es-ES': 'Posibilidad de editar la fecha de envío al reservar productos',
      'ru-RU': 'Возможность редактирования даты отгрузки при бронировании товара',
    },
  },
  'reserveTelephonyEnabled': {
    description: {
      'en-GB': 'Telephony availability when reserving products',
      'es-ES': 'Disponibilidad de telefonía al reservar productos',
      'ru-RU': 'Доступность телефонии при бронировании товара',
    },
  },
  'showArticle': {
    description: {
      'en-GB': 'Display SKU',
      'es-ES': 'Mostrar SKU',
      'ru-RU': 'Отображать артикул',
    },
  },
  'showPriceTypes': {
    description: {
      'en-GB': 'Work with price types',
      'es-ES': 'Trabajo con tipos de precios',
      'ru-RU': 'Работа с типами цен',
    },
  },
  'useStores': {
    description: {
      'en-GB': 'Work with warehouses',
      'es-ES': 'Trabajo con almacenes',
      'ru-RU': 'Работа со складами',
    },
  },
  'useReserve': {
    description: {
      'en-GB': 'Work with reservations',
      'es-ES': 'Trabajo con reservas',
      'ru-RU': 'Работа с бронированием',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/card-settings\'',
  call: 'const orderSettings = useContext()',
}
import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'
import type { ContextSchemaDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { ContextSchemaUsage } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { KnownTypes } from '~generated/order/mg'
import type { MethodList } from '~types/order/mg'
import type { ObjectDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { Schema } from '~types/order/mg'

import {
  arrayOf,
  cortegeOf,
  isExactly,
  isNull,
  isNumber,
  isShape,
  isString,
  isVoid,
  oneOf,
} from '@/predicates'

import {
  isOffer,
  isPriceType,
  isProduct,
  isProductGroup,
  isProperty,
  isStatus,
} from '@/predicates/order/common'

import {
  isBonuses,
  isCreateOrderItemInput,
  isDiscount,
  isItem,
  isPrice,
} from '@/predicates/order/mg'

export const id = 'order/mg'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'externalId': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'type': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'site': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'number': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'country': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'currency': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'customer.id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.type': {
    accepts: oneOf(
      isExactly('customer'),
      isExactly('customer_corporate')
    ),
    defaults: () => 'customer',
    readonly: true,
  },
  'items': {
    accepts: arrayOf(isItem),
    defaults: () => [],
    readonly: true,
  },
  'discount.amount': {
    accepts: isNumber,
    defaults: () => 0,
    readonly: false,
  },
  'discount.percent': {
    accepts: isNumber,
    defaults: () => 0,
    readonly: false,
  },
  'discount.total': {
    accepts: isNumber,
    defaults: () => 0,
    readonly: true,
  },
  'status': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> =  {
  'id': {
    description: {
      'en-GB': 'Order ID in CRM',
      'es-ES': 'ID del pedido en CRM',
      'ru-RU': 'Идентификатор заказа в CRM',
    },
  },
  'externalId': {
    description: {
      'en-GB': 'The order ID in the external source system',
      'es-ES': 'El ID del pedido en el sistema de origen externo',
      'ru-RU': 'Идентифкатор заказа во внешней системе источника',
    },
  },
  'type': {
    description: {
      'en-GB': 'Order type code',
      'es-ES': 'Código del tipo de pedido',
      'ru-RU': 'Код типа заказа',
    },
  },
  'site': {
    description: {
      'en-GB': 'Store code associated with the order',
      'es-ES': 'Código de la tienda asociado al pedido',
      'ru-RU': 'Код магазина, к которому относится заказ',
    },
  },
  'number': {
    description: {
      'en-GB': 'Displayed order number',
      'es-ES': 'Número de pedido mostrado',
      'ru-RU': 'Отображаемый номер заказа',
    },
  },
  'country': {
    description: {
      'en-GB': 'Character code of the country',
      'es-ES': 'Código de caracteres del país',
      'ru-RU': 'Символьный код страны',
    },
  },
  'currency': {
    description: {
      'en-GB': 'Currency code',
      'es-ES': 'Código de moneda',
      'ru-RU': 'Символьный код валюты',
    },
  },
  'customer.id': {
    description: {
      'en-GB': 'Client ID in CRM',
      'es-ES': 'ID del cliente en CRM',
      'ru-RU': 'Идентификатор клиента в CRM',
    },
  },
  'customer.type': {
    description: {
      'en-GB': 'Client type',
      'es-ES': 'Tipo de cliente',
      'ru-RU': 'Тип клиента',
    },
  },
  'items': {
    description: {
      'en-GB': 'List of items in the order',
      'es-ES': 'Lista de artículos en el pedido',
      'ru-RU': 'Список товарных позиций заказа',
    },
  },
  'discount.amount': {
    description: {
      'en-GB': 'One-time discount amount in order currency',
      'es-ES': 'Importe del descuento único en la moneda del pedido',
      'ru-RU': 'Размер одноразовой скидки в валюте заказа',
    },
  },
  'discount.percent': {
    description: {
      'en-GB': 'One-time discount percentage',
      'es-ES': 'Porcentaje de descuento único',
      'ru-RU': 'Процент одноразовой скидки',
    },
  },
  'discount.total': {
    description: {
      'en-GB': 'Total order discount',
      'es-ES': 'Descuento total del pedido',
      'ru-RU': 'Общая скидка по заказу',
    },
  },
  'status': {
    description: {
      'en-GB': 'Order status',
      'es-ES': 'Estado del pedido',
      'ru-RU': 'Статус заказа',
    },
  },
}

export const actions: ActionSchema<MethodList> = {
  'createItem': {
    accepts: cortegeOf([isCreateOrderItemInput], ['input']),
    expects: isNumber,
  },
  'changeItemPrice': {
    accepts: cortegeOf(
      [isItem, oneOf(isNumber, isPrice)],
      ['item', 'price']
    ),
    expects: isVoid,
  },
  'changeItemDiscount': {
    accepts: cortegeOf(
      [isItem, isShape({
        amount: [isNumber, true],
        percent: [isNumber, true],
      })],
      ['item', 'discount']
    ),
    expects: isVoid,
  },
  'changeItemQuantity': {
    accepts: cortegeOf(
      [isItem, isNumber],
      ['item', 'quantity']
    ),
    expects: isVoid,
  },
  'changeItemStatus': {
    accepts: cortegeOf(
      [isItem, isString],
      ['item', 'code']
    ),
    expects: isVoid,
  },
  'removeItem': {
    accepts: cortegeOf([isItem], ['item']),
    expects: isVoid,
  },
}

export const actionsDescription: ObjectDescription<ActionSchema<MethodList>> = {
  'createItem': {
    'en-GB': 'Creates and adds a new item to the order',
    'es-ES': 'Crea y agrega un nuevo artículo al pedido',
    'ru-RU': 'Создает и добавляет новую товарную позицию в заказ',
  },
  'changeItemPrice': {
    'en-GB': 'Changes the price value of an item',
    'es-ES': 'Cambia el valor del precio de un artículo',
    'ru-RU': 'Изменяет значение цены и её типа товарной позиции. Изменяет цену, если новый тип цены не пуст',
  },
  'changeItemDiscount': {
    'en-GB': 'Changes the discount value of an item',
    'es-ES': 'Cambia el valor del descuento de un artículo',
    'ru-RU': 'Изменяет значение скидки товарной позиции',
  },
  'changeItemQuantity': {
    'en-GB': 'Changes the quantity of an item',
    'es-ES': 'Cambia la cantidad de un artículo',
    'ru-RU': 'Изменяет количество товарной позиции',
  },
  'changeItemStatus': {
    'en-GB': 'Changes the status of an item by specified identifier',
    'es-ES': 'Cambia el estado de un artículo por identificador especificado',
    'ru-RU': 'Изменяет статус товарной позиции по указанному коду',
  },
  'removeItem': {
    'en-GB': 'Removes an item from the order',
    'es-ES': 'Elimina un artículo del pedido',
    'ru-RU': 'Удаляет товарную позицию из заказа',
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/mg\'',
  call: 'const order = useContext()',
}

export const types: {
   [K in keyof KnownTypes]: { [F in keyof KnownTypes[K]]: string; }
} = {
  'CreateMgOrderItemInput': isCreateOrderItemInput.fields,
  'MgOrderItem': isItem.fields,
  'Product': isProduct.fields,
  'ProductGroup': isProductGroup.fields,
  'Offer': isOffer.fields,
  'Property': isProperty.fields,
  'Price': isPrice.fields,
  'PriceType': isPriceType.fields,
  'MgDiscount': isDiscount.fields,
  'Bonuses': isBonuses.fields,
  'OrderItemStatus': isStatus.fields,
}

export const typesDescription: {
  [K in keyof KnownTypes]: ObjectDescription<KnownTypes[K]>
} = {
  'CreateMgOrderItemInput': {
    'productId': {
      'en-GB': 'Product or service ID',
      'es-ES': 'ID del producto o servicio',
      'ru-RU': 'Идентификатор товара или услуги',
    },
    'offerId': {
      'en-GB': 'Trade offer ID',
      'es-ES': 'ID de la oferta comercial',
      'ru-RU': 'Идентификатор торгового предложения',
    },
    'priceAmount': {
      'en-GB': 'Price value in order currency',
      'es-ES': 'Valor del precio en la moneda del pedido',
      'ru-RU': 'Значение цены в валюте заказа',
    },
    'priceTypeCode': {
      'en-GB': 'Character price type code',
      'es-ES': 'Código de tipo de precio de caracteres',
      'ru-RU': 'Символьный код типа цены',
    },
    'quantity': {
      'en-GB': 'Item quantity',
      'es-ES': 'Cantidad del artículo',
      'ru-RU': 'Количество товарной позиции',
    },
  },
  'MgOrderItem': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'index': {
      'en-GB': 'Temporary ID while editing order',
      'es-ES': 'ID temporal durante la edición del pedido',
      'ru-RU': 'Порядковый номер товара в заказе',
    },
    'type': {
      'en-GB': 'Item type - product or service',
      'es-ES': 'Tipo de artículo - producto o servicio',
      'ru-RU': 'Тип товарной позиции - товар или услуга',
    },
    'product': {
      'en-GB': 'Selected product or service',
      'es-ES': 'Producto o servicio seleccionado',
      'ru-RU': 'Выбранный товар или услуга',
    },
    'offer': {
      'en-GB': 'Trade offer for selected product or service',
      'es-ES': 'Oferta comercial para el producto o servicio seleccionado',
      'ru-RU': 'Торговое предложение для выбранного товара или услуги',
    },
    'price': {
      'en-GB': 'Product price and currency',
      'es-ES': 'Precio del producto y moneda',
      'ru-RU': 'Цена товара и валюта',
    },
    'quantity': {
      'en-GB': 'Item quantity',
      'es-ES': 'Cantidad del artículo',
      'ru-RU': 'Количество товарной позиции',
    },
    'discount': {
      'en-GB': 'Final monetary discount including all product and order discounts (in the object currency)',
      'es-ES': 'Descuento monetario final incluyendo todos los descuentos del producto y del pedido (en la moneda del objeto)',
      'ru-RU': 'Итоговая денежная скидка c учетом всех скидок на товар и заказ (в валюте объекта)',
    },
    'bonuses': {
      'en-GB': 'Number of redeemed and accrued bonuses',
      'es-ES': 'Cantidad de bonos canjeados y acumulados',
      'ru-RU': 'Количество списанных и начисленных бонусов',
    },
    'total': {
      'en-GB': 'Total item cost including discounts',
      'es-ES': 'Coste total del artículo con descuentos',
      'ru-RU': 'Общая стоимость товарной позиции с учетом скидок',
    },
    'totalPerUnit': {
      'en-GB': 'Final unit price of the product',
      'es-ES': 'Precio final por unidad del producto',
      'ru-RU': 'Итоговая стоимость единицы товара',
    },
    'status': {
      'en-GB': 'Status',
      'es-ES': 'Estado',
      'ru-RU': 'Статус',
    },
  },
  'Product': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'type': {
      'en-GB': 'Type - product or service',
      'es-ES': 'Tipo - producto o servicio',
      'ru-RU': 'Тип - товар или услуга',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
    'image': {
      'en-GB': 'Image URL',
      'es-ES': 'URL de la imagen',
      'ru-RU': 'URL изображения',
    },
    'article': {
      'en-GB': 'Article',
      'es-ES': 'Artículo',
      'ru-RU': 'Артикул',
    },
    'manufacturer': {
      'en-GB': 'Manufacturer name',
      'es-ES': 'Nombre del fabricante',
      'ru-RU': 'Наименование производителя',
    },
    'markable': {
      'en-GB': 'Marking requirement',
      'es-ES': 'Requisito de marcado',
      'ru-RU': 'Необходимость маркировки',
    },
    'groups': {
      'en-GB': 'Groups this product or service belongs to',
      'es-ES': 'Grupos a los que pertenece este producto o servicio',
      'ru-RU': 'Группы, в которые входит данный товар или услуга',
    },
    'unit': {
      'en-GB': 'Unit of quantity measurement, if not specified (null), will be set to "pcs."',
      'es-ES': 'Unidad de medida de cantidad, si no se especifica (null), se establecerá en "pcs."',
      'ru-RU': 'Единица измерения количества, если не указана (null), будет указано "шт."',
    },
    'url': {
      'en-GB': 'Link to product/service page in store',
      'es-ES': 'Enlace a la página del producto/servicio en la tienda',
      'ru-RU': 'Ссылка на страницу товара/услуги в магазине',
    },
  },
  'ProductGroup': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
  },
  'Offer': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
    'image': {
      'en-GB': 'Image URL',
      'es-ES': 'URL de la imagen',
      'ru-RU': 'URL изображения',
    },
    'dimensions': {
      'en-GB': 'Product dimensions L - length, W - width, H - height',
      'es-ES': 'Dimensiones del producto L - longitud, W - ancho, H - altura',
      'ru-RU': 'Размеры товара L - длина, W - ширина, H - высота',
    },
    'weight': {
      'en-GB': 'Weight',
      'es-ES': 'Peso',
      'ru-RU': 'Вес',
    },
    'article': {
      'en-GB': 'Article',
      'es-ES': 'Artículo',
      'ru-RU': 'Артикул',
    },
    'barcode': {
      'en-GB': 'Barcode',
      'es-ES': 'Código de barras',
      'ru-RU': 'Штрих-код',
    },
    'properties': {
      'en-GB': 'Array of custom properties',
      'es-ES': 'Matriz de propiedades personalizadas',
      'ru-RU': 'Массив пользовательских свойств',
    },
    'unit': {
      'en-GB': 'Unit of quantity measurement, if not specified (null), will be set to "pcs."',
      'es-ES': 'Unidad de medida de cantidad, si no se especifica (null), se establecerá en "pcs."',
      'ru-RU': 'Единица измерения количества, если не указана (null), будет указано "шт."',
    },
    'purchasePrice': {
      'en-GB': 'Purchase price, value + currency',
      'es-ES': 'Precio de compra, valor + moneda',
      'ru-RU': 'Закупочная цена, значение + валюта',
    },
  },
  'Property': {
    'code': {
      'en-GB': 'Character code',
      'es-ES': 'Código de caracteres',
      'ru-RU': 'Символьный код',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
    'value': {
      'en-GB': 'Value',
      'es-ES': 'Valor',
      'ru-RU': 'Значение',
    },
  },
  'Price': {
    'type': {
      'en-GB': 'Price type',
      'es-ES': 'Tipo de precio',
      'ru-RU': 'Тип цены',
    },
    'value': {
      'en-GB': 'Product price',
      'es-ES': 'Precio del producto',
      'ru-RU': 'Цена товара',
    },
  },
  'PriceType': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'code': {
      'en-GB': 'Character code',
      'es-ES': 'Código de caracteres',
      'ru-RU': 'Символьный код',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
    'title': {
      'en-GB': 'Title',
      'es-ES': 'Título',
      'ru-RU': 'Заголовок',
    },
    'default': {
      'en-GB': 'Whether this type is the default price type',
      'es-ES': 'Si este tipo es el tipo de precio predeterminado',
      'ru-RU': 'Является ли тип типом цены по-умолчанию',
    },
    'currency': {
      'en-GB': 'Currency code (USD/EUR/...)',
      'es-ES': 'Código de moneda (USD/EUR/...)',
      'ru-RU': 'Символьный код валюты (USD/EUR/...)',
    },
  },
  'MgDiscount': {
    'amount': {
      'en-GB': 'Discount amount',
      'es-ES': 'Importe del descuento',
      'ru-RU': 'Размер скидки',
    },
    'percent': {
      'en-GB': 'Discount percentage',
      'es-ES': 'Porcentaje de descuento',
      'ru-RU': 'Процент скидки',
    },
    'share': {
      'en-GB': 'Discount share',
      'es-ES': 'Participación en el descuento',
      'ru-RU': 'Доля скидки',
    },
    'total': {
      'en-GB': 'Share of the discount in the total final order discount',
      'es-ES': 'Participación del descuento en el importe total del descuento final del pedido',
      'ru-RU': 'Доля скидки в общем размере итоговой скидки по заказу',
    },
  },
  'Bonuses': {
    'charge': {
      'en-GB': 'Amount of charged bonuses',
      'es-ES': 'Cantidad de bonos cargados',
      'ru-RU': 'Количество списанных бонусов',
    },
    'credit': {
      'en-GB': 'Amount of credited bonuses',
      'es-ES': 'Cantidad de bonos acreditados',
      'ru-RU': 'Количество начисленных бонусов',
    },
  },
  'OrderItemStatus': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'code': {
      'en-GB': 'Character code',
      'es-ES': 'Código de caracteres',
      'ru-RU': 'Символьный код',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Наименование',
    },
    'isCancel': {
      'en-GB': 'Whether the status cancels the item',
      'es-ES': 'Si el estado cancela el artículo',
      'ru-RU': 'Отменяет ли статус товарную позицию',
    },
  },
}

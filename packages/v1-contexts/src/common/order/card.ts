import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'

import type {
  ObjectDescription,
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { KnownTypes } from '~generated/order/card.d.ts'
import type { MethodList } from '~types/order/card'
import type { Schema } from '~types/order/card'

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
  isCreateOrderItemInput,
  isDiscount,
  isItem,
  isOffer,
  isPriceType,
  isProduct,
  isProductGroup,
  isProperty,
  isStatus,
} from '@/predicates/order/card'

export const id = 'order/card'

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
    accepts: oneOf(isString, isNull),
    defaults: () => null,
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
  'customer.type': {
    accepts: oneOf(
      isExactly('customer'),
      isExactly('customer_corporate')
    ),
    defaults: () => 'customer',
    readonly: true,
  },
  'customer.lastName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.firstName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.patronymic': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.phone': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.email': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.contragentType': {
    accepts: oneOf(
      isExactly('enterpreneur'),
      isExactly('legal-entity'),
      isExactly('individual')
    ),
    defaults: () => 'legal-entity',
    readonly: true,
  },
  'company.certificateNumber': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.certificateDate': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.OGRN': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.OGRNIP': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.name': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.legalName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.legalAddress': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.INN': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.KPP': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.OKPO': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.BIK': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bank': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bankAddress': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.corrAccount': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bankAccount': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'items': {
    accepts: arrayOf(isItem),
    defaults: () => [],
    readonly: true,
  },
  'delivery.address': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
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

export const description: ContextSchemaDescription<Schema> = {
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
  'customer.type': {
    description: {
      'en-GB': 'Client type',
      'es-ES': 'Tipo de cliente',
      'ru-RU': 'Тип клиента',
    },
  },
  'customer.lastName': {
    description: {
      'en-GB': 'Client last name',
      'es-ES': 'Apellido del cliente',
      'ru-RU': 'Фамилия клиента',
    },
  },
  'customer.firstName': {
    description: {
      'en-GB': 'Client name',
      'es-ES': 'Nombre del cliente',
      'ru-RU': 'Имя клиента',
    },
  },
  'customer.patronymic': {
    description: {
      'en-GB': 'Patronymic of the client',
      'es-ES': 'Patronímico del cliente',
      'ru-RU': 'Отчество клиента',
    },
  },
  'customer.email': {
    description: {
      'en-GB': 'Customer email',
      'es-ES': 'Correo electrónico del cliente',
      'ru-RU': 'Email клиента',
    },
  },
  'customer.phone': {
    description: {
      'en-GB': 'Customer phone',
      'es-ES': 'Teléfono del cliente',
      'ru-RU': 'Телефон клиента',
    },
  },
  'company.contragentType': {
    description: {
      'en-GB': 'Legal entity type',
      'es-ES': 'Tipo de entidad legal',
      'ru-RU': 'Тип юридического лица',
    },
  },
  'company.certificateNumber': {
    description: {
      'en-GB': 'Certificate number',
      'es-ES': 'Número de certificado',
      'ru-RU': 'Номер свидетельства',
    },
  },
  'company.certificateDate': {
    description: {
      'en-GB': 'Certificate date',
      'es-ES': 'Fecha del certificado',
      'ru-RU': 'Дата свидетельства',
    },
  },
  'company.OGRN': {
    description: {
      'en-GB': 'PSRN of the counterparty',
      'es-ES': 'PSRN del contraparte',
      'ru-RU': 'ОГРН контрагента',
    },
  },
  'company.OGRNIP': {
    description: {
      'en-GB': 'PSRN of Individual entrepreneur',
      'es-ES': 'PSRN del emprendedor individual',
      'ru-RU': 'ОГРНИП',
    },
  },
  'company.name': {
    description: {
      'en-GB': 'Company\'s name',
      'es-ES': 'Nombre de la empresa',
      'ru-RU': 'Название компании',
    },
  },
  'company.legalName': {
    description: {
      'en-GB': 'Full name of the company',
      'es-ES': 'Nombre completo de la empresa',
      'ru-RU': 'Полное наименование компании',
    },
  },
  'company.legalAddress': {
    description: {
      'en-GB': 'Company\'s registration address',
      'es-ES': 'Dirección de registro de la empresa',
      'ru-RU': 'Адрес регистрации компании',
    },
  },
  'company.INN': {
    description: {
      'en-GB': 'Counterparty\'s INN',
      'es-ES': 'INN del contraparte',
      'ru-RU': 'ИНН контрагента',
    },
  },
  'company.KPP': {
    description: {
      'en-GB': 'Counterparty\'s KPP',
      'es-ES': 'KPP del contraparte',
      'ru-RU': 'КПП контрагента',
    },
  },
  'company.OKPO': {
    description: {
      'en-GB': 'OKPO of the counterparty',
      'es-ES': 'OKPO del contraparte',
      'ru-RU': 'ОКПО контрагента',
    },
  },
  'company.BIK': {
    description: {
      'en-GB': 'Counterparty\'s BIC',
      'es-ES': 'BIC del contraparte',
      'ru-RU': 'БИК контрагента',
    },
  },
  'company.bank': {
    description: {
      'en-GB': 'Counterparty\'s bank',
      'es-ES': 'Banco del contraparte',
      'ru-RU': 'Банк контрагента',
    },
  },
  'company.bankAddress': {
    description: {
      'en-GB': 'The address of the counterparty\'s bank',
      'es-ES': 'Dirección del banco del contraparte',
      'ru-RU': 'Адрес банка контрагента',
    },
  },
  'company.corrAccount': {
    description: {
      'en-GB': 'Correspondent account of the counterparty',
      'es-ES': 'Cuenta corresponsal del contraparte',
      'ru-RU': 'Корреспондентский счет контрагента',
    },
  },
  'company.bankAccount': {
    description: {
      'en-GB': 'Counterparty\'s current account',
      'es-ES': 'Cuenta corriente del contraparte',
      'ru-RU': 'Расчетный счет контрагента',
    },
  },
  'items': {
    description: {
      'en-GB': 'List of items in the order',
      'es-ES': 'Lista de artículos en el pedido',
      'ru-RU': 'Список товарных позиций заказа',
    },
  },
  'delivery.address': {
    description: {
      'en-GB': 'Delivery address',
      'es-ES': 'Dirección de entrega',
      'ru-RU': 'Адрес доставки',
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
      [isNumber, isNumber],
      ['index', 'amount']
    ),
    expects: isVoid,
  },
  'changeItemPriceType': {
    accepts: cortegeOf(
      [isNumber, oneOf(isString, isNull)],
      ['index', 'code']
    ),
    expects: isVoid,
  },
  'changeItemDiscount': {
    accepts: cortegeOf([isNumber, isShape({
      amount: [isNumber, false],
      percent: [isNumber, false],
    }, '{ amount: number|undefined, percent: number|undefined }')], ['index', 'discount']),
    expects: isVoid,
  },
  'changeItemQuantity': {
    accepts: cortegeOf(
      [isNumber, isNumber],
      ['index', 'quantity']
    ),
    expects: isVoid,
  },
  'changeItemStatus': {
    accepts: cortegeOf(
      [isNumber, isString],
      ['index', 'statusCode']
    ),
    expects: isVoid,
  },
  'removeItem': {
    accepts: cortegeOf([isNumber], ['index']),
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
    'ru-RU': 'Изменяет значение цены товарной позиции',
  },
  'changeItemPriceType': {
    'en-GB': 'Changes the price type value of an item, changes the price if the new price type is not empty',
    'es-ES': 'Cambia el valor del tipo de precio de un artículo, cambia el precio si el nuevo tipo de precio no está vacío',
    'ru-RU': 'Изменяет значение типа цены товарной позиции, изменяет цену, если новый тип цены не пуст',
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
    'ru-RU': 'Изменяет статус товарной позиции по указанному идентификатору',
  },
  'removeItem': {
    'en-GB': 'Removes an item from the order',
    'es-ES': 'Elimina un artículo del pedido',
    'ru-RU': 'Удаляет товарную позицию из заказа',
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/card\'',
  call: 'const order = useContext()',
}

export const types: {
  [K in keyof KnownTypes]: { [F in keyof KnownTypes[K]]: string; }
} = {
  'CreateOrderItemInput': isCreateOrderItemInput.fields,
  'Discount': isDiscount.fields,
  'Offer': isOffer.fields,
  'PriceType': isPriceType.fields,
  'Property': isProperty.fields,
  'Product': isProduct.fields,
  'ProductGroup': isProductGroup.fields,
  'OrderItem': isItem.fields,
  'OrderItemStatus': isStatus.fields,
}

export const typesDescription: {
  [K in keyof KnownTypes]: ObjectDescription<KnownTypes[K]>
} = {
  'CreateOrderItemInput': {
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
  'Discount': {
    'type': {
      'en-GB': 'Discount type',
      'es-ES': 'Tipo de descuento',
      'ru-RU': 'Тип скидки',
    },
    'amount': {
      'en-GB': 'Discount amount',
      'es-ES': 'Importe del descuento',
      'ru-RU': 'Размер скидки',
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
  'OrderItem': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'index': {
      'en-GB': 'Temporary ID while editing order',
      'es-ES': 'ID temporal durante la edición del pedido',
      'ru-RU': 'Временный идентификатор на время редактирования заказа',
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
    'properties': {
      'en-GB': 'Array of custom properties',
      'es-ES': 'Matriz de propiedades personalizadas',
      'ru-RU': 'Массив пользовательских свойств',
    },
    'quantity': {
      'en-GB': 'Item quantity',
      'es-ES': 'Cantidad del artículo',
      'ru-RU': 'Количество товарной позиции',
    },
    'purchasePrice': {
      'en-GB': 'Purchase price, value + currency',
      'es-ES': 'Precio de compra, valor + moneda',
      'ru-RU': 'Закупочная цена, значение + валюта',
    },
    'initialPrice': {
      'en-GB': 'Product/SKU price (in object currency)',
      'es-ES': 'Precio del producto/SKU (en la moneda del objeto)',
      'ru-RU': 'Цена товара/SKU (в валюте объекта)',
    },
    'priceType': {
      'en-GB': 'Price type',
      'es-ES': 'Tipo de precio',
      'ru-RU': 'Тип цены',
    },
    'bonusesChargeTotal': {
      'en-GB': 'Amount of charged bonuses',
      'es-ES': 'Cantidad de bonos cargados',
      'ru-RU': 'Количество списанных бонусов',
    },
    'bonusesCreditTotal': {
      'en-GB': 'Amount of credited bonuses',
      'es-ES': 'Cantidad de bonos acreditados',
      'ru-RU': 'Количество начисленных бонусов',
    },
    'discounts': {
      'en-GB': 'Array of discounts applied to the item',
      'es-ES': 'Matriz de descuentos aplicados al artículo',
      'ru-RU': 'Массив скидок, примененных к товарной позиции',
    },
    'discountTotal': {
      'en-GB': 'Final monetary discount per unit considering all product and order discounts (in object currency)',
      'es-ES': 'Descuento monetario final por unidad considerando todos los descuentos del producto y pedido (en la moneda del objeto)',
      'ru-RU': 'Итоговая денежная скидка на единицу товара c учетом всех скидок на товар и заказ (в валюте объекта)',
    },
    'vatRate': {
      'en-GB': 'VAT rate',
      'es-ES': 'Tasa de IVA',
      'ru-RU': 'Ставка НДС',
    },
    'vatSum': {
      'en-GB': 'VAT amount',
      'es-ES': 'Monto del IVA',
      'ru-RU': 'Сумма НДС',
    },
    'comment': {
      'en-GB': 'Comment',
      'es-ES': 'Comentario',
      'ru-RU': 'Комментарий',
    },
    'status': {
      'en-GB': 'Status',
      'es-ES': 'Estado',
      'ru-RU': 'Статус',
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

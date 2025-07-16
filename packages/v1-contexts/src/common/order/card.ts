import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/order/card'

import {
  arrayOf,
  isExactly,
  isNull,
  isNumber,
  isString,
  oneOf,
} from '@/predicates'

import { isItem } from '@/predicates/order/card'

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

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/card\'',
  call: 'const order = useContext()',
}

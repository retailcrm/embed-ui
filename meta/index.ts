import type {
  ContextSchema,
  ContextSchemaMap,
} from '~types/context/schema'

import type { SchemaList } from '~types/context'
import type { SchemaListByTarget } from '~types/widget'

import { keysOf } from '@/utilities'

import { schema as customerCardSchema } from '@/context/customer/card'
import { schema as customerCardPhoneSchema } from '@/context/customer/card-phone'
import { schema as orderCardSchema } from '@/context/order/card'
import { schema as settingsSchema } from '@/context/settings'

export type TranslationList = {
  'en-GB': string;
  'es-ES': string;
  'ru-RU': string;
}

export const schemaList: SchemaList = {
  'customer/card': customerCardSchema,
  'customer/card.phone': customerCardPhoneSchema,
  'order/card': orderCardSchema,
  'settings': settingsSchema,
}

export type SchemaDocumentation<S extends ContextSchema> = {
  [K in keyof S]: {
    description: TranslationList;
  }
}

export type SchemaListDocumentation<M extends ContextSchemaMap> = {
  [K in keyof M]: SchemaDocumentation<M[K]>
}

export const schemaListDocumentation: SchemaListDocumentation<SchemaList> = {
  'customer/card': {
    'id': {
      description: {
        'en-GB': 'Customer ID',
        'es-ES': '',
        'ru-RU': 'ID клиента',
      },
    },
    'externalId': {
      description: {
        'en-GB': 'Customer external ID',
        'es-ES': '',
        'ru-RU': 'Внешний ID клиента',
      },
    },
    'email': {
      description: {
        'en-GB': 'Customer email',
        'es-ES': '',
        'ru-RU': 'Email клиента',
      },
    },
    'phones': {
      description: {
        'en-GB': 'Customer phone list',
        'es-ES': '',
        'ru-RU': 'Список телефонов клиента',
      },
    },
  },
  'customer/card.phone': {
    'value': {
      description: {
        'en-GB': 'Customer phone',
        'es-ES': '',
        'ru-RU': 'Телефон клиента',
      },
    },
    'index': {
      description: {
        'en-GB': 'Serial number of the phone in the list',
        'es-ES': '',
        'ru-RU': 'Порядковый номер телефона в списке',
      },
    },
  },
  'order/card': {
    'customer.email': {
      description: {
        'en-GB': 'Customer email',
        'es-ES': '',
        'ru-RU': 'Email клиента',
      },
    },
    'customer.phone': {
      description: {
        'en-GB': 'Customer phone',
        'es-ES': '',
        'ru-RU': 'Телефон клиента',
      },
    },
    'delivery.address': {
      description: {
        'en-GB': 'Delivery address',
        'es-ES': '',
        'ru-RU': 'Адрес доставки',
      },
    },
  },
  'settings': {
    'order.templates.number.api': {
      description: {
        'en-GB': 'Number template for orders created with API',
        'es-ES': '',
        'ru-RU': 'Шаблон номера заказов, создаваемых через API',
      },
    },
    'order.templates.number.crm': {
      description: {
        'en-GB': 'Number template for orders created with CRM\'s interface',
        'es-ES': '',
        'ru-RU': 'Шаблон номера заказов, создаваемых через интерфейс CRM',
      },
    },
    'system.locale': {
      description: {
        'en-GB': 'Current system\'s locale',
        'es-ES': '',
        'ru-RU': 'Текущая локаль системы',
      },
    },
  },
}

export type TargetListDocumentation = {
  [Target in keyof SchemaListByTarget]: {
    description: TranslationList;
    location: TranslationList;
    contexts: Array<keyof SchemaListByTarget[Target]>;
  }
}

export const targetListDocumentation: TargetListDocumentation = {
  'customer/card:phone': {
    description: {
      'en-GB': 'Widget for customer phone list item',
      'es-ES': '',
      'ru-RU': 'Виджет для элемента списка телефонов клиента',
    },
    location: {
      'en-GB': 'Right after the phone number in the list',
      'es-ES': '',
      'ru-RU': 'Сразу после номера телефона в списке',
    },
    contexts: [
      'customer/card',
      'settings',
    ],
  },
  'order/card:customer.after': {
    description: {
      'en-GB': 'Widget for section with customer data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными клиента',
    },
    location: {
      'en-GB': 'Right under the input fields',
      'es-ES': '',
      'ru-RU': 'Сразу под полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:customer.email': {
    description: {
      'en-GB': 'Widget for customer email input field',
      'es-ES': '',
      'ru-RU': 'Виджет для поля ввода email клиента',
    },
    location: {
      'en-GB': 'Right after the input field',
      'es-ES': '',
      'ru-RU': 'Сразу после поля ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:customer.phone': {
    description: {
      'en-GB': 'Widget for customer phone input field',
      'es-ES': '',
      'ru-RU': 'Виджет для поля ввода телефона клиента',
    },
    location: {
      'en-GB': 'Right after the input field',
      'es-ES': '',
      'ru-RU': 'Сразу после поля ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:delivery.address': {
    description: {
      'en-GB': 'Widget for delivery address input field',
      'es-ES': '',
      'ru-RU': 'Виджет для поля ввода адреса доставки',
    },
    location: {
      'en-GB': 'Right under the input field',
      'es-ES': '',
      'ru-RU': 'Под полем ввода адреса',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
}

export const pageListDocumentation = [{
  id: 'customer/card',
  description: {
    'en-GB': 'Customer page',
    'es-ES': '',
    'ru-RU': 'Страница клиента',
  } as TranslationList,
  targets: keysOf(targetListDocumentation).filter(target => target.startsWith('customer/card:')),
}, {
  id: 'order/card',
  description: {
    'en-GB': 'Page with the order creation/editing form',
    'es-ES': '',
    'ru-RU': 'Страница с формой создания/редактирования заказа',
  } as TranslationList,
  targets: keysOf(targetListDocumentation).filter(target => target.startsWith('order/card:')),
}]

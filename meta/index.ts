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
  'customer/card:phone': customerCardPhoneSchema,
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
  'customer/card:phone': {
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

type UnionToArray<T, U = T> = [T] extends [never]
  ? []
  : T extends T
    ? [T, ...UnionToArray<Exclude<U, T>>]
    : []

export type TargetListDocumentation = {
  [Target in keyof SchemaListByTarget]: {
    description: TranslationList;
    location: TranslationList;
    contexts: UnionToArray<keyof SchemaListByTarget[Target]>;
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
      'customer/card:phone',
      'settings',
    ],
  },
  'order/card:common.before': {
    description: {
      'en-GB': 'Widget for the section with common data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с основными данными',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:common.after': {
    description: {
      'en-GB': 'Widget for the section with common data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с основными данными',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': '',
      'ru-RU': 'Конец секции, под полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:customer.before': {
    description: {
      'en-GB': 'Widget for the section with customer data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными клиента',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:customer.after': {
    description: {
      'en-GB': 'Widget for the section with customer data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными клиента',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': '',
      'ru-RU': 'Конец секции, под полями ввода',
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
  'order/card:list.before': {
    description: {
      'en-GB': 'Widget for the list of ordered items',
      'es-ES': '',
      'ru-RU': 'Виджет для списка позиций заказа',
    },
    location: {
      'en-GB': '[Temporary unavailable]',
      'es-ES': '',
      'ru-RU': '[Временно недоступен]',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:list.after': {
    description: {
      'en-GB': 'Widget for the list of ordered items',
      'es-ES': '',
      'ru-RU': 'Виджет для списка позиций заказа',
    },
    location: {
      'en-GB': 'Section start, right under the list',
      'es-ES': '',
      'ru-RU': 'Начало секции, под списком',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:store.before': {
    description: {
      'en-GB': 'Widget for the section with warehouse data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными склада',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:dimensions.before': {
    description: {
      'en-GB': 'Widget for the section with dimensions and weight',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными габаритов и веса',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:delivery.before': {
    description: {
      'en-GB': 'Widget for the section with delivery data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными доставки',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
    },
    contexts: [
      'order/card',
      'settings',
    ],
  },
  'order/card:delivery.after': {
    description: {
      'en-GB': 'Widget for the section with delivery data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными доставки',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': '',
      'ru-RU': 'Конец секции, под полями ввода',
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
  'order/card:payment.before': {
    description: {
      'en-GB': 'Widget for the section with payment data',
      'es-ES': '',
      'ru-RU': 'Виджет для секции с данными по оплате',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': '',
      'ru-RU': 'Начало секции, над полями ввода',
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

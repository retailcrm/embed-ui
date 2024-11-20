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

export const contextsUsage: {
  [K in keyof SchemaList]: {
    import: string;
    call: string;
  };
} = {
  'customer/card': {
    import: 'import { useCustomerCardContext } from \'@retailcrm/embed-ui\'',
    call: 'const customer = useCustomerCardContext()', 
  },
  'customer/card:phone': {
    import: 'import { useCustomerCardPhoneContext } from \'@retailcrm/embed-ui\'',
    call: 'const phone = useCustomerCardPhoneContext()', 
  },
  'order/card': {
    import: 'import { useOrderCardContext } from \'@retailcrm/embed-ui\'',
    call: 'const order = useOrderCardContext()', 
  },
  'settings': {
    import: 'import { useSettingsContext } from \'@retailcrm/embed-ui\'',
    call: 'const settings = useSettingsContext()', 
  },
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
  },
  'customer/card:phone': {
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
  },
  'order/card': {
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
    'delivery.address': {
      description: {
        'en-GB': 'Delivery address',
        'es-ES': 'Dirección de entrega',
        'ru-RU': 'Адрес доставки',
      },
    },
  },
  'settings': {
    'order.templates.number.api': {
      description: {
        'en-GB': 'Number template for orders created with API',
        'es-ES': 'Plantilla de número para pedidos creados con API',
        'ru-RU': 'Шаблон номера заказов, создаваемых через API',
      },
    },
    'order.templates.number.crm': {
      description: {
        'en-GB': 'Number template for orders created with CRM\'s interface',
        'es-ES': 'Plantilla de número para pedidos creados con la interfaz de CRM',
        'ru-RU': 'Шаблон номера заказов, создаваемых через интерфейс CRM',
      },
    },
    'system.locale': {
      description: {
        'en-GB': 'Current system\'s locale',
        'es-ES': 'Configuración regional actual del sistema',
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
      'es-ES': 'Widget para el elemento de la lista de teléfonos del cliente',
      'ru-RU': 'Виджет для элемента списка телефонов клиента',
    },
    location: {
      'en-GB': 'Right after the phone number in the list',
      'es-ES': 'Justo después del número de teléfono en la lista',
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
      'es-ES': 'Widget para la sección con datos comunes',
      'ru-RU': 'Виджет для секции с основными данными',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
      'es-ES': 'Widget para la sección con datos comunes',
      'ru-RU': 'Виджет для секции с основными данными',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': 'Fin de la sección, justo debajo de los campos de entrada',
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
      'es-ES': 'Widget para la sección con datos del cliente',
      'ru-RU': 'Виджет для секции с данными клиента',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
      'es-ES': 'Widget para la sección con datos del cliente',
      'ru-RU': 'Виджет для секции с данными клиента',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': 'Fin de la sección, justo debajo de los campos de entrada',
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
      'es-ES': 'Widget para el campo de entrada del correo electrónico del cliente',
      'ru-RU': 'Виджет для поля ввода email клиента',
    },
    location: {
      'en-GB': 'Right after the input field',
      'es-ES': 'Justo después del campo de entrada',
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
      'es-ES': 'Widget para el campo de entrada del teléfono del cliente',
      'ru-RU': 'Виджет для поля ввода телефона клиента',
    },
    location: {
      'en-GB': 'Right after the input field',
      'es-ES': 'Justo después del campo de entrada',
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
      'es-ES': 'Widget para la lista de artículos pedidos',
      'ru-RU': 'Виджет для списка позиций заказа',
    },
    location: {
      'en-GB': '[Temporary unavailable]',
      'es-ES': '[Temporalmente no disponible]',
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
      'es-ES': 'Widget para la lista de artículos pedidos',
      'ru-RU': 'Виджет для списка позиций заказа',
    },
    location: {
      'en-GB': 'Section start, right under the list',
      'es-ES': 'Inicio de la sección, justo debajo de la lista',
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
      'es-ES': 'Widget para la sección con datos del almacén',
      'ru-RU': 'Виджет для секции с данными склада',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
      'es-ES': 'Widget para la sección con dimensiones y peso',
      'ru-RU': 'Виджет для секции с данными габаритов и веса',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
      'es-ES': 'Widget para la sección con datos de entrega',
      'ru-RU': 'Виджет для секции с данными доставки',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
      'es-ES': 'Widget para la sección con datos de entrega',
      'ru-RU': 'Виджет для секции с данными доставки',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': 'Fin de la sección, justo debajo de los campos de entrada',
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
      'es-ES': 'Widget para el campo de entrada de la dirección de entrega',
      'ru-RU': 'Виджет для поля ввода адреса доставки',
    },
    location: {
      'en-GB': 'Right under the input field',
      'es-ES': 'Justo debajo del campo de entrada',
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
      'es-ES': 'Widget para la sección con datos de pago',
      'ru-RU': 'Виджет для секции с данными по оплате',
    },
    location: {
      'en-GB': 'Section start, right above the input fields',
      'es-ES': 'Inicio de la sección, justo encima de los campos de entrada',
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
    'es-ES': 'Página del cliente',
    'ru-RU': 'Страница клиента',
  } as TranslationList,
  targets: keysOf(targetListDocumentation).filter(target => target.startsWith('customer/card:')),
}, {
  id: 'order/card',
  description: {
    'en-GB': 'Page with the order creation/editing form',
    'es-ES': 'Página con el formulario de creación/edición de pedidos',
    'ru-RU': 'Страница с формой создания/редактирования заказа',
  } as TranslationList,
  targets: keysOf(targetListDocumentation).filter(target => target.startsWith('order/card:')),
}]

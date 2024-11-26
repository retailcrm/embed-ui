import type {
  ContextSchema,
  ContextSchemaMap,
} from '~types/context/schema'

import type { SchemaList } from '~types/context'
import type { SchemaListByTarget } from '~types/widget'

import { keysOf } from '@/utilities'

import { schema as currentUserSchema } from '@/context/user/current'
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
  'user/current': currentUserSchema,
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
  'user/current': {
    import: 'import { useCurrentUserContext } from \'@retailcrm/embed-ui\'',
    call: 'const user = useCurrentUserContext()',
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
  'user/current': {
    'lastName': {
      description: {
        'en-GB': 'User last name',
        'es-ES': 'Apellido del usuario',
        'ru-RU': 'Фамилия пользователя',
      },
    },
    'firstName': {
      description: {
        'en-GB': 'User name',
        'es-ES': 'Nombre del usuario',
        'ru-RU': 'Имя пользователя',
      },
    },
    'patronymic': {
      description: {
        'en-GB': 'Patronymic of the user',
        'es-ES': 'Patronímico del usuario',
        'ru-RU': 'Отчество пользователя',
      },
    },
    'email': {
      description: {
        'en-GB': 'User email',
        'es-ES': 'Correo electrónico del usuario',
        'ru-RU': 'Email пользователя',
      },
    },
    'groupCodes': {
      description: {
        'en-GB': 'Character codes of available user permissions',
        'es-ES': 'Códigos de caracteres de los permisos disponibles para el usuario',
        'ru-RU': 'Символьные коды доступных пользователю разрешений',
      },
    },
  },
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
    'number': {
      description: {
        'en-GB': 'Displayed order number',
        'es-ES': 'Número de pedido mostrado',
        'ru-RU': 'Отображаемый номер заказа',
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
    'status': {
      description: {
        'en-GB': 'Order status',
        'es-ES': 'Estado del pedido',
        'ru-RU': 'Статус заказа',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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
      'user/current',
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

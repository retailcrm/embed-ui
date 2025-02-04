import type { SchemaListByTarget } from '~types/widget'
import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'
import type { UnionToArray } from '@retailcrm/embed-ui-v1-types/scaffolding'

import { keysOf } from '@/utilities'

export const targetListDocumentation: {
  [Target in keyof SchemaListByTarget]: {
    description: TranslationList;
    location: TranslationList;
    contexts: UnionToArray<keyof SchemaListByTarget[Target]>;
    customContexts: string[];
  }
} = {
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
    customContexts: ['customer'],
  },
  'customer/card:communications.after': {
    description: {
      'en-GB': 'Widget for enhancing the communication section in the left column of the customer page.',
      'es-ES': 'Widget para ampliar la sección de comunicación en la columna izquierda de la página del cliente.',
      'ru-RU': 'Виджет для дополнения секции коммуникаций в левой колонке страницы клиента.',
    },
    location: {
      'en-GB': 'Right below the short summary, in the communication section',
      'es-ES': 'Justo debajo del resumen breve, en la sección de comunicación',
      'ru-RU': 'Сразу под краткой сводкой, в секции коммуникаций',
    },
    contexts: [
      'customer/card',
      'user/current',
      'settings',
    ],
    customContexts: ['customer'],
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
    ],
  },
  'order/card:list.before': {
    description: {
      'en-GB': 'Widget for the list of ordered items',
      'es-ES': 'Widget para la lista de artículos pedidos',
      'ru-RU': 'Виджет для списка позиций заказа',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
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
    customContexts: [
      'order',
    ],
  },
  'order/card:comment.manager.before': {
    description: {
      'en-GB': 'Widget for the block "Manager comment"',
      'es-ES': 'Widget para el bloque "Comentario del asesor"',
      'ru-RU': 'Виджет для блока "Комментарии оператора"',
    },
    location: {
      'en-GB': 'Section start, right above the input field',
      'es-ES': 'Inicio de la sección, justo encima del campo de entrada',
      'ru-RU': 'Начало секции, над полем ввода',
    },
    contexts: [
      'order/card',
      'user/current',
      'settings',
    ],
    customContexts: [
      'order',
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

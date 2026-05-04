import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

import type { TargetName } from './targets'

type TargetDocumentation = {
  [Target in TargetName]: {
    description: TranslationList;
    location: TranslationList;
  }
}

export const targetsDocumentation = {
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
  },
  'customer/card:inWork.before': {
    description: {
      'en-GB': 'Widget for the contact request item',
      'es-ES': 'Widget para el elemento de solicitud de contacto',
      'ru-RU': 'Виджет для элемента обращений',
    },
    location: {
      'en-GB': 'At the beginning of the "In Progress" block in the client card',
      'es-ES': 'Al principio del bloque "En progreso" en la tarjeta del cliente',
      'ru-RU': 'В начале блока "В работе" в карточке клиента',
    },
  },
  'customer/card:inWork.after': {
    description: {
      'en-GB': 'Widget for the contact request item',
      'es-ES': 'Widget para el elemento de solicitud de contacto',
      'ru-RU': 'Виджет для элемента обращений',
    },
    location: {
      'en-GB': 'At the end of the "In progress" block in the client card',
      'es-ES': 'Al final del bloque "En progreso" en la tarjeta del cliente',
      'ru-RU': 'В конце блока "В работе" в карточке клиента',
    },
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
  },
  'order/mg:list.before': {
    description: {
      'en-GB': 'Widget for the block "Order items"',
      'es-ES': 'Widget para el bloque "Artículos del pedido"',
      'ru-RU': 'Виджет для блока "Состав заказа"',
    },
    location: {
      'en-GB': 'Section start, right above the list of order items',
      'es-ES': 'Inicio de la sección, justo encima de la lista de artículos del pedido',
      'ru-RU': 'Начало секции, над списком товарных позиций',
    },
  },
  'order/mg:list.after': {
    description: {
      'en-GB': 'Widget for the block "Order items"',
      'es-ES': 'Widget para el bloque "Artículos del pedido"',
      'ru-RU': 'Виджет для блока "Состав заказа"',
    },
    location: {
      'en-GB': 'Section end, right after the list of order items and before the discount, privilege selection, etc. input fields',
      'es-ES': 'Fin de la sección, justo después de la lista de artículos del pedido y antes de los campos de entrada de descuento, selección de privilegios, etc.',
      'ru-RU': 'Конец секции, сразу после списка товарных позиций и до полей ввода скидки, выбора привилегии и т.п.',
    },
  },
  'order/mg:delivery.before': {
    description: {
      'en-GB': 'Widget for the block "Delivery"',
      'es-ES': 'Widget para el bloque "Entrega"',
      'ru-RU': 'Виджет для блока "Доставка"',
    },
    location: {
      'en-GB': 'Section start, right above the input field',
      'es-ES': 'Inicio de la sección, justo encima del campo de entrada',
      'ru-RU': 'Начало секции, над полем ввода',
    },
  },
  'order/mg:delivery.after': {
    description: {
      'en-GB': 'Widget for the block "Delivery"',
      'es-ES': 'Widget para el bloque "Entrega"',
      'ru-RU': 'Виджет для блока "Доставка"',
    },
    location: {
      'en-GB': 'Section end, right under the input fields',
      'es-ES': 'Fin de la sección, justo debajo de los campos de entrada',
      'ru-RU': 'Конец секции, под полями ввода',
    },
  },
  'order/mg:payment.before': {
    description: {
      'en-GB': 'Widget for the block "Payment"',
      'es-ES': 'Widget para el bloque "Pago"',
      'ru-RU': 'Виджет для блока "Оплата"',
    },
    location: {
      'en-GB': 'Section start, right above the input field',
      'es-ES': 'Inicio de la sección, justo encima del campo de entrada',
      'ru-RU': 'Начало секции, над полем ввода',
    },
  },
  'order/mg:payment.after': {
    description: {
      'en-GB': 'Widget for the block "Payment"',
      'es-ES': 'Widget para el bloque "Pago"',
      'ru-RU': 'Виджет для блока "Оплата"',
    },
    location: {
      'en-GB': 'Section end, after the list of payments, controls, and custom fields',
      'es-ES': 'Fin de la sección, después de la lista de pagos, controles y campos personalizados',
      'ru-RU': 'Конец секции, после списка оплат, контролов и пользовательских полей',
    },
  },
} satisfies TargetDocumentation

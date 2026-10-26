import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

import type { TargetName } from './targets'

type TargetDocumentation = {
  [Target in TargetName]: {
    description: TranslationList;
    location: TranslationList;
    notes?: TranslationList[];
  }
}

export const targetsDocumentation = {
  'ticket/view:header.after': {
    description: {
      'en-GB': 'Additional actions and information concerning the entire ticket',
      'es-ES': 'Acciones e información adicionales relativas a toda la solicitud',
      'ru-RU': 'Дополнительные действия и информация, относящиеся ко всему обращению',
    },
    location: {
      'en-GB': 'Below the ticket header and main action toolbar, before the tab selector',
      'es-ES': 'Debajo de la cabecera y la barra principal de acciones de la solicitud, antes del selector de pestañas',
      'ru-RU': 'Под общей шапкой и панелью действий обращения, перед переключателем вкладок',
    },
    notes: [{
      'en-GB': 'Viewer-only horizontal row outside tab content. Use compact buttons, links or short text. The CRM host owns 32 px horizontal padding and 16 px gaps between elements.',
      'es-ES': 'Fila horizontal del visor, fuera del contenido de las pestañas. Use botones compactos, enlaces o texto breve. El host del CRM define 32 px de margen interior horizontal y 16 px entre elementos.',
      'ru-RU': 'Горизонтальная строка просмотрщика вне содержимого вкладок. Подходят компактные кнопки, ссылки и короткий текст. Хост CRM задаёт отступы по краям 32 px и расстояние между элементами 16 px.',
    }],
  },
  'ticket/view:common.before': {
    description: {
      'en-GB': 'Additional actions and information on the General tab',
      'es-ES': 'Acciones e información adicionales en la pestaña General',
      'ru-RU': 'Дополнительные действия и информация на вкладке «Основное»',
    },
    location: {
      'en-GB': 'At the beginning of the General tab content, before the Customer section',
      'es-ES': 'Al principio del contenido de la pestaña General, antes de la sección Cliente',
      'ru-RU': 'В начале содержимого вкладки «Основное», перед блоком «Клиент»',
    },
    notes: [{
      'en-GB': 'Viewer-only horizontal row inside the General tab. Use compact buttons, links or short text. The CRM host owns 32 px horizontal padding, 24 px vertical padding and 16 px gaps between elements.',
      'es-ES': 'Fila horizontal del visor dentro de la pestaña General. Use botones compactos, enlaces o texto breve. El host del CRM define un margen interior de 32 px horizontal y 24 px vertical, y 16 px entre elementos.',
      'ru-RU': 'Горизонтальная строка просмотрщика внутри вкладки «Основное». Подходят компактные кнопки, ссылки и короткий текст. Хост CRM задаёт отступы по краям 32 px, сверху и снизу 24 px, расстояние между элементами 16 px.',
    }],
  },
  'ticket/view:customer.after': {
    description: {
      'en-GB': 'Additional information about the ticket customer',
      'es-ES': 'Información adicional sobre el cliente de la solicitud',
      'ru-RU': 'Дополнительная информация о клиенте обращения',
    },
    location: {
      'en-GB': 'Inside the Customer section, after segments, at the end of its expanded content',
      'es-ES': 'Dentro de la sección Cliente, después de los segmentos, al final de su contenido desplegado',
      'ru-RU': 'Внутри блока «Клиент», после сегментов, в конце развёрнутого содержимого',
    },
    notes: [{
      'en-GB': 'Viewer-only informational content: links, text and label-value pairs. No editable controls or extra card wrapper. The host provides 24 px spacing after the standard content; the widget follows section collapse. Read the customer slice from ticket/view, not customer/card.',
      'es-ES': 'Contenido informativo del visor: enlaces, texto y pares de etiqueta y valor. Sin controles editables ni tarjeta adicional. El host añade 24 px después del contenido estándar; el widget se oculta al contraer la sección. Lea los datos del cliente de ticket/view, no de customer/card.',
      'ru-RU': 'Информационная зона просмотрщика: ссылки, текст и пары «название — значение». Без редактируемых элементов и дополнительной карточки. Хост задаёт отступ 24 px от штатного содержимого; виджет сворачивается вместе с секцией. Данные клиента берутся из среза ticket/view, а не из customer/card.',
    }],
  },
  'ticket/view:issues.after': {
    description: {
      'en-GB': 'Additional information about the ticket questions',
      'es-ES': 'Información adicional sobre las preguntas de la solicitud',
      'ru-RU': 'Дополнительная информация по вопросам обращения',
    },
    location: {
      'en-GB': 'Inside the shared questions section, after the ticket content and tags',
      'es-ES': 'Dentro de la sección común de preguntas, después del contenido y las etiquetas de la solicitud',
      'ru-RU': 'Внутри общего блока вопросов, после содержания обращения и тегов',
    },
    notes: [{
      'en-GB': 'Viewer-only informational content: links, text and label-value pairs. One slot for the entire questions section, not one per issue. There is no selected-issue context. No editable controls or extra card wrapper. The host provides 24 px spacing after standard content; the widget follows section collapse.',
      'es-ES': 'Contenido informativo del visor: enlaces, texto y pares de etiqueta y valor. Una ubicación para toda la sección, no una por pregunta. No hay contexto de pregunta seleccionada. Sin controles editables ni tarjeta adicional. El host añade 24 px después del contenido estándar; el widget se oculta al contraer la sección.',
      'ru-RU': 'Информационная зона просмотрщика: ссылки, текст и пары «название — значение». Одна точка на весь блок вопросов, а не на каждый вопрос; контекста выбранного вопроса нет. Без редактируемых элементов и дополнительной карточки. Хост задаёт отступ 24 px от штатного содержимого; виджет сворачивается вместе с секцией.',
    }],
  },
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

import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'
import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'
import type { KnownTypes } from '~generated/ticket/edit.d.ts'
import type { MethodList } from '~types/ticket/edit'
import type { ObjectDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { Schema } from '~types/ticket/edit'

import { arrayOf, cortegeOf, isBoolean } from '@/predicates'
import { isCustomerType } from '@/predicates/customer'
import {
  isExactly,
  isNull,
  isNumber,
  isString,
} from '@/predicates'
import {
  isTicketEditorError,
  isTicketEditorItem,
  isTicketEditorOrder,
  isTicketIssueDraft,
  isTicketIssueDraftChanges,
} from '@/predicates/ticket/edit'
import { isTicketReference } from '@/predicates/ticket/view'
import { isVoid, oneOf } from '@/predicates'
import {
  types as sharedTypes,
  typesDescription as sharedTypesDescription,
} from '@/common/ticket/view'

export const id = 'ticket/edit'

export const schema: Schema = {
  'id': { accepts: oneOf(isNumber, isNull), defaults: () => null, readonly: true },
  'mode': { accepts: oneOf(isExactly('create'), isExactly('edit')), defaults: () => 'create', readonly: true },
  'site': { accepts: oneOf(isTicketReference, isNull), defaults: () => null, readonly: false },
  'number': { accepts: oneOf(isString, isNull), defaults: () => null, readonly: true },
  'description': { accepts: isString, defaults: () => '', readonly: false },
  'channel': { accepts: oneOf(isTicketReference, isNull), defaults: () => null, readonly: false },
  'customer.id': { accepts: oneOf(isNumber, isNull), defaults: () => null, readonly: true },
  'customer.type': { accepts: isCustomerType, defaults: () => 'customer', readonly: true },
  'customer.name': { accepts: isString, defaults: () => '', readonly: false },
  'customer.lastName': { accepts: isString, defaults: () => '', readonly: false },
  'customer.firstName': { accepts: isString, defaults: () => '', readonly: false },
  'customer.patronymic': { accepts: isString, defaults: () => '', readonly: false },
  'customer.email': { accepts: isString, defaults: () => '', readonly: false },
  'customer.phone': { accepts: isString, defaults: () => '', readonly: false },
  'contact.id': { accepts: oneOf(isNumber, isNull), defaults: () => null, readonly: true },
  'contact.name': { accepts: isString, defaults: () => '', readonly: true },
  'contact.lastName': { accepts: isString, defaults: () => '', readonly: false },
  'contact.firstName': { accepts: isString, defaults: () => '', readonly: false },
  'contact.patronymic': { accepts: isString, defaults: () => '', readonly: false },
  'contact.email': { accepts: isString, defaults: () => '', readonly: false },
  'contact.phone': { accepts: isString, defaults: () => '', readonly: false },
  'company.id': { accepts: oneOf(isNumber, isNull), defaults: () => null, readonly: true },
  'company.name': { accepts: isString, defaults: () => '', readonly: false },
  'issues': { accepts: arrayOf(isTicketIssueDraft), defaults: () => [], readonly: true },
  'orders': { accepts: arrayOf(isTicketEditorOrder), defaults: () => [], readonly: true },
  'orderItems': { accepts: arrayOf(isTicketEditorItem), defaults: () => [], readonly: true },
  'dirty': { accepts: isBoolean, defaults: () => false, readonly: true },
  'valid': { accepts: isBoolean, defaults: () => false, readonly: true },
  'loading': { accepts: isBoolean, defaults: () => true, readonly: true },
  'loadFailed': { accepts: isBoolean, defaults: () => false, readonly: true },
  'saving': { accepts: isBoolean, defaults: () => false, readonly: true },
  'pending': { accepts: isBoolean, defaults: () => false, readonly: true },
  'errors': { accepts: arrayOf(isTicketEditorError), defaults: () => [], readonly: true },
}

export const description: ContextSchemaDescription<Schema> = {
  'id': { description: {
    'en-GB': 'Saved ticket ID; null for a new ticket',
    'es-ES': 'ID de solicitud guardada; null para una nueva',
    'ru-RU': 'Идентификатор сохранённого обращения; null при создании',
  } },
  'mode': { description: {
    'en-GB': 'Editor mode',
    'es-ES': 'Modo del editor',
    'ru-RU': 'Режим редактора',
  } },
  'site': { description: {
    'en-GB': 'Store selected in the draft; host resolves the reference and checks access',
    'es-ES': 'Tienda del borrador; el host resuelve la referencia y comprueba el acceso',
    'ru-RU': 'Магазин в черновике; хост разрешает ссылку и проверяет доступ',
  } },
  'number': { description: {
    'en-GB': 'Saved ticket number; null for a new ticket',
    'es-ES': 'Número guardado; null para una nueva solicitud',
    'ru-RU': 'Номер сохранённого обращения; null при создании',
  } },
  'description': { description: {
    'en-GB': 'Ticket description in the draft',
    'es-ES': 'Descripción de la solicitud en el borrador',
    'ru-RU': 'Описание обращения в черновике',
  } },
  'channel': { description: {
    'en-GB': 'Channel selected in the draft; null clears the selection',
    'es-ES': 'Canal del borrador; null borra la selección',
    'ru-RU': 'Канал в черновике; null снимает выбор',
  } },
  'customer.id': { description: {
    'en-GB': 'Selected customer ID; null while entering a new customer',
    'es-ES': 'ID del cliente seleccionado; null para un cliente nuevo',
    'ru-RU': 'Идентификатор выбранного клиента; null при вводе нового',
  } },
  'customer.type': { description: {
    'en-GB': 'Canonical customer type; change through changeCustomerType',
    'es-ES': 'Tipo canónico de cliente; cambia mediante changeCustomerType',
    'ru-RU': 'Тип клиента; изменяется действием changeCustomerType',
  } },
  'customer.name': { description: {
    'en-GB': 'Customer display name; writable only for a new corporate customer',
    'es-ES': 'Nombre del cliente; editable solo para un nuevo cliente corporativo',
    'ru-RU': 'Имя выбранного клиента; ввод названия разрешён только для нового корпоративного клиента',
  } },
  'customer.lastName': { description: {
    'en-GB': 'Last name for a new individual customer; existing customer profiles are readonly',
    'es-ES': 'Apellido de un nuevo cliente individual; los perfiles existentes son de solo lectura',
    'ru-RU': 'Фамилия нового физического лица; профиль выбранного клиента не редактируется',
  } },
  'customer.firstName': { description: {
    'en-GB': 'First name for a new individual customer; existing customer profiles are readonly',
    'es-ES': 'Nombre de un nuevo cliente individual; los perfiles existentes son de solo lectura',
    'ru-RU': 'Имя нового физического лица; профиль выбранного клиента не редактируется',
  } },
  'customer.patronymic': { description: {
    'en-GB': 'Patronymic for a new individual customer; existing customer profiles are readonly',
    'es-ES': 'Patronímico de un nuevo cliente individual; los perfiles existentes son de solo lectura',
    'ru-RU': 'Отчество нового физического лица; профиль выбранного клиента не редактируется',
  } },
  'customer.email': { description: {
    'en-GB': 'Email for a new individual customer; existing customer profiles are readonly',
    'es-ES': 'Correo electrónico de un nuevo cliente individual; los perfiles existentes son de solo lectura',
    'ru-RU': 'Email нового физического лица; профиль выбранного клиента не редактируется',
  } },
  'customer.phone': { description: {
    'en-GB': 'Phone for a new individual customer; existing customer profiles are readonly',
    'es-ES': 'Teléfono de un nuevo cliente individual; los perfiles existentes son de solo lectura',
    'ru-RU': 'Телефон нового физического лица; профиль выбранного клиента не редактируется',
  } },
  'contact.id': { description: {
    'en-GB': 'Selected corporate customer contact ID',
    'es-ES': 'ID del contacto corporativo seleccionado',
    'ru-RU': 'Идентификатор выбранного контактного лица корпоративного клиента',
  } },
  'contact.name': { description: {
    'en-GB': 'Selected contact display name',
    'es-ES': 'Nombre del contacto seleccionado',
    'ru-RU': 'Имя выбранного контактного лица',
  } },
  'contact.lastName': { description: {
    'en-GB': 'Last name for a new corporate customer contact; unavailable for individual customers or linked contacts',
    'es-ES': 'Apellido de un nuevo contacto corporativo; no disponible para clientes individuales o contactos vinculados',
    'ru-RU': 'Фамилия нового контактного лица; ввод разрешён в корпоративном режиме без выбранного контакта',
  } },
  'contact.firstName': { description: {
    'en-GB': 'First name for a new corporate customer contact; unavailable for individual customers or linked contacts',
    'es-ES': 'Nombre de un nuevo contacto corporativo; no disponible para clientes individuales o contactos vinculados',
    'ru-RU': 'Имя нового контактного лица; ввод разрешён в корпоративном режиме без выбранного контакта',
  } },
  'contact.patronymic': { description: {
    'en-GB': 'Patronymic for a new corporate customer contact; unavailable for individual customers or linked contacts',
    'es-ES': 'Patronímico de un nuevo contacto corporativo; no disponible para clientes individuales o contactos vinculados',
    'ru-RU': 'Отчество нового контактного лица; ввод разрешён в корпоративном режиме без выбранного контакта',
  } },
  'contact.email': { description: {
    'en-GB': 'Email for a new corporate customer contact; unavailable for individual customers or linked contacts',
    'es-ES': 'Correo electrónico de un nuevo contacto corporativo; no disponible para clientes individuales o contactos vinculados',
    'ru-RU': 'Email нового контактного лица; ввод разрешён в корпоративном режиме без выбранного контакта',
  } },
  'contact.phone': { description: {
    'en-GB': 'Phone for a new corporate customer contact; unavailable for individual customers or linked contacts',
    'es-ES': 'Teléfono de un nuevo contacto corporativo; no disponible para clientes individuales o contactos vinculados',
    'ru-RU': 'Телефон нового контактного лица; ввод разрешён в корпоративном режиме без выбранного контакта',
  } },
  'company.id': { description: {
    'en-GB': 'Selected company ID',
    'es-ES': 'ID de la empresa seleccionada',
    'ru-RU': 'Идентификатор выбранной компании',
  } },
  'company.name': { description: {
    'en-GB': 'Company name; writable only for a new company of a corporate customer',
    'es-ES': 'Nombre de empresa; editable solo para una nueva empresa de un cliente corporativo',
    'ru-RU': 'Название компании; ввод разрешён только для новой компании корпоративного клиента',
  } },
  'issues': { description: {
    'en-GB': 'Draft questions; address mutations by local key, not by index or nullable database ID',
    'es-ES': 'Preguntas del borrador; usa la clave local para modificarlas',
    'ru-RU': 'Вопросы черновика; изменения адресуются по локальному ключу, а не индексу или nullable ID',
  } },
  'orders': { description: {
    'en-GB': 'Orders selected in this draft; not search results',
    'es-ES': 'Pedidos seleccionados en el borrador; no resultados de búsqueda',
    'ru-RU': 'Выбранные в черновике заказы; не результаты поиска',
  } },
  'orderItems': { description: {
    'en-GB': 'Order items selected in this draft; their IDs identify order positions',
    'es-ES': 'Posiciones de pedidos seleccionadas; los ID identifican posiciones',
    'ru-RU': 'Выбранные позиции заказов; идентификаторы относятся к позициям заказов',
  } },
  'dirty': { description: {
    'en-GB': 'The editor has unsaved changes, including embedded sections',
    'es-ES': 'El editor tiene cambios sin guardar, incluidas las secciones integradas',
    'ru-RU': 'В редакторе есть несохранённые изменения, включая вложенные разделы',
  } },
  'valid': { description: {
    'en-GB': 'Draft passes local validation; this does not guarantee permission or successful saving',
    'es-ES': 'El borrador supera la validación local; no garantiza permisos ni guardado',
    'ru-RU': 'Черновик проходит локальную валидацию; не гарантирует права или успешное сохранение',
  } },
  'loading': { description: {
    'en-GB': 'Editor initialization is in progress',
    'es-ES': 'Se está inicializando el editor',
    'ru-RU': 'Редактор загружается',
  } },
  'loadFailed': { description: {
    'en-GB': 'Editor initialization failed',
    'es-ES': 'La inicialización del editor falló',
    'ru-RU': 'Ошибка загрузки редактора',
  } },
  'saving': { description: {
    'en-GB': 'CRM is saving the form following a user action',
    'es-ES': 'El CRM está guardando el formulario por una acción del usuario',
    'ru-RU': 'CRM сохраняет форму по действию пользователя',
  } },
  'pending': { description: {
    'en-GB': 'A host operation blocks conflicting draft changes',
    'es-ES': 'Una operación del host bloquea cambios incompatibles',
    'ru-RU': 'Операция хоста блокирует конфликтующие изменения черновика',
  } },
  'errors': { description: {
    'en-GB': 'Published form errors; reading does not trigger validation',
    'es-ES': 'Errores publicados del formulario; leerlos no inicia la validación',
    'ru-RU': 'Опубликованные ошибки формы; чтение не запускает валидацию',
  } },
}

export const actions: ActionSchema<MethodList> = {
  'changeCustomerType': { accepts: cortegeOf([isCustomerType], ['type']), expects: isVoid },
  'selectCustomer': { accepts: cortegeOf([isNumber], ['customerId']), expects: isVoid },
  'unlinkCustomer': { accepts: cortegeOf([], []), expects: isVoid },
  'selectContact': { accepts: cortegeOf([isNumber], ['contactId']), expects: isVoid },
  'unlinkContact': { accepts: cortegeOf([], []), expects: isVoid },
  'selectCompany': { accepts: cortegeOf([isNumber], ['companyId']), expects: isVoid },
  'unlinkCompany': { accepts: cortegeOf([], []), expects: isVoid },
  'addIssue': { accepts: cortegeOf([], []), expects: isString },
  'updateIssue': { accepts: cortegeOf([isString, isTicketIssueDraftChanges], ['key', 'changes']), expects: isVoid },
  'removeIssue': { accepts: cortegeOf([isString], ['key']), expects: isVoid },
  'addOrder': { accepts: cortegeOf([isNumber], ['orderId']), expects: isVoid },
  'removeOrder': { accepts: cortegeOf([isNumber], ['orderId']), expects: isVoid },
  'addOrderItem': { accepts: cortegeOf([isNumber], ['orderItemId']), expects: isVoid },
  'removeOrderItem': { accepts: cortegeOf([isNumber], ['orderItemId']), expects: isVoid },
}

export const actionsDescription: ObjectDescription<ActionSchema<MethodList>> = {
  'changeCustomerType': {
    'en-GB': 'Changes the customer type in the draft and reconciles customer, contact and company fields',
    'es-ES': 'Cambia el tipo de cliente y concilia sus campos en el borrador',
    'ru-RU': 'Меняет тип клиента в черновике и согласует поля клиента, контакта и компании',
  },
  'selectCustomer': {
    'en-GB': 'Selects an existing customer of the current draft type; the host loads accessible data',
    'es-ES': 'Selecciona un cliente existente del tipo actual; el host carga los datos permitidos',
    'ru-RU': 'Выбирает существующего клиента текущего типа; хост загружает доступные данные',
  },
  'unlinkCustomer': {
    'en-GB': 'Unlinks the customer using the form rules; dependent fields may be cleared',
    'es-ES': 'Desvincula el cliente según las reglas del formulario; puede limpiar campos dependientes',
    'ru-RU': 'Открепляет клиента по правилам формы; зависимые поля могут очищаться',
  },
  'selectContact': {
    'en-GB': 'Selects an existing contact of the corporate customer in the draft',
    'es-ES': 'Selecciona un contacto existente del cliente corporativo',
    'ru-RU': 'Выбирает существующее контактное лицо корпоративного клиента в черновике',
  },
  'unlinkContact': {
    'en-GB': 'Unlinks the contact and clears its draft profile',
    'es-ES': 'Desvincula el contacto y limpia su perfil del borrador',
    'ru-RU': 'Открепляет контактное лицо и очищает его профиль в черновике',
  },
  'selectCompany': {
    'en-GB': 'Selects an existing company of the corporate customer in the draft',
    'es-ES': 'Selecciona una empresa existente del cliente corporativo',
    'ru-RU': 'Выбирает существующую компанию корпоративного клиента в черновике',
  },
  'unlinkCompany': {
    'en-GB': 'Unlinks the company and clears its draft name',
    'es-ES': 'Desvincula la empresa y limpia su nombre en el borrador',
    'ru-RU': 'Открепляет компанию и очищает её название в черновике',
  },
  'addIssue': {
    'en-GB': 'Adds a question with the form defaults and returns its local key',
    'es-ES': 'Añade una pregunta con los valores predeterminados y devuelve su clave local',
    'ru-RU': 'Добавляет вопрос с настройками формы по умолчанию и возвращает локальный ключ',
  },
  'updateIssue': {
    'en-GB': 'Applies a partial question update by local key; omitted properties remain unchanged',
    'es-ES': 'Actualiza una pregunta por clave local; los campos omitidos no cambian',
    'ru-RU': 'Частично меняет вопрос по локальному ключу; пропущенные поля сохраняются',
  },
  'removeIssue': {
    'en-GB': 'Removes a question from the draft by local key',
    'es-ES': 'Elimina una pregunta del borrador por su clave local',
    'ru-RU': 'Удаляет вопрос из черновика по локальному ключу',
  },
  'addOrder': {
    'en-GB': 'Adds an accessible existing order to the draft without duplicates',
    'es-ES': 'Añade un pedido existente permitido al borrador sin duplicados',
    'ru-RU': 'Добавляет доступный существующий заказ в черновик без дубликатов',
  },
  'removeOrder': {
    'en-GB': 'Removes an order and its selected items from the draft',
    'es-ES': 'Elimina un pedido y sus posiciones seleccionadas del borrador',
    'ru-RU': 'Убирает заказ и его выбранные позиции из черновика',
  },
  'addOrderItem': {
    'en-GB': 'Adds an accessible existing order position to the draft without duplicates',
    'es-ES': 'Añade una posición de pedido existente permitida sin duplicados',
    'ru-RU': 'Добавляет доступную существующую позицию заказа в черновик без дубликатов',
  },
  'removeOrderItem': {
    'en-GB': 'Removes an order position from the draft',
    'es-ES': 'Elimina una posición de pedido del borrador',
    'ru-RU': 'Убирает позицию заказа из черновика',
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useActions, useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/ticket/edit\'',
  call: 'const ticket = useContext(); const actions = useActions()',
}

const editorTypes: { [K in keyof KnownTypes]: { [F in keyof KnownTypes[K]]: string } } = {
  'TicketIssueDraft': isTicketIssueDraft.fields,
  'TicketIssueDraftChanges': isTicketIssueDraftChanges.fields,
  'TicketEditorOrder': isTicketEditorOrder.fields,
  'TicketEditorItem': isTicketEditorItem.fields,
  'TicketEditorError': isTicketEditorError.fields,
}

const editorTypesDescription: { [K in keyof KnownTypes]: ObjectDescription<KnownTypes[K]> } = {
  'TicketIssueDraft': {
    'id': {
      'en-GB': 'Saved question ID; null for new questions',
      'es-ES': 'ID guardado; null para preguntas nuevas',
      'ru-RU': 'Идентификатор сохранённого вопроса; null для нового',
    },
    'key': {
      'en-GB': 'Opaque local key scoped to this open editor',
      'es-ES': 'Clave local opaca de este editor abierto',
      'ru-RU': 'Непрозрачный локальный ключ в пределах открытого редактора',
    },
    'type': {
      'en-GB': 'Selected question type',
      'es-ES': 'Tipo de pregunta seleccionado',
      'ru-RU': 'Выбранный тип вопроса',
    },
    'topic': {
      'en-GB': 'Parent topic of the selected subtopic; derived by the host',
      'es-ES': 'Tema principal de la subcategoría; derivado por el host',
      'ru-RU': 'Родительская тема выбранной подтемы; определяется хостом',
    },
    'subtopic': {
      'en-GB': 'Selected subtopic',
      'es-ES': 'Subcategoría seleccionada',
      'ru-RU': 'Выбранная подтема',
    },
    'responsible': {
      'en-GB': 'Responsible user or group',
      'es-ES': 'Usuario o grupo responsable',
      'ru-RU': 'Ответственный пользователь или группа',
    },
    'status': {
      'en-GB': 'Selected question status',
      'es-ES': 'Estado seleccionado',
      'ru-RU': 'Выбранный статус вопроса',
    },
    'sla': {
      'en-GB': 'Saved SLA snapshot; null does not mean a new question has no SLA preview',
      'es-ES': 'Instantánea del SLA guardado; null no excluye una vista previa',
      'ru-RU': 'Снимок сохранённого SLA; null не исключает предварительный расчёт для нового вопроса',
    },
  },
  'TicketIssueDraftChanges': {
    'typeId': {
      'en-GB': 'Type ID; omitted preserves the selection, null clears it',
      'es-ES': 'ID del tipo; omitir conserva, null borra',
      'ru-RU': 'ID типа; отсутствие поля сохраняет выбор, null очищает',
    },
    'subtopicId': {
      'en-GB': 'Subtopic ID; its parent topic is resolved by the host',
      'es-ES': 'ID de subcategoría; el host resuelve su tema principal',
      'ru-RU': 'ID подтемы; родительская тема определяется хостом',
    },
    'responsible': {
      'en-GB': 'Responsible reference; omitted preserves, null clears',
      'es-ES': 'Referencia del responsable; omitir conserva, null borra',
      'ru-RU': 'Ссылка на ответственного; отсутствие сохраняет, null очищает',
    },
    'statusId': {
      'en-GB': 'Status ID; omitted preserves, null clears',
      'es-ES': 'ID de estado; omitir conserva, null borra',
      'ru-RU': 'ID статуса; отсутствие сохраняет, null очищает',
    },
  },
  'TicketEditorOrder': {
    'id': {
      'en-GB': 'Order ID',
      'es-ES': 'ID del pedido',
      'ru-RU': 'Идентификатор заказа',
    },
    'number': {
      'en-GB': 'Order number',
      'es-ES': 'Número del pedido',
      'ru-RU': 'Номер заказа',
    },
    'statusName': {
      'en-GB': 'Display name of the order status, not its code',
      'es-ES': 'Nombre del estado, no su código',
      'ru-RU': 'Отображаемое название статуса заказа, не код',
    },
    'manager': {
      'en-GB': 'Order manager display name',
      'es-ES': 'Nombre del gestor del pedido',
      'ru-RU': 'Имя менеджера заказа',
    },
    'total': {
      'en-GB': 'Order total and currency',
      'es-ES': 'Total y moneda del pedido',
      'ru-RU': 'Сумма и валюта заказа',
    },
    'createdAt': {
      'en-GB': 'Creation date in ISO 8601 format',
      'es-ES': 'Fecha de creación en formato ISO 8601',
      'ru-RU': 'Дата создания в формате ISO 8601',
    },
  },
  'TicketEditorItem': {
    'id': {
      'en-GB': 'Order position ID; not a product or offer ID',
      'es-ES': 'ID de posición; no ID del producto o variante',
      'ru-RU': 'Идентификатор позиции заказа; не товара или предложения',
    },
    'orderId': {
      'en-GB': 'Parent order ID',
      'es-ES': 'ID del pedido principal',
      'ru-RU': 'Идентификатор заказа',
    },
    'orderNumber': {
      'en-GB': 'Parent order number',
      'es-ES': 'Número del pedido principal',
      'ru-RU': 'Номер заказа',
    },
    'name': {
      'en-GB': 'Item name',
      'es-ES': 'Nombre de la posición',
      'ru-RU': 'Название позиции',
    },
    'article': {
      'en-GB': 'Item article',
      'es-ES': 'Artículo de la posición',
      'ru-RU': 'Артикул позиции',
    },
    'price': {
      'en-GB': 'Item price and currency',
      'es-ES': 'Precio y moneda de la posición',
      'ru-RU': 'Цена и валюта позиции',
    },
    'image': {
      'en-GB': 'Image URL or null',
      'es-ES': 'URL de imagen o null',
      'ru-RU': 'URL изображения или null',
    },
  },
  'TicketEditorError': {
    'path': {
      'en-GB': 'Public field path segments; an empty array targets the form, an issue key occupies one segment',
      'es-ES': 'Segmentos de ruta pública; una lista vacía indica el formulario, la clave de pregunta ocupa un segmento',
      'ru-RU': 'Сегменты публичного пути; пустой массив обозначает форму, ключ вопроса занимает один сегмент',
    },
    'code': {
      'en-GB': 'Constraint code if available',
      'es-ES': 'Código de restricción, si está disponible',
      'ru-RU': 'Код ограничения, если доступен',
    },
    'message': {
      'en-GB': 'Localized form error message',
      'es-ES': 'Mensaje de error localizado',
      'ru-RU': 'Локализованное сообщение об ошибке формы',
    },
  },
}

export const types = { ...sharedTypes, ...editorTypes }
export const typesDescription = { ...sharedTypesDescription, ...editorTypesDescription }

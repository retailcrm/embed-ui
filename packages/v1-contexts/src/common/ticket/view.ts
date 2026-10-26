import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'
import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
  ObjectDescription,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { KnownTypes } from '~generated/ticket/view.d.ts'
import type { MethodList, Schema } from '~types/ticket/view'

import {
  arrayOf,
  cortegeOf,
  isBoolean,
  isNull,
  isNumber,
  isString,
  isVoid,
  oneOf,
} from '@/predicates'

import {
  isTicketCompany,
  isTicketContact,
  isTicketGroup,
  isTicketIssue,
  isTicketPhone,
  isTicketReference,
  isTicketResponsibleInput,
  isTicketSla,
  isTicketStatus,
  isTicketStatusGroup,
  isTicketUser,
} from '@/predicates/ticket/view'

import { isCustomerType } from '@/predicates/customer'

export const id = 'ticket/view'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'site': {
    accepts: oneOf(isTicketReference, isNull),
    defaults: () => null,
    readonly: true,
  },
  'number': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'description': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'channelName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.type': {
    accepts: isCustomerType,
    defaults: () => 'customer',
    readonly: true,
  },
  'customer.name': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.email': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.phones': {
    accepts: arrayOf(isTicketPhone),
    defaults: () => [],
    readonly: true,
  },
  'customer.vip': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'customer.bad': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'contact': {
    accepts: oneOf(isTicketContact, isNull),
    defaults: () => null,
    readonly: true,
  },
  'company': {
    accepts: oneOf(isTicketCompany, isNull),
    defaults: () => null,
    readonly: true,
  },
  'issues': {
    accepts: arrayOf(isTicketIssue),
    defaults: () => [],
    readonly: true,
  },
  'sla': {
    accepts: oneOf(isTicketSla, isNull),
    defaults: () => null,
    readonly: true,
  },
  'canCreateEmail': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'canCreateOrder': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'loading': {
    accepts: isBoolean,
    defaults: () => true,
    readonly: true,
  },
  'loadFailed': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'pending': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'createdAt': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'id': {
    description: {
      'en-GB': 'Ticket ID',
      'es-ES': 'ID de la solicitud',
      'ru-RU': 'Идентификатор обращения',
    },
  },
  'site': {
    description: {
      'en-GB': 'Ticket store',
      'es-ES': 'Tienda de la solicitud',
      'ru-RU': 'Магазин обращения',
    },
  },
  'number': {
    description: {
      'en-GB': 'Ticket number',
      'es-ES': 'Número de la solicitud',
      'ru-RU': 'Номер обращения',
    },
  },
  'description': {
    description: {
      'en-GB': 'Ticket content',
      'es-ES': 'Contenido de la solicitud',
      'ru-RU': 'Содержание обращения',
    },
  },
  'channelName': {
    description: {
      'en-GB': 'Ticket channel name',
      'es-ES': 'Nombre del canal de la solicitud',
      'ru-RU': 'Название канала обращения',
    },
  },
  'customer.id': {
    description: {
      'en-GB': 'Customer ID; null when the ticket has no customer',
      'es-ES': 'ID del cliente; null si la solicitud no tiene cliente',
      'ru-RU': 'Идентификатор клиента; null, если клиент обращения не указан',
    },
  },
  'customer.type': {
    description: {
      'en-GB': 'Customer type: customer or customer_corporate, as in order/card',
      'es-ES': 'Tipo de cliente: customer o customer_corporate, como en order/card',
      'ru-RU': 'Тип клиента: customer или customer_corporate, как в order/card',
    },
  },
  'customer.name': {
    description: {
      'en-GB': 'Customer display name',
      'es-ES': 'Nombre del cliente',
      'ru-RU': 'Отображаемое имя клиента',
    },
  },
  'customer.email': {
    description: {
      'en-GB': 'Customer email',
      'es-ES': 'Correo electrónico del cliente',
      'ru-RU': 'Email клиента',
    },
  },
  'customer.phones': {
    description: {
      'en-GB': 'Phone numbers visible to the current user',
      'es-ES': 'Teléfonos visibles para el usuario actual',
      'ru-RU': 'Телефоны, доступные текущему пользователю',
    },
  },
  'customer.vip': {
    description: {
      'en-GB': 'VIP customer',
      'es-ES': 'Cliente VIP',
      'ru-RU': 'VIP-клиент',
    },
  },
  'customer.bad': {
    description: {
      'en-GB': 'Problematic customer',
      'es-ES': 'Cliente problemático',
      'ru-RU': 'Проблемный клиент',
    },
  },
  'contact': {
    description: {
      'en-GB': 'Ticket contact person, separate from the customer',
      'es-ES': 'Persona de contacto de la solicitud, distinta del cliente',
      'ru-RU': 'Контактное лицо обращения, отдельно от клиента',
    },
  },
  'company': {
    description: {
      'en-GB': 'Company selected for the ticket, not the customer main company',
      'es-ES': 'Empresa seleccionada para la solicitud, distinta de la empresa principal del cliente',
      'ru-RU': 'Компания, выбранная в обращении, а не основная компания клиента',
    },
  },
  'issues': {
    description: {
      'en-GB': 'Ticket questions; status and responsible belong to each question',
      'es-ES': 'Preguntas de la solicitud; cada una tiene su estado y responsable',
      'ru-RU': 'Вопросы обращения; статус и ответственный относятся к каждому вопросу',
    },
  },
  'sla': {
    description: {
      'en-GB': 'Ticket SLA',
      'es-ES': 'SLA de la solicitud',
      'ru-RU': 'SLA обращения',
    },
  },
  'canCreateEmail': {
    description: {
      'en-GB': 'Can create an email for this ticket by opening its editor, considering the customer, contact and user permissions; sending availability is checked separately',
      'es-ES': 'Se puede crear un correo para esta solicitud abriendo su formulario, según el cliente, contacto y permisos del usuario; la disponibilidad del envío se comprueba por separado',
      'ru-RU': 'Можно создать письмо для этого обращения через форму с учётом клиента, контактного лица и прав пользователя; доступность отправки проверяется отдельно',
    },
  },
  'canCreateOrder': {
    description: {
      'en-GB': 'Can open the order form for this ticket, considering its customer type and user permissions',
      'es-ES': 'Se puede abrir el formulario de pedido para esta solicitud, según el tipo de cliente y los permisos del usuario',
      'ru-RU': 'Можно открыть форму заказа для этого обращения с учётом типа клиента и прав пользователя',
    },
  },
  'loading': {
    description: {
      'en-GB': 'Ticket data is loading',
      'es-ES': 'Se están cargando los datos de la solicitud',
      'ru-RU': 'Данные обращения загружаются',
    },
  },
  'loadFailed': {
    description: {
      'en-GB': 'Loading failed; previously loaded data may be stale',
      'es-ES': 'La carga falló; los datos anteriores pueden estar desactualizados',
      'ru-RU': 'Загрузка завершилась ошибкой; ранее загруженные данные могут устареть',
    },
  },
  'pending': {
    description: {
      'en-GB': 'A host operation currently blocks conflicting actions',
      'es-ES': 'Una operación del host bloquea acciones incompatibles',
      'ru-RU': 'Операция хоста блокирует конфликтующие действия',
    },
  },
  'createdAt': {
    description: {
      'en-GB': 'Creation date in ISO 8601 format',
      'es-ES': 'Fecha de creación en formato ISO 8601',
      'ru-RU': 'Дата создания в формате ISO 8601',
    },
  },
}

export const actions: ActionSchema<MethodList> = {
  'createComment': {
    accepts: cortegeOf([isString], ['text']),
    expects: isNumber,
  },
  'changeIssueResponsible': {
    accepts: cortegeOf([isNumber, isTicketResponsibleInput], ['issueId', 'responsible']),
    expects: isVoid,
  },
  'changeIssueStatus': {
    accepts: cortegeOf([isNumber, isNumber], ['issueId', 'statusId']),
    expects: isVoid,
  },
  'openTicketEditor': {
    accepts: cortegeOf([]),
    expects: isVoid,
  },
  'openTicketHistory': {
    accepts: cortegeOf([]),
    expects: isVoid,
  },
  'openEmailEditor': {
    accepts: cortegeOf([]),
    expects: isVoid,
  },
  'openOrderForm': {
    accepts: cortegeOf([]),
    expects: isVoid,
  },
  'refresh': {
    accepts: cortegeOf([]),
    expects: isVoid,
  },
}

export const actionsDescription: ObjectDescription<ActionSchema<MethodList>> = {
  'createComment': {
    'en-GB': 'Creates a comment and returns its saved ID',
    'es-ES': 'Crea un comentario y devuelve su ID guardado',
    'ru-RU': 'Создаёт комментарий и возвращает идентификатор сохранённого комментария',
  },
  'changeIssueResponsible': {
    'en-GB': 'Saves a question responsible user or group',
    'es-ES': 'Guarda el usuario o grupo responsable de una pregunta',
    'ru-RU': 'Сохраняет ответственного пользователя или группу для вопроса',
  },
  'changeIssueStatus': {
    'en-GB': 'Saves a question status and updates the context after confirmation',
    'es-ES': 'Guarda el estado de una pregunta y actualiza el contexto tras la confirmación',
    'ru-RU': 'Сохраняет статус вопроса и обновляет контекст после подтверждения',
  },
  'openTicketEditor': {
    'en-GB': 'Opens the CRM ticket editor',
    'es-ES': 'Abre el editor de solicitudes del CRM',
    'ru-RU': 'Открывает редактор обращения в CRM',
  },
  'openTicketHistory': {
    'en-GB': 'Opens the CRM ticket history',
    'es-ES': 'Abre el historial de la solicitud en el CRM',
    'ru-RU': 'Открывает историю обращения в CRM',
  },
  'openEmailEditor': {
    'en-GB': 'Opens the email editor with the ticket context; does not send an email',
    'es-ES': 'Abre el formulario de correo con el contexto de la solicitud; no envía el correo',
    'ru-RU': 'Открывает форму письма с контекстом обращения; не отправляет письмо',
  },
  'openOrderForm': {
    'en-GB': 'Opens the new order form in a sidebar; CRM links the order to the ticket after saving',
    'es-ES': 'Abre el formulario de nuevo pedido en un panel lateral; el CRM vincula el pedido a la solicitud tras guardarlo',
    'ru-RU': 'Открывает форму нового заказа в шторке; CRM связывает заказ с обращением после сохранения',
  },
  'refresh': {
    'en-GB': 'Refreshes the published viewer data and waits for loading to complete',
    'es-ES': 'Actualiza los datos publicados del visor y espera a que termine la carga',
    'ru-RU': 'Обновляет опубликованные данные просмотрщика и ожидает завершения загрузки',
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useActions, useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/ticket/view\'',
  call: 'const ticket = useContext(); const actions = useActions()',
}

export const types: {
  [K in keyof KnownTypes]: { [F in keyof KnownTypes[K]]: string; }
} = {
  'TicketReference': isTicketReference.fields,
  'TicketStatusGroup': isTicketStatusGroup.fields,
  'TicketStatus': isTicketStatus.fields,
  'TicketUser': isTicketUser.fields,
  'TicketGroup': isTicketGroup.fields,
  'TicketResponsibleInput': isTicketResponsibleInput.fields,
  'TicketSla': isTicketSla.fields,
  'TicketIssue': isTicketIssue.fields,
  'TicketPhone': isTicketPhone.fields,
  'TicketContact': isTicketContact.fields,
  'TicketCompany': isTicketCompany.fields,
}

export const typesDescription: {
  [K in keyof KnownTypes]: ObjectDescription<KnownTypes[K]>
} = {
  'TicketReference': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
  },
  'TicketStatusGroup': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'code': {
      'en-GB': 'Symbolic code',
      'es-ES': 'Código simbólico',
      'ru-RU': 'Символьный код',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
  },
  'TicketStatus': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'code': {
      'en-GB': 'Symbolic code',
      'es-ES': 'Código simbólico',
      'ru-RU': 'Символьный код',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
    'group': {
      'en-GB': 'Status group',
      'es-ES': 'Grupo del estado',
      'ru-RU': 'Группа статуса',
    },
  },
  'TicketUser': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'kind': {
      'en-GB': 'Entity kind',
      'es-ES': 'Clase de entidad',
      'ru-RU': 'Вид сущности',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
  },
  'TicketGroup': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'kind': {
      'en-GB': 'Entity kind',
      'es-ES': 'Clase de entidad',
      'ru-RU': 'Вид сущности',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
  },
  'TicketResponsibleInput': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'kind': {
      'en-GB': 'Entity kind',
      'es-ES': 'Clase de entidad',
      'ru-RU': 'Вид сущности',
    },
  },
  'TicketSla': {
    'status': {
      'en-GB': 'SLA state: normal, warning or urgent',
      'es-ES': 'Estado del SLA: normal, warning o urgent',
      'ru-RU': 'Состояние SLA: normal, warning или urgent',
    },
    'duration': {
      'en-GB': 'SLA duration in seconds',
      'es-ES': 'Duración del SLA en segundos',
      'ru-RU': 'Длительность SLA в секундах',
    },
    'remainingDuration': {
      'en-GB': 'Remaining SLA time in seconds; null when unavailable',
      'es-ES': 'Tiempo restante del SLA en segundos; null si no está disponible',
      'ru-RU': 'Оставшееся время SLA в секундах; null, если недоступно',
    },
    'closedAt': {
      'en-GB': 'Closure date in ISO 8601 format or null',
      'es-ES': 'Fecha de cierre en formato ISO 8601 o null',
      'ru-RU': 'Дата закрытия в формате ISO 8601 или null',
    },
  },
  'TicketIssue': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'type': {
      'en-GB': 'Question type',
      'es-ES': 'Tipo de pregunta',
      'ru-RU': 'Тип вопроса',
    },
    'topic': {
      'en-GB': 'Question topic',
      'es-ES': 'Tema de la pregunta',
      'ru-RU': 'Тема вопроса',
    },
    'subtopic': {
      'en-GB': 'Question subtopic',
      'es-ES': 'Subtema de la pregunta',
      'ru-RU': 'Подтема вопроса',
    },
    'responsible': {
      'en-GB': 'Responsible user or group; TicketUser | TicketGroup',
      'es-ES': 'Usuario o grupo responsable; TicketUser | TicketGroup',
      'ru-RU': 'Ответственный пользователь или группа; TicketUser | TicketGroup',
    },
    'status': {
      'en-GB': 'Question status',
      'es-ES': 'Estado de la pregunta',
      'ru-RU': 'Статус вопроса',
    },
    'sla': {
      'en-GB': 'Question SLA',
      'es-ES': 'SLA de la pregunta',
      'ru-RU': 'SLA вопроса',
    },
    'closedAt': {
      'en-GB': 'Closure date in ISO 8601 format or null',
      'es-ES': 'Fecha de cierre en formato ISO 8601 o null',
      'ru-RU': 'Дата закрытия в формате ISO 8601 или null',
    },
  },
  'TicketPhone': {
    'number': {
      'en-GB': 'Phone number',
      'es-ES': 'Número de teléfono',
      'ru-RU': 'Номер телефона',
    },
    'numberCanonical': {
      'en-GB': 'Canonical phone number or null',
      'es-ES': 'Número de teléfono canónico o null',
      'ru-RU': 'Канонический номер телефона или null',
    },
  },
  'TicketContact': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
    'email': {
      'en-GB': 'Email address or null',
      'es-ES': 'Correo electrónico o null',
      'ru-RU': 'Email или null',
    },
    'phones': {
      'en-GB': 'Phone numbers visible to the current user',
      'es-ES': 'Teléfonos visibles para el usuario actual',
      'ru-RU': 'Телефоны, доступные текущему пользователю',
    },
  },
  'TicketCompany': {
    'id': {
      'en-GB': 'ID',
      'es-ES': 'ID',
      'ru-RU': 'Идентификатор',
    },
    'name': {
      'en-GB': 'Name',
      'es-ES': 'Nombre',
      'ru-RU': 'Название',
    },
    'inn': {
      'en-GB': 'Taxpayer identification number or null',
      'es-ES': 'Número de identificación fiscal o null',
      'ru-RU': 'ИНН или null',
    },
    'kpp': {
      'en-GB': 'Tax registration reason code or null',
      'es-ES': 'Código de registro fiscal o null',
      'ru-RU': 'КПП или null',
    },
  },
}

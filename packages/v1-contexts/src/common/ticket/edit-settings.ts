import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'
import type { Schema } from '~types/ticket/edit-settings'

import { arrayOf, isBoolean } from '@/predicates'
import { isTicketEditorTopic } from '@/predicates/ticket/edit'
import { isTicketReference, isTicketStatus } from '@/predicates/ticket/view'
import {
  types as sharedTypes,
  typesDescription as sharedTypesDescription,
} from '@/common/ticket/view'

export const id = 'ticket/edit:settings'

export const schema: Schema = {
  'statuses': { accepts: arrayOf(isTicketStatus), defaults: () => [], readonly: true },
  'types': { accepts: arrayOf(isTicketReference), defaults: () => [], readonly: true },
  'topics': { accepts: arrayOf(isTicketEditorTopic), defaults: () => [], readonly: true },
  'channels': { accepts: arrayOf(isTicketReference), defaults: () => [], readonly: true },
  'creatable': { accepts: isBoolean, defaults: () => false, readonly: true },
  'editable': { accepts: isBoolean, defaults: () => false, readonly: true },
  'canCreateCustomer': { accepts: isBoolean, defaults: () => false, readonly: true },
  'canCreateCorporateCustomer': { accepts: isBoolean, defaults: () => false, readonly: true },
}

export const description: ContextSchemaDescription<Schema> = {
  'statuses': { description: {
    'en-GB': 'Shared catalog of active question statuses',
    'es-ES': 'Catálogo común de estados activos de preguntas',
    'ru-RU': 'Общий справочник активных статусов вопросов',
  } },
  'types': { description: {
    'en-GB': 'Shared catalog of active question types',
    'es-ES': 'Catálogo común de tipos activos de preguntas',
    'ru-RU': 'Общий справочник активных типов вопросов',
  } },
  'topics': { description: {
    'en-GB': 'Active parent topics with their active subtopics',
    'es-ES': 'Temas activos con sus subcategorías activas',
    'ru-RU': 'Активные темы с их активными подтемами',
  } },
  'channels': { description: {
    'en-GB': 'Shared catalog of active ticket channels',
    'es-ES': 'Catálogo común de canales activos',
    'ru-RU': 'Общий справочник активных каналов обращений',
  } },
  'creatable': { description: {
    'en-GB': 'User has permission to create tickets; does not express draft validity',
    'es-ES': 'El usuario puede crear solicitudes; no indica validez del borrador',
    'ru-RU': 'Пользователь имеет право создавать обращения; не признак корректности черновика',
  } },
  'editable': { description: {
    'en-GB': 'User has permission to edit tickets',
    'es-ES': 'El usuario puede editar solicitudes',
    'ru-RU': 'Пользователь имеет право редактировать обращения',
  } },
  'canCreateCustomer': { description: {
    'en-GB': 'User has permission to create individual customers',
    'es-ES': 'El usuario puede crear clientes individuales',
    'ru-RU': 'Пользователь имеет право создавать физических лиц',
  } },
  'canCreateCorporateCustomer': { description: {
    'en-GB': 'User has permission to create corporate customers and their new contacts/companies in the form',
    'es-ES': 'El usuario puede crear clientes corporativos y nuevos contactos o empresas en el formulario',
    'ru-RU': 'Пользователь имеет право создавать корпоративных клиентов и их новые контакты/компании в форме',
  } },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/ticket/edit-settings\'',
  call: 'const settings = useContext()',
}

export const types = { ...sharedTypes, TicketEditorTopic: isTicketEditorTopic.fields }
export const typesDescription = {
  ...sharedTypesDescription,
  TicketEditorTopic: {
    id: { 'en-GB': 'Topic ID', 'es-ES': 'ID del tema', 'ru-RU': 'Идентификатор темы' },
    name: { 'en-GB': 'Topic name', 'es-ES': 'Nombre del tema', 'ru-RU': 'Название темы' },
    subtopics: { 'en-GB': 'Subtopics belonging to this topic', 'es-ES': 'Subcategorías de este tema', 'ru-RU': 'Подтемы, принадлежащие этой теме' },
  },
}

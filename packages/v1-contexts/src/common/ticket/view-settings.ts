import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/ticket/view-settings'

import { arrayOf, isBoolean } from '@/predicates'

import { typesDescription as ticketTypesDescription } from '@/common/ticket/view'

import { isTicketStatus, isTicketStatusGroup } from '@/predicates/ticket/view'

export const id = 'ticket/view:settings'

export const schema: Schema = {
  'statuses': {
    accepts: arrayOf(isTicketStatus),
    defaults: () => [],
    readonly: true,
  },
  'editable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'commentable': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'statuses': {
    description: {
      'en-GB': 'Active question statuses from active groups; a shared catalog, not transitions for a particular ticket',
      'es-ES': 'Estados activos de preguntas de grupos activos; catálogo común, no transiciones de una solicitud concreta',
      'ru-RU': 'Активные статусы вопросов из активных групп; общий справочник, а не переходы конкретного обращения',
    },
  },
  'editable': {
    description: {
      'en-GB': 'User can edit tickets and change question status or responsible',
      'es-ES': 'El usuario puede editar solicitudes y cambiar el estado o responsable de una pregunta',
      'ru-RU': 'Пользователь может редактировать обращения, менять статус и ответственного вопроса',
    },
  },
  'commentable': {
    description: {
      'en-GB': 'User can add comments to tickets',
      'es-ES': 'El usuario puede añadir comentarios a las solicitudes',
      'ru-RU': 'Пользователь может добавлять комментарии к обращениям',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/ticket/view-settings\'',
  call: 'const settings = useContext()',
}

export const types = {
  'TicketStatusGroup': isTicketStatusGroup.fields,
  'TicketStatus': isTicketStatus.fields,
}

export const typesDescription = {
  'TicketStatusGroup': ticketTypesDescription.TicketStatusGroup,
  'TicketStatus': ticketTypesDescription.TicketStatus,
}

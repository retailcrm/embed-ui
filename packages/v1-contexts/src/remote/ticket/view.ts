import type { ContextStoreDefinition } from '@retailcrm/embed-ui-v1-contexts/remote'
import type {
  MethodList,
  Schema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

import { defineActions, defineContext } from '@/remote'

import { actions, id, schema as ticketSchema } from '@/common/ticket/view'

export const schema: Schema = ticketSchema

export const useActions: () => MethodList = defineActions(id, actions)
export const useContext: ContextStoreDefinition<'ticket/view', Schema> = defineContext(id, schema)

import type { ContextStoreDefinition } from '@retailcrm/embed-ui-v1-contexts/remote'
import type {
  MethodList,
  Schema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/edit'

import { defineActions, defineContext } from '@/remote'

import { actions, id, schema as ticketSchema } from '@/common/ticket/edit'

// A public type annotation avoids internal paths in the generated NodeNext declaration.
export const schema: Schema = ticketSchema

export const useActions: () => MethodList = defineActions(id, actions)
export const useContext: ContextStoreDefinition<'ticket/edit', Schema> = defineContext(id, schema)

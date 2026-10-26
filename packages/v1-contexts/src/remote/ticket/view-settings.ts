import type { ContextStoreDefinition } from '@retailcrm/embed-ui-v1-contexts/remote'
import type { Schema } from '@retailcrm/embed-ui-v1-contexts/types/ticket/view-settings'

import { defineContext } from '@/remote'

import { id, schema as settingsSchema } from '@/common/ticket/view-settings'

// A public type annotation avoids internal paths in the generated NodeNext declaration.
export const schema: Schema = settingsSchema

export const useContext: ContextStoreDefinition<'ticket/view:settings', Schema> = defineContext(id, schema)

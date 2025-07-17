import type { ContextSchema } from './context'
import type { TranslationList } from './doc'

export type ObjectDescription<T extends object> = {
  [K in keyof T]: TranslationList
}

export type ContextSchemaDescription<S extends ContextSchema> = {
  [K in keyof S]: {
    description: TranslationList;
  }
}

export type ContextSchemaUsage = {
  import: string;
  call: string;
}

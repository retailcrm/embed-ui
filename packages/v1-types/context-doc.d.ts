import type { ContextSchema } from './context'
import type { TranslationList } from './doc'

export type ContextSchemaDescription<S extends ContextSchema> = {
  [K in keyof S]: {
    description: TranslationList;
  }
}

export type ContextSchemaUsage = {
  import: string;
  call: string;
}

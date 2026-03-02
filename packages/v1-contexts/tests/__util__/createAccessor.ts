import type {
  ContextSchema,
  FieldAccessor,
  FieldGetters,
  FieldSetters,
} from '@retailcrm/embed-ui-v1-types/context'

import { createHandler } from '@retailcrm/embed-ui-v1-testing/lib/createHandler'

import { createGetter, createSetter } from '@/host'

export const createAccessor = <S extends ContextSchema>(
  id: string,
  getters: FieldGetters<S>,
  setters: FieldSetters<S>
) => {
  return {
    get: createGetter(id, getters),
    set: createSetter(id, setters),
    on: createHandler(id, getters),
  } as FieldAccessor<S>
}
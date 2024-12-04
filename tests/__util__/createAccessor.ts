import {
  ContextSchema,
  FieldAccessor,
  FieldGetters,
  FieldSetters,
} from '@retailcrm/embed-ui-v1-types/context'

import {
  createGetter,
  createSetter,
} from '@retailcrm/embed-ui-v1-contexts/host'

import { createHandler } from '@retailcrm/embed-ui-v1-testing/lib/createHandler'

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
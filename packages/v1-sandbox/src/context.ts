import type {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaList,
  CustomContextAccessor,
  CustomDictionary,
  CustomDictionaryFilter,
  CustomFieldType,
  FieldAccessor,
  FieldGetters,
  FieldSetters,
  Writable,
} from '@retailcrm/embed-ui-v1-types/context'

import type { SandboxState } from '@/state'

import { release, retain } from '@remote-ui/rpc'
import { watch } from 'vue'

import { createContextAccessor, createGetter } from '@retailcrm/embed-ui-v1-contexts/host'
import { createHandler } from '@retailcrm/embed-ui-v1-testing/lib/createHandler'
import { createSetter, LogicalError } from '@retailcrm/embed-ui-v1-contexts/host'

import { clone, keysOf } from '@/utils'

export const createSandboxContextAccessor = <M extends ContextSchemaList>(
  schemas: M,
  state: SandboxState<M>
): ContextAccessor<M> => createContextAccessor(
    keysOf(schemas).reduce((accessors, context) => {
      accessors[context] = createFieldAccessor(
        String(context),
        schemas[context],
        state.contexts[context]
      )

      return accessors
    }, {} as {
    [K in keyof M]: FieldAccessor<M[K]>;
  })
  )

export const createSandboxCustomContextAccessor = <M extends ContextSchemaList>(
  state: SandboxState<M>
): CustomContextAccessor => ({
    async getCustomDictionary(code, filter = {}, onReject = null) {
      retain(onReject)

      try {
        const dictionary = state.custom.dictionaries[code]

        if (!dictionary) {
          throw new LogicalError(`Dictionary ${code} is not available`)
        }

        return sliceDictionary(dictionary, filter)
      } catch (error) {
        onReject?.({
          message: error instanceof Error ? error.message : String(error),
        })

        throw error
      } finally {
        release(onReject)
      }
    },

    getCustomField(entity, code, onReject = null) {
      try {
        const field = getCustomEntity(state, entity).values[code]

        if (field === undefined) {
          throw new LogicalError(`Custom field ${code} is not available in entity ${entity}`)
        }

        return clone(field)
      } catch (error) {
        onReject?.({
          message: error instanceof Error ? error.message : String(error),
        })

        throw error
      }
    },

    getCustomSchema(entity, onReject = null) {
      try {
        return clone(getCustomEntity(state, entity).schema)
      } catch (error) {
        onReject?.({
          message: error instanceof Error ? error.message : String(error),
        })

        throw error
      }
    },

    onCustomFieldChange(entity, code, handler, onReject = null) {
      try {
        getCustomEntity(state, entity)

        retain(handler)

        const stop = watch(() => state.custom.entities[entity]?.values[code], (value) => {
          handler(clone(value) as CustomFieldType)
        })

        return () => {
          release(handler)
          stop()
        }
      } catch (error) {
        onReject?.({
          message: error instanceof Error ? error.message : String(error),
        })

        throw error
      }
    },

    setCustomField(entity, code, value, onReject = null) {
      try {
        const customEntity = getCustomEntity(state, entity)
        const field = customEntity.schema.fields.find(item => item.code === code)

        if (!field) {
          throw new LogicalError(`Custom field ${code} is not available in entity ${entity}`)
        }

        if (field.readonly) {
          throw new LogicalError(`Custom field ${code} is readonly in entity ${entity}`)
        }

        customEntity.values[code] = clone(value)
      } catch (error) {
        onReject?.({
          message: error instanceof Error ? error.message : String(error),
        })

        throw error
      }
    },
  })

const createFieldAccessor = <S extends ContextSchema>(
  id: string,
  schema: S,
  values: Context<S>
): FieldAccessor<S> => {
  const getters = keysOf(schema).reduce((all, field) => {
    all[field] = () => values[field]

    return all
  }, {} as FieldGetters<S>)

  const setters = keysOf(schema).reduce((all, field) => {
    if (schema[field].readonly) {
      return all
    }

    all[field as keyof Writable<S>] = (value) => {
      values[field] = clone(value)
    }

    return all
  }, {} as FieldSetters<S>)

  return {
    get: createGetter(id, getters),
    on: createHandler(id, getters),
    set: createSetter(id, setters),
  }
}

const getCustomEntity = <M extends ContextSchemaList>(state: SandboxState<M>, entity: string) => {
  const customEntity = state.custom.entities[entity]

  if (!customEntity) {
    throw new LogicalError(`Custom entity ${entity} is not available`)
  }

  return customEntity
}

const sliceDictionary = (
  dictionary: CustomDictionary,
  filter: CustomDictionaryFilter
) => {
  let items = clone(dictionary)

  if (filter.after) {
    const index = items.findIndex(item => item.cursor === filter.after)

    items = index === -1 ? [] : items.slice(index + 1)
  }

  if (typeof filter.first === 'number') {
    items = items.slice(0, filter.first)
  }

  return items
}

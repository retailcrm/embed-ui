import type {
  CustomField,
  CustomFieldKind,
  CustomFieldType,
  CustomContext,
  CustomContextAccessor,
  CustomContextSchema,
  CustomDictionary,
  Rejection,
  RejectionHandler,
} from '@retailcrm/embed-ui-v1-types/context'

import type { Endpoint } from '@remote-ui/rpc'
import type { Maybe } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { PiniaPluginContext } from 'pinia'

import { defineStore } from 'pinia'

export const CustomContextAccessorKey = Symbol('CustomContextAccessor')

declare module 'pinia' {
  // noinspection JSUnusedGlobalSymbols
  export interface PiniaCustomProperties {
    [CustomContextAccessorKey]: Endpoint<CustomContextAccessor>['call']
  }
}

// noinspection JSUnusedGlobalSymbols
export const injectAccessor = (endpoint: Endpoint<CustomContextAccessor>) => {
  return (context: PiniaPluginContext) => {
    context.store[CustomContextAccessorKey] = endpoint.call
  }
}

// noinspection JSUnusedGlobalSymbols
export const isTypeOf = <T extends CustomFieldKind>(field: CustomField, type: T): field is CustomField<T> => {
  return field.kind === type
}

export const defineContext = <T extends string>(entity: T) => defineStore(`custom/${entity}`, {
  state () {
    return {
      schema: null as CustomContextSchema | null,
      values: {} as CustomContext,
    }
  },

  getters: {
    entity: () => entity,
  },

  actions: {
    async initialize (onReject: Maybe<RejectionHandler> = null) {
      const accessor = this[CustomContextAccessorKey]
      const schema = await accessor.getCustomSchema(entity, onReject)
      if (!schema) {
        return null
      }

      this.schema = schema
      this.values = schema.fields.reduce((state, field) => {
        state[field.code] = Array.isArray(field.initial)
          ? [...field.initial]
          : field.initial

        return state
      }, {} as CustomContext)

      schema.fields.forEach(field => {
        accessor.onCustomFieldChange(entity, field.code, (value) => {
          this.values[field.code] = value
        })
      })

      return schema
    },

    set (code: string, value: CustomFieldType, onReject: Maybe<RejectionHandler> = null) {
      if (!this.schema) {
        throw new Error(`[crm:embed:remote] Custom context for entity=${entity} is not initialized`)
      }

      const field = this.schema.fields.find(f => f.code === code)
      if (!field) {
        throw new Error(`[crm:embed:remote] Custom context for entity=${entity} does not contain field with code ${code}`)
      }

      guardReadonly(entity, field)
      guardType(entity, field, value)

      this.values[code] = value
      this[CustomContextAccessorKey].setCustomField(entity, code, value, onReject)
    },
  },
})

export const useContext = <T extends string>(entity: T) => defineContext(entity)()

// noinspection JSUnusedGlobalSymbols
export type CustomContextStore<T extends string> = ReturnType<CustomContextStoreDefinition<T>>
export type CustomContextStoreDefinition<T extends string> = ReturnType<typeof defineContext<T>>

function guardReadonly (entity: string, field: CustomField) {
  if (field.readonly) {
    throw new Error(`[crm:embed:remote] Field with code ${field.code} is not writable according to schema for entity=${entity}`)
  }
}

function guardType (entity: string, field: CustomField, value: CustomFieldType) {
  if (!accepts(field, value)) {
    throw new Error(`[crm:embed:remote] Invalid value for field kind ${field.kind} with code ${field.code} in entity=${entity}`)
  }
}

function accepts (field: CustomField, value: CustomFieldType) {
  switch (field.kind) {
    case 'boolean':
      return typeof value === 'boolean'
    case 'date':
      return typeof value === 'string' || value === null
    case 'datetime':
      return typeof value === 'string' || value === null
    case 'dictionary':
      return typeof value === 'string' || value === null
    case 'multiselect_dictionary':
      return Array.isArray(value) && (value.length === 0 || value.every((v: unknown) => typeof v === 'string'))
    case 'email':
      return typeof value === 'string' || value === null
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value) || value === null
    case 'numeric':
      return typeof value === 'number' || value === null
    case 'string':
    case 'text':
      return typeof value === 'string' || value === null
    default:
      return false
  }
}

export const useDictionary = defineStore('@retailcrm/embed-ui/_dictionary', {
  actions: {
    async query (code: string, parameters: {
      after?: string;
      first?: number;
    } = {}) {
      const accessor = this[CustomContextAccessorKey]

      return new Promise<CustomDictionary>((resolve, reject) => {
        let rejection: Rejection | null = null

        accessor.getCustomDictionary(code, parameters, r => rejection = r).then(dictionary => {
          if (!rejection) {
            resolve(dictionary)
          } else {
            reject(rejection)
          }
        })
      })
    },
  },
})

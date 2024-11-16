import type {
  Context,
  ContextAccessor,
  ContextSchema,
  EventMap,
  Writable,
  TypeOf,
} from '~types/context/schema'

import type { Endpoint } from '@remote-ui/rpc'

import { defineStore } from 'pinia'
import { keysOf } from '@/utilities'

export const defineContext = <Id extends string, S extends ContextSchema>(
  id: Id,
  schema: S
) => {
  return defineStore(id, {
    state(): Context<S> {
      return {
        ...keysOf(schema).reduce((state, field) => ({
          ...state,
          [field]: schema[field].defaults(),
        }), {} as Context<S>),
      }
    },

    getters: {
      schema: () => schema,
    },

    actions: {
      async initialize() {
        const context = this as Context<S>
        const endpoint = this.endpoint as Endpoint<ContextAccessor<{
          [key: string]: S,
        }>>

        const state = await endpoint.call.get(id, '~') as Context<S>

        keysOf(schema).forEach(field => {
          context[field] = state[field]
          endpoint.call.on(id, `change:${field as string}` as keyof EventMap<S>, (value) => {
            context[field] = value as TypeOf<S[typeof field]>
          })
        })
      },

      set<F extends keyof Writable<S>>(field: F, value: TypeOf<S[F]>) {
        if (!(field in schema)) {
          throw new Error(`[crm:embed:remote] Field ${String(field)} is not present in context ${id}`)
        }

        if (schema[field].readonly) {
          throw new Error(`[crm:embed:remote] Field ${String(field)} is readonly in context ${id}`)
        }

        if (!schema[field].accepts(value)) {
          throw new Error(`[crm:embed:remote] Invalid value for field ${String(field)} in context ${id}`)
        }

        const context = this as Context<S>
        const endpoint = this.endpoint as Endpoint<ContextAccessor<{
          [key: string]: S,
        }>>

        context[field] = value
        endpoint.call.set(id, field, value)
      },
    },
  })
}

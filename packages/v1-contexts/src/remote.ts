import type {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaMap,
  EventMap,
  RejectionHandler,
  TypeOf,
  Writable,
} from '@retailcrm/embed-ui-v1-types/context'

import type { Endpoint } from '@remote-ui/rpc'

import type { Maybe } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { PiniaPluginContext } from 'pinia'

import { defineStore } from 'pinia'
import { keysOf } from '@/utilities'

declare module 'pinia' {
  // noinspection JSUnusedGlobalSymbols
  export interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor>
  }
}

export const injectEndpoint = <
  M extends ContextSchemaMap,
  A extends ContextAccessor<M> = ContextAccessor<M>
>(endpoint: Endpoint<A>) => {
  return (context: PiniaPluginContext) => {
    context.store.endpoint = endpoint as Endpoint<ContextAccessor>
  }
}

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

        const state = await endpoint.call.get(id, '~', (rejection) => {
          console.error(rejection)
        }) as Context<S>

        if (!state) {
          return
        }

        keysOf(schema).forEach(field => {
          context[field] = state[field]
          endpoint.call.on(id, `change:${field as string}` as keyof EventMap<S>, (value) => {
            context[field] = value as TypeOf<S[typeof field]>
          })
        })
      },

      set<F extends keyof Writable<S>>(field: F, value: TypeOf<S[F]>, onReject: Maybe<RejectionHandler> = null) {
        guard(id, schema, field, value)

        const context = this as Context<S>
        const endpoint = this.endpoint as Endpoint<ContextAccessor<{
          [key: string]: S,
        }>>

        context[field] = value
        endpoint.call.set(id, field, value, onReject)
      },
    },
  })
}

export type ContextStore<S extends ContextSchema> = ReturnType<ContextStoreDefinition<string, S>>
export type ContextStoreDefinition<
  Id extends string,
  S extends ContextSchema
> = ReturnType<typeof defineContext<Id, S>>

function guard<
  S extends ContextSchema,
  F extends keyof Writable<S>
>(id: string, schema: S, field: F, value: TypeOf<S[F]>) {
  if (!(field in schema)) {
    throw new Error(`[crm:embed:remote] Field ${String(field)} is not present in context ${id}`)
  }

  if (schema[field].readonly) {
    throw new Error(`[crm:embed:remote] Field ${String(field)} is readonly in context ${id}`)
  }

  if (!schema[field].accepts(value)) {
    throw new Error(`[crm:embed:remote] Invalid value for field ${String(field)} in context ${id}`)
  }
}
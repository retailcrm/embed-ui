import type {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaMap,
  EventMap,
  Writable,
  TypeOf,
  IsReadonly,
} from '~types/context/schema'

import type { Endpoint } from '@remote-ui/rpc'

import type {
  ComputedRef,
  WritableComputedRef,
} from 'vue'

import type { PiniaPluginContext, Store } from 'pinia'

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { keysOf } from '@/utilities'

declare module 'pinia' {
  // noinspection JSUnusedGlobalSymbols
  export interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor>
  }
}

export const injectAccessor = <M extends ContextSchemaMap>(endpoint: Endpoint<ContextAccessor<M>>) => {
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

        const state = await endpoint.call.get(id, '~') as Context<S>

        keysOf(schema).forEach(field => {
          context[field] = state[field]
          endpoint.call.on(id, `change:${String(field)}` as keyof EventMap<S>, (value) => {
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

type Computed<S extends ContextSchema, F extends keyof S> = IsReadonly<S[F]> extends true
  ? ComputedRef<TypeOf<S[F]>>
  : WritableComputedRef<TypeOf<S[F]>>

export const useField = <S extends ContextSchema, F extends keyof S>(
  store: Store<string, Context<S>, {
    schema (): S;
  }, {
    initialize(): Promise<void>;
    set<F extends keyof Writable<S>>(field: F, value: TypeOf<S[F]>): void;
  }>,
  field: F
): Computed<S, F> => {
  if (store.schema[field].readonly) {
    return computed(() => (store as Context<S>)[field]) as Computed<S, F>
  }

  return computed({
    get: () => (store as Context<S>)[field],
    set: (value: TypeOf<S[F]>): void => {
      store.set(field, value)
    },
  }) as Computed<S, F>
}

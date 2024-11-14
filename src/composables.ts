import type { Callable } from '~types/host/callable'

import type {
  Context,
  ContextSchema,
  IsReadonly,
  TypeOf,
  Writable,
} from '~types/context/schema'

import type { RemoteCallable } from '@remote-ui/rpc'

import type { Store } from 'pinia'

import type {
  ComputedRef,
  WritableComputedRef,
} from 'vue'

import { computed } from 'vue'
import { defineStore } from 'pinia'

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

const useInternal = defineStore('@retailcrm/embed-ui/_internal', {})

export const useHost = (): RemoteCallable<Callable> => {
  const store = useInternal()

  return {
    httpCall (action, payload = undefined) {
      return payload
        ? store.endpoint.call.httpCall(action, payload)
        : store.endpoint.call.httpCall(action)
    },
  }
}

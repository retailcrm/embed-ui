import type { Callable } from '~types/host/callable'

import type {
  Context,
  ContextAccessor,
  ContextSchema,
  IsReadonly,
  RejectionHandler,
  TypeOf,
} from '@retailcrm/embed-ui-v1-types/context'

import type { ContextStore } from '@retailcrm/embed-ui-v1-contexts/remote'

import type { Endpoint, RemoteCallable } from '@remote-ui/rpc'

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
  store: ContextStore<S>,
  field: F,
  onReject: RejectionHandler | null = null
): Computed<S, F> => {
  if (store.schema[field].readonly) {
    return computed(() => (store as Context<S>)[field]) as Computed<S, F>
  }

  const set = store.set as (field: F, value: TypeOf<S[F]>, onReject: RejectionHandler) => void

  const _onReject: RejectionHandler = (rejection) => console.error(rejection)

  return computed({
    get: () => (store as Context<S>)[field],
    set: (value: TypeOf<S[F]>): void => set(field, value, onReject ?? _onReject),
  }) as Computed<S, F>
}

const useInternal = defineStore('@retailcrm/embed-ui/_internal', {})

export const useHost = (): RemoteCallable<Callable> => {
  const store = useInternal()

  return {
    httpCall (action, payload = undefined) {
      const endpoint = store.endpoint as Endpoint<ContextAccessor & Callable>

      return payload
        ? endpoint.call.httpCall(action, payload)
        : endpoint.call.httpCall(action)
    },
  }
}

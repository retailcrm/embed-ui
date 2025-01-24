import type { Callable } from '~types/host/callable'

import type { RouteParams } from '@omnicajs/symfony-router'

import {
  Context,
  ContextAccessor,
  ContextSchema,
  CustomField,
  CustomFieldKind,
  IsReadonly,
  RejectionHandler,
  TypeOf,
  TypeOfCustom,
} from '@retailcrm/embed-ui-v1-types/context'

import type { ContextStore } from '@retailcrm/embed-ui-v1-contexts/remote'
import type { CustomContextStore } from '@retailcrm/embed-ui-v1-contexts/remote/custom'

import type { Endpoint, RemoteCallable } from '@remote-ui/rpc'

import { Router } from '@omnicajs/symfony-router'

import type {
  ComputedRef,
  WritableComputedRef,
} from 'vue'

import {
  computed,
  shallowRef,
  watch,
} from 'vue'

import { defineStore } from 'pinia'

import { useContext as useSettings } from '@retailcrm/embed-ui-v1-contexts/remote/settings'

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

type ComputedCustom<K extends CustomFieldKind, R extends boolean> = R extends false
  ? WritableComputedRef<TypeOfCustom<K> | null, TypeOfCustom<K>>
  : ComputedRef<TypeOfCustom<K> | null>

export const useCustomField = <
  T extends string,
  K extends CustomFieldKind = CustomFieldKind,
  R extends boolean = false
>(store: CustomContextStore<T>, code: string, options: {
  kind?: K | K[],
  readonly?: R,
  onReject?: RejectionHandler,
} = { readonly: false as R }): ComputedCustom<K, R> => {
  const kind = options.kind
    ? Array.isArray(options.kind) ? options.kind : [options.kind]
    : []

  const suitable = (f: CustomField) => f.code === code && (kind.includes(f.kind as K) || kind.length === 0)

  const _onReject: RejectionHandler = (rejection) => console.error(rejection)

  const get = () => store.schema?.fields.find(suitable)
    ? (store.values[code] as TypeOfCustom<K>) ?? null
    : null

  if (options.readonly) {
    return computed(get) as ComputedCustom<K, R>
  }

  return computed({
    get,
    set: (value: TypeOfCustom<K>) => store.set(code, value, options.onReject ?? _onReject),
  })
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

export const useRouter = (): ComputedRef<Pick<Router, 'generate'>> => {
  const stringify = JSON.stringify
  const clone = <T>(pojo: T) => JSON.parse(stringify(pojo)) as T

  const settings = useSettings()
  const routing = shallowRef(clone(settings['system.routing']))

  watch(() => settings['system.routing'], (changed) => {
    if (stringify(changed) !== stringify(routing.value)) {
      routing.value = clone(changed)
    }
  })

  return computed(() => {
    Router.setData(clone(routing.value))

    return {
      generate: (name: string, params: RouteParams = {}, absolute = false) => {
        return Router.getInstance().generate(name, params, absolute)
      },
    }
  })
}

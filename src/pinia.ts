import type { Callable } from '~types/host/callable'

import type {
  ContextAccessor,
  ContextSchemaMap,
} from '~types/context/schema'

import type { Endpoint } from '@remote-ui/rpc'

import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  // noinspection JSUnusedGlobalSymbols
  export interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor & Callable>
  }
}

export const injectEndpoint = <
  M extends ContextSchemaMap,
  A extends ContextAccessor<M> = ContextAccessor<M>
>(endpoint: Endpoint<A & Callable>) => {
  return (context: PiniaPluginContext) => {
    context.store.endpoint = endpoint as Endpoint<ContextAccessor & Callable>
  }
}

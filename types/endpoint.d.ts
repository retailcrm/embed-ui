import type {
  AnyFunction,
  None,
} from './scaffolding'

import type { Channel } from '@omnicajs/vue-remote/host'
import type { Endpoint as RemoteEndpoint } from '@remote-ui/rpc'

export type Target =
  | 'customer/card:main'
  | 'customer/card:phone'
  | 'order/card:customer'
  | 'order/card:customer.email'
  | 'order/card:customer.phone'
  | 'order/card:delivery.address'

export interface EndpointApi<
  M extends Record<string, AnyFunction> = None,
  E extends Record<string, unknown> = None
> {
  run (
    channel: Channel,
    target: Target,
    api: M,
  ): Promise<void>;

  release (): void;

  on <K extends keyof E>(
    event: K,
    payload: E[K]
  ): void;
}

export type Endpoint<
  MethodList extends Record<string, AnyFunction> = None,
  EventList extends Record<string, unknown> = None
> = RemoteEndpoint<EndpointApi<MethodList, EventList>>

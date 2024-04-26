import type {
  AnyFunction,
  None,
} from './scaffolding'

import type { RemoteChannel } from '@remote-ui/core'
import type { Endpoint as RemoteEndpoint } from '@remote-ui/rpc'

export interface EndpointApi<
  PageApi extends Record<string, AnyFunction> = None
> {
  run (channel: RemoteChannel, api: PageApi): Promise<void>;
  release (): void;
}

export type Endpoint<
  PageApi extends Record<string, AnyFunction> = None
> = RemoteEndpoint<EndpointApi<PageApi>>

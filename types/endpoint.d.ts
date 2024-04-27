import type {
  AnyFunction,
  None,
} from './scaffolding'

import type { Channel } from '@omnicajs/vue-remote/host'
import type { Endpoint as RemoteEndpoint } from '@remote-ui/rpc'

export interface EndpointApi<
  PageApi extends Record<string, AnyFunction> = None
> {
  run (channel: Channel, api: PageApi): Promise<void>;
  release (): void;
}

export type Endpoint<
  PageApi extends Record<string, AnyFunction> = None
> = RemoteEndpoint<EndpointApi<PageApi>>

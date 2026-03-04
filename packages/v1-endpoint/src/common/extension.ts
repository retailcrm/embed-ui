import type { Channel } from '@omnicajs/vue-remote/remote'

import type {
  ContextAccessor,
  ContextSchemaList,
  CustomContextAccessor,
} from '@retailcrm/embed-ui-v1-types/context'

import type { Pojo } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { RunIdentity as PageRunIdentity } from './pages'

import type { RunConfig as WidgetRunConfig } from './widgets'
import type { RunIdentity as WidgetRunIdentity } from './widgets'

export interface HostApi {
  goTo (route: string, params?: Record<string, unknown>): void;

  httpCall (
    action: string,
    payload?: string | Pojo
  ): Promise<{ body: string; status: number }>;
}

export interface RemoteApi {
  run (
    channel: Channel,
    config: WidgetRunConfig | PageRunIdentity
  ): Promise<void>;

  release (config: WidgetRunIdentity | PageRunIdentity): void;

  reset (): void;
}

export type EndpointApi<M extends ContextSchemaList = ContextSchemaList> =
  & ContextAccessor<M>
  & CustomContextAccessor
  & HostApi
  & RemoteApi

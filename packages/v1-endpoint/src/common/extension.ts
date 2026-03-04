import type { Channel } from '@omnicajs/vue-remote/remote'

import type {
  ContextAccessor,
  ContextSchemaList,
  CustomContextAccessor,
} from '@retailcrm/embed-ui-v1-types/context'
import type { HostApi } from '@retailcrm/embed-ui-v1-types/host'

import type { RunIdentity as PageRunIdentity } from './pages'

import type { RunConfig as WidgetRunConfig } from './widgets'
import type { RunIdentity as WidgetRunIdentity } from './widgets'

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

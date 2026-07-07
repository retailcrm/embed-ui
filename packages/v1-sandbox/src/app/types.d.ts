import type { Channel } from '@omnicajs/vue-remote/remote'
import type { DefineComponent } from 'vue'
import type { Endpoint } from '@remote-ui/rpc'
import type { PageRunIdentity } from '@retailcrm/embed-ui-v1-endpoint/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type {
  WidgetRunConfig,
  WidgetRunIdentity,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { OrderSandboxSchemas } from '@/scenario/fixtures'
import type { SandboxEndpointApi } from '@/core/controller'

export type HostComponent = DefineComponent<Record<string, unknown>>

export type RunIdentity = PageRunIdentity | WidgetRunIdentity

export type SandboxRemoteApi = {
  release(config: RunIdentity): void;
  reset(): void;
  run(channel: Channel, config: PageRunIdentity | WidgetRunConfig): Promise<void>;
}

export type SandboxWorkerApi = SandboxRemoteApi & SandboxEndpointApi<OrderSandboxSchemas>

export type SandboxRuntimeConnection = {
  endpoint: Endpoint<SandboxWorkerApi>;
  kind: 'worker';
  mounts: SandboxMount[];
  worker: Worker;
}

export type SandboxRuntime = {
  connections: SandboxRuntimeConnection[];
  flushTimer: number;
  mounts: SandboxMount[];
  stylesheet: HTMLLinkElement | null;
}

export type HostedTreeRef = {
  forceUpdate(): void;
}

export type SandboxMount = {
  id: string;
  label: string;
  receiver: Receiver;
  releaseConfig: RunIdentity;
  runConfig: PageRunIdentity | WidgetRunConfig;
  tree: HostedTreeRef | null;
  type: 'page' | 'widget';
}

export type VSelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
}

export type SandboxLaunchDiagnostic = {
  blocking: boolean;
  message: string;
  title: string;
}

export type StoredLaunchNotice = {
  pageCode?: string;
  type: 'inferred-page-mode';
}

export type WorkerReadyMessage = {
  error?: string;
  type: string;
}

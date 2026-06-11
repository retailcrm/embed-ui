import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Endpoint } from '@remote-ui/rpc'
import type { PageRunIdentity } from '@retailcrm/embed-ui-v1-endpoint/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type {
  WidgetRunConfig,
  WidgetRunIdentity,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { OrderSandboxSchemas } from '@/dev/fixtures'
import type { SandboxEndpointApi } from '@/core/controller'
import type { SandboxLaunchConfig } from '@/dev/launch'
import type { SandboxOrderTarget, SandboxSlotDefinition } from '@/dev/targets'

import { createReceiver } from '@omnicajs/vue-remote/host'
import { markRaw } from 'vue'

import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'

export type RunIdentity = PageRunIdentity | WidgetRunIdentity

export type SandboxRemoteApi = {
  release(config: RunIdentity): void;
  reset(): void;
  run(channel: Channel, config: PageRunIdentity | WidgetRunConfig): Promise<void>;
}

export type SandboxWorkerApi = SandboxRemoteApi & SandboxEndpointApi<OrderSandboxSchemas>

export type SandboxRuntime = {
  endpoint: Endpoint<SandboxWorkerApi>;
  flushTimer: number;
  mounts: SandboxMount[];
  stylesheet: HTMLLinkElement | null;
  worker: Worker;
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
  testId: string;
  tree: HostedTreeRef | null;
  type: 'page' | 'widget';
}

export const DEFAULT_DEMO_TARGETS: SandboxOrderTarget[] = [
  'order/card:common.before',
  'order/card:common.after',
]

export const createMounts = (config: SandboxLaunchConfig): SandboxMount[] => {
  if (config.mode === 'page') {
    return [createPageMount(config)]
  }

  return ORDER_SANDBOX_SLOTS
    .filter(slot => config.targets.includes(slot.target))
    .map(slot => createWidgetMount(config, slot))
}

const createPageMount = (config: SandboxLaunchConfig): SandboxMount => ({
  id: `page:${config.pageCode}`,
  label: config.pageCode,
  receiver: markRaw(createReceiver()),
  releaseConfig: { code: config.pageCode },
  runConfig: { code: config.pageCode },
  testId: 'sandbox-page-canvas',
  tree: null,
  type: 'page',
})

const createWidgetMount = (
  config: SandboxLaunchConfig,
  slot: SandboxSlotDefinition
): SandboxMount => {
  const id = createWidgetInstanceId(config.widgetId, slot.target)

  return {
    id,
    label: slot.target,
    receiver: markRaw(createReceiver()),
    releaseConfig: { id },
    runConfig: {
      id,
      target: slot.target,
    },
    testId: `target-order-card-${slot.id}`,
    tree: null,
    type: 'widget',
  }
}

const createWidgetInstanceId = (widgetId: string, target: SandboxOrderTarget): string =>
  `${widgetId}:${target.replace(/[^a-z0-9]+/gi, '-')}`

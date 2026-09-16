import type { SandboxLaunchConfig } from '@/scenario/types'
import type { SandboxMount } from '@/app/types'
import type { SandboxOrderTarget, SandboxSlotDefinition } from '@/scenario/types'

import { createReceiver } from '@omnicajs/vue-remote/host'
import { markRaw } from 'vue'

import { ORDER_SANDBOX_SLOTS } from '@/scenario/targets'

export type {
  HostedTreeRef,
  RunIdentity,
  SandboxMount,
  SandboxRemoteApi,
  SandboxRuntime,
  SandboxRuntimeConnection,
  SandboxWorkerApi,
} from '@/app/types'

export const DEFAULT_SANDBOX_TARGETS: SandboxOrderTarget[] = [
  'order/card:common.before',
  'order/card:common.after',
]

export const createMounts = (config: SandboxLaunchConfig): SandboxMount[] => {
  if (config.mode === 'page') {
    return [createPageMount(config)]
  }

  return ORDER_SANDBOX_SLOTS
    .filter(slot => config.targets.includes(slot.target))
    .map(slot => createWidgetTargetMount(slot))
}

const createPageMount = (config: SandboxLaunchConfig): SandboxMount => ({
  id: `page:${config.pageCode}`,
  label: config.pageCode,
  receiver: markRaw(createReceiver()),
  releaseConfig: { code: config.pageCode },
  runConfig: { code: config.pageCode },
  tree: null,
  type: 'page',
})

const createWidgetTargetMount = (
  slot: SandboxSlotDefinition
): SandboxMount => {
  const id = createWidgetInstanceId(slot.target)

  return {
    id,
    label: slot.target,
    receiver: markRaw(createReceiver()),
    releaseConfig: { id },
    runConfig: {
      id,
      target: slot.target,
    },
    tree: null,
    type: 'widget',
  }
}

const createWidgetInstanceId = (target: SandboxOrderTarget): string =>
  `sandbox-widget:${target.replace(/[^a-z0-9]+/gi, '-')}`

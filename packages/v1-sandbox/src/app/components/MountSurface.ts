import type { HostedTreeRef, SandboxMount } from '@/app/runtime/mounts'

import {
  createProvider as createHostProvider,
} from '@retailcrm/embed-ui-v1-components/host'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'
import { markRaw } from 'vue'

const provider = markRaw(createHostProvider())

export const renderWidgetMounts = (mounts: SandboxMount[]) => h('section', {
  class: 'target-grid',
  'data-testid': 'sandbox-widget-targets',
}, mounts.map(renderWidgetMount))

const renderWidgetMount = (mount: SandboxMount) => h('section', {
  class: 'target-slot',
  'data-target': mount.label,
  'data-testid': mount.testId,
}, [
  h('div', { class: 'target-slot__label' }, mount.label),
  renderHostedTree(mount),
])

export const renderPageMount = (mount: SandboxMount) => h('section', {
  class: 'page-canvas',
  'data-page-code': mount.label,
  'data-testid': mount.testId,
}, [
  h('div', { class: 'page-canvas__label' }, `page:${mount.label}`),
  renderHostedTree(mount),
])

const renderHostedTree = (mount: SandboxMount) => h(HostedTree as never, {
  provider: provider as never,
  ref: ((tree: HostedTreeRef | null) => {
    mount.tree = tree
  }) as never,
  receiver: mount.receiver,
})

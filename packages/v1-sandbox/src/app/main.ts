import '@retailcrm/embed-ui-v1-components/dist/host.css'

import './styles.css'

import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Endpoint } from '@remote-ui/rpc'
import type { PageRunIdentity } from '@retailcrm/embed-ui-v1-endpoint/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type {
  WidgetRunConfig,
  WidgetRunIdentity,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { OrderSandboxSchemas } from '@/fixtures'
import type { SandboxEndpointApi } from '@/controller'
import type { SandboxLaunchConfig } from '@/launch'
import type { SandboxOrderTarget } from '@/targets'
import type { SandboxSlotDefinition } from '@/targets'

import { createApp } from 'vue'
import {
  createProvider as createHostProvider,
} from '@retailcrm/embed-ui-v1-components/host'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { defineComponent, h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'
import {
  markRaw,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { createOrderSandboxController } from '@/fixtures'
import { ORDER_SANDBOX_SLOTS } from '@/targets'
import { parseSandboxLaunchConfig } from '@/launch'

type RunIdentity = PageRunIdentity | WidgetRunIdentity

type SandboxRemoteApi = {
  release(config: RunIdentity): void;
  reset(): void;
  run(channel: Channel, config: PageRunIdentity | WidgetRunConfig): Promise<void>;
}

type SandboxWorkerApi = SandboxRemoteApi & SandboxEndpointApi<OrderSandboxSchemas>

type SandboxRuntime = {
  endpoint: Endpoint<SandboxWorkerApi>;
  flushTimer: number;
  mounts: SandboxMount[];
  worker: Worker;
}

type HostedTreeRef = {
  forceUpdate(): void;
}

type SandboxMount = {
  id: string;
  label: string;
  receiver: Receiver;
  releaseConfig: RunIdentity;
  runConfig: PageRunIdentity | WidgetRunConfig;
  testId: string;
  tree: HostedTreeRef | null;
  type: 'page' | 'widget';
}

const DEFAULT_DEMO_TARGETS: SandboxOrderTarget[] = [
  'order/card:common.before',
  'order/card:common.after',
]

const provider = markRaw(createHostProvider())

const App = defineComponent({
  name: 'SandboxApp',

  setup () {
    const launchConfig = parseSandboxLaunchConfig(new URLSearchParams(window.location.search), {
      targets: DEFAULT_DEMO_TARGETS,
    })
    const sandbox = createOrderSandboxController(launchConfig.fixture)
    const mounts = createMounts(launchConfig)
    const runtime = ref<SandboxRuntime | null>(null)

    const flushReceiver = async () => {
      await Promise.all(mounts.map(async (mount) => {
        await mount.receiver.flush()
        mount.tree?.forceUpdate()
      }))
    }

    const mountExtension = async () => {
      const worker = new Worker(launchConfig.extensionUrl, { type: 'module' })
      const endpoint = createRpcEndpoint<SandboxWorkerApi>(worker)
      const endpointApi = sandbox.endpointApi

      endpoint.expose({
        ...endpointApi,
        get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
        httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
      } as unknown as SandboxWorkerApi)

      for (const mount of mounts) {
        await endpoint.call.run(mount.receiver.receive, mount.runConfig)
      }

      await flushReceiver()

      runtime.value = {
        endpoint,
        flushTimer: window.setInterval(() => {
          void flushReceiver()
        }, 100),
        mounts,
        worker,
      }
    }

    const disposeRuntime = async () => {
      const current = runtime.value

      if (!current) return

      window.clearInterval(current.flushTimer)

      try {
        for (const mount of current.mounts) {
          await current.endpoint.call.release(mount.releaseConfig)
        }

        await flushReceiver()
      } finally {
        current.worker.terminate()
        runtime.value = null
      }
    }

    const flushRemoteUpdates = () => {
      if (!runtime.value) return

      ;[0, 20, 100].forEach((delay) => {
        window.setTimeout(() => {
          void flushReceiver()
        }, delay)
      })
    }

    const toggleOrderStatus = () => {
      const current = sandbox.state.contexts['order/card'].status
      const next = current === 'new' ? 'client-confirmed' : 'new'

      sandbox.setField('order/card', 'status', next)
      flushRemoteUpdates()
    }

    onMounted(() => {
      void mountExtension()
    })

    onBeforeUnmount(() => {
      void disposeRuntime()
      sandbox.dispose()
    })

    return () => h('div', { class: 'sandbox-root' }, [
      renderRail(),
      renderSidebar(launchConfig),
      h('main', {
        class: 'crm-page',
        'data-testid': 'sandbox-page',
        onClickCapture: flushRemoteUpdates,
      }, [
        renderHostControls(launchConfig, sandbox.state.contexts['order/card'].status, toggleOrderStatus),
        launchConfig.mode === 'page'
          ? renderPageMount(mounts[0])
          : renderWidgetMounts(mounts),
      ]),
    ])
  },
})

const createMounts = (config: SandboxLaunchConfig): SandboxMount[] => {
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

const renderHostControls = (
  config: SandboxLaunchConfig,
  orderStatus: string,
  toggleOrderStatus: () => void
) => h('section', {
  class: 'host-controls',
  'data-testid': 'host-controls',
}, [
  h('div', { class: 'host-controls__title' }, 'Host environment'),
  h('div', {
    class: 'host-controls__status',
    'data-testid': 'host-run-mode',
  }, config.mode === 'page'
    ? `Page: ${config.pageCode}`
    : `Widgets: ${config.targets.length}`),
  h('div', {
    class: 'host-controls__status',
    'data-testid': 'host-order-status',
  }, `CRM status: ${orderStatus}`),
  h('button', {
    class: 'host-controls__button',
    'data-testid': 'host-toggle-status',
    onClick: toggleOrderStatus,
    type: 'button',
  }, 'Сменить статус заказа'),
])

const renderWidgetMounts = (mounts: SandboxMount[]) => h('section', {
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

const renderPageMount = (mount: SandboxMount) => h('section', {
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

const renderRail = () => h('aside', { class: 'icon-rail', 'data-testid': 'sandbox-rail' }, [
  h('div', { class: 'rail-logo' }, 'R'),
  ...['🛒', '🤖', '◎', '▥', '◔', '✓', '▤'].map((icon, index) =>
    h('div', {
      class: ['rail-icon', index === 0 ? 'rail-icon_active' : ''],
    }, icon)
  ),
  h('div', { class: 'rail-spacer' }),
  h('div', { class: 'rail-icon' }, '⚙'),
  h('div', { class: 'rail-user' }, 'D'),
])

const renderSidebar = (config: SandboxLaunchConfig) => h('aside', {
  class: 'crm-sidebar',
  'data-testid': 'sandbox-sidebar',
}, [
  h('div', { class: 'crm-section-title' }, 'Продажи'),
  h('nav', { class: 'crm-menu' }, [
    h('a', {
      class: [
        'crm-menu-item',
        config.mode === 'widget' ? 'crm-menu-item_active' : '',
      ],
    }, 'Заказы'),
    h('a', { class: 'crm-menu-item' }, 'Возвраты'),
    h('a', { class: 'crm-menu-item' }, 'Клиенты'),
    h('a', { class: 'crm-menu-item' }, 'Коммуникации'),
    h('a', { class: 'crm-menu-item' }, 'Товары и склад'),
    h('a', { class: 'crm-menu-item' }, 'Менеджеры'),
    h('a', { class: 'crm-menu-item' }, 'Финансы'),
    h('a', {
      class: [
        'crm-menu-item',
        config.mode === 'page' ? 'crm-menu-item_active' : '',
      ],
    }, 'Sandbox page'),
  ]),
  h('div', { class: 'crm-add-link' }, '+ Добавить ссылку'),
])

createApp(App).mount('#app')

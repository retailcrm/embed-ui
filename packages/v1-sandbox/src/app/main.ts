import '@retailcrm/embed-ui-v1-components/dist/host.css'

import './styles.css'

import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Endpoint } from '@remote-ui/rpc'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type {
  WidgetRunConfig,
  WidgetRunIdentity,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { OrderSandboxSchemas } from '@/fixtures'
import type { SandboxEndpointApi } from '@/controller'

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

type SandboxRemoteApi = {
  release(config: WidgetRunIdentity): void;
  reset(): void;
  run(channel: Channel, config: WidgetRunConfig): Promise<void>;
}

type SandboxWorkerApi = SandboxRemoteApi & SandboxEndpointApi<OrderSandboxSchemas>

type SandboxRuntime = {
  endpoint: Endpoint<SandboxWorkerApi>;
  flushTimer: number;
  receiver: Receiver;
  worker: Worker;
}

type HostedTreeRef = {
  forceUpdate(): void;
}

const provider = markRaw(createHostProvider())
const receiver = markRaw(createReceiver())

const App = defineComponent({
  name: 'SandboxApp',

  setup () {
    const sandbox = createOrderSandboxController('order-basic')
    const runtime = ref<SandboxRuntime | null>(null)
    const hostedTree = ref<HostedTreeRef | null>(null)

    const flushReceiver = async () => {
      await receiver.flush()
      hostedTree.value?.forceUpdate()
    }

    const mountCommonAfterWidget = async () => {
      const worker = new Worker('/src/demo-extension.ts', { type: 'module' })
      const endpoint = createRpcEndpoint<SandboxWorkerApi>(worker)
      const endpointApi = sandbox.endpointApi

      endpoint.expose({
        ...endpointApi,
        get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
        httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
      } as unknown as SandboxWorkerApi)

      await endpoint.call.run(receiver.receive, {
        id: 'sandbox-widget',
        target: 'order/card:common.after',
      })
      await flushReceiver()

      runtime.value = {
        endpoint,
        flushTimer: window.setInterval(() => {
          void flushReceiver()
        }, 100),
        receiver,
        worker,
      }
    }

    const disposeRuntime = async () => {
      const current = runtime.value

      if (!current) return

      window.clearInterval(current.flushTimer)

      try {
        await current.endpoint.call.release({ id: 'sandbox-widget' })
        await flushReceiver()
      } finally {
        current.worker.terminate()
        runtime.value = null
      }
    }

    const flushRemoteUpdates = () => {
      const current = runtime.value

      if (!current) return

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
      void mountCommonAfterWidget()
    })

    onBeforeUnmount(() => {
      void disposeRuntime()
      sandbox.dispose()
    })

    return () => h('div', { class: 'sandbox-root' }, [
      renderRail(),
      renderSidebar(),
      h('main', {
        class: 'crm-page',
        'data-testid': 'sandbox-page',
        onClickCapture: flushRemoteUpdates,
      }, [
        h('section', {
          class: 'host-controls',
          'data-testid': 'host-controls',
        }, [
          h('div', { class: 'host-controls__title' }, 'Host environment'),
          h('div', {
            class: 'host-controls__status',
            'data-testid': 'host-order-status',
          }, `CRM status: ${sandbox.state.contexts['order/card'].status}`),
          h('button', {
            class: 'host-controls__button',
            'data-testid': 'host-toggle-status',
            onClick: toggleOrderStatus,
            type: 'button',
          }, 'Сменить статус заказа'),
        ]),
        h('section', {
          class: 'target-slot',
          'data-target': 'order/card:common.after',
          'data-testid': 'target-order-card-common-after',
        }, [
          h('div', { class: 'target-slot__label' }, 'order/card:common.after'),
          h(HostedTree as never, {
            provider: provider as never,
            ref: hostedTree,
            receiver,
          }),
        ]),
      ]),
    ])
  },
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

const renderSidebar = () => h('aside', { class: 'crm-sidebar', 'data-testid': 'sandbox-sidebar' }, [
  h('div', { class: 'crm-section-title' }, 'Продажи'),
  h('nav', { class: 'crm-menu' }, [
    h('a', { class: 'crm-menu-item crm-menu-item_active' }, 'Заказы'),
    h('a', { class: 'crm-menu-item' }, 'Возвраты'),
    h('a', { class: 'crm-menu-item' }, 'Клиенты'),
    h('a', { class: 'crm-menu-item' }, 'Коммуникации'),
    h('a', { class: 'crm-menu-item' }, 'Товары и склад'),
    h('a', { class: 'crm-menu-item' }, 'Менеджеры'),
    h('a', { class: 'crm-menu-item' }, 'Финансы'),
  ]),
  h('div', { class: 'crm-add-link' }, '+ Добавить ссылку'),
])

createApp(App).mount('#app')

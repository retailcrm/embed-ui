import type { ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
import type { PageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'
import type { Pinia } from 'pinia'
import type { WidgetRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import type {
  schema as orderCardSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

type RemoteChild = RemoteNode | RemoteText | string

type RemoteNode = {
  append(...children: RemoteChild[]): Promise<void> | void;
}

type RemoteText = {
  update(text: string): Promise<void> | void;
}

type SandboxRemoteRoot = RemoteNode & {
  createComponent(
    type: string,
    properties?: Record<string, unknown>,
    ...children: RemoteChild[]
  ): RemoteNode;
  createText(text?: string): RemoteText;
  removeChild(child: RemoteNode): Promise<void> | void;
}

type OrderStore = ReturnType<typeof useOrderContext> & {
  endpoint: Endpoint<ContextAccessor<{
    'order/card': typeof orderCardSchema;
  }>>;
}

type OrderContextSnapshot = {
  number?: string;
  status?: string;
}

const createOrderStore = (pinia: Pinia): OrderStore =>
  useOrderContext(pinia) as OrderStore

const readOrderContext = async (order: OrderStore): Promise<OrderContextSnapshot> =>
  (await order.endpoint.call.get('order/card', '~') as OrderContextSnapshot | null) ?? {}

const createOrderWidgetRunner = (title: string): WidgetRunner => ({
  async run (createApp, root, pinia, target) {
    const sandboxRoot = root as unknown as SandboxRemoteRoot
    const app = createApp({
      setup () {
        return () => null
      },
    })

    app.use(pinia)

    const order = createOrderStore(pinia)
    const orderNumber = sandboxRoot.createText('Order: loading')
    const orderStatus = sandboxRoot.createText('Status: loading')

    const container = sandboxRoot.createComponent('article', {
      'data-testid': 'demo-extension',
      style: {
        border: '1px solid #d9e1ea',
        borderRadius: '8px',
        color: '#172140',
        display: 'grid',
        gap: '8px',
        padding: '16px',
      },
    },
    sandboxRoot.createComponent('strong', {
      'data-testid': 'demo-extension-title',
    }, title),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-extension-target',
    }, `Target: ${target}`),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-extension-order-number',
    }, orderNumber),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-extension-order-status',
    }, orderStatus))

    await sandboxRoot.append(container)

    const context = await readOrderContext(order)

    await orderNumber.update(`Order: ${context.number ?? 'unknown'}`)
    await orderStatus.update(`Status: ${context.status ?? 'unknown'}`)

    order.endpoint.call.on('order/card', 'change:status', (status) => {
      void orderStatus.update(`Status: ${String(status)}`)
    })

    return () => {
      app.unmount()
      sandboxRoot.removeChild(container)
    }
  },
})

const demoDeliveryWidgetRunner: WidgetRunner = {
  async run (createApp, root, pinia, target) {
    const sandboxRoot = root as unknown as SandboxRemoteRoot
    const app = createApp({
      setup () {
        return () => null
      },
    })

    app.use(pinia)

    const order = createOrderStore(pinia)
    const context = await readOrderContext(order)
    const container = sandboxRoot.createComponent('article', {
      'data-testid': 'demo-delivery-widget',
      style: {
        background: '#f7f9fc',
        border: '1px solid #d9e1ea',
        borderRadius: '8px',
        color: '#172140',
        display: 'grid',
        gap: '8px',
        padding: '16px',
      },
    },
    sandboxRoot.createComponent('strong', {}, 'Delivery widget'),
    sandboxRoot.createComponent('div', {}, `Target: ${target}`),
    sandboxRoot.createComponent('div', {}, `Order: ${context.number ?? 'unknown'}`))

    await sandboxRoot.append(container)

    return () => {
      app.unmount()
      sandboxRoot.removeChild(container)
    }
  },
}

const demoPageRunner: PageRunner = {
  async run (createApp, root, pinia, code) {
    const sandboxRoot = root as unknown as SandboxRemoteRoot
    const app = createApp({
      setup () {
        return () => null
      },
    })

    app.use(pinia)

    const order = createOrderStore(pinia)
    const context = await readOrderContext(order)
    const orderStatus = sandboxRoot.createText(`Status: ${context.status ?? 'unknown'}`)
    const container = sandboxRoot.createComponent('section', {
      'data-testid': 'demo-page-extension',
      style: {
        color: '#172140',
        display: 'grid',
        gap: '18px',
        maxWidth: '720px',
      },
    },
    sandboxRoot.createComponent('UiPageHeader', {
      value: 'Orders dashboard',
    }),
    sandboxRoot.createComponent('UiAlert', {
      text: 'Page runner запущен в sandbox через тот же worker endpoint.',
      variant: 'primary',
    }),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-page-code',
    }, `Page code: ${code}`),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-page-order-number',
    }, `Order: ${context.number ?? 'unknown'}`),
    sandboxRoot.createComponent('div', {
      'data-testid': 'demo-page-order-status',
    }, orderStatus))

    await sandboxRoot.append(container)

    order.endpoint.call.on('order/card', 'change:status', (status) => {
      void orderStatus.update(`Status: ${String(status)}`)
    })

    return () => {
      app.unmount()
      sandboxRoot.removeChild(container)
    }
  },
}

runEndpoint(defineRunner({
  pages: [{
    'orders-dashboard': demoPageRunner,
  }],
  widgets: [{
    'order/card:common.before': createOrderWidgetRunner('Common before widget'),
    'order/card:common.after': createOrderWidgetRunner('Common after widget'),
    'order/card:delivery.before': demoDeliveryWidgetRunner,
  }],
}))

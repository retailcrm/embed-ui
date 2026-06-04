import type { ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
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

const createOrderStore = (pinia: Pinia): OrderStore =>
  useOrderContext(pinia) as OrderStore

const demoWidgetRunner: WidgetRunner = {
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
    }, 'Order context widget'),
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

    const context = await order.endpoint.call.get('order/card', '~') as {
      number?: string;
      status?: string;
    } | null

    await orderNumber.update(`Order: ${context?.number ?? 'unknown'}`)
    await orderStatus.update(`Status: ${context?.status ?? 'unknown'}`)

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
  pages: [{}],
  widgets: [{
    'order/card:common.after': demoWidgetRunner,
  }],
}))

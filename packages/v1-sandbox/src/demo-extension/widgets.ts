import type { WidgetRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { SandboxRemoteRoot } from '@/demo-extension/shared'

import { createOrderStore, readOrderContext } from '@/demo-extension/shared'

export const createOrderWidgetRunner = (title: string): WidgetRunner => ({
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

export const demoDeliveryWidgetRunner: WidgetRunner = {
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

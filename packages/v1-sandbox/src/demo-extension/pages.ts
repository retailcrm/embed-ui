import type { PageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import type { SandboxRemoteRoot } from '@/demo-extension/shared'

import { createOrderStore, readOrderContext } from '@/demo-extension/shared'

export const demoPageRunner: PageRunner = {
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

import type {
  Component,
  PropType,
} from 'vue'

import type { MessageEndpoint } from '@remote-ui/rpc'

import type { Receiver } from '@omnicajs/vue-remote/host'

import type {
  WidgetEndpoint,
  WidgetTarget,
} from '~types/widget'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { createApp, h, nextTick, ref } from 'vue'

import {
  createProvider,
  createReceiver,
} from '@omnicajs/vue-remote/host'

import { createContextAccessor } from '@retailcrm/embed-ui-v1-contexts/host'
import { createWidgetEndpoint } from '@/index'

import {
  createEndpoint,
  fromMessagePort,
} from '@remote-ui/rpc'

import { createHostContext as createCustomerHostContext } from '~tests/__util__/customer/card'
import { createHostContext as createCustomerPhoneHostContext } from '~tests/__util__/customer/card-phone'
import { createHostContext as createSettingsHostContext } from '~tests/__util__/settings'

import { flushPromises } from '@vue/test-utils'

import { useContext as usePhone } from '@retailcrm/embed-ui-v1-contexts/remote/customer/card-phone'
import { useContext as useSettings } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import { useField } from '@/composables'

describe('scenarios/customer/phone', () => {
  let el: HTMLElement | null = null

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    el?.remove()
    el = null
  })

  test('receives context', async () => {
    const { port1, port2 } = new MessageChannel()

    port1.start()
    port2.start()

    const receiver = createReceiver()

    const host = createHostContext(fromMessagePort(port1))

    createHostApp(receiver).mount(el as HTMLElement)

    createWidgetEndpoint({
      async run (createApp, root, pinia, target) {
        const app = createApp({
          props: {
            target: {
              type: String as PropType<WidgetTarget>,
              required: true,
            },
          },

          setup (props) {
            const phone = usePhone()
            const settings = useSettings()

            const value = useField(phone, 'value')
            const index = useField(phone, 'index')
            const locale = useField(settings, 'system.locale')

            return () => h('div', [
              h('div', `Target: ${props.target}`),
              h('div', `Locale: ${locale.value}`),
              h('div', `Phone: ${value.value}`),
              h('div', `Index: ${index.value}`),
            ])
          },
        }, {
          target,
        })

        app.use(pinia)

        await Promise.all([
          usePhone(),
          useSettings(),
        ].map(c => c.initialize()))

        app.mount(root)

        return () => app.unmount()
      },
    }, fromMessagePort(port2))

    await host.endpoint.call.run(receiver.receive, 'customer/card:phone')
    await receiver.flush()

    await flushPromises()

    expect(el?.innerHTML).toContain('Target: customer/card:phone')
    expect(el?.innerHTML).toContain('Locale: en-GB')
    expect(el?.innerHTML).toContain('Phone: +381 11 2345678')
    expect(el?.innerHTML).toContain('Index: 0')

    host['settings'].system.locale = 'es-ES'

    await nextTick()
    await receiver.flush()

    expect(el?.innerHTML).toContain('Target: customer/card:phone')
    expect(el?.innerHTML).toContain('Locale: es-ES')

    await host.endpoint.call.release()

    await nextTick()
    await receiver.flush()

    expect(el?.innerHTML).toBe('')
  })
})

function createHostContext (messenger: MessageEndpoint) {
  const contexts = {
    'customer/card': createCustomerHostContext('customer/card'),
    'customer/card:phone': createCustomerPhoneHostContext('customer/card:phone'),
    'settings': createSettingsHostContext('settings'),
  }

  const endpoint = createEndpoint<WidgetEndpoint>(messenger)

  endpoint.expose(createContextAccessor({
    'customer/card': contexts['customer/card'].accessor,
    'customer/card:phone': contexts['customer/card:phone'].accessor,
    'settings': contexts['settings'].accessor,
  }))

  return {
    'settings': contexts['settings'].data,
    endpoint,
  }
}

function createHostApp (receiver: Receiver, components: {
  [key: string]: Component<NonNullable<unknown>>;
} = {}) {
  const provider = createProvider(components)

  return createApp({
    setup () {
      const tree = ref<{ forceUpdate (): void } | null>(null)

      return () => h(HostedTree, {
        ref: tree,
        provider,
        receiver,
      })
    },
  })
}

import type {
  Component,
  PropType,
} from 'vue'

import type {
  ContextAccessor,
  FieldAccessor,
} from '~types/context/schema'

import type { MessageEndpoint } from '@remote-ui/rpc'

import type { Receiver } from '@omnicajs/vue-remote/host'

import type { SchemaList } from '~types/context'

import type {
  WidgetEndpoint,
  WidgetTarget,
} from '~types/widget'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { MessageChannel } from '~tests/utilities'

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

import { createWidgetEndpoint } from '@/index'

import {
  createEndpoint,
  fromMessagePort,
} from '@remote-ui/rpc'

import {
  createCustomerCardPhoneHostContext,
  createSettingsHostContext,
} from '~tests/__factory__'

import { flushPromises } from '@vue/test-utils'

import { useContext as useCustomerCardPhoneContext } from '@/context/customer/card-phone'
import { useContext as useSettingsContext } from '@/context/settings'
import { useField } from '@/composables'

const createHost = (messenger: MessageEndpoint) => {
  const contexts = {
    'customer/card:phone': createCustomerCardPhoneHostContext('customer/card:phone'),
    'settings': createSettingsHostContext('settings'),
  }

  const guard = (context: string) => {
    if (!(context in contexts)) {
      throw new Error(`[crm:embed:host] Context ${context} is not supported`)
    }
  }

  const accessor = {
    get <
      C extends keyof SchemaList,
      F extends keyof SchemaList[C]
    >(context: C, field: '~' | F) {
      guard(context)

      const accessor = contexts[context as keyof typeof contexts].accessor as FieldAccessor<SchemaList[C]>

      return accessor.get(field)
    },

    set (context, field, value) {
      guard(context)

      const accessor = contexts[context as keyof typeof contexts].accessor as FieldAccessor<SchemaList[typeof context]>

      accessor.set(field, value)
    },

    on (context, event, handler) {
      guard(context)

      const accessor = contexts[context as keyof typeof contexts].accessor as FieldAccessor<SchemaList[typeof context]>

      accessor.on(event, handler)
    },
  } as ContextAccessor<SchemaList>

  const endpoint = createEndpoint<WidgetEndpoint>(messenger)

  endpoint.expose(accessor)

  return {
    'settings': contexts['settings'].data,
    endpoint,
  }
}

const createHostApp = (receiver: Receiver, components: {
  [key: string]: Component<NonNullable<unknown>>;
} = {}) => {
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

    const host = createHost(fromMessagePort(port1))

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
            const phoneContext = useCustomerCardPhoneContext()
            const settingsContext = useSettingsContext()

            phoneContext.initialize()
            settingsContext.initialize()

            const phone = useField(phoneContext, 'value')
            const index = useField(phoneContext, 'index')
            const locale = useField(settingsContext, 'system.locale')

            return () => h('div', [
              h('div', `Target: ${props.target}`),
              h('div', `Locale: ${locale.value}`),
              h('div', `Phone: ${phone.value}`),
              h('div', `Index: ${index.value}`),
            ])
          },
        }, {
          target,
        })

        app.use(pinia)
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

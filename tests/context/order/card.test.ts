import type { Callable } from '~types/host/callable'
import type { ContextAccessor, FieldAccessor } from '~types/context/schema'

import type { MessageEndpoint } from '@remote-ui/rpc'

import type { SchemaList } from '~types/context'

import { MessageChannel } from '~tests/utilities'

import {
  describe,
  expect,
  test,
} from 'vitest'

import {
  flushPromises,
  mount,
} from '@vue/test-utils'

import {
  createApp,
  nextTick,
} from 'vue'

import { createPinia } from 'pinia'
import {
  createEndpoint,
  fromMessagePort,
} from '@remote-ui/rpc'

import { injectEndpoint } from '@/pinia'

import { useContext as useOrderCardContext } from '@/context/order/card'
import { useContext as useSettingsContext } from '@/context/settings'
import { useField } from '@/composables'

import {
  createOrderCardHostContext,
  createSettingsHostContext,
} from '~tests/__factory__'

const createHost = (messenger: MessageEndpoint) => {
  const contexts = {
    'order/card': createOrderCardHostContext('order/card'),
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

      const accessor = contexts[context as keyof typeof contexts].accessor as FieldAccessor<SchemaList[typeof context]>

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

  const endpoint = createEndpoint<{ run (): void }>(messenger)

  endpoint.expose(accessor)

  return {
    'order/card': contexts['order/card'].data,
    'settings': contexts['settings'].data,
    endpoint,
  }
}

describe('order/card', () => {
  test('store serves bidirectional connection', async () => {
    const { port1, port2 } = new MessageChannel()

    port1.start()
    port2.start()

    const host = createHost(fromMessagePort(port1))

    const remote = createEndpoint<ContextAccessor<SchemaList> & Callable>(fromMessagePort(port2))

    const pinia = createPinia()

    remote.expose({
      run () {
        const app = createApp({ template: '<div />' })

        app.use(pinia)
      },
    })

    pinia.use(injectEndpoint(remote))

    await host.endpoint.call.run()

    const wrapper = mount({
      setup () {
        const orderCardContext = useOrderCardContext()
        const settingsContext = useSettingsContext()

        orderCardContext.initialize()
        settingsContext.initialize()

        const email = useField(orderCardContext, 'customer.email')
        const phone = useField(orderCardContext, 'customer.phone')
        const address = useField(orderCardContext, 'delivery.address')

        const locale = useField(settingsContext, 'system.locale')

        return { email, phone, address, locale }
      },

      template: `
        <div>
            <input v-model="email" name="email" />
            <input v-model="phone" name="phone" />
            <input v-model="address" name="address" />
            <div>
                Locale: {{ locale }}
            </div>
        </div>
      `,
    }, {
      plugins: [pinia],
    })

    await flushPromises()

    const email = wrapper.find<HTMLInputElement>('input[name="email"]')

    expect(email.exists()).toBe(true)
    expect(email.element.value).toBe('fake@gmail.com')

    const phone = wrapper.find<HTMLInputElement>('input[name="phone"]')

    expect(phone.exists()).toBe(true)
    expect(phone.element.value).toBe('+381 11 2345678')

    const address = wrapper.find<HTMLInputElement>('input[name="address"]')

    expect(address.exists()).toBe(true)
    expect(address.element.value).toBe('Улица Краља Милутина 2 11000 Београд Србија')

    expect(wrapper.text()).toContain('Locale: en-GB')

    email.element.value = 'fake-changed@gmail.com'

    await email.trigger('input')

    phone.element.value = '+381 11'

    await phone.trigger('input')

    address.element.value = '221B Baker Street'

    await address.trigger('input')

    expect(host['order/card'].customer).toEqual({
      email: 'fake-changed@gmail.com',
      phone: '+381 11',
    })

    expect(host['order/card'].delivery).toEqual({
      address: '221B Baker Street',
    })

    host['order/card'].customer.email = 'new@gmail.com'
    host['order/card'].customer.phone = '+374 11'
    host['settings'].system.locale = 'es-ES'

    await nextTick()

    expect(email.element.value).toBe('new@gmail.com')
    expect(phone.element.value).toBe('+374 11')

    expect(wrapper.text()).toContain('Locale: es-ES')
  })
})

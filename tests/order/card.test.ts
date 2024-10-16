import type { EndpointApi } from '~types/endpoint'

import type {
  EventMap,
  HostMethods,
  RemoteMethods,
} from '~types/pages/order';

import type {
  Customer,
  Delivery,
} from '@/order/card';

import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { MessageChannel } from '~tests/utilities'

import {
  computed,
  createApp,
  nextTick,
  reactive,
  watch,
} from 'vue'

import { createPinia } from 'pinia'
import { createWidgetEndpoint } from '@/index'
import {
  createEndpoint,
  fromMessagePort,
} from '@remote-ui/rpc'

import { useStore } from '@/order/card'

describe('order/card', () => {
  test('store serves bidirectional connection', async () => {
    const { port1, port2 } = new MessageChannel()

    port1.start()
    port2.start()

    const order = reactive({
      customer: {
        email: 'fake@gmail.com',
        phone: '+381 11 2345678',
      } as Customer,
      delivery: {
        address: 'Улица Краља Милутина 2 11000 Београд Србија',
      } as Delivery,
    })

    const orderApi = {
      get (name) {
        switch (name) {
          case 'customer.email':
            return order.customer.email
          case 'customer.phone':
            return order.customer.phone
          case 'delivery.address':
            return order.delivery.address
          default:
            throw new Error(`Field ${name} is not supported`)
        }
      },

      set (name, value) {
        switch (name) {
          case 'customer.email':
            order.customer.email = value
            break
          case 'customer.phone':
            order.customer.phone = value
            break
          case 'delivery.address':
            order.delivery.address = value
            break
          default:
            throw new Error(`Field ${name} is not supported`)
        }
      },
    } as HostMethods

    const app = createApp()
    const pinia = createPinia()

    app.use(pinia)

    const store = useStore()

    const host = createEndpoint<EndpointApi<HostMethods, EventMap>>(fromMessagePort(port1))

    // noinspection JSUnusedLocalSymbols
    const remote = createWidgetEndpoint<EndpointApi<RemoteMethods, EventMap>>({
      async run (channel, placement, api) {
        await store.initialize(api)
      },

      on: (event, payload) => store.on(event, payload),

      release () {},
    }, fromMessagePort(port2))

    await host.call.run(null, 'order/card:customer', orderApi)

    watch(() => order.customer.email, (email) => host.call.on('change:customer.email', email))
    watch(() => order.customer.phone, (phone) => host.call.on('change:customer.phone', phone))
    watch(() => order.delivery.address, (address) => host.call.on('change:delivery.address', address))

    const wrapper = mount({
      setup () {
        const store = useStore()

        const email = computed({
          get: () => store.customer.email,
          set: (value: string) => store.setCustomerEmail(value)
        })

        const phone = computed({
          get: () => store.customer.phone,
          set: (value: string) => store.setCustomerPhone(value)
        })

        const address = computed({
          get: () => store.delivery.address,
          set: (value: string) => store.setDeliveryAddress(value)
        })

        return { email, phone, address }
      },

      template: `
          <div>
              <input v-model="email" name="email" />
              <input v-model="phone" name="phone" />
              <input v-model="address" name="address" />
          </div>
      `
    }, {
      plugins: [pinia]
    })

    const email = wrapper.find<HTMLInputElement>('input[name="email"]')

    expect(email.exists()).toBe(true)
    expect(email.element.value).toBe('fake@gmail.com')

    const phone = wrapper.find<HTMLInputElement>('input[name="phone"]')

    expect(phone.exists()).toBe(true)
    expect(phone.element.value).toBe('+381 11 2345678')

    const address = wrapper.find<HTMLInputElement>('input[name="address"]')

    expect(address.exists()).toBe(true)
    expect(address.element.value).toBe('Улица Краља Милутина 2 11000 Београд Србија')

    email.element.value = 'fake-changed@gmail.com'

    await email.trigger('input')

    phone.element.value = '+381 11'

    await phone.trigger('input')

    address.element.value = '221B Baker Street'

    await address.trigger('input')

    expect(order.customer).toEqual({
      email: 'fake-changed@gmail.com',
      phone: '+381 11',
    })

    expect(order.delivery).toEqual({
      address: '221B Baker Street',
    })

    order.customer.email = 'new@gmail.com'
    order.customer.phone = '+374 11'

    await nextTick()

    expect(email.element.value).toBe('new@gmail.com')
    expect(phone.element.value).toBe('+374 11')
  })
})

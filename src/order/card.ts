import type {
  EventMap,
  RemoteMethods,
} from '~types/pages/order'

import { defineStore } from 'pinia'

export type Customer = {
  email: string | null;
  phone: string | null;
}

export type Delivery = {
  address: string | null;
}

export type State = {
  api: RemoteMethods | null;
  customer: Customer;
  delivery: Delivery;
}

export const useStore = defineStore('order', {
  state (): State {
    return {
      api: null,
      customer: {
        email: null,
        phone: null,
      },
      delivery: {
        address: null,
      },
    }
  },

  actions: {
    async initialize (api: RemoteMethods) {
      this.api = api

      await Promise.allSettled([
        api.get('customer.email').then(value => this.customer.email = value),
        api.get('customer.phone').then(value => this.customer.phone = value),
        api.get('delivery.address').then(value => this.delivery.address = value),
      ])
    },

    setCustomerEmail (value: string) {
      this.customer.email = value
      this.api?.set('customer.email', value)
    },

    setCustomerPhone (value: string) {
      this.customer.phone = value
      this.api?.set('customer.phone', value)
    },

    setDeliveryAddress (value: string) {
      this.delivery.address = value
      this.api?.set('delivery.address', value)
    },

    on <K extends keyof EventMap>(event: K, payload: EventMap[K]) {
      switch (event) {
        case 'change:customer.email':
          this.customer.email = payload as string | null;
          break;
        case 'change:customer.phone':
          this.customer.phone = payload as string | null;
          break;
        case 'change:delivery.address':
          this.delivery.address = payload as string | null;
          break;
      }
    },
  },
})
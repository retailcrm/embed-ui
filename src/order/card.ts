import type {
  FieldSchema,
  EventSchema,
  RemoteMethods,
} from '~types/context/order'

import { defineStore } from 'pinia'

export type State = FieldSchema & {
  api: RemoteMethods | null;
}

export const useStore = defineStore('order', {
  state (): State {
    return {
      api: null,
      'customer.email': null,
      'customer.phone': null,
      'delivery.address': null,
    }
  },

  actions: {
    async initialize (api: RemoteMethods) {
      this.api = api

      await api.get('~').then(state => {
        this['customer.email'] = state['customer.email']
        this['customer.phone'] = state['customer.phone']
        this['delivery.address'] = state['delivery.address']
      })
    },

    set <F extends keyof FieldSchema> (name: F, value: FieldSchema[F], synchronize = true) {
      this[name] = value
      if (synchronize) {
        this.api?.set(name, value)
      }
    },

    on <K extends keyof EventSchema>(event: K, payload: EventSchema[K]) {
      switch (event) {
        case 'change:customer.email':
          return this.set('customer.email', payload as string | null, false)
        case 'change:customer.phone':
          return this.set('customer.phone', payload as string | null, false)
        case 'change:delivery.address':
          return this.set('delivery.address', payload as string | null, false)
      }
    },
  },
})
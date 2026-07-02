import type { Component } from 'vue'

import { defineComponent, h, onMounted } from 'vue'

import { defineRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'
import { runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'
import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const OrderSidebarWidget: Component = defineComponent({
  props: {
    target: {
      required: true,
      type: String,
    },
  },

  setup(props: { target: string }) {
    const order = useOrderContext()

    onMounted(() => {
      void order.initialize()
    })

    return () => h('section', {
      'aria-label': `Example order sidebar widget: ${props.target}`,
    }, [
      h('span', 'Order fixture demo'),
      h('button', {
        type: 'button',
      }, 'Open order demo'),
      h('section', {
        'aria-label': 'Order details',
      }, [
        h('h3', 'Order details'),
        h('p', `Order #${order.number}`),
        h('p', 'Fixture: order-basic'),
        h('p', `Target: ${props.target}`),
      ]),
    ])
  },
})

const OrderDemoPage: Component = defineComponent({
  props: {
    code: {
      required: true,
      type: String,
    },
  },

  setup(props: { code: string }) {
    return () => h('article', {
      'aria-label': `Example order page: ${props.code}`,
    }, [
      h('h2', 'Order demo page'),
      h('p', `Page code: ${props.code}`),
      h('p', 'Order #215C'),
    ])
  },
})

runEndpoint(defineRunner({
  pages: [OrderDemoPage],
  widgets: [OrderSidebarWidget],
}))

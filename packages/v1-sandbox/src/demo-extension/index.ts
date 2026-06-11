import {
  definePageRunner,
  defineRunner,
  defineWidgetRunner,
} from '@retailcrm/embed-ui-v1-endpoint/remote'
import { h } from 'vue'
import { runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

import DemoDeliveryWidget from '@/demo-extension/DemoDeliveryWidget.vue'
import DemoPage from '@/demo-extension/DemoPage.vue'
import DemoWidget from '@/demo-extension/DemoWidget.vue'

const createDemoWidgetRunner = (title: string) => defineWidgetRunner({
  props: {
    target: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    return () => h(DemoWidget, {
      target: props.target,
      title,
    })
  },
})

runEndpoint(defineRunner({
  pages: [{
    'orders-dashboard': definePageRunner(DemoPage),
  }],
  widgets: [{
    'order/card:common.before': createDemoWidgetRunner('Common before widget'),
    'order/card:common.after': createDemoWidgetRunner('Common after widget'),
    'order/card:delivery.before': defineWidgetRunner(DemoDeliveryWidget),
  }],
}))

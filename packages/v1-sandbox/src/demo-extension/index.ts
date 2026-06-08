import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

import {
  createOrderWidgetRunner,
  demoDeliveryWidgetRunner,
} from '@/demo-extension/widgets'
import { demoPageRunner } from '@/demo-extension/pages'

runEndpoint(defineRunner({
  pages: [{
    'orders-dashboard': demoPageRunner,
  }],
  widgets: [{
    'order/card:common.before': createOrderWidgetRunner('Common before widget'),
    'order/card:common.after': createOrderWidgetRunner('Common after widget'),
    'order/card:delivery.before': demoDeliveryWidgetRunner,
  }],
}))

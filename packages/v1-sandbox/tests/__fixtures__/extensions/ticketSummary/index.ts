import {
  defineRunner,
  defineWidgetRunner,
  runEndpoint,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import TicketSummary from './TicketSummary.vue'

const summary = defineWidgetRunner(TicketSummary)

runEndpoint(defineRunner({
  pages: [{}],
  widgets: [{
    'ticket/view:header.after': summary,
    'ticket/view:common.before': summary,
    'ticket/view:customer.after': summary,
    'ticket/view:issues.after': summary,
  }],
}))

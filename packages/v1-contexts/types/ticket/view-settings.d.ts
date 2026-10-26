import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

import type { TicketStatus } from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

export type Schema = {
  'statuses': ReadonlyField<ReadonlyArray<TicketStatus>>;
  'editable': ReadonlyField<boolean>;
  'commentable': ReadonlyField<boolean>;
}

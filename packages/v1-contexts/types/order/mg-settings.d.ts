import type { OrderItemStatus } from '~types/order/common'
import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'defaultUnit': ReadonlyField<string | null>;
  'duplicatesAllowed': ReadonlyField<boolean>;
  'quantityIsFractional': ReadonlyField<boolean>;
  'priceEditable': ReadonlyField<boolean>;
  'availableStatuses': ReadonlyField<ReadonlyArray<Readonly<OrderItemStatus>>>;
}

import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'

import type { PredicateWithMeta } from '@/predicates'

import { isExactly, oneOf } from '@/predicates'

export const isCustomerType: PredicateWithMeta<CustomerType> = oneOf(
  isExactly('customer'),
  isExactly('customer_corporate')
)

import type { Schema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card-phone'

import { createAccessor } from '~tests/__util__/createAccessor'
import { reactive } from 'vue'

export const createHostContext = (id: string) => {
  const data = reactive({
    value: '+381 11 2345678',
    index: 0,
  })

  return {
    data,
    accessor: createAccessor<Schema>(id, {
      'value': () => data.value,
      'index': () => data.index,
    }, {}),
  }
}

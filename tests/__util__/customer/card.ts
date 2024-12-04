import type { Schema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card'

import { createAccessor } from '~tests/__util__/createAccessor'
import { reactive } from 'vue'

export const createHostContext = (id: string) => {
  const data = reactive({
    id: null as number | null,
    externalId: null as string | null,
    email: '',
    phones: [] as string[],
  })

  return {
    data,
    accessor: createAccessor<Schema>(id, {
      'id': () => data.id,
      'externalId': () => data.externalId,
      'email': () => data.email,
      'phones': () => data.phones,
    }, {}),
  }
}

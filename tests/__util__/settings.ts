import type { Locale, Schema } from '@retailcrm/embed-ui-v1-contexts/types/settings'

import { createAccessor } from '~tests/__util__/createAccessor'
import { reactive } from 'vue'

export const createHostContext = (id: string) => {
  const data = reactive({
    system: {
      locale: 'en-GB' as Locale,
    },
  })

  return {
    data,
    accessor: createAccessor<Schema>(id, {
      'system.locale': () => data.system.locale,
    }, {}),
  }
}

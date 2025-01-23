import type { Locale, Schema } from '@retailcrm/embed-ui-v1-contexts/types/settings'

import { createAccessor } from '~tests/__util__/createAccessor'
import { reactive } from 'vue'

export const createHostContext = (id: string) => {
  const data = reactive({
    image: {
      workers: [] as string[],
    },
    system: {
      locale: 'en-GB' as Locale,
    },
  })

  return {
    data,
    accessor: createAccessor<Schema>(id, {
      'image.workers': () => data.image.workers,
      'system.locale': () => data.system.locale,
      'system.routing': () => ({
        base_url: '',
        routes: {},
        prefix: '',
        host: '',
        port: '',
        scheme: 'http',
        locale: '',
      }),
    }, {}),
  }
}

import { defineContext } from '@/remote'

import {
  id,
  schema,
} from '@/common/order/mg-settings'

export { schema }

export const useContext = defineContext(id, schema)

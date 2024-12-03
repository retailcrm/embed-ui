import { defineContext } from '@/remote'

import {
  id,
  schema,
} from '@/common/order/card'

export { schema }

export const useContext = defineContext(id, schema)

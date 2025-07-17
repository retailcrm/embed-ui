import { defineActions } from '@/remote'
import { defineContext } from '@/remote'

import {
  actions,
  id,
  schema,
} from '@/common/order/card'

export { schema }

export const useActions = defineActions(id, actions)
export const useContext = defineContext(id, schema)

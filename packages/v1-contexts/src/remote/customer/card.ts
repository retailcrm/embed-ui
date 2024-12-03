import { defineContext } from '@/remote'

import {
  id,
  schema,
} from '@/common/customer/card'

export { schema }

export const useContext = defineContext(id, schema)

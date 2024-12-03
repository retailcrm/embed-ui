import { defineContext } from '@/remote'

import {
  id,
  schema,
} from '@/common/customer/card-phone'

export { schema }

export const useContext = defineContext(id, schema)

import { defineContext } from '@/remote'

import {
  id,
  schema,
} from '@/common/user/current'

export { schema }

export const useContext = defineContext(id, schema)

import { defineContext } from '@/remote'

import {
  id,
  locales,
  schema,
} from '@/common/settings'

export { locales }
export { schema }

export const useContext = defineContext(id, schema)

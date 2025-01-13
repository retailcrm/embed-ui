import type {
  InjectionKey,
  ComputedRef,
} from 'vue'

import { SIZE } from '@/common/components/avatar'

export const AvatarSizeKey = Symbol('UiAvatarSize') as InjectionKey<ComputedRef<SIZE | `${SIZE}`>>

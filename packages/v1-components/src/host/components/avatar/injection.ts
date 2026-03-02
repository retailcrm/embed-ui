import type { ComputedRef, InjectionKey } from 'vue'

import type { SIZE } from '@/common/components/avatar'

export const AvatarSizeKey = Symbol('UiAvatarSize') as InjectionKey<ComputedRef<SIZE | `${SIZE}`>>

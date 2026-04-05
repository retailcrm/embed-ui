import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/dist/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiSkeletonProperties } from '@/common/components/skeleton'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiSkeletonType = 'UiSkeleton' as SchemaType<
  'UiSkeleton',
  RemoteProperties<UiSkeletonProperties>,
  Record<string, never>
>

export const UiSkeleton = defineRemoteComponent(
  UiSkeletonType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

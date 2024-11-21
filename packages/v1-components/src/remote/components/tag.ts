import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiTagProperties } from '@/common/components/tag'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTagType = 'UiTag' as SchemaType<
  'UiTag',
  RemoteProperties<UiTagProperties>,
  Record<string, never>
>

export const UiTag = defineRemoteComponent(
  UiTagType,
  ['click', 'focus', 'blur', 'remove'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'remove': () => boolean,
  }
)

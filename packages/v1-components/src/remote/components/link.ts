import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiLinkProperties } from '@/common/components/link'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiLinkType = 'UiLink' as SchemaType<
  'UiLink',
  RemoteProperties<UiLinkProperties>,
  Record<string, never>
>

export const UiLink = defineRemoteComponent(
  UiLinkType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)
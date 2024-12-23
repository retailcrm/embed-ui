import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiToolbarLinkProperties } from '@/common/components/toolbar-link'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiToolbarLinkType = 'UiToolbarLink' as SchemaType<
  'UiToolbarLink',
  RemoteProperties<UiToolbarLinkProperties>,
  Record<string, never>
>

export const UiToolbarLink = defineRemoteComponent(
  UiToolbarLinkType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

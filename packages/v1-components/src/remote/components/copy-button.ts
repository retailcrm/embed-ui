import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiCopyButtonProperties } from '@/common/components/copy-button'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiCopyButtonType = 'UiCopyButton' as SchemaType<
  'UiCopyButton',
  RemoteProperties<UiCopyButtonProperties>
>

export const UiCopyButton = defineRemoteComponent(
  UiCopyButtonType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)
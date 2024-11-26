import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiToolbarButtonProperties } from '@/common/components/toolbar-button'
import type { UiButtonMethods } from '@/common/components/button'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiToolbarButtonType = 'UiToolbarButton' as SchemaType<
  'UiToolbarButton',
  RemoteProperties<UiToolbarButtonProperties>,
  RemoteCallable<UiButtonMethods>
>

export const UiToolbarButton = defineRemoteComponent(
  UiToolbarButtonType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

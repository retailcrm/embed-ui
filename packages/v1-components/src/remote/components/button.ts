import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiButtonProperties,
  UiButtonMethods,
} from '@/common/components/button'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiButtonType = 'UiButton' as SchemaType<
  'UiButton',
  RemoteProperties<UiButtonProperties>,
  RemoteCallable<UiButtonMethods>
>

export const UiButton = defineRemoteComponent(
  UiButtonType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)
import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiSwitchMethods, UiSwitchProperties } from '@/common/components/switch'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiSwitchType = 'UiSwitch' as SchemaType<
  'UiSwitch',
  RemoteProperties<UiSwitchProperties>,
  RemoteCallable<UiSwitchMethods>
>

export const UiSwitch = defineRemoteComponent(
  UiSwitchType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

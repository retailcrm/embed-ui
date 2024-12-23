import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiRadioProperties,
  UiRadioMethods,
} from '@/common/components/radio'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiRadioType = 'UiRadio' as SchemaType<
  'UiRadio',
  RemoteProperties<UiRadioProperties>,
  RemoteCallable<UiRadioMethods>
>

export const UiRadio = defineRemoteComponent(
  UiRadioType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)
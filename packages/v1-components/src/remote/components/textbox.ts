import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
  SerializedInputEvent,
  SerializedKeyboardEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiTextboxMethods,
  UiTextboxProperties,
} from '@/common/components/textbox'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

import { events } from '@/common/components/textbox'

export const UiTextboxType = 'UiTextbox' as SchemaType<
  'UiTextbox',
  RemoteProperties<UiTextboxProperties>,
  RemoteCallable<UiTextboxMethods>
>

export const UiTextbox = defineRemoteComponent(
  UiTextboxType,
  events as unknown as {
    'input': (event: SerializedInputEvent) => boolean,
    'keydown': (event: SerializedKeyboardEvent) => boolean,
    'paste': (event: SerializedEvent) => boolean,
    'change': (event: SerializedInputEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'update:focused': (focused: boolean) => boolean,
    'update:value': (value: string | number) => boolean,
    'clear': () => boolean,
  }
)

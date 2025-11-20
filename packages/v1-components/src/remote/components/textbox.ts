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
  UiTextboxProperties,
  UiTextboxMethods,
} from '@/common/components/textbox'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTextboxType = 'UiTextbox' as SchemaType<
  'UiTextbox',
  RemoteProperties<UiTextboxProperties>,
  RemoteCallable<UiTextboxMethods>
>

export const UiTextbox = defineRemoteComponent(
  UiTextboxType,
  [
    'input',
    'keydown',
    'change',
    'focus',
    'blur',
    'update:focused',
    'update:value',
    'clear',
  ] as unknown as {
    'input': (event: SerializedInputEvent) => boolean,
    'keydown': (event: SerializedKeyboardEvent) => boolean,
    'change': (event: SerializedInputEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'update:focused': (focused: boolean) => boolean,
    'update:value': (value: string | number) => boolean,
    'clear': () => boolean,
  }
)

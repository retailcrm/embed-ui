import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
  SerializedKeyboardEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiToggleButtonMethods,
  UiToggleButtonProperties,
} from '@/common/components/toggle-button'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiToggleButtonType = 'UiToggleButton' as SchemaType<
  'UiToggleButton',
  RemoteProperties<UiToggleButtonProperties>,
  RemoteCallable<UiToggleButtonMethods>
>

export const UiToggleButton = defineRemoteComponent(
  UiToggleButtonType, {
    emits: [
      'click',
      'focus',
      'blur',
      'keydown',
    ] as unknown as {
      'click': (event: SerializedEvent) => boolean,
      'focus': (event: SerializedFocusEvent) => boolean,
      'blur': (event: SerializedEvent) => boolean,
      'keydown': (event: SerializedKeyboardEvent) => boolean,
    },

    methods: {
      focus: defineRemoteMethod<[], void>(),
      blur: defineRemoteMethod<[], void>(),
      click: defineRemoteMethod<[], void>(),
    },
  }
)

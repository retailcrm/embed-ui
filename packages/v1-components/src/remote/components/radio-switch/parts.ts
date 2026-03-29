import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
  SerializedKeyboardEvent,
} from '@omnicajs/vue-remote/types/events'
import type {
  UiRadioSwitchOptionShellMethods,
  UiRadioSwitchOptionShellProperties,
  UiRadioSwitchRootProperties,
} from '@/common/components/radio-switch'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiRadioSwitchRootType = 'UiRadioSwitchRoot' as SchemaType<
  'UiRadioSwitchRoot',
  RemoteProperties<UiRadioSwitchRootProperties>
>

export const UiRadioSwitchRoot = defineRemoteComponent(UiRadioSwitchRootType)

export const UiRadioSwitchOptionShellType = 'UiRadioSwitchOptionShell' as SchemaType<
  'UiRadioSwitchOptionShell',
  RemoteProperties<UiRadioSwitchOptionShellProperties>,
  RemoteCallable<UiRadioSwitchOptionShellMethods>
>

export const UiRadioSwitchOptionShell = defineRemoteComponent(UiRadioSwitchOptionShellType, {
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
  },
})

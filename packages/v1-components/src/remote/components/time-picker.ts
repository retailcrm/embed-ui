import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiTimePickerMethods,
  UiTimePickerProperties,
} from '@/common/components/time-picker'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiTimePickerType = 'UiTimePicker' as SchemaType<
  'UiTimePicker',
  RemoteProperties<UiTimePickerProperties>,
  RemoteCallable<UiTimePickerMethods>
>

export const UiTimePicker = defineRemoteComponent(UiTimePickerType, {
  emits: [
    'change',
    'update:value',
    'focus',
    'blur',
  ] as unknown as {
    'change': (value: string) => boolean;
    'update:value': (value: string) => boolean;
    'focus': (event: FocusEvent) => boolean;
    'blur': (event: Event) => boolean;
  },
  methods: {
    open: defineRemoteMethod<[], void>(),
    close: defineRemoteMethod<[], void>(),
    focus: defineRemoteMethod<[], void>(),
  },
})

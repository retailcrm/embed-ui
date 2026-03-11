import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiDatePickerMethods,
  UiDatePickerProperties,
} from '@/common/components/date-picker'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiDatePickerType = 'UiDatePicker' as SchemaType<
  'UiDatePicker',
  RemoteProperties<UiDatePickerProperties>,
  RemoteCallable<UiDatePickerMethods>
>

export const UiDatePicker = defineRemoteComponent(UiDatePickerType, {
  emits: [
    'open',
    'close',
    'change',
    'update:value',
  ] as unknown as {
    'open': () => boolean;
    'close': () => boolean;
    'change': (value: Date | Date[] | null) => boolean;
    'update:value': (value: Date | Date[] | null) => boolean;
  },
  methods: {
    open: defineRemoteMethod<[], void>(),
    close: defineRemoteMethod<[], void>(),
    toggle: defineRemoteMethod<[], void>(),
  },
})

import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiDatePickerMethods,
  UiDatePickerProperties,
} from '@/common/components/date-picker'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiDatePickerType = 'UiDatePicker' as SchemaType<
  'UiDatePicker',
  RemoteProperties<UiDatePickerProperties>,
  RemoteCallable<UiDatePickerMethods>
>

export const UiDatePicker = defineRemoteComponent(
  UiDatePickerType,
  [
    'open',
    'close',
    'change',
    'update:value',
  ] as unknown as {
    'open': () => boolean;
    'close': () => boolean;
    'change': (value: Date | Date[] | null) => boolean;
    'update:value': (value: Date | Date[] | null) => boolean;
  }
)

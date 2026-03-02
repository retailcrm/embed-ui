import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiCalendarMethods,
  UiCalendarProperties,
} from '@/common/components/calendar'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiCalendarType = 'UiCalendar' as SchemaType<
  'UiCalendar',
  RemoteProperties<UiCalendarProperties>,
  RemoteCallable<UiCalendarMethods>
>

export const UiCalendar = defineRemoteComponent(
  UiCalendarType,
  [
    'change',
    'update:value',
  ] as unknown as {
    'change': (value: Date | Date[] | null) => boolean;
    'update:value': (value: Date | Date[] | null) => boolean;
  }
)

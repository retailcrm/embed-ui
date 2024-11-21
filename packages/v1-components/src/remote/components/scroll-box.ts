import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiScrollBoxProperties,
  UiScrollBoxMethods,
} from '@/common/components/scroll-box'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiScrollBoxType = 'UiScrollBox' as SchemaType<
  'UiScrollBox',
  RemoteProperties<UiScrollBoxProperties>,
  RemoteCallable<UiScrollBoxMethods & Record<string, never>>
>

export const UiScrollBox = defineRemoteComponent(
  UiScrollBoxType,
  ['click', 'focus', 'blur', 'ps-y-reach-start', 'ps-y-reach-end'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'ps-y-reach-start': (event: Event) => boolean,
    'ps-y-reach-end': (event: Event) => boolean,
  }
)

import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiCheckboxProperties,
  UiCheckboxMethods,
} from '@/common/components/checkbox'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiCheckboxType = 'UiCheckbox' as SchemaType<
  'UiCheckbox',
  RemoteProperties<UiCheckboxProperties>,
  RemoteCallable<UiCheckboxMethods>
>

export const UiCheckbox = defineRemoteComponent(
  UiCheckboxType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiAddButtonProperties } from '@/common/components/add-button'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiAddButtonType = 'UiAddButton' as SchemaType<
  'UiAddButton',
  RemoteProperties<UiAddButtonProperties>,
  Record<string, never>
>

export const UiAddButton = defineRemoteComponent(
  UiAddButtonType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  },
  [
    'icon',
    'description',
  ]
)

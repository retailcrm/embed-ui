import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiErrorProperties } from '@/common/components/error'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiErrorType = 'UiError' as SchemaType<
  'UiError',
  RemoteProperties<UiErrorProperties>,
  Record<string, never>
>

export const UiError = defineRemoteComponent(
  UiErrorType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

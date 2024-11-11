import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/dist/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
} from '@omnicajs/vue-remote/types/events'

import type { UiLoaderProperties } from '@/common/components/loader'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiLoaderType = 'UiLoader' as SchemaType<
  'UiLoader',
  RemoteProperties<UiLoaderProperties>,
  Record<string, never>
>

export const UiLoader = defineRemoteComponent(
  UiLoaderType,
  ['click', 'focus', 'blur'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
  }
)

import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiSliderProperties } from '@/common/components/slider'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiSliderType = 'UiSlider' as SchemaType<
  'UiSlider',
  RemoteProperties<UiSliderProperties>,
  Record<string, never>
>

export const UiSlider = defineRemoteComponent(
  UiSliderType,
  ['update:value'] as unknown as {
    'update:value': (value: number | number[]) => boolean;
  }
)

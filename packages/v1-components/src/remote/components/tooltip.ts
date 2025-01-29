import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiPopperProperties,
} from '@/common/components/popper'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTooltipType = 'UiTooltip' as SchemaType<
  'UiTooltip',
  RemoteProperties<UiPopperProperties>
>

export const UiTooltip = defineRemoteComponent(UiTooltipType)

import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiDateProperties,
} from '@/common/components/date'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiDateType = 'UiDate' as SchemaType<
  'UiDate',
  RemoteProperties<UiDateProperties>
>

export const UiDate = defineRemoteComponent(UiDateType)

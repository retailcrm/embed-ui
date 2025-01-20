import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiImageProperties,
} from '@/common/components/image'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiImageType = 'UiImage' as SchemaType<
  'UiImage',
  RemoteProperties<UiImageProperties>
>

export const UiImage = defineRemoteComponent(UiImageType)

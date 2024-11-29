import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import { UiYandexMapProperties } from '@/common/components/yandex-map'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiYandexMapType = 'UiYandexMap' as SchemaType<
  'UiYandexMap',
  RemoteProperties<UiYandexMapProperties>,
  Record<string, never>
>

export const UiYandexMap = defineRemoteComponent(
  UiYandexMapType,
  [
    'change',
    'update:address',
  ] as unknown as {
    'change': (address: string) => boolean,
    'update:address': (address: string) => boolean,
  }
)

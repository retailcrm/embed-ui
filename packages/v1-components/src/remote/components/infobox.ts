import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiInfoboxMethods, UiInfoboxProperties } from '@/common/components/infobox'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiInfoboxType = 'UiInfobox' as SchemaType<
  'UiInfobox',
  RemoteProperties<UiInfoboxProperties>,
  RemoteCallable<UiInfoboxMethods>
>

export const UiInfobox = defineRemoteComponent(
  UiInfoboxType,
  [
    'show',
    'hide',
    'update:expanded',
    'update:shown',
  ] as unknown as {
    'show': () => boolean;
    'hide': () => boolean;
    'update:expanded': (expanded: boolean) => boolean;
    'update:shown': (shown: boolean) => boolean;
  },
  [
    'icon',
    'title',
    'toggle',
    'default',
  ]
)

import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiCollapseProperties } from '@/common/components/collapse'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiCollapseType = 'UiCollapse' as SchemaType<
  'UiCollapse',
  RemoteProperties<UiCollapseProperties>,
  Record<string, never>
>

export const UiCollapse = defineRemoteComponent(
  UiCollapseType,
  [
    'collapsed',
    'collapsing',
    'expanded',
    'expanding',
  ] as unknown as {
    'collapsed': () => boolean;
    'collapsing': () => boolean;
    'expanded': () => boolean;
    'expanding': () => boolean;
  },
  [
    'default',
  ]
)

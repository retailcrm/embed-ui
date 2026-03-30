import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  TabLayout,
  UiTabGroupProperties,
  UiTabProperties,
} from '@/common/components/tab'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTabGroupType = 'UiTabGroup' as SchemaType<
  'UiTabGroup',
  RemoteProperties<UiTabGroupProperties>
>

export const UiTabType = 'UiTab' as SchemaType<
  'UiTab',
  RemoteProperties<UiTabProperties>
>

export const UiTab = defineRemoteComponent(
  UiTabType,
  [],
  [
    'default',
    'icon',
    'label',
    'counter',
    'content',
  ]
)

export const UiTabGroup = defineRemoteComponent(
  UiTabGroupType,
  [
    'layout',
    'change',
    'update:activeId',
    'update:focusableId',
    'update:menuExpanded',
  ] as unknown as {
    'layout': (layout: TabLayout) => boolean,
    'change': (id: string) => boolean,
    'update:activeId': (id: string) => boolean,
    'update:focusableId': (id: string | null) => boolean,
    'update:menuExpanded': (expanded: boolean) => boolean,
  },
  ['default']
)

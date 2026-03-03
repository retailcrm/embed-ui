import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiCollapseBoxMethods,
  UiCollapseBoxProperties,
  UiCollapseGroupMethods,
  UiCollapseGroupProperties,
} from '@/common/components/collapse-box'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiCollapseBoxType = 'UiCollapseBox' as SchemaType<
  'UiCollapseBox',
  RemoteProperties<UiCollapseBoxProperties>,
  RemoteCallable<UiCollapseBoxMethods>
>

export const UiCollapseBox = defineRemoteComponent(
  UiCollapseBoxType,
  [
    'collapsed',
    'collapse-cancel',
    'expanded',
    'expand-cancel',
    'toggle',
    'update:expanded',
  ] as unknown as {
    'collapsed': () => boolean;
    'collapse-cancel': () => boolean;
    'expanded': () => boolean;
    'expand-cancel': () => boolean;
    'toggle': (expanded: boolean) => boolean;
    'update:expanded': (expanded: boolean) => boolean;
  },
  [
    'icon',
    'title',
    'description',
    'body',
    'body-content',
    'footer',
    'footer-content',
  ]
)

export const UiCollapseGroupType = 'UiCollapseGroup' as SchemaType<
  'UiCollapseGroup',
  RemoteProperties<UiCollapseGroupProperties>,
  RemoteCallable<UiCollapseGroupMethods>
>

export const UiCollapseGroup = defineRemoteComponent(
  UiCollapseGroupType,
  [
    'expand-cancelled',
    'expanded',
    'update:activeBoxId',
  ] as unknown as {
    'expand-cancelled': (payload: { tried: string | null; actual: string | null }) => boolean;
    'expanded': (id: string | null) => boolean;
    'update:activeBoxId': (id: string | null) => boolean;
  },
  [
    'default',
  ]
)

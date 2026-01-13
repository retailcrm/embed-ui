import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import { UiMenuItemProperties } from '@/common/components/menu'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiMenuItemType = 'UiMenuItem' as SchemaType<
    'UiMenuItem',
    RemoteProperties<UiMenuItemProperties>
>

export const UiMenuItem = defineRemoteComponent(
  UiMenuItemType,
  [],
  [
    'default',
    'avatar',
    'leading-icon',
    'description',
    'trailing-icon',
  ]
)

export const UiMenuItemGroupType = 'UiMenuItemGroup' as SchemaType<
  'UiMenuItemGroup'
>

export const UiMenuItemGroup = defineRemoteComponent(
  UiMenuItemGroupType,
  [],
  [
    'default',
    'option',
    'label',
    'quantity',
  ]
)

import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiAvatarListProperties,
  UiAvatarProperties,
} from '@/common/components/avatar'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiAvatarType = 'UiAvatar' as SchemaType<
  'UiAvatar',
  RemoteProperties<UiAvatarProperties>
>

export const UiAvatar = defineRemoteComponent(UiAvatarType)

export const UiAvatarListType = 'UiAvatarList' as SchemaType<
  'UiAvatarList',
  RemoteProperties<UiAvatarListProperties>
>

export const UiAvatarList = defineRemoteComponent(UiAvatarListType)

import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiToggleGroupRootProperties } from '@/common/components/toggle-group'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiToggleGroupRootType = 'UiToggleGroupRoot' as SchemaType<
  'UiToggleGroupRoot',
  RemoteProperties<UiToggleGroupRootProperties>
>

export const UiToggleGroupRoot = defineRemoteComponent(UiToggleGroupRootType)

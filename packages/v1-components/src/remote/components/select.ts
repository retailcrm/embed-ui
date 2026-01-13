import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiSelectTriggerProperties,
} from '@/common/components/select'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiSelectType = 'UiSelect' as SchemaType<
    'UiSelect',
    RemoteProperties<UiSelectTriggerProperties>
>

export const UiSelect = defineRemoteComponent(UiSelectType)

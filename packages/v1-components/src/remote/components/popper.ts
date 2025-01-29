import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiPopperProperties,
} from '@/common/components/popper'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiPopperType = 'UiPopper' as SchemaType<
  'UiPopper',
  RemoteProperties<UiPopperProperties>
>

export const UiPopper = defineRemoteComponent(UiPopperType)

export const UiPopperConnectorType = 'UiPopperConnector' as SchemaType<'UiPopperConnector'>

export const UiPopperConnector = defineRemoteComponent(UiPopperConnectorType)

export const UiPopperTargetType = 'UiPopperTarget' as SchemaType<
  'UiPopperTarget',
  RemoteProperties<{ tag?: string }>
>

export const UiPopperTarget = defineRemoteComponent(UiPopperTargetType)

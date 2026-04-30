import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiPopperProperties } from '@/common/components/popper'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiPopperType = 'UiPopper' as SchemaType<
  'UiPopper',
  RemoteProperties<UiPopperProperties>
>

export const UiPopper = defineRemoteComponent(UiPopperType, {
  emits: [
    'attached',
    'dispose',
    'hide',
    'hidden',
    'show',
    'shown',
    'update:visible',
  ] as unknown as {
    'attached': () => boolean,
    'dispose': () => boolean,
    'hide': (reason?: 'generic' | 'by-miss-click') => boolean,
    'hidden': () => boolean,
    'show': () => boolean,
    'shown': () => boolean,
    'update:visible': (visible: boolean) => boolean,
  },
})

export const UiPopperConnectorType = 'UiPopperConnector' as SchemaType<'UiPopperConnector'>

export const UiPopperConnector = defineRemoteComponent(UiPopperConnectorType)

export const UiPopperTargetType = 'UiPopperTarget' as SchemaType<
  'UiPopperTarget',
  RemoteProperties<{ tag?: string }>
>

export const UiPopperTarget = defineRemoteComponent(UiPopperTargetType)

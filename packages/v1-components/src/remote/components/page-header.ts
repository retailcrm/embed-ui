import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
  SerializedInputEvent,
  SerializedKeyboardEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

import { events } from '@/common/components/page-header'

export const UiPageHeaderType = 'UiPageHeader' as SchemaType<
  'UiPageHeader',
  RemoteProperties<UiPageHeaderProperties>,
  RemoteCallable<UiPageHeaderMethods>
>

export const UiPageHeader = defineRemoteComponent(UiPageHeaderType, {
  emits: events as unknown as {
    'blur': (event: SerializedEvent) => boolean,
    'change': (event: SerializedInputEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'keydown': (event: SerializedKeyboardEvent) => boolean,
    'update:value': (value: string | number) => boolean,
  },
  methods: {
    blur: defineRemoteMethod<[], void>(),
    focus: defineRemoteMethod<[], void>(),
  },
  slots: [
    'actions',
  ],
})

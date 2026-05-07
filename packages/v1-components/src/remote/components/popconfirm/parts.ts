import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { SerializedEvent } from '@omnicajs/vue-remote/types/events'

import type {
  UiPopconfirmPopperMethods,
  UiPopconfirmPopperProperties,
  UiPopconfirmTriggerProperties,
} from '@/common/components/popconfirm'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiPopconfirmTriggerType = 'UiPopconfirmTrigger' as SchemaType<
  'UiPopconfirmTrigger',
  RemoteProperties<UiPopconfirmTriggerProperties>
>

export const UiPopconfirmTrigger = defineRemoteComponent(UiPopconfirmTriggerType, {
  emits: [
    'click',
  ] as unknown as {
    'click': (event: SerializedEvent) => boolean;
  },
})

export const UiPopconfirmPopperType = 'UiPopconfirmPopper' as SchemaType<
  'UiPopconfirmPopper',
  RemoteProperties<UiPopconfirmPopperProperties>,
  RemoteCallable<UiPopconfirmPopperMethods>
>

export const UiPopconfirmPopper = defineRemoteComponent(UiPopconfirmPopperType, {
  emits: [
    'update:visible',
    'toggle',
    'cancel',
    'ok',
  ] as unknown as {
    'update:visible': (visible: boolean) => boolean;
    'toggle': (visible: boolean) => boolean;
    'cancel': () => boolean;
    'ok': () => boolean;
  },
  methods: {
    adjust: defineRemoteMethod<[], void>(),
    close: defineRemoteMethod<[], void>(),
    dispose: defineRemoteMethod<[], void>(),
    open: defineRemoteMethod<[], void>(),
  },
  slots: [
    'title',
    'cancel-text',
    'ok-text',
  ],
})

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
  UiSelectOptionProperties,
  UiSelectPopperMethods,
  UiSelectPopperProperties,
  UiSelectTriggerMethods,
  UiSelectTriggerProperties,
} from '@/common/components/select'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

export const UiSelectTriggerType = 'UiSelectTrigger' as SchemaType<
  'UiSelectTrigger',
  RemoteProperties<UiSelectTriggerProperties>,
  RemoteCallable<UiSelectTriggerMethods>
>

export const UiSelectTrigger = defineRemoteComponent(UiSelectTriggerType, {
  emits: [
    'input',
    'focus',
    'blur',
    'keydown',
    'clear',
    'update:value',
    'update:expanded',
  ] as unknown as {
    'input': (event: SerializedInputEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'keydown': (event: SerializedKeyboardEvent) => boolean,
    'clear': () => boolean,
    'update:value': (value: string | number) => boolean,
    'update:expanded': (expanded: boolean) => boolean,
  },
  methods: {
    open: defineRemoteMethod<[], void>(),
    close: defineRemoteMethod<[], void>(),
    onClick: defineRemoteMethod<[event?: MouseEvent], void>(),
    onKeyDown: defineRemoteMethod<[event: KeyboardEvent], void>(),
    onInput: defineRemoteMethod<[event: Event], void>(),
    onFocus: defineRemoteMethod<[event: Event], void>(),
    onBlur: defineRemoteMethod<[event: Event], void>(),
    onClear: defineRemoteMethod<[event: MouseEvent], void>(),
  },
})

export const UiSelectPopperType = 'UiSelectPopper' as SchemaType<
  'UiSelectPopper',
  RemoteProperties<UiSelectPopperProperties>,
  RemoteCallable<UiSelectPopperMethods>
>

export const UiSelectPopper = defineRemoteComponent(UiSelectPopperType, {
  emits: [
    'update:visible',
    'show',
    'hide',
    'shown',
    'hidden',
    'dispose',
  ] as unknown as {
    'update:visible': (visible: boolean) => boolean,
    'show': () => boolean,
    'hide': () => boolean,
    'shown': () => boolean,
    'hidden': () => boolean,
    'dispose': () => boolean,
  },
  methods: {
    autoScroll: defineRemoteMethod<[], void>(),
    updateWidth: defineRemoteMethod<[], void>(),
  },
})

export const UiSelectOptionType = 'UiSelectOption' as SchemaType<
  'UiSelectOption',
  RemoteProperties<UiSelectOptionProperties>
>

export const UiSelectOption = defineRemoteComponent(
  UiSelectOptionType
)

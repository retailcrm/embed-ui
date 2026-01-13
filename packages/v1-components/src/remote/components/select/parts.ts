import type { RemoteProperties } from '@/remote/scaffolding'
import type { RemoteCallable } from '@remote-ui/rpc'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  SerializedEvent,
  SerializedFocusEvent,
  SerializedInputEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiSelectOptionProperties,
  UiSelectPopperMethods,
  UiSelectPopperProperties,
  UiSelectTriggerMethods,
  UiSelectTriggerProperties,
} from '@/common/components/select'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiSelectTriggerType = 'UiSelectTrigger' as SchemaType<
  'UiSelectTrigger',
  RemoteProperties<UiSelectTriggerProperties>,
  RemoteCallable<UiSelectTriggerMethods>
>

export const UiSelectTrigger = defineRemoteComponent(
  UiSelectTriggerType,
  [
    'input',
    'focus',
    'blur',
    'clear',
    'update:value',
    'update:expanded',
  ] as unknown as {
    'input': (event: SerializedInputEvent) => boolean,
    'focus': (event: SerializedFocusEvent) => boolean,
    'blur': (event: SerializedEvent) => boolean,
    'clear': () => boolean,
    'update:value': (value: string | number) => boolean,
    'update:expanded': (expanded: boolean) => boolean,
  }
)

export const UiSelectPopperType = 'UiSelectPopper' as SchemaType<
  'UiSelectPopper',
  RemoteProperties<UiSelectPopperProperties>,
  RemoteCallable<UiSelectPopperMethods>
>

export const UiSelectPopper = defineRemoteComponent(
  UiSelectPopperType,
  [
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
  }
)

export const UiSelectOptionType = 'UiSelectOption' as SchemaType<
  'UiSelectOption',
  RemoteProperties<UiSelectOptionProperties>
>

export const UiSelectOption = defineRemoteComponent(
  UiSelectOptionType
)

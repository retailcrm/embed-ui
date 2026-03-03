import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiNumberStepperMethods,
  UiNumberStepperProperties,
  ViolationPayload,
} from '@/common/components/number-stepper'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiNumberStepperType = 'UiNumberStepper' as SchemaType<
  'UiNumberStepper',
  RemoteProperties<UiNumberStepperProperties>,
  RemoteCallable<UiNumberStepperMethods>
>

export const UiNumberStepper = defineRemoteComponent(
  UiNumberStepperType,
  [
    'change',
    'update:value',
    'focus',
    'blur',
    'increase',
    'decrease',
    'violation',
  ] as unknown as {
    'change': (value: number | null) => boolean;
    'update:value': (value: number | null) => boolean;
    'focus': (event: FocusEvent) => boolean;
    'blur': (event: Event) => boolean;
    'increase': (value: number | null) => boolean;
    'decrease': (value: number | null) => boolean;
    'violation': (payload: ViolationPayload) => boolean;
  }
)

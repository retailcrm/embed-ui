import type { DefineComponent } from '@/common/vue'

import type {
  UiTimePickerMethods,
  UiTimePickerProperties,
} from '@/common/components/time-picker'

declare const UiTimePicker: DefineComponent<UiTimePickerProperties, UiTimePickerMethods>

export default UiTimePicker

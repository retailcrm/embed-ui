import type { DefineComponent } from '@/common/vue'

import type {
  UiToggleButtonMethods,
  UiToggleButtonProperties,
} from '@/common/components/toggle-button'

declare const UiToggleButton: DefineComponent<
  UiToggleButtonProperties,
  UiToggleButtonMethods
>

export default UiToggleButton

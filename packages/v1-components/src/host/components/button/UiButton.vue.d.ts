import type { DefineComponent } from '@/common/vue'

import type {
  UiButtonProperties,
  UiButtonMethods,
} from '@/common/components/button'

declare const UiButton: DefineComponent<
  UiButtonProperties,
  UiButtonMethods
>

export default UiButton

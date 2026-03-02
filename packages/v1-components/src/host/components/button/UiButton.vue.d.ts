import type { DefineComponent } from '@/common/vue'

import type { UiButtonMethods, UiButtonProperties } from '@/common/components/button'

declare const UiButton: DefineComponent<
  UiButtonProperties,
  UiButtonMethods
>

export default UiButton

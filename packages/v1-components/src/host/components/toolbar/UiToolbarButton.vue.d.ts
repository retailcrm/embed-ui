import type { DefineComponent } from '@/common/vue'

import type { UiButtonMethods } from '@/common/components/button'
import type { UiToolbarButtonProperties } from '@/common/components/toolbar-button'

declare const UiToolbarButton: DefineComponent<
  UiToolbarButtonProperties,
  UiButtonMethods
>

export default UiToolbarButton

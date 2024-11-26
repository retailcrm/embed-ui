import type { DefineComponent } from '@/common/vue'

import type { UiToolbarButtonProperties } from '@/common/components/toolbar-button'
import type { UiButtonMethods } from '@/common/components/button'

declare const UiToolbarButton: DefineComponent<
  UiToolbarButtonProperties,
  UiButtonMethods
>

export default UiToolbarButton

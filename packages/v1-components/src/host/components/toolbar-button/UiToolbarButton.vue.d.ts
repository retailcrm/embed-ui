import type { DefineComponent } from '@/common/vue'

import type {
  UiToolbarButtonProperties,
  UiToolbarButtonMethods,
} from '@/common/components/toolbar-button'

declare const UiToolbarButton: DefineComponent<
  UiToolbarButtonProperties,
  UiToolbarButtonMethods
>

export default UiToolbarButton

import type { DefineComponent } from '@/common/vue'

import type {
  UiScrollBoxProperties,
  UiScrollBoxMethods,
} from '@/common/components/scroll-box'

declare const UiScrollBox: DefineComponent<
  UiScrollBoxProperties,
  UiScrollBoxMethods
>

export default UiScrollBox

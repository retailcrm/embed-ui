import type { DefineComponent } from '@/common/vue'

import type {
  UiScrollBoxMethods,
  UiScrollBoxProperties,
} from '@/common/components/scroll-box'

declare const UiScrollBox: DefineComponent<
  UiScrollBoxProperties,
  UiScrollBoxMethods
>

export default UiScrollBox

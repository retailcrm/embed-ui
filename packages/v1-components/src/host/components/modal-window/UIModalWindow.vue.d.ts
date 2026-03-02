import type { DefineComponent } from '@/common/vue'

import type {
  UiModalWindowMethods,
  UiModalWindowProperties,
} from '@/common/components/modal-window'

declare const UiModalWindow: DefineComponent<
  UiModalWindowProperties,
  UiModalWindowMethods
>

export default UiModalWindow

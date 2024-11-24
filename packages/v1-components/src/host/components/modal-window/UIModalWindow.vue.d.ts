import type { DefineComponent } from '@/common/vue'

import type {
  UiModalWindowProperties,
  UiModalWindowMethods,
} from '@/common/components/modal-window'

declare const UiModalWindow: DefineComponent<
  UiModalWindowProperties,
  UiModalWindowMethods
>

export default UiModalWindow

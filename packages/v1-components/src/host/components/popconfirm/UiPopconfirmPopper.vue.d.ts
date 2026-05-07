import type { DefineComponent } from '@/common/vue'

import type {
  UiPopconfirmPopperMethods,
  UiPopconfirmPopperProperties,
} from '@/common/components/popconfirm'

declare const UiPopconfirmPopper: DefineComponent<
  UiPopconfirmPopperProperties,
  UiPopconfirmPopperMethods
>

export default UiPopconfirmPopper

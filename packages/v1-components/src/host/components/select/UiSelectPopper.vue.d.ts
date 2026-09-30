import type { DefineComponent } from '@/common/vue'

import type { UiPopperMethods } from '@/common/components/popper'

import type {
  UiSelectPopperMethods,
  UiSelectPopperProperties,
} from '@/common/components/select'

declare const UiSelectPopper: DefineComponent<
    UiSelectPopperProperties,
    UiSelectPopperMethods & UiPopperMethods
>

export default UiSelectPopper

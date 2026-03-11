import type { DefineComponent } from '@/common/vue'
import type { Ref } from 'vue'

import type { UiPopperMethods } from '@/common/components/popper'

import type {
  UiSelectPopperMethods,
  UiSelectPopperProperties,
} from '@/common/components/select'

declare const UiSelectPopper: DefineComponent<
    UiSelectPopperProperties, { target: Ref<HTMLElement | null> },
    UiSelectPopperMethods & UiPopperMethods
>

export default UiSelectPopper

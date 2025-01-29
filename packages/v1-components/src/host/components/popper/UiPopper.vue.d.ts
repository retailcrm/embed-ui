import type { DefineComponent } from '@/common/vue'
import type { Ref } from 'vue'

import {
  UiPopperProperties,
  UiPopperMethods,
} from '@/common/components/popper'

declare const UiPopper: DefineComponent<
  UiPopperProperties & { target: Ref<HTMLElement | null> },
  UiPopperMethods
>

export default UiPopper

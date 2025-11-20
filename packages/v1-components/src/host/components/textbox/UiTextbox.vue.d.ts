import type { DefineComponent } from '@/common/vue'

import type { UiTextboxMethods } from '@/common/components/textbox'
import type { UiTextboxProperties } from '@/common/components/textbox'

declare const UiTextbox: DefineComponent<
  UiTextboxProperties,
  UiTextboxMethods
>

export default UiTextbox

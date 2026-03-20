import type { DefineComponent } from '@/common/vue'

import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

declare const UiPageHeader: DefineComponent<
  UiPageHeaderProperties,
  UiPageHeaderMethods
>

export default UiPageHeader

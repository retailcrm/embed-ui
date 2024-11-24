import type { DefineComponent } from '@/common/vue'

import type {
  UiModalWindowSurfaceProperties,
  UiModalWindowSurfaceMethods,
} from '@/common/components/modal-window'

declare const UiModalWindowSurface: DefineComponent<
  UiModalWindowSurfaceProperties,
  UiModalWindowSurfaceMethods
>

export default UiModalWindowSurface

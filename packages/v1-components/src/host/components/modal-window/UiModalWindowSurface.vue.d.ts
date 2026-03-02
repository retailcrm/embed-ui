import type { DefineComponent } from '@/common/vue'

import type {
  UiModalWindowSurfaceMethods,
  UiModalWindowSurfaceProperties,
} from '@/common/components/modal-window'

declare const UiModalWindowSurface: DefineComponent<
  UiModalWindowSurfaceProperties,
  UiModalWindowSurfaceMethods
>

export default UiModalWindowSurface

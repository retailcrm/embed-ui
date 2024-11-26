import type { UiButtonProperties } from '@/common/components/button'

export type UiToolbarButtonProperties = Omit<
  UiButtonProperties,
  | 'appearance'
  | 'size'
  | 'type'
>

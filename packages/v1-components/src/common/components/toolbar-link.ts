import type { UiLinkProperties } from '@/common/components/link'

export type UiToolbarLinkProperties = Omit<
  UiLinkProperties,
  | 'size'
>

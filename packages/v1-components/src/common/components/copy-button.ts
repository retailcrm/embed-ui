import type { SIZE } from '@/common/components/button'
import type { UiPopperProperties } from '@/common/components/popper'

export type TooltipOptions = Omit<
  UiPopperProperties,
  | 'target'
  | 'targetTriggers'
  | 'popperTriggers'
  | 'globalTriggers'
>

export type UiCopyButtonProperties = {
  text: string;
  size: SIZE;
  tooltipOptions?: TooltipOptions;
}

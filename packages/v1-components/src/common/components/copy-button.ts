import type { UiPopperProperties } from '@/common/components/popper'
import type { SIZE } from '@/common/components/button'

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

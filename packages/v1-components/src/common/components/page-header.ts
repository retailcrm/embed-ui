import type { SIZE } from '@/common/components/textbox'

export type UiPageHeaderProperties = {
  id?: string;
  value?: string | number | null;
  placeholder?: string;
  size?: SIZE | `${SIZE}`;
  autofocus?: boolean;
  autoselect?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

export type UiPageHeaderMethods = {
  focus (): void;
  blur (): void;
}

export const events = [
  'blur',
  'change',
  'focus',
  'keydown',
  'update:value',
]

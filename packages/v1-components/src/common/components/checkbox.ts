import type { Primitive } from '@/common/types'

export type UiCheckboxProperties = {
  id?: string | undefined;
  name?: string;
  model?: Primitive | Primitive[];
  value?: Primitive;
  indeterminate?: boolean;
  valueOfTruthy?: Primitive;
  valueOfFalsy?: Primitive;
  small?: boolean;
  disabled?: boolean;
}

export type UiCheckboxMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}
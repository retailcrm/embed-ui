import type { Primitive } from '@/common/types'

export type UiRadioProperties = {
  id?: string | undefined;
  name?: string;
  model?: Primitive | Primitive[];
  value?: Primitive;
  disabled?: boolean;
}

export type UiRadioMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}
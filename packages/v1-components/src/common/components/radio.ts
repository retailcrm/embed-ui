import type { Primitive } from '@/common/types'

export type UiRadioProperties = {
  id?: string | undefined;
  name?: string;
  model?: Primitive | Primitive[];
  value?: Primitive;
  required?: boolean;
  disabled?: boolean;
}

export type UiRadioMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}

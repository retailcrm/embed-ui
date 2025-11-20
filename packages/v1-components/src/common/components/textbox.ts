export enum TYPE {
  EMAIL = 'email',
  PASSWORD = 'password',
  PHONE = 'tel',
  SEARCH = 'search',
  TEXT = 'text',
  URL = 'url',
}

export enum INPUTMODE {
  DECIMAL = 'decimal',
  EMAIL = 'email',
  NONE = 'none',
  NUMERIC = 'numeric',
  SEARCH = 'search',
  TEL = 'tel',
  TEXT = 'text',
  URL = 'url',
}

export enum SIZE {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export type UiTextboxProperties = {
  id?: string;
  type?: TYPE | `${TYPE}`;
  value: string | number;
  max?: number | `${number}`;
  min?: number | `${number}`;
  step?: number | `${number}` | 'any';
  required?: boolean;
  autocomplete?: 'on' | 'off';
  inputmode?: INPUTMODE | `${INPUTMODE}`;
  maxlength?: number | `${number}`;
  size: SIZE | `${SIZE}`;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  active?: boolean;
  autofocus?: boolean;
  autoselect?: boolean;
  clearable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  multiline?: boolean;
  outlined?: boolean;
}

export type UiTextboxMethods = {
  getSelectionStart (): number | null;
  getSelectionEnd (): number | null;
  setSelectionRange (start: number, end: number): void;
  focus (): void;
  blur (): void;
  select (): void;
  clear (): void;
}

export const decimalsOf = (value: string | number): number => {
  const [, fraction] = String(value).replace(',', '.').split('.')
  return fraction ? fraction.length : 0
}

export const isMaxDecimalsExceeded = (value: string | number, decimals: number | undefined): boolean => {
  return decimals !== undefined && decimalsOf(value) > decimals
}

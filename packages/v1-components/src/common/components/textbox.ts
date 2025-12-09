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
  value?: string | number | null;
  max?: number | `${number}`;
  min?: number | `${number}`;
  step?: number | `${number}` | 'any';
  required?: boolean;
  autocomplete?: 'on' | 'off';
  inputmode?: INPUTMODE | `${INPUTMODE}`;
  maxlength?: number | string;
  /** Максимальное количество знаков после запятой (для inputmode="decimal"). '*' — без ограничений */
  decimals?: number | `${number}` | '*';
  size?: SIZE | `${SIZE}`;
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
  rows?: number | `${number}`;
  cols?: number | `${number}`;
  outlined?: boolean;
}

export type UiTextboxMethods = {
  getSelectionStart (): number | null;
  getSelectionEnd (): number | null;
  setSelectionRange (start: number, end: number): void;
  focus (): void;
  blur (): void;
  select (): void;
  insert (value: string): Promise<void>;
  clear (): void;
}

export const decimalsOf = (value: string | number): number => {
  const [, fraction] = String(value).replace(',', '.').split('.')
  return fraction ? fraction.length : 0
}

export const isMaxDecimalsExceeded = (value: string | number, decimals: number | undefined): boolean => {
  return decimals !== undefined && decimalsOf(value) > decimals
}

export const sanitizeNumeric = (raw: string): string => raw.replace(/\D+/g, '')
export const sanitizeDecimal = (raw: string, allowNegative: boolean, decimals: number | '*'): string => {
  let s = raw.replace(/,/g, '.')

  s = s.replace(/-/g, '')
  if (allowNegative && raw.trim().startsWith('-')) {
    s = '-' + s
  }

  s = s.replace(/[^0-9.-]/g, '')

  s = normalizeDot(s)

  if (s.indexOf('-') > 0) s = s.replace(/-/g, '')

  s = normalizeZero(s)
  s = normalizeDecimals(s, decimals)

  return s
}

function normalizeZero (value: string) {
  const m = value.match(/^(-)?(\d+)(?:\.(\d*))?$/)
  if (m) {
    const sign = m[1] ?? ''

    let integer = m[2]
    const fraction = m[3] ?? ''

    integer = integer.replace(/^0+(?=\d)/, '')
    if (integer === '') integer = '0'

    return integer === '0' && fraction === '' && !/\.$/.test(value)
      ? `${sign}${integer}`
      : fraction !== '' || /\.$/.test(value)
        ? `${sign}${integer}.${fraction}`
        : `${sign}${integer}`
  }

  return value
}

function normalizeDot(value: string) {
  const dotAt = value.indexOf('.')
  if (dotAt !== -1) {
    return value.slice(0, dotAt + 1) + value.slice(dotAt + 1).replace(/\./g, '')
  }

  return value
}

function normalizeDecimals (value: string, decimals: number | '*') {
  if (decimals !== '*') {
    const m = value.match(/^(-)?(\d+)(?:\.(\d*))?$/)
    if (m) {
      const sign = m[1] ?? ''
      const integer = m[2]
      const fraction = (m[3] ?? '').slice(0, decimals)

      return fraction.length > 0 && decimals > 0
        ? `${sign}${integer}.${fraction}`
        : `${sign}${integer}`
    }
  }

  return value
}

export const events = [
  'input',
  'keydown',
  'change',
  'paste',
  'focus',
  'blur',
  'update:focused',
  'update:value',
  'clear',
]

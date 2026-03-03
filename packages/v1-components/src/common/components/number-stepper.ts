import type { UiTextboxProperties } from '@/common/components/textbox'

import type { SIZE } from '@/common/components/textbox'

export enum DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum VIOLATION {
  NAN = 'nan',
  TOO_LARGE = 'too-large',
  TOO_SMALL = 'too-small',
}

export type ViolationPayload = {
  value: number | null;
  codes: VIOLATION[];
}

export type UiNumberStepperProperties = {
  id?: string;
  value?: number | string | null;
  min?: number | `${number}`;
  max?: number | `${number}`;
  step?: number | `${number}`;
  decimals?: number | `${number}` | '*';
  clamp?: boolean;
  nullable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  direction?: DIRECTION | `${DIRECTION}`;
  size?: SIZE | `${SIZE}`;
  outlined?: boolean;
  textboxOptions?: Partial<Omit<UiTextboxProperties,
    | 'id'
    | 'value'
    | 'type'
    | 'min'
    | 'max'
    | 'step'
    | 'decimals'
    | 'clearable'
    | 'disabled'
    | 'readonly'
    | 'required'
    | 'size'
    | 'outlined'
    | 'autofit'
    | 'inputAttributes'
  >>;
}

export type UiNumberStepperMethods = {
  focus (): void;
  blur (): void;
  increase (): void;
  decrease (): void;
}

export const isNumeric = (value: unknown): boolean => {
  return typeof value === 'number'
    ? Number.isFinite(value)
    : typeof value === 'string'
      ? value.trim().length > 0 && Number.isFinite(Number(value.replace(',', '.')))
      : false
}

export const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim()

    if (normalized.length === 0) {
      return null
    }

    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

export const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const normalizeRange = (min: number | string, max: number | string): [number, number] => {
  const left = Number(min)
  const right = Number(max)

  return left <= right
    ? [left, right]
    : [right, left]
}

export const parseDecimals = (value: number | string | '*' | undefined): number | '*' => {
  if (value === undefined || value === '*') {
    return '*'
  }

  const parsed = Number(value)

  return Number.isInteger(parsed) && parsed >= 0
    ? parsed
    : '*'
}

export const normalizeByDecimals = (value: number, decimals: number | '*'): number => {
  if (decimals === '*') {
    return value
  }

  return Number(value.toFixed(decimals))
}

export const defaultValueOnEmpty = (
  nullable: boolean,
  min: number,
  max: number
): number | null => {
  if (nullable) {
    return null
  }

  return 0 >= min && 0 <= max
    ? 0
    : min
}

export const violationsOf = (
  value: number | null,
  min: number,
  max: number
): VIOLATION[] => {
  if (value === null) {
    return []
  }

  const violations: VIOLATION[] = []

  if (value > max) {
    violations.push(VIOLATION.TOO_LARGE)
  }

  if (value < min) {
    violations.push(VIOLATION.TOO_SMALL)
  }

  return violations
}

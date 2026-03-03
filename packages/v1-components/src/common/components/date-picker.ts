import type { Locale } from '@/common/components/date'
import type { UiCalendarProperties } from '@/common/components/calendar'
import type { UiPopperProperties } from '@/common/components/popper'
import type { UiTextboxProperties } from '@/common/components/textbox'

import { enGB, es } from 'date-fns/locale'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { isDate, isDateArray } from '@/common/components/calendar'
import { isDateValid } from '@/common/components/calendar'
import { sortDates } from '@/common/components/calendar'

export enum SYNCHRONIZATION {
  INSTANT = 'instant',
  CONFIRMED = 'confirmed',
}

export type QuickDate = Date | Date[] | null

export type QuickOption = {
  label: string;
  value: Exclude<QuickDate, null>;
}

export type DateFormatter = (date: Date, omitYear?: boolean) => string

export type UiDatePickerProperties = {
  id?: string;
  value?: Date | Date[] | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  nullable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  type?: UiCalendarProperties['type'];
  appearance?: UiCalendarProperties['appearance'];
  synchronization?: SYNCHRONIZATION | `${SYNCHRONIZATION}`;
  firstDayOfWeek?: number;
  format?: DateFormatter | null;
  omitYear?: boolean;
  placeholder?: string;
  container?: string | null;
  placement?: UiPopperProperties['placement'];
  popperClass?: string | null;
  popperOptions?: Omit<UiPopperProperties, 'visible' | 'target' | 'targetTriggers' | 'popperTriggers' | 'globalTriggers'>;
  quickOptions?: QuickOption[];
  textboxOptions?: Partial<Omit<UiTextboxProperties, 'id' | 'value' | 'placeholder' | 'clearable' | 'disabled' | 'readonly' | 'active'>>;
  locale?: Locale;
}

export type UiDatePickerMethods = {
  open (): void;
  close (): void;
  toggle (): void;
}

const dateFnsLocale = (locale: Locale | undefined) => ({
  'en-GB': enGB,
  'es-ES': es,
  'ru-RU': ru,
}[locale ?? 'en-GB'] ?? enGB)

export const formatDateValue = (
  date: Date,
  omitYear = false,
  locale: Locale | undefined = undefined
): string => {
  const template = omitYear
    ? locale === 'en-GB'
      ? 'dd/MM'
      : 'dd.MM'
    : locale === 'en-GB'
      ? 'dd/MM/yyyy'
      : 'dd.MM.yyyy'

  return format(date, template, {
    locale: dateFnsLocale(locale),
  })
}

export const uid = (() => {
  let counter = 0
  return (prefix = 'ui-v1-date-picker') => `${prefix}-${++counter}`
})()

export const toDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export const isQuickDate = (value: unknown): value is QuickDate => {
  return value === null || isDate(value) || isDateArray(value)
}

export const normalizeDate = (date: Date): Date | null => {
  if (!isDate(date) || !isDateValid(date)) {
    return null
  }

  return new Date(date)
}

export const normalizeDateRange = (dates: Date[]): Date[] => {
  const valid = dates
    .filter((date) => isDate(date) && isDateValid(date))
    .map((date) => new Date(date))

  if (!valid.length) {
    return []
  }

  const [first, last] = sortDates(valid)

  if (!first) {
    return []
  }

  first.setHours(0, 0, 0, 0)

  if (!last) {
    return [first]
  }

  last.setHours(23, 59, 59, 999)

  return [first, last]
}

export const normalizeQuickDate = (value: QuickDate): QuickDate => {
  if (value === null) {
    return null
  }

  if (isDate(value)) {
    return normalizeDate(value)
  }

  if (isDateArray(value)) {
    return normalizeDateRange(value)
  }

  return null
}

export const isQuickDateEqual = (first: QuickDate, second: QuickDate): boolean => {
  if (first === null && second === null) {
    return true
  }

  if (isDate(first) && isDate(second)) {
    return toDateKey(first) === toDateKey(second)
  }

  if (isDateArray(first) && isDateArray(second)) {
    const [aFirst, aLast] = sortDates(first)
    const [bFirst, bLast] = sortDates(second)

    if (!aFirst || !bFirst) {
      return false
    }

    if (!aLast && !bLast) {
      return toDateKey(aFirst) === toDateKey(bFirst)
    }

    if (aLast && bLast) {
      return toDateKey(aFirst) === toDateKey(bFirst) && toDateKey(aLast) === toDateKey(bLast)
    }
  }

  return false
}

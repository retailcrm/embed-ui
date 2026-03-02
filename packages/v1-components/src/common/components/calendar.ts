import type { Locale } from '@/common/components/date'

export enum APPEARANCE {
  SINGLE = 'single',
  DOUBLE = 'double',
}

export enum TYPE {
  SINGLE = 'single',
  RANGE = 'range',
}

export enum VIEW_MODE {
  DAYS = 'days',
  MONTHS = 'months',
  YEARS = 'years',
}

export type UiCalendarProperties = {
  value?: null | Date | Date[];
  type?: TYPE | `${TYPE}`;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  firstDayOfWeek?: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  nullable?: boolean;
  locale?: Locale;
}

export type UiCalendarMethods = {
  viewTo (...dates: Date[]): void;
}

const dateWithoutTime = (date = new Date()) => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate()
)

export class CalendarDay {
  _date: Date

  constructor (...options: Array<CalendarDay | Date | number>) {
    const [date] = options || []
    const [year, month, dayInMonth = 1] = options || []

    if (date instanceof Date) {
      this._date = dateWithoutTime(date)
    } else if (date instanceof CalendarDay) {
      this._date = dateWithoutTime(date.date)
    } else if (typeof year === 'number') {
      this._date = new Date(year, (month as number) - 1, dayInMonth as number)
    } else {
      this._date = dateWithoutTime()
    }
  }

  get date (): Date {
    return new Date(this._date)
  }

  get dayInMonth (): number {
    return this._date.getDate()
  }

  get dayInWeek (): number {
    return this._date.getDay()
  }

  get month (): number {
    return this._date.getMonth() + 1
  }

  get year (): number {
    return this._date.getFullYear()
  }

  get timestamp (): number {
    return this._date.getTime()
  }

  inSameDay (date: CalendarDay): boolean {
    return date.dayInMonth === this.dayInMonth && this.inSameMonth(date)
  }

  inSameMonth (date: CalendarDay): boolean {
    return date.month === this.month && date.year === this.year
  }

  isBefore (date: unknown): boolean {
    return date instanceof CalendarDay && date.timestamp > this.timestamp
  }

  isAfter (date: unknown): boolean {
    return date instanceof CalendarDay && date.timestamp < this.timestamp
  }

  static max (a: unknown, b: unknown): CalendarDay | null {
    if (a instanceof CalendarDay) {
      if (b instanceof CalendarDay) {
        return a.isAfter(b) ? a : b
      }

      return a
    }

    return b instanceof CalendarDay ? b : null
  }

  static min (a: unknown, b: unknown): CalendarDay | null {
    if (a instanceof CalendarDay) {
      if (b instanceof CalendarDay) {
        return a.isBefore(b) ? a : b
      }

      return a
    }

    return b instanceof CalendarDay ? b : null
  }

  toString (): string {
    return this._date.toString()
  }
}

export const getDaysOfWeek = (day: CalendarDay, firstDayOfWeek: number): CalendarDay[] => {
  const days = []
  const offset = day.dayInWeek === 0 && firstDayOfWeek > 0 ? 7 : 0

  for (let i = 0; i < 7; i++) {
    days.push(new CalendarDay(
      day.year,
      day.month,
      day.dayInMonth - day.dayInWeek + i + firstDayOfWeek - offset
    ))
  }

  return days
}

export const getDaysOfMonthGrid = (date: CalendarDay, firstDayOfWeek: number): CalendarDay[][] => {
  const days = []

  for (let i = 0; i < 6; i++) {
    const daysOfWeek = getDaysOfWeek(new CalendarDay(
      date.year,
      date.month,
      1 + i * 7
    ), firstDayOfWeek)

    if (daysOfWeek.some((day) => day.month === date.month)) {
      days.push(daysOfWeek)
    }
  }

  return days
}

export const getDecade = (year: number): number[] => {
  const first = year - (year % 10) - 1

  return Array.from({ length: 12 }, (_, i) => i + first)
}

export const isDate = (value: unknown): value is Date => value instanceof Date
export const isDateArray = (value: unknown): value is Date[] => Array.isArray(value) && value.every(isDate)
export const isDateValid = (date: Date): boolean => !isNaN(date.getTime())

export const isNull = (value: unknown): value is null => value === null
export const isInteger = (value: unknown): value is number => Number.isInteger(value)
export const inRange = (value: number, [min, max]: number[]): boolean => value >= min && value < max

export const sortDates = (dates: Date[]): Date[] => [ ...dates ].sort((a, b) => a.getTime() - b.getTime())

export const sanitizeDateRange = (dates: Date[]): Date[] => {
  const [first, last] = sortDates(dates)

  if (!first && !last) {
    return []
  }

  if (first && isDate(first) && isDateValid(first)) {
    return !last
      ? [first]
      : isDate(last) && !isDateValid(last)
        ? [first, new CalendarDay((first as Date).getFullYear(), (first as Date).getMonth() + 1).date]
        : [first, last]
  }

  if (last && isDate(last) && isDateValid(last)) {
    return !first
      ? [last]
      : isDate(first) && !isDateValid(first)
        ? [new CalendarDay((last as Date).getFullYear(), (last as Date).getMonth() - 1).date, last]
        : [first, last]
  }

  const today = new CalendarDay()
  return [today.date, new CalendarDay(today.year, today.month + 1).date]
}

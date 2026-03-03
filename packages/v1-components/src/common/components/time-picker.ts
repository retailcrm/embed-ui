import type { UiTextboxProperties } from '@/common/components/textbox'

export type TimeArray = [number, number]

export type UiTimePickerProperties = {
  id?: string;
  value?: string;
  placeholder?: string;
  interval?: number;
  disabled?: boolean;
  readonly?: boolean;
  container?: string | null;
  timeVariants?: string[];
  textboxOptions?: Partial<Omit<UiTextboxProperties, 'id' | 'value' | 'placeholder' | 'clearable' | 'disabled' | 'readonly'>>;
  minTime?: TimeArray | null;
  maxTime?: TimeArray | null;
}

export type UiTimePickerMethods = {
  open (): void;
  close (): void;
  focus (): void;
}

const pad = (time: number): string => (time < 10 ? `0${time}` : String(time))

const milliseconds = (time: string): number => {
  const [hours, minutes] = parse(time).split(':').map((value) => parseInt(value, 10))
  const date = new Date()

  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date.getTime()
}

export const isValid = (time: string): boolean => /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)

export const isValidTimeArray = (time: unknown): time is TimeArray => {
  return Array.isArray(time) && time.length === 2
    && typeof time[0] === 'number' && typeof time[1] === 'number'
    && time[0] >= 0 && time[0] <= 23
    && time[1] >= 0 && time[1] <= 59
}

export const parse = (time: string): string => {
  let parsed = time

  if (!/:/.test(parsed)) {
    parsed += ':00'
  }

  return parsed
    .replace(/^\d:/, '0$&')
    .replace(/:\d$/, '$&0')
}

export const normalize = (time: string): string => {
  const [hoursRaw, minutesRaw] = parse(time).split(':')
  const hours = parseInt(hoursRaw, 10)
  const minutes = parseInt(minutesRaw, 10)

  return !isNaN(hours) && !isNaN(minutes)
    ? `${pad(Math.min(Math.max(hours, 0), 23))}:${pad(Math.min(Math.max(minutes, 0), 59))}`
    : '00:00'
}

export const sanitize = (time: string): string => {
  const digits = time.split('').filter((value) => !isNaN(+value) && value !== ' ')
  digits.length = 4

  if (digits.length > 2) {
    digits.splice(2, 0, ':')
  }

  return digits.join('')
}

export const timeOf = (date: Date): string => `${pad(date.getHours())}:${pad(date.getMinutes())}`

export const nearest = (time: string, variants: string[]): string => {
  if (variants.length === 0) {
    return normalize(time)
  }

  const goal = milliseconds(parse(time))
  const value = variants
    .map(milliseconds)
    .reduce((prev, current) => {
      return Math.abs(current - goal) < Math.abs(prev - goal) ? current : prev
    })

  return timeOf(new Date(value))
}

export const timeVariants = (
  interval: number,
  minTime: TimeArray | null = null,
  maxTime: TimeArray | null = null
): string[] => {
  if (interval <= 0 || !Number.isInteger(interval)) {
    throw new Error('[ui-v1-time-picker] Interval must be positive and integer')
  }

  const minMinutes = minTime ? (minTime[0] * 60 + minTime[1]) : 0
  const maxMinutes = maxTime ? (maxTime[0] * 60 + maxTime[1]) : 24 * 60

  if (minMinutes > maxMinutes) {
    return []
  }

  const ranges = []
  for (let minutes = 0; minutes < 24 * 60; minutes += interval) {
    if (minutes < minMinutes) {
      continue
    }

    if (minutes > maxMinutes) {
      break
    }

    ranges.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`)
  }

  return ranges
}

let counter = 0

export const uid = (prefix = 'ui-v1-time-picker'): string => `${prefix}-${++counter}`

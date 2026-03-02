import { describe, expect, test } from 'vitest'

import {
  APPEARANCE,
  CalendarDay,
  getDaysOfMonthGrid,
  getDaysOfWeek,
  getDecade,
  inRange,
  isDate,
  isDateArray,
  isDateValid,
  isInteger,
  isNull,
  sanitizeDateRange,
  sortDates,
  TYPE,
  VIEW_MODE,
} from '../../../src/common/components/calendar'

const toParts = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()]

describe('common/components/calendar', () => {
  test('exports enum contracts', () => {
    expect(APPEARANCE.SINGLE).toBe('single')
    expect(APPEARANCE.DOUBLE).toBe('double')
    expect(TYPE.SINGLE).toBe('single')
    expect(TYPE.RANGE).toBe('range')
    expect(VIEW_MODE.DAYS).toBe('days')
    expect(VIEW_MODE.MONTHS).toBe('months')
    expect(VIEW_MODE.YEARS).toBe('years')
  })

  test('creates CalendarDay instances from all constructor options and compares dates', () => {
    const fromDate = new CalendarDay(new Date(2024, 8, 1, 18, 30))
    const fromCalendarDate = new CalendarDay(fromDate)
    const fromNumbers = new CalendarDay(2024, 9, 1)

    expect(fromDate.dayInMonth).toBe(1)
    expect(fromDate.month).toBe(9)
    expect(fromDate.year).toBe(2024)
    expect(fromDate.dayInWeek).toBe(fromDate.date.getDay())
    expect(fromDate.timestamp).toBe(fromNumbers.timestamp)
    expect(fromCalendarDate.timestamp).toBe(fromDate.timestamp)
    expect(fromNumbers.inSameDay(fromDate)).toBe(true)
    expect(fromNumbers.inSameMonth(fromDate)).toBe(true)

    const nextDay = new CalendarDay(2024, 9, 2)
    expect(fromNumbers.isBefore(nextDay)).toBe(true)
    expect(nextDay.isAfter(fromNumbers)).toBe(true)
    expect(fromNumbers.isBefore({})).toBe(false)
    expect(fromNumbers.isAfter({})).toBe(false)
    expect(fromNumbers.toString()).toBe(fromNumbers.date.toString())

    expect(CalendarDay.max(fromNumbers, nextDay)).toBe(nextDay)
    expect(CalendarDay.max(fromNumbers, {})).toBe(fromNumbers)
    expect(CalendarDay.max({}, nextDay)).toBe(nextDay)
    expect(CalendarDay.max({}, {})).toBeNull()

    expect(CalendarDay.min(fromNumbers, nextDay)).toBe(fromNumbers)
    expect(CalendarDay.min(fromNumbers, {})).toBe(fromNumbers)
    expect(CalendarDay.min({}, nextDay)).toBe(nextDay)
    expect(CalendarDay.min({}, {})).toBeNull()
  })

  test('builds week and month grid with first day offset', () => {
    const sunday = new CalendarDay(2024, 9, 1)
    const daysOfWeek = getDaysOfWeek(sunday, 1)

    expect(daysOfWeek).toHaveLength(7)
    expect(toParts(daysOfWeek[0].date)).toEqual([2024, 8, 26])
    expect(toParts(daysOfWeek[6].date)).toEqual([2024, 9, 1])

    const monthGrid = getDaysOfMonthGrid(new CalendarDay(2024, 9, 15), 1)
    expect(monthGrid.length).toBeGreaterThan(3)
    monthGrid.forEach((week) => {
      expect(week).toHaveLength(7)
    })
    expect(monthGrid.some((week) => week.some((day) => day.month === 9))).toBe(true)
  })

  test('handles date helpers and date range sanitizing', () => {
    expect(getDecade(2026)).toEqual([2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030])

    const validDate = new Date(2024, 0, 1)
    const invalidDate = new Date('invalid')

    expect(isDate(validDate)).toBe(true)
    expect(isDate('2024-01-01')).toBe(false)
    expect(isDateArray([validDate, new Date(2024, 0, 2)])).toBe(true)
    expect(isDateArray([validDate, 'bad'])).toBe(false)
    expect(isDateValid(validDate)).toBe(true)
    expect(isDateValid(invalidDate)).toBe(false)
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isInteger(10)).toBe(true)
    expect(isInteger(10.5)).toBe(false)
    expect(inRange(4, [1, 5])).toBe(true)
    expect(inRange(5, [1, 5])).toBe(false)

    const unsorted = [new Date(2024, 0, 2), new Date(2024, 0, 1)]
    const sorted = sortDates(unsorted)
    expect(sorted.map((d) => d.getDate())).toEqual([1, 2])
    expect(unsorted.map((d) => d.getDate())).toEqual([2, 1])

    expect(sanitizeDateRange([])).toEqual([])
    expect(sanitizeDateRange([new Date(2024, 0, 1)])).toEqual([new Date(2024, 0, 1)])

    const firstValid = new Date(2024, 0, 10)
    expect(sanitizeDateRange([firstValid, invalidDate])).toEqual([
      firstValid,
      new CalendarDay(firstValid.getFullYear(), firstValid.getMonth() + 1).date,
    ])

    const lastValid = new Date(2024, 4, 10)
    expect(sanitizeDateRange([invalidDate, lastValid])).toEqual([
      new CalendarDay(lastValid.getFullYear(), lastValid.getMonth() - 1).date,
      lastValid,
    ])

    expect(sanitizeDateRange([new Date(2024, 0, 10), new Date(2024, 0, 5)])).toEqual([
      new Date(2024, 0, 5),
      new Date(2024, 0, 10),
    ])

    const fallbackRange = sanitizeDateRange([invalidDate, new Date('still invalid')])
    expect(fallbackRange).toHaveLength(2)
    expect(fallbackRange.every(isDateValid)).toBe(true)
  })
})

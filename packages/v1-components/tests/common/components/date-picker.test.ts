import { describe, expect, test } from 'vitest'

import {
  formatDateValue,
  isQuickDateEqual,
  normalizeDate,
  normalizeDateRange,
  normalizeQuickDate,
  SYNCHRONIZATION,
} from '../../../src/common/components/date-picker'

describe('common/components/date-picker', () => {
  test('exports synchronization enum', () => {
    expect(SYNCHRONIZATION.INSTANT).toBe('instant')
    expect(SYNCHRONIZATION.CONFIRMED).toBe('confirmed')
  })

  test('formats date value with locale and omitYear', () => {
    const date = new Date(2024, 10, 5, 13, 10)

    expect(formatDateValue(date, false, 'ru-RU')).toBe('05.11.2024')
    expect(formatDateValue(date, true, 'ru-RU')).toBe('05.11')
    expect(formatDateValue(date, false, 'en-GB')).toBe('05/11/2024')
    expect(formatDateValue(date, true, 'en-GB')).toBe('05/11')
  })

  test('normalizes date and date ranges', () => {
    expect(normalizeDate(new Date('bad'))).toBeNull()

    const normalized = normalizeDateRange([new Date(2024, 0, 10), new Date(2024, 0, 2)])
    expect(normalized).toHaveLength(2)
    expect(normalized[0]?.getHours()).toBe(0)
    expect(normalized[0]?.getMinutes()).toBe(0)
    expect(normalized[1]?.getHours()).toBe(23)
    expect(normalized[1]?.getMinutes()).toBe(59)
  })

  test('normalizes quick date and compares by day', () => {
    const dateA = new Date(2024, 0, 1, 10, 0)
    const dateB = new Date(2024, 0, 1, 23, 59)

    expect(isQuickDateEqual(dateA, dateB)).toBe(true)

    const rangeA = normalizeQuickDate([new Date(2024, 0, 1), new Date(2024, 0, 10)])
    const rangeB = normalizeQuickDate([new Date(2024, 0, 10, 8, 0), new Date(2024, 0, 1, 12, 0)])

    expect(isQuickDateEqual(rangeA, rangeB)).toBe(true)
    expect(isQuickDateEqual(rangeA, null)).toBe(false)
  })
})

import { describe, expect, test } from 'vitest'

import {
  clampValue,
  defaultValueOnEmpty,
  normalizeByDecimals,
  normalizeRange,
  parseDecimals,
  toNumber,
  VIOLATION,
  violationsOf,
} from '../../../src/common/components/number-stepper'

describe('common/components/number-stepper', () => {
  test('parses numbers from strings and rejects invalid values', () => {
    expect(toNumber(10)).toBe(10)
    expect(toNumber('10.5')).toBe(10.5)
    expect(toNumber('10,5')).toBe(10.5)
    expect(toNumber('abc')).toBeNull()
    expect(toNumber('')).toBeNull()
  })

  test('normalizes range and clamps values', () => {
    expect(normalizeRange(10, 0)).toEqual([0, 10])
    expect(clampValue(12, 0, 10)).toBe(10)
    expect(clampValue(-3, 0, 10)).toBe(0)
    expect(clampValue(7, 0, 10)).toBe(7)
  })

  test('parses decimals and rounds value', () => {
    expect(parseDecimals('*')).toBe('*')
    expect(parseDecimals(2)).toBe(2)
    expect(parseDecimals('3')).toBe(3)
    expect(parseDecimals(-1)).toBe('*')

    expect(normalizeByDecimals(1.234, '*')).toBe(1.234)
    expect(normalizeByDecimals(1.234, 2)).toBe(1.23)
  })

  test('resolves default value for empty input with nullable and limits', () => {
    expect(defaultValueOnEmpty(true, 0, 10)).toBeNull()
    expect(defaultValueOnEmpty(false, -10, 10)).toBe(0)
    expect(defaultValueOnEmpty(false, 5, 10)).toBe(5)
  })

  test('collects range violations', () => {
    expect(violationsOf(null, 0, 10)).toEqual([])
    expect(violationsOf(5, 0, 10)).toEqual([])
    expect(violationsOf(11, 0, 10)).toEqual([VIOLATION.TOO_LARGE])
    expect(violationsOf(-1, 0, 10)).toEqual([VIOLATION.TOO_SMALL])
  })
})

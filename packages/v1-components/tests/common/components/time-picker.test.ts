import { describe, expect, test } from 'vitest'

import {
  isValid,
  isValidTimeArray,
  nearest,
  normalize,
  parse,
  sanitize,
  timeOf,
  timeVariants,
} from '../../../src/common/components/time-picker'

describe('common/components/time-picker', () => {
  test('validates time strings and arrays', () => {
    expect(isValid('00:00')).toBe(true)
    expect(isValid('23:59')).toBe(true)
    expect(isValid('7:30')).toBe(true)
    expect(isValid('24:00')).toBe(false)
    expect(isValid('18:60')).toBe(false)

    expect(isValidTimeArray([0, 0])).toBe(true)
    expect(isValidTimeArray([23, 59])).toBe(true)
    expect(isValidTimeArray([24, 0])).toBe(false)
    expect(isValidTimeArray([10])).toBe(false)
    expect(isValidTimeArray(null)).toBe(false)
  })

  test('sanitizes, parses and normalizes input time', () => {
    expect(sanitize('1a6:4')).toBe('16:4')
    expect(sanitize('123456')).toBe('12:34')
    expect(parse('8')).toBe('08:00')
    expect(parse('16:3')).toBe('16:30')

    expect(normalize('16:14')).toBe('16:14')
    expect(normalize('16:8')).toBe('16:59')
    expect(normalize('16:5')).toBe('16:50')
    expect(normalize('16:')).toBe('00:00')
  })

  test('builds nearest and variant ranges with boundaries', () => {
    expect(timeVariants(60)).toHaveLength(24)
    expect(timeVariants(30, [19, 0], null)).toEqual(['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'])
    expect(timeVariants(30, null, [4, 30])).toEqual(['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'])
    expect(timeVariants(30, [12, 25], [16, 35])).toEqual(['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'])

    const variants = ['10:00', '10:30', '11:00', '11:30']
    expect(nearest('10:20', variants)).toBe('10:30')
    expect(nearest('10:01', variants)).toBe('10:00')
    expect(nearest('10:58', variants)).toBe('11:00')
  })

  test('formats Date to hh:mm', () => {
    const date = new Date(2024, 0, 1, 5, 7, 0)
    expect(timeOf(date)).toBe('05:07')
  })
})

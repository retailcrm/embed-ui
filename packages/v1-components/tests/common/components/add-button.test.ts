import { describe, expect, test } from 'vitest'

import {
  COLOR,
  isNumeric,
  normalizeHeight,
} from '../../../src/common/components/add-button'

describe('common/components/add-button', () => {
  test('exports color enum', () => {
    expect(COLOR.GREEN).toBe('green')
    expect(COLOR.BLUE).toBe('blue')
    expect(COLOR.RED).toBe('red')
    expect(COLOR.YELLOW).toBe('yellow')
    expect(COLOR.PURPLE).toBe('purple')
  })

  test('detects numeric height values', () => {
    expect(isNumeric(120)).toBe(true)
    expect(isNumeric('80')).toBe(true)
    expect(isNumeric('50%')).toBe(false)
  })

  test('normalizes height values', () => {
    expect(normalizeHeight(120)).toBe('120px')
    expect(normalizeHeight('80')).toBe('80px')
    expect(normalizeHeight('50%')).toBe('50%')
    expect(normalizeHeight('12rem')).toBe('12rem')
  })
})

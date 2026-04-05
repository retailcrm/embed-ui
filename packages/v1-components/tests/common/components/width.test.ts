import { describe, expect, test } from 'vitest'

import { isWidth, normalizeWidth, WIDTH } from '../../../src/common/components/width'

describe('common/components/width', () => {
  test('accepts width tokens, numeric values and css lengths', () => {
    expect(isWidth(WIDTH.FIT)).toBe(true)
    expect(isWidth(WIDTH.FLUID)).toBe(true)
    expect(isWidth(320)).toBe(true)
    expect(isWidth('320')).toBe(true)
    expect(isWidth('50px')).toBe(true)
    expect(isWidth('5rem')).toBe(true)
    expect(isWidth('100%')).toBe(true)
  })

  test('rejects unsupported width values', () => {
    expect(isWidth(-1)).toBe(false)
    expect(isWidth('auto')).toBe(false)
    expect(isWidth('calc(100% - 8px)')).toBe(false)
    expect(isWidth('foo')).toBe(false)
  })

  test('normalizes width values to css-compatible styles', () => {
    expect(normalizeWidth(WIDTH.FIT)).toBeNull()
    expect(normalizeWidth(WIDTH.FLUID)).toBe('100%')
    expect(normalizeWidth(320)).toBe('320px')
    expect(normalizeWidth('320')).toBe('320px')
    expect(normalizeWidth('5rem')).toBe('5rem')
  })
})

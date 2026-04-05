import { describe, expect, test } from 'vitest'

import {
  ANIMATION,
  APPEARANCE,
  guessDimensionStyleValue,
  SIZE,
} from '../../../src/common/components/skeleton'

describe('common/components/skeleton', () => {
  test('exports appearance, size and animation enums', () => {
    expect(ANIMATION.PULSE).toBe('pulse')
    expect(ANIMATION.SHIMMER).toBe('shimmer')
    expect(APPEARANCE.CIRCLE).toBe('circle')
    expect(APPEARANCE.RECTANGLE).toBe('rectangle')
    expect(APPEARANCE.TEXT).toBe('text')
    expect(SIZE.SM).toBe('sm')
    expect(SIZE.MD).toBe('md')
    expect(SIZE.LG).toBe('lg')
  })

  test('normalizes dimension styles like omnica skeleton', () => {
    expect(guessDimensionStyleValue(24)).toBe('24px')
    expect(guessDimensionStyleValue('32')).toBe('32px')
    expect(guessDimensionStyleValue('50%')).toBe('50%')
    expect(guessDimensionStyleValue('12rem')).toBe('12rem')
    expect(guessDimensionStyleValue(null)).toBeNull()
  })
})

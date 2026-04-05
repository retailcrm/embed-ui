import type { Numeric } from '@/common/types'

export enum WIDTH {
  FIT = 'fit',
  FLUID = 'fluid',
}

export type WidthValue = Numeric | WIDTH | `${WIDTH}`

const NUMERIC_PATTERN = /^(?:\d+|\d*\.\d+)$/
const UNIT_PATTERN = /^(?:\d+|\d*\.\d+)(?:%|cap|ch|cm|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|Q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw)$/i

export const isWidthNumeric = (value: unknown): value is Numeric => {
  return typeof value === 'number'
    ? Number.isFinite(value) && value >= 0
    : typeof value === 'string' && NUMERIC_PATTERN.test(value.trim())
}

export const isWidthToken = (value: unknown): value is WIDTH => {
  return typeof value === 'string' && Object.values(WIDTH).includes(value as WIDTH)
}

export const isWidth = (value: unknown): value is WidthValue | null | undefined => {
  return value === null
    || value === undefined
    || isWidthToken(value)
    || isWidthNumeric(value)
    || typeof value === 'string' && UNIT_PATTERN.test(value.trim())
}

export const isWidthExact = (value: WidthValue | null | undefined): value is Numeric | string => {
  return value !== null && value !== undefined && !isWidthToken(value)
}

export const normalizeWidth = (value: WidthValue | null | undefined): string | null => {
  if (value === null || value === undefined || value === WIDTH.FIT) {
    return null
  }

  if (value === WIDTH.FLUID) {
    return '100%'
  }

  return isWidthNumeric(value)
    ? `${String(value).trim()}px`
    : String(value).trim()
}

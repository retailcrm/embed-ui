import type { Numeric } from '@/common/types'

export enum ANIMATION {
  PULSE = 'pulse',
  SHIMMER = 'shimmer',
}

export enum APPEARANCE {
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  TEXT = 'text',
}

export enum SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export type UiSkeletonProperties = {
  appearance?: APPEARANCE | `${APPEARANCE}`;
  size?: SIZE | `${SIZE}`;
  animation?: ANIMATION | `${ANIMATION}`;
  width?: Numeric | null;
  height?: Numeric | null;
}

export function guessDimensionStyleValue (value: Numeric | null): string | null {
  return typeof value === 'number' || (typeof value === 'string' && /^\d*$/.test(value))
    ? `${value}px`
    : value
}

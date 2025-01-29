import type {
  Alignment,
  Side,
  Strategy,
} from '@floating-ui/dom'

import type { Numeric } from '@/common/types'

export const ProcessedByPopperKey = Symbol.for('[@retailcrm/embed-ui-v1-components]:ProcessedByPopper')

export type Trigger<T extends string = never> = 'hover' | 'focus' | 'click' | 'touch' | T
export type TriggerSchema<
  S extends string = never,
  H extends string = never,
> = {
  show?: Trigger<S>[],
  hide?: Trigger<H>[],
}

export type TriggerHandler = (event: Event & { [ProcessedByPopperKey]?: boolean }) => void

export type Adaptation = 'flip' | 'shift'

export type PlacementLiteral = `${Side}-${Alignment}` | Side
export type PlacementOptions = {
  side: Side;
  alignment?: Alignment | 'center';
  adaptation?: Adaptation[];
}

export type Delay = { show?: number; hide?: number; }

export type FloatingOptions = {
  placement?: PlacementLiteral | PlacementOptions;
  offsetMainAxis?: number | string;
  offsetCrossAxis?: number | string;
  strategy?: Strategy;
}

export type ShowingOptions = {
  shown?: boolean;
  targetTriggers?: Trigger[] | TriggerSchema;
  popperTriggers?: Trigger[] | TriggerSchema;
  globalTriggers?: Array<'miss-click' | 'reference-hidden'>;
  delay?: Numeric | Delay;
  disposeTimeout?: Numeric | null;
  disabled?: boolean;
  container?: string | null;
}

export type UiPopperProperties = FloatingOptions & ShowingOptions & {
  withArrow?: boolean;
}

export type UiPopperMethods = {
  adjust (): Promise<void>;
  dispose (): void;
  show (immediately?: boolean): void;
  hide (immediately?: boolean, reason?: ('generic' | 'by-miss-click')): void;
}

const sides = ['top', 'right', 'bottom', 'left'] as const

export const isPlacementLiteral = (value: unknown): value is PlacementLiteral => sides.some(side => {
  return value === side
    || value === `${side}-start`
    || value === `${side}-end`
})

export const isPlacementSide = (value: unknown): value is Side => sides.includes(value as Side)
export const isPlacementAlignment = (value: unknown): value is Alignment => {
  return ['start', 'end', 'center'].includes(value as Alignment)
}

export const isPlacementAdaptation = (value: unknown): value is Adaptation => {
  return Array.isArray(value) && value.every(a => ['flip', 'shift'].includes(a as Adaptation))
}

export const isPlacementOptions = (value: unknown): value is PlacementOptions => {
  return typeof value === 'object'
    && value !== null
    && 'side' in value && isPlacementSide(value.side)
    && 'alignment' in value && isPlacementAlignment(value.alignment)
    && 'adaptation' in value && isPlacementAdaptation(value.adaptation)
}

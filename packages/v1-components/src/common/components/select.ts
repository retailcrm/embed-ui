import type { Alignment } from '@floating-ui/dom'
import type { PlacementOptions } from '@/common/components/popper'
import type { Side } from '@floating-ui/dom'
import type { Trigger } from '@/common/components/popper'
import type { TriggerSchema } from '@/common/components/popper'
import type { UiPopperProperties } from '@/common/components/popper'

export enum SIZE {
  XS = 'xs',
  SM = 'sm',
  XL = 'xl',
}

export enum PLACEMENT {
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
}

export type Option = {
  id: string;
  value: unknown;
  label: string;
  isMatched (): boolean;
}

export type UiSelectTriggerProperties = {
  value?: unknown|unknown[];
  clearable?: boolean;
  filter?: string;
  invalid?: boolean;
  multiple?: boolean;
  expanded?: boolean;
  placeholder?: string;
  placeholderOnly?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  textboxSize?: SIZE | `${SIZE}`;
}

export type UiSelectTriggerMethods = {
  open (): void;
  close (): void;
  onClick (): void;
  onInput (event: Event): void;
  onFocus (event: Event): void;
  onBlur (event: Event): void;
  onClear (event: MouseEvent): void;
}

export type UiSelectPopperProperties = {
    opened?: boolean;
    targetTriggers?: Trigger[] | TriggerSchema;
    popperTriggers?: Trigger[] | TriggerSchema;
    popperFitTrigger?: boolean;
    placement?: Side | `${Side}-${Alignment}` | PlacementOptions;
    popperClass?: string;
    popperOptions?: Omit<UiPopperProperties, 'placement' | 'shown' | 'target' | 'triggers'>;
    disabled?: boolean;
    readonly?: boolean;
    multiple?: boolean;
    ticker?: boolean;
}

export type UiSelectPopperMethods = {
  autoScroll (): void;
  updateWidth (): void;
}

export type UiSelectOptionProperties = {
  value: unknown | unknown[];
  label: string;
  description?: string;
  disabled?: boolean;
  selected?: boolean;
  multiple?: boolean;
  active?: boolean;
  size?: SIZE | `${SIZE}`;
  counter?: string | number | null;
  accent?: boolean;
}

const escapeSpecialSymbols = (text: string): string => text.replace(
  /([\\^$.*+?()[\]{}|=!<>:-])/g,
  '\\$1'
)

/**
 * @param text Текст, в котором ищем слово
 * @param term Подсвечиваемое слово
 * @param style Стиль подсветки
 * @return Исходный текст со вставками span тегов в местах, где встречается слово term
 */
export const highlight = (text: string, term: string, style: string): string => text.replace(
  new RegExp(`(${escapeSpecialSymbols(term)})`, 'gi'),
  `<span style="${style}">$1</span>`
)

let counter = 0

/**
 * @param prefix
 * @return Идентификатор, уникальный в рамках генерируемой функцией последовательности
 */
export const uid = (prefix = 'ui-v1-select') => `${prefix}-${++counter}`

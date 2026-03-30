export type TabItem = {
  id: string;
  label?: string;
  counter?: string | number | null;
  disabled?: boolean;
  iconOnly?: boolean;
}

export type TabLayout = {
  headIds: string[];
  menuIds: string[];
}

export type TabFocusDirection = 'next' | 'prev' | 'first' | 'last'

export type TabMoveFocusIntent = {
  id: string;
  direction: TabFocusDirection;
}

export enum SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export enum APPEARANCE {
  TEXT = 'text',
  FILLED = 'filled',
}

export type UiTabGroupProperties = {
  activeId?: string | null;
  focusableId?: string | null;
  items?: TabItem[];
  menuExpanded?: boolean;
  size?: SIZE | `${SIZE}`;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  overflowing?: boolean;
}

export type UiTabProperties = {
  id: string;
  label?: string;
  counter?: string | number | null;
  disabled?: boolean;
}

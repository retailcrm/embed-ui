import type { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'

export enum COLOR {
  BLACK = 'black',
  BLUE = 'blue',
  GREEN = 'green',
  GREY = 'grey',
  PURPLE = 'purple',
  RED = 'red',
  YELLOW = 'yellow',
}

export enum SIZE {
  SM = 'sm',
  MD = 'md',
}

export type UiCollapseBoxProperties = {
  id?: string;
  expanded?: boolean;
  expandable?: boolean;
  collapsible?: boolean;
  toggleable?: boolean;
  collapseBehaviour?: COLLAPSE_BEHAVIOUR | `${COLLAPSE_BEHAVIOUR}`;
  collapseDuration?: number | string;
  disabled?: boolean;
  color?: COLOR | `${COLOR}`;
  iconSize?: SIZE | `${SIZE}`;
  bordered?: boolean;
}

export type UiCollapseBoxMethods = {
  isExpanded (): boolean;
  expand (): void;
  collapse (): void;
  toggle (expanded?: boolean): void;
  canNotBeExpanded (): boolean;
  canNotBeCollapsed (): boolean;
}

export type UiCollapseGroupProperties = {
  activeBoxId?: string | null;
}

export type UiCollapseGroupMethods = {
  expand (id: string | null, force: boolean | undefined): void;
  collapse (id: string | null): void;
  collapseActiveBox (): void;
  toggle (id: string | null): void;
  canNotToggle (idToTry: string | null): boolean;
}

export type CollapseBoxRegistryItem = {
  isExpanded (): boolean;
  toggleInternal (expanded?: boolean): boolean;
  toggleInternalAndEmit (expanded?: boolean): void;
  canNotBeExpanded (): boolean;
  canNotBeCollapsed (): boolean;
}

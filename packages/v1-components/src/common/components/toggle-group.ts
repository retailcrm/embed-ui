import type { UiToggleButtonSize } from '@/common/components/toggle-button'

export type UiToggleGroupEqualPredicate = (a: unknown, b: unknown) => boolean

export type UiToggleGroupItem = {
  value: unknown;
  label: string;
  disabled?: boolean;
}

export type UiToggleGroupProperties = {
  model?: unknown[];
  options?: UiToggleGroupItem[];
  equalFn?: UiToggleGroupEqualPredicate;
  size?: UiToggleButtonSize | `${UiToggleButtonSize}`;
  rubber?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaOrientation?: 'horizontal' | 'vertical';
}

export type UiToggleGroupRootProperties = {
  size?: UiToggleButtonSize | `${UiToggleButtonSize}`;
  rubber?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaOrientation?: 'horizontal' | 'vertical';
}

export type UiToggleGroupOptionProperties = {
  id?: string;
  label?: string;
  value: unknown;
  disabled?: boolean;
}

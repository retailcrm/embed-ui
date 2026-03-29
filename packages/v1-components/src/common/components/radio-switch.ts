export type EqualPredicate = (a: unknown, b: unknown) => boolean

export type Option = {
  value: unknown;
  label: string;
  disabled?: boolean;
}

export enum APPEARANCE {
  DEFAULT = 'default',
  SECTION = 'section',
}

export enum SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export type UiRadioSwitchProperties = {
  value?: unknown;
  options?: Option[];
  equalFn?: EqualPredicate;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  size?: SIZE | `${SIZE}`;
  rubber?: boolean;
}

export type UiRadioSwitchRootProperties = {
  appearance?: APPEARANCE | `${APPEARANCE}`;
  size?: SIZE | `${SIZE}`;
  rubber?: boolean;
}

export type UiRadioSwitchOptionShellProperties = {
  id?: string;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  size?: SIZE | `${SIZE}`;
  checked?: boolean;
  disabled?: boolean;
}

export type UiRadioSwitchOptionShellMethods = {
  focus (): void;
  blur (): void;
}

export type UiRadioSwitchOptionProperties = {
  id?: string;
  label?: string;
  value: unknown;
  description?: string;
  disabled?: boolean;
}

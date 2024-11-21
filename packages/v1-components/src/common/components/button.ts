export enum APPEARANCE {
  OUTLINED = 'outlined',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum SIZE {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs',
}

export enum VARIANT {
  DEFAULT = 'default',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export type UiButtonProperties = {
  type?: HTMLButtonElement['type'];
  href?: HTMLAnchorElement['href'] | undefined
  appearance?: APPEARANCE | `${APPEARANCE}`;
  variant?: VARIANT | `${VARIANT}`;
  size?: SIZE | `${SIZE}`;
  active?: boolean;
  disabled?: boolean;
  locked?: boolean;
}

export type UiButtonMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}
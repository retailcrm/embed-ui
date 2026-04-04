export enum UiToggleButtonSize {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs',
}

export type UiToggleButtonProperties = {
  id?: string;
  type?: HTMLButtonElement['type'];
  pressed?: boolean;
  disabled?: boolean;
  focused?: boolean;
  grouped?: boolean;
  size?: UiToggleButtonSize | `${UiToggleButtonSize}`;
}

export type UiToggleButtonMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}

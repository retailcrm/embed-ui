export type UiSwitchProperties = {
  id?: string | undefined;
  value?: boolean;
  square?: boolean;
  disabled?: boolean;
}

export type UiSwitchMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}

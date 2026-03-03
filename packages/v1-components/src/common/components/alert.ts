export enum VARIANT {
  PRIMARY = 'primary',
  WARNING = 'warning',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export type UiAlertProperties = {
  variant?: VARIANT | `${VARIANT}`;
  text?: string;
  shown?: boolean;
  closable?: boolean;
  ellipsis?: boolean;
  small?: boolean;
  scrollToAlert?: boolean;
  scrollBehavior?: ScrollBehavior | string;
  fluid?: boolean;
}

export type UiAlertMethods = {
  scrollIntoView (): void;
}

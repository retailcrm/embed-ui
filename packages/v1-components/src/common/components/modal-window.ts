export enum APPEARANCE {
  ALERT = 'alert',
  DIALOG = 'dialog',
  POPUP = 'popup',
  HINT = 'hint',
}

export enum SCROLLING {
  NORMAL = 'normal',
  NATIVE = 'native',
}

export type MODAL_WINDOW_ROLE = 'dialog' | 'alertdialog'

export type UiModalWindowProperties = UiModalWindowSurfaceProperties
export type UiModalWindowMethods = UiModalWindowSurfaceMethods

export type UiModalWindowSurfaceProperties = {
  id?: string;
  opened?: boolean;
  closable?: boolean;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  fullscreen?: boolean;
  responsive?: boolean;
  disposeTimeout?: number | string | null;
  scrolling?: SCROLLING | `${SCROLLING}`;
  role?: MODAL_WINDOW_ROLE;
}

export type UiModalWindowSurfaceMethods = {
  open (): void;
  close (): void;
}

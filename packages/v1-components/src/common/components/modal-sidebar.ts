export enum CLOSE_METHOD {
  CLICK_CROSS = 'Cross',
  CLICK_OUTSIDE = 'Outside',
  KEY_ESC = 'Esc',
}

export enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum SCROLLING {
  NORMAL = 'normal',
  NATIVE = 'native',
  NONE = 'none',
}

export enum SIZE {
  LG = 'lg',
  SM = 'sm',
}

export type MODAL_SIDEBAR_ROLE = 'dialog' | 'alertdialog'

export type UiModalSidebarProperties = {
  id?: string;
  opened?: boolean;
  closable?: boolean;
  direction?: DIRECTION | `${DIRECTION}`;
  disposeTimeout?: number | string | null;
  fixed?: boolean;
  scrolling?: SCROLLING | `${SCROLLING}`;
  size?: SIZE | `${SIZE}`;
  role?: MODAL_SIDEBAR_ROLE;
}

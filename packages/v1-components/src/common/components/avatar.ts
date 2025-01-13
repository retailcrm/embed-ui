export enum SIZE {
  XS = 'xs',
  SM = 'sm',
  LG = 'lg',
}

export enum STATUS {
  NONE = '',
  BUSY = 'busy',
  BREAK = 'break',
  DINNER = 'dinner',
  FREE = 'free',
}

export type UiAvatarProperties = {
  src?: string;
  name?: string;
  href?: string;
  status?: STATUS;
  vip?: boolean;
  bad?: boolean;
  size?: SIZE;
}

export type UiAvatarListProperties = {
  avatars?: Array<{ src: string; name: string }>
  size?: SIZE;
}

import type { Dimensions } from '@/common/preview'

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
  optimize?: boolean | {
    resize?: Dimensions;
    crop?: Dimensions;
  };
}

export type UiAvatarListProperties = {
  avatars?: Array<{ src: string; name: string }>
  size?: SIZE;
}

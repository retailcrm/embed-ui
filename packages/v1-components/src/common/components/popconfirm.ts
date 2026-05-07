import type { APPEARANCE } from '@/common/components/button'
import type { Locale } from '@/common/components/date'
import type { SIZE } from '@/common/components/button'
import type { UiPopperProperties } from '@/common/components/popper'
import type { VARIANT } from '@/common/components/button'

export type UiPopconfirmPopperOptions = Partial<Omit<
  UiPopperProperties,
  | 'target'
  | 'visible'
  | 'targetTriggers'
  | 'popperTriggers'
  | 'globalTriggers'
  | 'placement'
  | 'withArrow'
>>

export type UiPopconfirmTriggerProperties = {
  visible?: boolean;
}

export type UiPopconfirmPopperProperties = {
  id?: string;
  visible?: boolean;
  title?: string;
  okVariant?: VARIANT | `${VARIANT}`;
  okTitle?: string | null;
  cancelTitle?: string | null;
  cancelAppearance?: APPEARANCE | `${APPEARANCE}`;
  cancelVariant?: VARIANT | `${VARIANT}`;
  buttonSize?: SIZE | `${SIZE}`;
  placement?: UiPopperProperties['placement'];
  popperClass?: string | null;
  popperOptions?: UiPopconfirmPopperOptions;
  locale?: Locale;
}

export type UiPopconfirmProperties = UiPopconfirmPopperProperties

export type UiPopconfirmPopperMethods = {
  adjust (): Promise<void>;
  close (): void;
  dispose (): void;
  open (): void;
}

export type UiPopconfirmMethods = {
  adjust (): Promise<void>;
  close (): void;
  dispose (): void;
  open (): void;
  toggle (): void;
}

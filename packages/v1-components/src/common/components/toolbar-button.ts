import { VARIANT } from '@/common/components/button'

export type UiToolbarButtonProperties = {
  href?: HTMLAnchorElement['href'] | undefined
  variant?: VARIANT | `${VARIANT}`;
  active?: boolean;
  disabled?: boolean;
  locked?: boolean;
}

export type UiToolbarButtonMethods = {
  click (): void;
  focus (): void;
  blur (): void;
}

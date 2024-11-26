import { APPEARANCE } from '@/common/components/button'

export type UiToolbarLinkProperties = {
  href?: string;
  external?: boolean;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  light?: boolean;
  accent?: boolean;
  dotted?: boolean;
  ellipsis?: boolean;
}

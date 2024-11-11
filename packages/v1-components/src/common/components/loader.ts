import type { Numeric } from '@/common/types'

export type UiLoaderProperties = {
  diameter?: Numeric;
  thickness?: Numeric;
  transition?: string | null;
  fixed?: boolean;
  overlay?: boolean;
}

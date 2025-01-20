import type { Dimensions } from '@/common/preview'

export type UiImageProperties = {
  /** Alternative text for HTMLImageElement */
  alt?: string;
  /** Source for HTMLImageElement */
  src?: string;
  resize?: Dimensions | undefined;
  crop?: Dimensions | undefined;
}

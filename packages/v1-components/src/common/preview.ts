import type { InjectionKey, Ref } from 'vue'

import {
  inject,
  ref,
} from 'vue'

import { preview } from '@retailcrm/image-preview'

export type Dimensions = `${number}x${number}` | `${number}x-`

export const ImageWorkersKey = Symbol('$image.workers') as InjectionKey<Ref<string[]>>

export const usePreview = (workers: Ref<string[]> = ref([])) => {
  const _workers = inject(ImageWorkersKey, workers)

  return {
    workers: _workers,
    preview: (
      url: string,
      resize: Dimensions | undefined = undefined,
      crop: Dimensions | undefined = undefined
    ) => preview(_workers.value, url, resize, crop),
  }
}

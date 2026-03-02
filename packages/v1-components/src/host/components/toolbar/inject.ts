import type { ComputedRef, InjectionKey } from 'vue'

import { computed, inject } from 'vue'

export enum SIZE {
  SM = 'sm',
  MD = 'md',
}

export const ToolbarInjectKeys = {
  size: Symbol('UiToolbarSize') as InjectionKey<ComputedRef<SIZE | `${SIZE}`>>,
}

export const useToolbarSize = () => inject(ToolbarInjectKeys.size, computed(() => SIZE.SM))

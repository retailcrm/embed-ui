import {
  ComputedRef,
  InjectionKey,
  Ref,
} from 'vue'

import { computed, inject } from 'vue'

export const PopperTargetKey = Symbol.for(
  '[@retailcrm/embed-ui-v1-components]:PopperTarget'
) as InjectionKey<ComputedRef<Element | null>>

export const useTarget = (target: Ref<Element | null>): ComputedRef<Element | null> => {
  const _injection = inject(PopperTargetKey, computed(() => null))

  return computed(() => target.value ?? _injection.value)
}

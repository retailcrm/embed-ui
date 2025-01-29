import type { InjectionKey, Ref } from 'vue'

import {
  inject,
  provide,
  ref,
} from 'vue'

export const ElementRefKey = Symbol.for(
  '[@retailcrm/embed-ui-v1-components]:ElementRef'
) as InjectionKey<Ref<Element | null>>

export const useElementRef = <E extends Element>() => {
  const el = inject(ElementRefKey, ref(null))

  provide(ElementRefKey, ref(null))

  return el as Ref<E | null>
}

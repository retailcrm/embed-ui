import type { CollapseBoxRegistryItem } from '@/common/components/collapse-box'
import type { InjectionKey } from 'vue'

export const CollapseGroupRegisterKey: InjectionKey<
  (id: string, box: CollapseBoxRegistryItem) => void
> = Symbol('UiCollapseGroup_register')

export const CollapseGroupUnregisterKey: InjectionKey<
  (id: string) => void
> = Symbol('UiCollapseGroup_unregister')

export const CollapseGroupExpandKey: InjectionKey<
  (id: string | null, force: boolean | undefined) => void
> = Symbol('UiCollapseGroup_expand')

export const CollapseGroupCollapseKey: InjectionKey<
  (id: string | null) => void
> = Symbol('UiCollapseGroup_collapse')

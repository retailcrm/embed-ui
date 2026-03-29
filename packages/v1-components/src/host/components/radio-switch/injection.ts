import type { ComputedRef, InjectionKey, Ref } from 'vue'

import { computed, inject } from 'vue'

import { APPEARANCE, SIZE } from '@/common/components/radio-switch'

export const AppearanceKey = Symbol('UiRadioSwitchAppearance') as InjectionKey<ComputedRef<APPEARANCE | `${APPEARANCE}`>>
export const SizeKey = Symbol('UiRadioSwitchSize') as InjectionKey<ComputedRef<SIZE | `${SIZE}`>>

export const RegistryKey = Symbol('UiRadioSwitchRegistry') as InjectionKey<{
  register: (id: string, option: {
    getValue: () => unknown;
    checked: Ref<boolean>;
    disabled: () => boolean;
    focus: () => Promise<void> | void;
  }) => void;
  unregister: (id: string) => void;
}>

export const UpdateKey = Symbol('UiRadioSwitchUpdate') as InjectionKey<(newValue: unknown) => void>
export const FocusableIdKey = Symbol('UiRadioSwitchFocusableId') as InjectionKey<ComputedRef<string | null>>
export const SetFocusableIdKey = Symbol('UiRadioSwitchSetFocusableId') as InjectionKey<(id: string) => void>
export const MoveFocusKey = Symbol('UiRadioSwitchMoveFocus') as InjectionKey<(
  id: string,
  direction: 'next' | 'prev' | 'first' | 'last'
) => void>

export const useAppearance = () => inject(AppearanceKey, computed(() => APPEARANCE.DEFAULT))
export const useSize = () => inject(SizeKey, computed(() => SIZE.MD))

export const useRegistry = () => inject(RegistryKey, {
  register: () => {},
  unregister: () => {},
})

export const useUpdate = () => inject(UpdateKey, () => {})
export const useFocusableId = () => inject(FocusableIdKey, computed(() => null))
export const useSetFocusableId = () => inject(SetFocusableIdKey, () => {})
export const useMoveFocus = () => inject(MoveFocusKey, () => {})

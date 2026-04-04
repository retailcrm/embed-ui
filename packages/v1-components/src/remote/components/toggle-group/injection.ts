import type { ComputedRef, InjectionKey, Ref } from 'vue'

import { computed, inject } from 'vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

export const FocusableIdKey = Symbol('UiToggleGroupFocusableId') as InjectionKey<ComputedRef<string | null>>
export const MoveFocusKey = Symbol('UiToggleGroupMoveFocus') as InjectionKey<(
  id: string,
  direction: 'next' | 'prev' | 'first' | 'last'
) => void>
export const RegistryKey = Symbol('UiToggleGroupRegistry') as InjectionKey<{
  register: (id: string, option: {
    getValue: () => unknown;
    pressed: Ref<boolean>;
    disabled: () => boolean;
    focus: () => Promise<void> | void;
  }) => void;
  unregister: (id: string) => void;
}>
export const SetFocusableIdKey = Symbol('UiToggleGroupSetFocusableId') as InjectionKey<(id: string) => void>
export const SizeKey = Symbol('UiToggleGroupSize') as InjectionKey<ComputedRef<UiToggleButtonSize | `${UiToggleButtonSize}`>>
export const DisabledKey = Symbol('UiToggleGroupDisabled') as InjectionKey<ComputedRef<boolean>>
export const ToggleKey = Symbol('UiToggleGroupToggle') as InjectionKey<(value: unknown) => void>

export const useFocusableId = () => inject(FocusableIdKey, computed(() => null))
export const useMoveFocus = () => inject(MoveFocusKey, () => {})
export const useRegistry = () => inject(RegistryKey, {
  register: () => {},
  unregister: () => {},
})
export const useSetFocusableId = () => inject(SetFocusableIdKey, () => {})
export const useSize = () => inject(SizeKey, computed(() => UiToggleButtonSize.SM))
export const useDisabled = () => inject(DisabledKey, computed(() => false))
export const useToggle = () => inject(ToggleKey, () => {})

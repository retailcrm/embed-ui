import type {
  InjectionKey,
  ComputedRef,
} from 'vue'

export type Option = {
  id: string;
  value: unknown;
  label: string;
  isMatched (): boolean;
}

export type Group = {
  id: string;
  matchedQuantity: () => number;
  isMatched (): boolean;
}

export const IsSelectedKey = Symbol('UiSelectedIsSelected') as InjectionKey<ComputedRef<(value: unknown) => boolean>>
export const RegisterKey = Symbol('UiSelectRegister') as InjectionKey<(option: Option) => void>
export const SyncKey = Symbol('UiSelectSync') as InjectionKey<(id: string, data: { label: string; value: unknown }) => void>
export const UnregisterKey = Symbol('UiSelectUnregister') as InjectionKey<(id: string) => void>
export const ToggleKey = Symbol('UiSelectToggle') as InjectionKey<(value: unknown) => void>
export const FilterKey = Symbol('UiSelectFilter') as InjectionKey<ComputedRef<string>>
export const FilteredKey = Symbol('UiSelectFiltered') as InjectionKey<ComputedRef<boolean>>
export const TickerKey = Symbol('UiSelectTicker') as InjectionKey<ComputedRef<boolean>>
export const MultipleKey = Symbol('UiSelectMultiple') as InjectionKey<ComputedRef<boolean>>
export const FastenedKey = Symbol('UiSelectFastened') as InjectionKey<ComputedRef<boolean>>
export const UnregisterOptionKey = Symbol('UiSelectUnregisterOption') as InjectionKey<(id: string) => void>
export const RegisterOptionKey = Symbol('UiSelectRegisterOption') as InjectionKey<(option: Option) => void>
export const RegisterGroupKey = Symbol('UiSelectOptionGroupRegister') as InjectionKey<(group: Group) => void>
export const UnregisterGroupKey = Symbol('UiSelectOptionGroupUnregister') as InjectionKey<(id: string) => void>
export const RegisterHeaderOptionKey = Symbol('UiSelectOptionGroupRegisterHeaderOption') as InjectionKey<(option: Option) => void>
export const UnregisterHeaderOptionKey = Symbol('UiSelectOptionGroupUnregisterHeaderOption') as InjectionKey<(id: string) => void>

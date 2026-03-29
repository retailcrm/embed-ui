<template>
    <UiRadioSwitchRoot
        :appearance="appearance"
        :size="size"
        :rubber="rubber"
        v-bind="$attrs"
    >
        <slot>
            <UiRadioSwitchOption
                v-for="(option, index) in options"
                :key="`${option.label}-${index}`"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
            >
                <template v-if="$slots.icon" #icon>
                    <slot name="icon" :option="option" />
                </template>
            </UiRadioSwitchOption>
        </slot>
    </UiRadioSwitchRoot>
</template>

<script lang="ts" remote setup>
import type { PropType, Ref, VNodeChild } from 'vue'

import type {
  EqualPredicate,
  Option,
  UiRadioSwitchProperties,
} from '@/common/components/radio-switch'

import {
  computed,
  provide,
  ref,
  watch,
} from 'vue'

import UiRadioSwitchOption from './UiRadioSwitchOption.vue'

import { APPEARANCE, SIZE } from '@/common/components/radio-switch'

import {
  AppearanceKey,
  FocusableIdKey,
  MoveFocusKey,
  RegistryKey,
  SetFocusableIdKey,
  SizeKey,
  UpdateKey,
} from '@/host/components/radio-switch/injection'

import { UiRadioSwitchRoot } from './parts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Выбранное значение */
  value: {
    type: null as unknown as PropType<UiRadioSwitchProperties['value']>,
    default: null,
  },

  /** Список опций */
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },

  /** Предикат равенства */
  equalFn: {
    type: Function as PropType<EqualPredicate>,
    default: (a: unknown, b: unknown): boolean => a === b,
  },

  /** Внешний вид */
  appearance: {
    type: String as PropType<UiRadioSwitchProperties['appearance']>,
    default: APPEARANCE.DEFAULT,
    validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
  },

  /** Размер */
  size: {
    type: String as PropType<UiRadioSwitchProperties['size']>,
    default: SIZE.MD,
    validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
  },

  /** Растягивание контейнера в зависимости от контента */
  rubber: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  /** Срабатывает при изменении значения */
  'change': [value: unknown];
  /** Срабатывает при изменении значения */
  'update:value': [value: unknown];
}>()

defineSlots<{
  /** Набор опций переключателя */
  default?: () => VNodeChild;
  /** Иконка опции переключателя */
  icon?: (props: { option: Option }) => VNodeChild;
}>()

const registry = new Map<string, {
  getValue: () => unknown;
  checked: Ref<boolean>;
  disabled: () => boolean;
  focus: () => Promise<void> | void;
}>()
const focusableId = ref<string | null>(null)

const getEnabledEntries = () => {
  return Array.from(registry.entries()).filter(([, option]) => !option.disabled())
}

const syncFocusableId = (preferredId?: string | null) => {
  const enabledEntries = getEnabledEntries()
  const enabledIds = new Set(enabledEntries.map(([id]) => id))
  const selectedEntry = enabledEntries.find(([, option]) => option.checked.value)

  if (preferredId && enabledIds.has(preferredId)) {
    focusableId.value = preferredId
    return
  }

  if (focusableId.value && enabledIds.has(focusableId.value)) {
    return
  }

  focusableId.value = selectedEntry?.[0] ?? enabledEntries[0]?.[0] ?? null
}

provide(AppearanceKey, computed(() => props.appearance))
provide(FocusableIdKey, computed(() => focusableId.value))
provide(SizeKey, computed(() => props.size))
provide(SetFocusableIdKey, (id: string) => {
  syncFocusableId(id)
})

provide(RegistryKey, {
  register: (id, option) => {
    if (registry.has(id)) {
      return
    }

    option.checked.value = props.equalFn(option.getValue(), props.value)
    registry.set(id, option)
    syncFocusableId(option.checked.value ? id : focusableId.value)
  },

  unregister: (id) => {
    registry.delete(id)
    if (focusableId.value === id) {
      syncFocusableId()
    }
  },
})

provide(UpdateKey, (newValue: unknown) => {
  emit('change', newValue)
  emit('update:value', newValue)
})

provide(MoveFocusKey, async (id, direction) => {
  const enabledEntries = getEnabledEntries()

  if (!enabledEntries.length) {
    focusableId.value = null
    return
  }

  let targetEntry = enabledEntries[0]

  if (direction === 'first') {
    targetEntry = enabledEntries[0]
  } else if (direction === 'last') {
    targetEntry = enabledEntries.at(-1) ?? enabledEntries[0]
  } else {
    const currentIndex = enabledEntries.findIndex(([entryId]) => entryId === id)
    const fallbackIndex = focusableId.value
      ? enabledEntries.findIndex(([entryId]) => entryId === focusableId.value)
      : -1
    const baseIndex = currentIndex === -1 ? Math.max(fallbackIndex, 0) : currentIndex
    const offset = direction === 'next' ? 1 : -1
    const nextIndex = (baseIndex + offset + enabledEntries.length) % enabledEntries.length

    targetEntry = enabledEntries[nextIndex] ?? enabledEntries[0]
  }

  if (!targetEntry) {
    return
  }

  const [targetId, target] = targetEntry
  focusableId.value = targetId
  emit('change', target.getValue())
  emit('update:value', target.getValue())
  await target.focus()
})

watch([() => props.value, () => props.equalFn], ([newValue]) => {
  let selectedId: string | null = null

  Array.from(registry.values()).forEach((option) => {
    option.checked.value = props.equalFn(option.getValue(), newValue)
  })

  selectedId = Array.from(registry.entries()).find(([, option]) => {
    return option.checked.value && !option.disabled()
  })?.[0] ?? null

  syncFocusableId(selectedId)
})
</script>

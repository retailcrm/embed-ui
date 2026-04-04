<template>
    <UiToggleGroupRoot
        :size="size"
        :rubber="rubber"
        :disabled="disabled"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-orientation="props.ariaOrientation"
        v-bind="$attrs"
    >
        <slot>
            <UiToggleGroupOption
                v-for="(option, index) in options"
                :key="`${option.label}-${index}`"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
            >
                <template v-if="$slots.icon" #icon>
                    <slot name="icon" :option="option" />
                </template>
            </UiToggleGroupOption>
        </slot>
    </UiToggleGroupRoot>
</template>

<script lang="ts" remote setup>
import type { PropType, Ref, VNodeChild } from 'vue'

import type {
  UiToggleGroupEqualPredicate,
  UiToggleGroupItem,
  UiToggleGroupProperties,
} from '@/common/components/toggle-group'

import {
  computed,
  provide,
  ref,
  watch,
} from 'vue'

import UiToggleGroupOption from './UiToggleGroupOption.vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

import {
  DisabledKey,
  FocusableIdKey,
  MoveFocusKey,
  RegistryKey,
  SetFocusableIdKey,
  SizeKey,
  ToggleKey,
} from './injection'
import { UiToggleGroupRoot } from './parts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  model: {
    type: Array as PropType<UiToggleGroupProperties['model']>,
    default: () => [],
  },

  options: {
    type: Array as PropType<UiToggleGroupItem[]>,
    default: () => [],
  },

  equalFn: {
    type: Function as PropType<UiToggleGroupEqualPredicate>,
    default: (a: unknown, b: unknown): boolean => a === b,
  },

  size: {
    type: String as PropType<UiToggleGroupProperties['size']>,
    default: UiToggleButtonSize.SM,
    validator: (size: string) => {
      return Object.values(UiToggleButtonSize).includes(size as UiToggleButtonSize)
    },
  },

  rubber: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  ariaLabel: {
    type: String,
    default: undefined,
  },

  ariaLabelledby: {
    type: String,
    default: undefined,
  },

  ariaDescribedby: {
    type: String,
    default: undefined,
  },

  ariaOrientation: {
    type: String as PropType<UiToggleGroupProperties['ariaOrientation']>,
    default: 'horizontal',
  },
})

const emit = defineEmits<{
  'change': [value: unknown[]];
  'update:model': [value: unknown[]];
}>()

defineSlots<{
  default?: () => VNodeChild;
  icon?: (props: { option: UiToggleGroupItem }) => VNodeChild;
}>()

const registry = new Map<string, {
  getValue: () => unknown;
  pressed: Ref<boolean>;
  disabled: () => boolean;
  focus: () => Promise<void> | void;
}>()
const focusableId = ref<string | null>(null)

const isPressed = (value: unknown) => {
  return props.model.some((entry) => props.equalFn(entry, value))
}

const getEnabledEntries = () => {
  return Array.from(registry.entries()).filter(([, option]) => !option.disabled())
}

const syncFocusableId = (preferredId?: string | null) => {
  const enabledEntries = getEnabledEntries()
  const enabledIds = new Set(enabledEntries.map(([id]) => id))
  const pressedEntry = enabledEntries.find(([, option]) => option.pressed.value)

  if (preferredId && enabledIds.has(preferredId)) {
    focusableId.value = preferredId
    return
  }

  if (focusableId.value && enabledIds.has(focusableId.value)) {
    return
  }

  focusableId.value = pressedEntry?.[0] ?? enabledEntries[0]?.[0] ?? null
}

const updatePressedStates = () => {
  Array.from(registry.values()).forEach((option) => {
    option.pressed.value = isPressed(option.getValue())
  })
}

provide(FocusableIdKey, computed(() => focusableId.value))
provide(DisabledKey, computed(() => props.disabled))
provide(SizeKey, computed(() => props.size))
provide(SetFocusableIdKey, (id: string) => {
  syncFocusableId(id)
})

provide(RegistryKey, {
  register: (id, option) => {
    if (registry.has(id)) {
      return
    }

    option.pressed.value = isPressed(option.getValue())
    registry.set(id, option)
    syncFocusableId(option.pressed.value ? id : focusableId.value)
  },

  unregister: (id) => {
    registry.delete(id)
    if (focusableId.value === id) {
      syncFocusableId()
    }
  },
})

provide(ToggleKey, (value: unknown) => {
  if (props.disabled) {
    return
  }

  const nextModel = isPressed(value)
    ? props.model.filter((entry) => !props.equalFn(entry, value))
    : [...props.model, value]

  emit('change', nextModel)
  emit('update:model', nextModel)
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
  await target.focus()
})

watch([() => props.model, () => props.equalFn], () => {
  updatePressedStates()
  syncFocusableId()
}, {
  deep: true,
})

watch(() => props.disabled, () => {
  syncFocusableId()
})
</script>

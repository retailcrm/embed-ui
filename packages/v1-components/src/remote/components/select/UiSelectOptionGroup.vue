<template>
    <div
        v-bind="$attrs"
        :class="{
            'ui-v1-select-option-group': true,
            'ui-v1-select-option-group_hidden': hidden,
        }"
    >
        <UiMenuItemGroup>
            <template v-if="$slots.option" #option>
                <UiSelectOptionGroupHeader>
                    <!-- @slot Разметка блока группировки опций -->
                    <slot name="option" />
                </UiSelectOptionGroupHeader>
            </template>

            <template #label>
                <!-- @slot Заголовок -->
                <slot name="label">
                    {{ label }}
                </slot>
            </template>

            <template #quantity>
                <!-- @slot Счетчик количества элементов внутри группы -->
                <slot name="quantity" :quantity="matchedOptionsQuantity">
                    {{ matchedOptionsQuantity }}
                </slot>
            </template>

            <!-- @slot Иное содержимое компонента -->
            <slot />
        </UiMenuItemGroup>
    </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type {
  Option,
  Group,
} from '@/host/components/select/injection'

import { UiMenuItemGroup } from '@/remote/components/menu'

import UiSelectOptionGroupHeader from './UiSelectOptionGroupHeader.vue'

import {
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  provide,
  ref,
} from 'vue'

import { uid } from '@/common/components/select'

import {
  FastenedKey,
  FilteredKey,
  RegisterGroupKey,
  RegisterHeaderOptionKey,
  RegisterOptionKey,
  UnregisterGroupKey,
  UnregisterHeaderOptionKey,
  UnregisterOptionKey,
} from '@/host/components/select/injection'

defineProps({
  /** Заголовок группы опций */
  label: {
    type: String,
    default: '',
  },
})

const id = uid('u1-v1-select-option-group')
const options = ref<Option[]>([])
const groups = ref<Group[]>([])
const headerOptions = ref<Option[]>([])

const COMPONENT_ALREADY_REGISTERED = (prefix: string, id: string) => {
  return `[${prefix}] Component with id ${id} already registered. Unregister it before using again.`
}

provide(RegisterOptionKey, (option: Option) => {
  if (options.value.some(item => item.id === option.id)) {
    throw new Error(COMPONENT_ALREADY_REGISTERED('UiSelect', option.id))
  }

  options.value.push(option)
})

provide(UnregisterOptionKey, (id: string) => {
  const index = options.value.findIndex(option => option.id === id)
  if (index !== -1) {
    options.value.splice(index, 1)
  }
})

provide(RegisterGroupKey, (group: Group) => {
  if (groups.value.some(g => g.id === group.id)) {
    throw new Error(COMPONENT_ALREADY_REGISTERED('UiSelectOptionGroup', group.id))
  }

  groups.value.push(group)
})

provide(UnregisterGroupKey, (id: string) => {
  const index = groups.value.findIndex(group => group.id === id)
  if (index !== -1) {
    groups.value.splice(index, 1)
  }
})

provide(RegisterHeaderOptionKey, (option: Option) => {
  if (headerOptions.value.some(item => item.id === option.id)) {
    throw new Error(COMPONENT_ALREADY_REGISTERED('UiSelectOptionGroupHeader', option.id))
  }

  headerOptions.value.push(option)
})

provide(UnregisterHeaderOptionKey, (id: string) => {
  const index = headerOptions.value.findIndex(o => o.id === id)
  if (index !== -1) {
    headerOptions.value.splice(index, 1)
  }
})

provide(FastenedKey, computed(() => false))

const registerInGroup = inject<((group: Group) => void)>(RegisterGroupKey, () => {})
const unregisterInGroup = inject<((id: string) => void)>(UnregisterGroupKey, () => {})

const filtered = inject<Ref<boolean|null>>(FilteredKey, ref(false))

const matchedOptionsQuantity = computed((): number => {
  return options.value.filter(o => o.isMatched()).length
    + groups.value.reduce((total, g) => total + g.matchedQuantity(), 0)
})

const matched = computed((): boolean => !!matchedOptionsQuantity.value || headerOptions.value.some(o => o.isMatched())
  || groups.value.some(g => g.isMatched()))

const hidden = computed(() => !filtered.value || matched.value)

onMounted(() => registerInGroup({
  id,
  matchedQuantity: () => matchedOptionsQuantity.value,
  isMatched: () => matched.value,
}))

onBeforeUnmount(() => unregisterInGroup(id))
</script>

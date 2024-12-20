<template>
    <span
        ref="root"
        :class="{
            'ui-v1-checkbox': true,
            'ui-v1-checkbox_small': small,
            'ui-v1-checkbox_checked': checked,
            'ui-v1-checkbox_indeterminate': indeterminate,
            'ui-v1-checkbox_disabled': disabled,
        }"
        v-bind="pick($attrs, (key: string) => !key.startsWith('aria-') && !key.startsWith('on'))"
    >
        <input
            :id="id"
            ref="checkbox"
            :value="isArray(model) ? value : undefined"
            :name="name"
            :disabled="disabled"
            :checked="checked"
            v-bind="pick($attrs, (key: string) => key.startsWith('aria-') || key.startsWith('on'))"
            type="checkbox"
            class="ui-v1-checkbox__input"
            @change="onChange"
        >

        <span class="ui-v1-checkbox__checkmark">
            <IconDone
                v-if="checked && !indeterminate"
                class="ui-v1-checkbox__checkmark-icon"
            />
        </span>
    </span>
</template>

<script lang="ts">
let counter = 0

export default {}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Primitive } from '@/common/types'
import type { UiCheckboxMethods } from '@/common/components/checkbox'

import { computed, ref } from 'vue'

import IconDone from '~assets/sprites/actions/done.svg'

const isArray = Array.isArray

const props = defineProps({
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  /** Атрибут name нативного поля ввода */
  name: {
    type: String,
    default: () => 'ui-checkbox-' + ++counter,
  },

  /** Значение модели используемое с директивой v-model */
  model: {
    type: null as unknown as PropType<Primitive | Primitive[]>,
    default: undefined,
  },

  /** Значение, добавляемое или удаляемое из модели в зависимости от флага checked, если модель является массивом */
  value: {
    type: null as unknown as PropType<Primitive>,
    default: undefined,
  },

  /** Задает значение, если флаг checked равен true, а модель не является массивом */
  valueOfTruthy: {
    type: null as unknown as PropType<Primitive>,
    default: true,
  },

  /** Задает значение, если флаг checked равен false, а модель не является массивом */
  valueOfFalsy: {
    type: null as unknown as PropType<Primitive>,
    default: false,
  },

  /** Задает "состояние" неопределенности для бокса, чье состояние "включенности" зависит от множества других боксов */
  indeterminate: {
    type: Boolean,
    default: false,
  },

  /** Задает стили для бокса уменьшенного размера */
  small: {
    type: Boolean,
    default: false,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const root = ref<HTMLElement | null>(null)
const checkbox = ref<HTMLInputElement | null>(null)

const pick = (attrs: Record<string, unknown>, criteria: (key: string) => boolean) => {
  return Object.keys(attrs).filter(criteria).reduce((picked, key) => ({
    ...picked,
    [key]: attrs[key],
  }), {} as typeof attrs)
}

const click = () => checkbox.value?.click()
const focus = () => checkbox.value?.focus()
const blur = () => checkbox.value?.blur()

defineExpose({
  click,
  focus,
  blur,
} satisfies UiCheckboxMethods)

const emit = defineEmits([
  /** Переключение чекбокса */
  'change',
  /** Изменение значения модели */
  'update:model',
])

const contains = (array: unknown[], value: unknown) => array.some(v => v === value)

const checked = computed(() => {
  return isArray(props.model)
    ? contains(props.model, props.value)
    : props.model === props.valueOfTruthy
})

const calculate = (checked: boolean) => {
  if (isArray(props.model)) {
    return checked
      ? (contains(props.model, props.value) ? props.model : [...props.model, props.value])
      : [...props.model].filter(v => v !== props.value)
  }

  return checked ? props.valueOfTruthy : props.valueOfFalsy
}

const onChange = (event: Event) => {
  const checkbox = event.target as HTMLInputElement
  const value = calculate(checkbox.checked)

  emit('change', value)
  emit('update:model', value)
}
</script>

<style lang="less" src="./checkbox.less" />

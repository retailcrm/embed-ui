<template>
  <div
      ref="trigger"
      :aria-controls="id + '-popper'"
      :aria-expanded="expanded ? 'true' : 'false'"
      :aria-invalid="invalid ? 'true' : 'false'"
      role="combobox"
      aria-haspopup="listbox"
      class="ui-v1-select"
      @click="onClick"
  >
    <div
        v-if="multiple && !$slots.trigger"
        ref="touchstone"
        class="ui-v1-select__touchstone"
    >
      {{ selectionLabels }}
    </div>
    <!-- @slot Разметка переключателя выпадающего списка -->
    <slot name="trigger">
      <UiTextbox
          :id="id"
          :value="inputValue"
          :placeholder="placeholder"
          :active="expanded"
          :clearable="clearable"
          :invalid="invalid"
          :readonly="inputReadonly"
          :size="inputSize"
          :disabled="disabled"
          class="ui-v1-select__trigger"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @clear="onClear"
      >
        <template v-if="$slots['leading-icon']" #leading-icon>
          <!-- @slot Иконка слева от поля ввода -->
          <slot name="leading-icon" />
        </template>

        <template #trailing-icon>
          <!-- @slot Иконка справа от поля ввода (по-умолчанию каретка) -->
          <slot name="trailing-icon">
            <IconCaret />
          </slot>
        </template>
      </UiTextbox>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'

import IconCaret from '~assets/sprites/arrows/caret-down.svg'
import { UiTextbox } from '@/host'

import { isArray } from '@retailcrm/embed-ui-v1-contexts/src/predicates'

import { SIZE } from '@/common/components/textbox'

const props = defineProps({
  /** Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице */
  id: {
    type: String,
    default: undefined,
  },

  /** Атрибут value, содержащий выбранный элемент из выпадающего списка */
  value: {
    type: null as unknown as PropType<unknown|unknown[]>,
    default: undefined,
  },

  /** Отображает иконку сброса введённого или выбранного значения в виде крестика */
  clearable: {
    type: Boolean,
    default: false,
  },

  /** Фильтрация строк выпадающего списка на соответствие введённого выражения в input */
  filterable: {
    type: Boolean,
    default: false,
  },

  /** Подсвечивает поле как содержащее некорректное значение */
  invalid: {
    type: Boolean,
    default: false,
  },

  /** Наличие множественного выбора среди элементов выпадающего списка */
  multiple: {
    type: Boolean,
    default: false,
  },

  /** Начальное состояние выпадающего списка - открыт/закрыт */
  opened: {
    type: Boolean,
    default: false,
  },

  /** Атрибут placeholder нативного поля ввода input */
  placeholder: {
    type: String,
    default: '',
  },

  /** Устанавливает поле ввода в состояние доступное только для чтения */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** Блокировка поля ввода */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Устанавливает в качестве выводимого в input значения только содержимое placeholder */
  onlyPlaceholder: {
    type: Boolean,
    default: false,
  },

  /** Размер поля ввода */
  inputSize: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.SM,
  },

  /** Состояние открытия выпадающего списка */
  expanded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  /** Ввод значения в поле ввода */
  'input',
  /** Установка фокуса на поле ввода */
  'focus',
  /** Потеря фокуса полем ввода */
  'blur',
  /** Сброс значения фильтра */
  'clear',
  /** Изменение значения */
  'update:value',
  /** Открытие выпадающего списка */
  'update:expanded',
])

const trigger = ref<HTMLElement | null>(null)
const touchstone = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const filter = ref('')

const inputReadonly = computed(
  () => props.readonly || !props.filterable
)

const selectionLabels = computed(() => {
  const value = props.value

  if (isArray(value)) {
    const arr: unknown[] = value
    return arr.map(v => String(v)).join(', ')
  }

  return value != null ? String(value) : ''
})

const selectionText = computed(() =>
  props.onlyPlaceholder ? props.placeholder : selectionLabels.value
)

const inputValue = computed(() =>
  props.filterable && props.expanded
    ? filter.value
    : selectionText.value
)

const open = () => {
  if (props.expanded) return

  console.log('open select')
  emit('update:expanded', true)
}

const close = () => {
  if (!props.expanded) return

  console.log('close select')
  emit('update:expanded', false)
}

const onClick = () => {
  if (props.disabled || props.readonly) return

  return props.expanded ? close() : open()
}

const onInput = (event: Event) => emit('input', event)
const onFocus = (event: Event) => emit('focus', event)
const onBlur = (event: Event) => emit('blur', event)

const onClear = (event?: MouseEvent) => {
  const value = props.multiple ? [] : null
  emit('update:value', value)
  emit('clear', event)
}

watch(() => props.opened, opened => opened ? open() : close())

onMounted(async () => {
  input.value = trigger.value?.querySelector('input') ?? null
  console.log('mounted select trigger', trigger.value?.offsetWidth)
})
</script>
<style lang="less" src="./select.less" />


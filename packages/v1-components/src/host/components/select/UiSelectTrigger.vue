<template>
  <div
      ref="trigger"
      :aria-controls="id + '-popper'"
      :aria-expanded="state.expanded ? 'true' : 'false'"
      :aria-invalid="invalid ? 'true' : 'false'"
      role="combobox"
      aria-haspopup="listbox"
      class="ui-v1-select__trigger"
      @click="open"
  >
    <div
        v-if="multiple && !$slots.trigger"
        ref="touchstone"
        class="ui-v1-select__touchstone"
    >
      {{ selectionLabels }}
    </div>

    <!-- @slot Разметка переключателя выпадающего списка -->
    <slot
        name="trigger"
        :active="state.expanded"
        :value="selectionText || placeholder"
    >
      <UiTextbox
          :id="id"
          :value="inputValue"
          :placeholder="placeholder"
          :active="state.expanded"
          :clearable="clearable"
          :invalid="invalid"
          :readonly="inputReadonly"
          :size="inputSize"
          :disabled="disabled"
          class="ui-v1-select__input"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @clear="onClear"
      >
        <template v-if="$slots['leading-icon'] && leadingIcon.length === 0" #leading-icon>
          <!-- @slot Иконка слева от поля ввода -->
          <slot name="leading-icon" :active="state.expanded" />
        </template>

        <template v-if="trailingIcon.length === 0" #trailing-icon>
          <!-- @slot Иконка справа от поля ввода (по-умолчанию каретка) -->
          <slot name="trailing-icon" :active="state.expanded">
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
  reactive,
  ref,
  watch,
  useId,
} from 'vue'

import IconCaret from '../../../../assets/sprites/arrows/caret-down.svg'
import { UiTextbox } from '@/host'

import { isArray } from '@retailcrm/embed-ui-v1-contexts/src/predicates'

import { APPEARANCE } from '@/common/components/select'
import { SIZE } from '@/common/components/textbox'

const props = defineProps({
  /** Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице */
  id: {
    type: String,
    default: () => useId(),
  },

  /** Атрибут value, содержащий выбранный элемент из выпадающего списка */
  value: {
    type: null as unknown as PropType<unknown|unknown[]>,
    default: undefined,
  },

  /** Можно ли раскрыть список */
  expandable: {
    type: Boolean,
    default: true,
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

  /** Переключение состояния открыто/закрыто окна при активном фокусе на элементе */
  openWithActiveFocus: {
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

  /** Наименование иконки, выводимой перед текстом внутри поля ввода */
  leadingIcon: {
    type: String,
    default: '',
  },

  /** Наименование иконки, выводимой после текста внутри поля ввода */
  trailingIcon: {
    type: String,
    default: '',
  },

  /** Внешний вид поля ввода из @omnica/input */
  inputAppearance: {
    type: String as PropType<APPEARANCE | `${APPEARANCE}`>,
    validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    default: APPEARANCE.OUTLINED,
  },

  /** Размер поля ввода */
  inputSize: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.SM,
  },

  /** Включает автоматическое изменение ширины по мере ввода текста */
  inputFitContent: {
    type: Boolean,
    default: false,
  },

  closeOnClick: {
    type: Boolean,
    default: false,
  },

  /** Флаг добавления тегов выбранных пунктов под выпадающим списком */
  tags: {
    type: Boolean,
    default: false,
  },

  /** Добавляет анимацию показала полной строки при переполнении */
  ticker: {
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
  /** Открытие выпадающего списка */
  'open',
  /** Закрытие выпадающего списка */
  'close',
  /** Появляется при прокрутке до верхнего края */
  'popper:scroll:start',
  /** Появляется при прокрутке до нижнего края */
  'popper:scroll:end',
  /** Изменение флага открыт/закрыт */
  'update:opened',
  /** Изменение значения */
  'update:value',
])

const trigger = ref<HTMLElement | null>(null)
const touchstone = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)

const state = reactive({
  expanded: props.opened,
})

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
  inputReadonly.value && !state.expanded
    ? selectionText.value
    : ''
)

const open = () => {
  if (state.expanded || props.disabled || props.readonly) return

  state.expanded = true
  emit('update:opened', true)
  emit('open')
}

const close = () => {
  if (!state.expanded) return

  state.expanded = false
  emit('update:opened', false)
  emit('close')
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
})
</script>
<style lang="less" src="./select.less" />


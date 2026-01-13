<template>
    <div
        ref="trigger"
        :aria-controls="id + '-popper'"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-invalid="invalid ? 'true' : 'false'"
        role="combobox"
        aria-haspopup="listbox"
        :class="{
            'ui-v1-select': true,
            'ui-v1-select_active': expanded,
            'ui-v1-select_disabled': disabled,
            'ui-v1-select_filterable': filterable,
        }"
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
                :placeholder="!inputReadonly && expanded ? i18n.t('search.placeholder') : placeholder"
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
                        <IconCaret aria-hidden="true" class="ui-v1-select__caret" />
                    </slot>
                </template>
            </UiTextbox>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import type { I18nLocalized } from '@/host/i18n'
import type { Option } from '@/host/components/select/injection'
import type { PropType } from 'vue'

import {
  computed,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

import { UiTextbox } from '@/host'
import IconCaret from '~assets/sprites/arrows/caret-down.svg'

import _i18n from '@/host/components/select/i18n'

import { SIZE } from '@/common/components/textbox'

import { I18nInjectKey } from '@/host/i18n/plugin'

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

  /** Текст фильтра для поиска */
  filter: {
    type: String,
    default: '',
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

  /** Выбранные элементы из выпадающего списка. Должен содержать значение или массив значений, соответствующих атрибуту value опций из выпадающего списка */
  selection: {
    type: Array as PropType<Option[]>,
    default: () => [],
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
const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const inputReadonly = computed(
  () => props.readonly || !props.filterable
)

const selectionLabels = computed((): string => props.selection.map(o => o.label).join(', '))
const selectionText = computed((): string => {
  if (props.placeholder && (props.onlyPlaceholder)) return props.placeholder
  if (props.multiple) {
    const width =  input.value?.clientWidth ?? 0
    if (width > 0 && selectionWidth.value > width) {
      return `${i18n.value.t('selected')}: ${props.selection.length}`
    }
  }

  return selectionLabels.value
})

const selectionWidth = ref(0)

const updateSelectionWidth = () => {
  if (touchstone.value && !props.onlyPlaceholder) {
    nextTick().then(() => {
      selectionWidth.value = touchstone.value?.clientWidth ?? 0
    })
  }
}

const inputValue = computed(() => {
  if (!inputReadonly.value && props.expanded) {
    if (props.multiple && !props.filter) {
      return selectionText.value
    }
    return props.filter
  }

  return selectionText.value
})

const open = () => {
  if (props.expanded) return

  emit('update:expanded', true)
}

const close = () => {
  if (!props.expanded) return

  emit('update:expanded', false)
}

const onClick = () => {
  if (props.disabled || props.readonly) return

  return props.expanded ? close() : open()
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  emit('input', target?.value ?? '')
}
const onFocus = (event: Event) => emit('focus', event)
const onBlur = (event: Event) => emit('blur', event)

const onClear = (event?: MouseEvent) => {
  const value = props.multiple ? [] : null
  emit('update:value', value)
  emit('clear', event)
}

watch(() => props.value, () => {
  updateSelectionWidth()

  if (props.multiple && props.expanded) {
    nextTick(() => input.value?.focus())
  }
})

watch(() => props.opened, opened => opened ? open() : close())

onMounted(async () => {
  input.value = trigger.value?.querySelector('input') ?? null

  updateSelectionWidth()
})
</script>
<style lang="less" src="./select.less" />

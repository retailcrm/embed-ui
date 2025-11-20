<template>
    <span
        :id="(id ?? uid) + '-group'"
        ref="root"
        :class="{
            'ui-v1-textbox': true,
            'ui-v1-textbox_active': active,
            'ui-v1-textbox_invalid': invalid,
            'ui-v1-textbox_outlined': outlined,
            'ui-v1-textbox_xs': size === SIZE.XS,
            'ui-v1-textbox_md': size === SIZE.MD,
            'ui-v1-textbox_lg': size === SIZE.LG,
            'ui-v1-textbox_xl': size === SIZE.XL,
        }"
        v-bind="$attrs"
    >
        <span
            v-if="prefix || 'prefix' in $slots"
            class="ui-v1-textbox__prefix"
        >
            <slot>{{ prefix }}</slot>
        </span>

        <span
            v-if="'leading-icon' in $slots"
            class="ui-v1-textbox__icon ui-v1-textbox__icon_leading"
            @click="focus"
        >
            <slot name="leading-icon" />
        </span>

        <input
            v-if="!multiline"
            :id="id ?? uid"
            ref="textbox"
            :type="type"
            :value="text"
            :max="isNumeric ? max : undefined"
            :min="isNumeric ? min : undefined"
            :step="isNumeric ? step : undefined"
            :aria-invalid="invalid ? 'true' : 'false'"
            :autocomplete="autocomplete"
            :inputmode="inputmode"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :disabled="disabled"
            @input="onInput"
            @keydown="onKeyDown"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
        />

        <textarea
            v-else
            :id="id ?? uid"
            ref="textbox"
            :value="text"
            :aria-invalid="invalid ? 'true' : 'false'"
            :autocomplete="autocomplete"
            :inputmode="inputmode"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :disabled="disabled"
            @input="onInput"
            @keydown="onKeyDown"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
        />

        <span
            v-if="clearable && String(value)"
            class="ui-v1-textbox__eraser"
        >
            <IconClearCircle
                :aria-controls="id ?? uid"
                :aria-label="i18n.t('clear')"
                role="button"
                @click="clear"
            />
        </span>

        <span
            v-if="'trailing-icon' in $slots"
            class="ui-v1-textbox__icon ui-v1-textbox__icon_trailing"
            @click="focus"
        >
            <slot name="trailing-icon" />
        </span>

        <span
            v-if="suffix || 'suffix' in $slots"
            class="ui-v1-textbox__suffix"
        >
            <slot>{{ suffix }}</slot>
        </span>
    </span>
</template>

<script lang="ts" setup>
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type { UiTextboxMethods } from '@/common/components/textbox'

import IconClearCircle from '../../../../assets/sprites/actions/clear-circle.svg'

import { computed } from 'vue'
import { decimalsOf } from '@/common/components/textbox'
import { inject } from 'vue'
import { isMaxDecimalsExceeded } from '@/common/components/textbox'
import { nextTick } from 'vue'
import { onMounted } from 'vue'
import { useElementRef } from '@/host/composables'
import { useId } from 'vue'
import { useTemplateRef } from 'vue'

import _i18n from './i18n'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { INPUTMODE } from '@/common/components/textbox'
import { SIZE } from '@/common/components/textbox'
import { TYPE } from '@/common/components/textbox'

const KEYS_MANIPULATORS = ['Backspace', 'Delete', 'Enter', 'ArrowLeft', 'ArrowRight']
const KEYS_MODIFIERS = ['Alt', 'CapsLock', 'Control', 'Shift', 'Meta']

const props = defineProps({
  /** Уникальный идентификатор поля */
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  /** Тип поля */
  type: {
    type: String as PropType<TYPE | `${TYPE}`>,
    validator: (value: string) => Object.values(TYPE).includes(value as TYPE),
    default: TYPE.TEXT,
  },

  /** Значение поля */
  value: {
    type: null as unknown as PropType<string | number | null>,
    default: null,
  },

  /** Нативный атрибут input */
  max: {
    type: null as unknown as PropType<number | `${number}`>,
    validator: (value: unknown) => !isNaN(Number(value)),
    default: Infinity,
  },

  /** Нативный атрибут input */
  min: {
    type: null as unknown as PropType<number | `${number}`>,
    validator: (value: unknown) => !isNaN(Number(value)),
    default: -Infinity,
  },

  /** Нативный атрибут input */
  step: {
    type: null as unknown as PropType<number | `${number}` | 'any'>,
    validator: (value: unknown) => value === 'any' || !isNaN(Number(value)),
    default: 1,
  },

  /** Нативный атрибут input|textarea */
  autocomplete: {
    type: String as unknown as PropType<'on' | 'off'>,
    validator: (value: string) => ['on', 'off'].includes(value),
    default: 'off',
  },

  /** Нативный атрибут input|textarea */
  inputmode: {
    type: String as PropType<INPUTMODE | `${INPUTMODE}`>,
    default: undefined,
  },

  /** Нативный атрибут input|textarea */
  maxlength: {
    type: [Number, String],
    default: undefined,
  },

  /** Максимальное количество знаков после запятой */
  decimals: {
    type: [Number, String],
    default: undefined,
  },

  /** Размер поля ввода */
  size: {
    type: String as PropType<SIZE | `${SIZE}`>,
    default: SIZE.SM,
  },

  /** Нативный атрибут input|textarea */
  placeholder: {
    type: String,
    default: '',
  },

  /** Текст в начале поля ввода */
  prefix: {
    type: String,
    default: '',
  },

  /** Текст в конце поля ввода */
  suffix: {
    type: String,
    default: '',
  },

  /** Флаг активности, для индикации, что поле задействовано */
  active: {
    type: Boolean,
    default: false,
  },

  /** Автоматический focus на поле ввода сразу после монтирования */
  autofocus: {
    type: Boolean,
    default: false,
  },

  /** Автоматический выбор значения в поле ввода при попадании в фокус */
  autoselect: {
    type: Boolean,
    default: false,
  },

  /** Включает кнопку очистки значения, кнопка видна только в случае, если значение непустое */
  clearable: {
    type: Boolean,
    default: false,
  },

  /** Является ли поле полем только для чтения */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** Является ли поле обязательным */
  required: {
    type: Boolean,
    default: false,
  },

  /** Отключено ли поле */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Содержит ли поле некорректное значение */
  invalid: {
    type: Boolean,
    default: false,
  },

  /** Превращает поле в многострочное */
  multiline: {
    type: Boolean,
    default: false,
  },

  /** Стиль поля – с рамкой или без */
  outlined: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  'input': [Event];
  'change': [Event];
  'keydown': [KeyboardEvent];
  'focus': [FocusEvent];
  'blur': [Event];
  'update:focused': [focused: boolean];
  'update:value': [value: string | number];
  'clear': [];
}>()

const uid = useId()
const i18n = computed((): I18nLocalized => _i18n.init(
  inject(I18nInjectKey, null)?.locale ?? _i18n.fallback,
  null
))

const isNumeric = computed(() => [INPUTMODE.DECIMAL, INPUTMODE.NUMERIC].includes(props.inputmode as INPUTMODE))
const isInteger = computed(() => isNumeric.value && Number(props.decimals) === 0)

const text = computed(() => {
  if (props.value === null) return ''

  const decimals = Number(props.decimals)
  const value = String(props.value)

  if (isNumeric.value && isMaxDecimalsExceeded(value, decimals)) {
    const matches = value.match(new RegExp('[0-9]*.[0-9]{' + decimals + '}')) ?? []

    return matches[0] ?? ''
  }

  return value
})

const changeByArrow = (event: KeyboardEvent) => {
  const increase = event.key === 'ArrowUp'
  if (!increase && event.key !== 'ArrowDown') return

  const max = Number(props.max)
  const min = Number(props.min)

  const step = props.step === 'any' ? 1 : Number(props.step)
  const oldValue = Number(props.value)
  const newValue = increase
    ? (oldValue + step)
    : (oldValue - step)

  if ((increase && newValue <= max) || (!increase && newValue >= min)) {
    emit('update:value', newValue.toFixed(Math.max(
      decimalsOf(step),
      decimalsOf(oldValue)
    )))
  }
}

const clear = () => {
  emit('update:value', '')
  emit('clear')
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  let value = target.value
  if (value !== props.value) {
    emit('update:value', value)
  }

  emit('input', event)
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  const value = target.value
  if (value !== props.value) {
    emit('update:value', value)
  }

  emit('change', event)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (KEYS_MODIFIERS.includes(event.key)) return

  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  const isDigit = !isNaN(+event.key)
  const isExponent = event.key === 'E' || event.key === 'e'
  const isManipulator = KEYS_MANIPULATORS.includes(event.key)
  const isSeparator = event.key === '.'
  const isAllowed = isDigit
    || isSeparator && !target.value.includes('.') && !isInteger.value
    || isManipulator
    || event.ctrlKey
    || event.metaKey

  if (isNumeric.value && (!isAllowed || isExponent)) {
    event.preventDefault()

    return changeByArrow(event)
  }

  emit('keydown', event)

  if (event.key === 'Escape') {
    target.blur()
  }
}

const root = useElementRef<HTMLAnchorElement>()
const textbox = useTemplateRef('textbox')

const setSelectionRange = (start: number, end: number) => textbox.value?.setSelectionRange(start, end)
const select = () => textbox.value?.select()

const focus = () => textbox.value?.focus()

const onFocus = async (event: FocusEvent) => {
  emit('focus', event)
  emit('update:focused', true)

  if (textbox.value && (props.autoselect || !props.outlined) && !props.disabled) {
    textbox.value.scrollLeft = textbox.value.scrollWidth

    await nextTick()

    select()
  }
}

const onBlur = (event: Event) => {
  emit('blur', event)
  emit('update:focused', false)
}

defineExpose<UiTextboxMethods>({
  getSelectionStart: () => textbox.value?.selectionStart ?? null,
  getSelectionEnd: () => textbox.value?.selectionEnd ?? null,
  setSelectionRange,
  focus,
  blur: () => textbox.value?.blur(),
  select,
  clear,
})

onMounted(() => {
  if (props.autofocus && !props.disabled) {
    focus()
  }
})
</script>

<style lang="less" src="./textbox.less" />

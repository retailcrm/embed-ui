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
            :max="isDecimal ? max : undefined"
            :min="isDecimal ? min : undefined"
            :step="isDecimal ? step : undefined"
            :aria-invalid="invalid ? 'true' : 'false'"
            :autocomplete="autocomplete"
            :inputmode="resolvedInputmode"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :disabled="disabled"
            @input="onInput"
            @paste="onPaste"
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
            :inputmode="resolvedInputmode"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :disabled="disabled"
            @input="onInput"
            @paste="onPaste"
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
import { sanitizeDecimal } from '@/common/components/textbox'
import { sanitizeNumeric } from '@/common/components/textbox'
import { useElementRef } from '@/host/composables'
import { useId } from 'vue'
import { useTemplateRef } from 'vue'
import { watch } from 'vue'

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
    type: [Number, String] as unknown as PropType<number | `${number}` | '*'>,
    validator: (value: unknown) => value === '*' || !isNaN(Number(value)),
    default: '*' as const,
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
  /** Стандартное для input/textarea элементов */
  'input': [Event];
  /** Стандартное для input/textarea элементов */
  'keydown': [KeyboardEvent];
  /** Стандартное для input/textarea элементов */
  'change': [Event];
  /** Стандартное для input/textarea элементов */
  'paste': [ClipboardEvent];
  /** Стандартное для input/textarea элементов */
  'focus': [FocusEvent];
  /** Стандартное для input/textarea элементов */
  'blur': [Event];
  /** Изменения флага – в фокусе/не в фокусе, можно использовать с v-model */
  'update:focused': [focused: boolean];
  /** Изменения значения поля, можно использовать с v-model */
  'update:value': [value: string | number];
  /** Появляется после нажатия на кнопку очистки */
  'clear': [];
}>()

const uid = useId()
const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const decimalsParsed = computed<number | '*'>(() => {
  if (props.decimals === '*' || props.decimals === undefined) return '*'

  const n = Number(props.decimals)

  return isNaN(n) || n < 0 ? '*' : n
})

const resolvedInputmode = computed<INPUTMODE | undefined>(() => {
  const mode = props.inputmode as INPUTMODE | undefined
  const t = props.type as TYPE

  if (t === TYPE.TEXT || t === TYPE.PASSWORD) {
    return mode
  }

  const allow = (candidate: INPUTMODE | undefined, own: INPUTMODE): INPUTMODE | undefined => {
    if (candidate === undefined) return undefined
    if (candidate === INPUTMODE.TEXT || candidate === own) return candidate
    return undefined
  }

  switch (t) {
    case TYPE.EMAIL:
      return mode === undefined ? INPUTMODE.EMAIL : allow(mode, INPUTMODE.EMAIL)
    case TYPE.PHONE:
      return mode === undefined ? INPUTMODE.TEL : allow(mode, INPUTMODE.TEL)
    case TYPE.SEARCH:
      return mode === undefined ? INPUTMODE.SEARCH : allow(mode, INPUTMODE.SEARCH)
    case TYPE.URL:
      return mode === undefined ? INPUTMODE.URL : allow(mode, INPUTMODE.URL)
    default:
      return mode
  }
})

const isDecimal = computed(() => resolvedInputmode.value === INPUTMODE.DECIMAL)
const isInteger = computed(() => isDecimal.value && decimalsParsed.value === 0)

const allowNegative = computed(() => Number(props.min) < 0)

const text = computed(() => {
  if (props.value === null) return ''

  const decimals = decimalsParsed.value
  const value = String(props.value)

  if (isDecimal.value && decimals !== '*' && isMaxDecimalsExceeded(value, decimals)) {
    const pattern = decimals === 0
      ? new RegExp('^-?\\d+')
      : new RegExp('^-?\\d+(?:\\.\\d{' + decimals + '})?')
    const matches = value.match(pattern) ?? []

    return matches[0] ?? ''
  }

  return value
})

const tryToChangeByArrow = (event: KeyboardEvent) => {
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

const sanitize = (value: string) => {
  return isDecimal.value
    ? sanitizeDecimal(value, allowNegative.value, decimalsParsed.value)
    : resolvedInputmode.value === INPUTMODE.NUMERIC
      ? sanitizeNumeric(value)
      : value
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const next = sanitize(target.value)

  if (next !== target.value) target.value = next
  if (next !== props.value) {
    emit('update:value', next)
  }

  emit('input', event)
}

const onPaste = async (event: ClipboardEvent) => {
  event.preventDefault()

  const text = event.clipboardData?.getData('text') ?? ''
  if (!text) return

  await insert(text)

  emit('paste', event)
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
  const isMinus = event.key === '-'

  const onStart = (target.selectionStart ?? 0) === 0

  if (isDecimal.value) {
    if ((!isDigit
      && !(isSeparator && !target.value.includes('.') && !isInteger.value)
      && !(isMinus && !target.value.startsWith('-') && allowNegative.value && onStart)
      && !isManipulator
      && !event.ctrlKey
      && !event.metaKey)
      || isExponent
    ) {
      event.preventDefault()

      return tryToChangeByArrow(event)
    }
  } else if (resolvedInputmode.value === INPUTMODE.NUMERIC
    && !isDigit
    && !isManipulator
    && !event.ctrlKey
    && !event.metaKey
  ) {
    event.preventDefault()

    return
  }

  emit('keydown', event)

  if (event.key === 'Escape') {
    target.blur()
  }
}

const root = useElementRef<HTMLAnchorElement>()
const textbox = useTemplateRef('textbox')

const getSelectionStart = () => textbox.value?.selectionStart ?? 0
const getSelectionEnd = () => textbox.value?.selectionEnd ?? 0
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

const insert = async (subject: string) => {
  if (!subject) return

  const start = getSelectionStart()
  const end = getSelectionEnd()
  const position = start + subject.length
  const value = sanitize(text.value.substring(0, start) + subject + text.value.substring(end))

  emit('update:value', value)

  await nextTick()

  setSelectionRange(position, position)
  focus()
}

defineExpose<UiTextboxMethods>({
  /** Индекс первого выбранного символа */
  getSelectionStart,
  /** Индекс последнего выбранного символа */
  getSelectionEnd,
  /** Выбор значения внутри поля ввода с start символа по end символ */
  setSelectionRange,
  /** Установка фокуса на поле ввода */
  focus,
  /** Сброс фокуса с поля ввода */
  blur: () => textbox.value?.blur(),
  /** Выбор значения внутри поля ввода */
  select,
  /** Вставка значения */
  insert,
  /** Очистка поле ввода */
  clear,
})

onMounted(() => {
  if (props.autofocus && !props.disabled) {
    focus()
  }
})

watch(() => props.value, (value) => {
  if (!isDecimal.value || typeof value !== 'string' || !value.includes(',')) return

  const converted = value.replace(/,/g, '.')
  if (/^-?\d*(?:\.\d*)?$/.test(converted)) {
    emit('update:value', converted)
  }
}, { immediate: true })
</script>

<style lang="less" src="./textbox.less" />

<template>
    <span
        :id="(id ?? uid) + '-group'"
        ref="root"
        :class="{
            'ui-v1-textbox': true,
            'ui-v1-textbox_active': active,
            'ui-v1-textbox_autofit': autofit,
            'ui-v1-textbox_fit': width === WIDTH.FIT,
            'ui-v1-textbox_fluid': width === WIDTH.FLUID,
            'ui-v1-textbox_invalid': invalid,
            'ui-v1-textbox_outlined': outlined,
            'ui-v1-textbox_xs': size === SIZE.XS,
            'ui-v1-textbox_md': size === SIZE.MD,
            'ui-v1-textbox_lg': size === SIZE.LG,
            'ui-v1-textbox_xl': size === SIZE.XL,
        }"
        :style="style"
        v-bind="$attrs"
    >
        <span
            v-if="prefix || 'prefix' in $slots"
            class="ui-v1-textbox__prefix"
        >
            <slot name="prefix">{{ prefix }}</slot>
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
            v-bind="inputAttributes"
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
            v-bind="inputAttributes"
            :value="text"
            :aria-invalid="invalid ? 'true' : 'false'"
            :autocomplete="autocomplete"
            :inputmode="resolvedInputmode"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :rows="rows"
            :cols="cols"
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
            v-if="autofit"
            ref="placeholderRef"
            class="ui-v1-textbox__placeholder"
        >
            {{ placeholder }}
        </span>

        <button
            v-if="clearable && String(value)"
            type="button"
            class="ui-v1-textbox__eraser"
            :disabled="disabled || readonly"
            :aria-controls="id ?? uid"
            :aria-label="i18n.t('clear')"
            @click="clear"
        >
            <IconClearCircle
                aria-hidden="true"
            />
        </button>

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
            <slot name="suffix">{{ suffix }}</slot>
        </span>
    </span>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type {
  UiTextboxInputAttributes,
  UiTextboxMethods,
} from '@/common/components/textbox'
import type { WidthValue } from '@/common/components/width'

import { computed } from 'vue'
import { inject } from 'vue'
import { nextTick } from 'vue'
import { onMounted } from 'vue'
import { shallowRef } from 'vue'
import { useId } from 'vue'
import { watch } from 'vue'

import IconClearCircle from '../../../../assets/sprites/actions/clear-circle.svg'

import { decimalsOf } from '@/common/components/textbox'
import { isMaxDecimalsExceeded } from '@/common/components/textbox'
import { isWidth } from '@/common/components/width'
import { isWidthExact } from '@/common/components/width'
import { normalizeWidth } from '@/common/components/width'
import { sanitizeDecimal } from '@/common/components/textbox'
import { sanitizeNumeric } from '@/common/components/textbox'
import { useElementRef } from '@/host/composables'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { INPUTMODE } from '@/common/components/textbox'
import { SIZE } from '@/common/components/textbox'
import { TYPE } from '@/common/components/textbox'
import { WIDTH } from '@/common/components/width'

import _i18n from './i18n'

const KEYS_MANIPULATORS = ['Backspace', 'Delete', 'Enter', 'ArrowLeft', 'ArrowRight']
const KEYS_MODIFIERS = ['Alt', 'CapsLock', 'Control', 'Shift', 'Meta']
const IS_DESKTOP_SAFARI = typeof navigator !== 'undefined'
  && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

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

  /** Ширина поля. fit — по содержимому, fluid — на всю ширину контейнера */
  width: {
    type: [Number, String] as PropType<WidthValue>,
    validator: isWidth,
    default: WIDTH.FIT,
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

  /** Нативный атрибут HTMLTextAreaElement */
  rows: {
    type: [Number, String],
    validator: (value: unknown) => !isNaN(Number(value)),
    default: 2,
  },

  /** Нативный атрибут HTMLTextAreaElement */
  cols: {
    type: [Number, String],
    validator: (value: unknown) => !isNaN(Number(value)),
    default: 20,
  },

  /** Стиль поля – с рамкой или без */
  outlined: {
    type: Boolean,
    default: true,
  },

  /** Автоматическое изменение ширины при вводе */
  autofit: {
    type: Boolean,
    default: false,
  },

  /** Дополнительные атрибуты нативного input|textarea */
  inputAttributes: {
    type: Object as unknown as PropType<UiTextboxInputAttributes>,
    default: () => ({}),
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
const style = computed<CSSProperties>(() => {
  const width = normalizeWidth(props.width)

  return isWidthExact(props.width) && width
    ? { width }
    : {}
})

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

  void adjustWidth()
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

  void adjustWidth()
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
const textbox = shallowRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
const placeholderRef = shallowRef<HTMLElement | null>(null)

const getInputScrollWidth = () => {
  const el = textbox.value

  if (!el) {
    return 0
  }

  let width = el.scrollWidth

  if (IS_DESKTOP_SAFARI) {
    const style = getComputedStyle(el)
    const pl = parseFloat(style.paddingLeft) || 0
    const pr = parseFloat(style.paddingRight) || 0

    width += pl + pr
  }

  return width + 1
}

const getInputMaxWidth = () => {
  const el = root.value
  if (!el) {
    return Infinity
  }

  const maxWidth = getComputedStyle(el).maxWidth
  if (maxWidth.endsWith('px')) {
    const parsed = parseFloat(maxWidth)

    return isNaN(parsed)
      ? Infinity
      : parsed
  }

  return Infinity
}

const adjustWidth = async () => {
  const el = textbox.value
  if (!el) return

  if (!props.autofit) {
    el.style.width = ''
    el.style.minWidth = ''

    return
  }

  el.style.transition = 'none'
  el.style.width = '0px'
  el.style.minWidth = '0px'

  await nextTick()

  const scrollWidth = getInputScrollWidth()
  const placeholderWidth = (placeholderRef.value?.clientWidth ?? 0) + 1
  const maxWidth = getInputMaxWidth()
  const targetWidth = Math.max(scrollWidth, placeholderWidth)
  let width = Number.isFinite(maxWidth)
    ? Math.min(targetWidth, maxWidth)
    : targetWidth

  el.style.minWidth = `${Math.ceil(Math.min(placeholderWidth, width))}px`
  el.style.width = `${Math.ceil(width)}px`

  // A small correction pass removes premature inner scrolling due to subpixel
  // rounding and browser-specific width calculations.
  for (let i = 0; i < 2; i++) {
    if (el.clientWidth <= 0) {
      break
    }

    const overflow = el.scrollWidth - el.clientWidth
    if (overflow <= 0) {
      break
    }

    width = Number.isFinite(maxWidth)
      ? Math.min(width + overflow + 1, maxWidth)
      : width + overflow + 1

    el.style.minWidth = `${Math.ceil(Math.min(placeholderWidth, width))}px`
    el.style.width = `${Math.ceil(width)}px`
  }

  // Required for Safari to apply width changes in the same frame.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetWidth
  el.style.transition = ''
}

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

  await adjustWidth()
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

  void adjustWidth()
})

watch(() => props.value, (value) => {
  void adjustWidth()

  if (!isDecimal.value || typeof value !== 'string' || !value.includes(',')) return

  const converted = value.replace(/,/g, '.')
  if (/^-?\d*(?:\.\d*)?$/.test(converted)) {
    emit('update:value', converted)
  }
}, { immediate: true })

watch(() => props.autofit, () => {
  void adjustWidth()
})

watch(() => props.placeholder, () => {
  void adjustWidth()
})
</script>

<style lang="less" src="./textbox.less" />

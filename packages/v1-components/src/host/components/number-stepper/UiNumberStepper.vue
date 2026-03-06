<template>
    <div
        :id="`${stepperId}-root`"
        :class="{
            'ui-v1-number-stepper': true,
            'ui-v1-number-stepper_horizontal': direction === DIRECTION.HORIZONTAL,
            'ui-v1-number-stepper_vertical': direction === DIRECTION.VERTICAL,
            'ui-v1-number-stepper_outlined': outlined,
            'ui-v1-number-stepper_inline': !outlined,
            'ui-v1-number-stepper_disabled': disabled,
            'ui-v1-number-stepper_readonly': readonly,
        }"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-readonly="readonly ? 'true' : 'false'"
        role="group"
        v-bind="$attrs"
    >
        <button
            :id="`${stepperId}-decrease`"
            :aria-controls="stepperId"
            :aria-label="decreaseLabel"
            :disabled="!canDecrease"
            class="ui-v1-number-stepper__button ui-v1-number-stepper__button_decrease"
            tabindex="-1"
            type="button"
            @click="decrease"
        >
            <IconRemove
                v-if="direction === DIRECTION.HORIZONTAL"
                aria-hidden="true"
                class="ui-v1-number-stepper__icon"
            />

            <IconCaretDown
                v-else
                aria-hidden="true"
                class="ui-v1-number-stepper__icon"
            />
        </button>

        <UiTextbox
            v-bind="resolvedTextboxOptions"
            :id="stepperId"
            ref="textbox"
            :value="model"
            :size="size"
            :outlined="outlined"
            :autofit="!outlined"
            :clearable="false"
            :readonly="readonly"
            :disabled="disabled"
            :required="required"
            :invalid="hasViolations"
            :input-attributes="spinbuttonAttributes"
            class="ui-v1-number-stepper__input"
            @update:value="onTextboxValue"
            @focus="onTextboxFocus"
            @blur="onTextboxBlur"
            @keydown="onTextboxKeydown"
        />

        <button
            :id="`${stepperId}-increase`"
            :aria-controls="stepperId"
            :aria-label="increaseLabel"
            :disabled="!canIncrease"
            class="ui-v1-number-stepper__button ui-v1-number-stepper__button_increase"
            tabindex="-1"
            type="button"
            @click="increase"
        >
            <IconAdd
                v-if="direction === DIRECTION.HORIZONTAL"
                aria-hidden="true"
                class="ui-v1-number-stepper__icon"
            />

            <IconCaretUp
                v-else
                aria-hidden="true"
                class="ui-v1-number-stepper__icon"
            />
        </button>
    </div>
</template>

<script lang="ts" setup>
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type {
  UiNumberStepperMethods,
  UiNumberStepperProperties,
  ViolationPayload,
} from '@/common/components/number-stepper'

import {
  computed,
  inject,
  ref,
  useId,
  watch,
} from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import IconCaretUp from '~assets/sprites/arrows/caret-up.svg'
import IconRemove from '~assets/sprites/actions/remove.svg'

import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { clampValue } from '@/common/components/number-stepper'
import { decimalsOf } from '@/common/components/textbox'
import {
  defaultValueOnEmpty,
  DIRECTION,
  normalizeByDecimals,
  normalizeRange,
  parseDecimals,
} from '@/common/components/number-stepper'
import { sanitizeDecimal, SIZE } from '@/common/components/textbox'
import { toNumber, VIOLATION, violationsOf } from '@/common/components/number-stepper'

import _i18n from './i18n'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  id: {
    type: null as unknown as PropType<UiNumberStepperProperties['id']>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  value: {
    type: null as unknown as PropType<UiNumberStepperProperties['value']>,
    default: null,
  },

  min: {
    type: null as unknown as PropType<UiNumberStepperProperties['min']>,
    validator: (value: unknown) => !isNaN(Number(value)),
    default: -Infinity,
  },

  max: {
    type: null as unknown as PropType<UiNumberStepperProperties['max']>,
    validator: (value: unknown) => !isNaN(Number(value)),
    default: Infinity,
  },

  step: {
    type: null as unknown as PropType<UiNumberStepperProperties['step']>,
    validator: (value: unknown) => !isNaN(Number(value)) && Number(value) > 0,
    default: 1,
  },

  decimals: {
    type: [Number, String] as unknown as PropType<UiNumberStepperProperties['decimals']>,
    validator: (value: unknown) => value === '*' || !isNaN(Number(value)),
    default: '*' as const,
  },

  clamp: {
    type: Boolean,
    default: true,
  },

  nullable: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  readonly: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },

  direction: {
    type: String as unknown as PropType<DIRECTION | `${DIRECTION}`>,
    validator: (value: string) => Object.values(DIRECTION).includes(value as DIRECTION),
    default: DIRECTION.HORIZONTAL,
  },

  size: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    validator: (value: string) => Object.values(SIZE).includes(value as SIZE),
    default: SIZE.SM,
  },

  outlined: {
    type: Boolean,
    default: true,
  },

  textboxOptions: {
    type: Object as unknown as PropType<UiNumberStepperProperties['textboxOptions']>,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  'update:value': [value: number | null];
  'change': [value: number | null];
  'increase': [value: number | null];
  'decrease': [value: number | null];
  'focus': [event: FocusEvent];
  'blur': [event: Event];
  'violation': [payload: ViolationPayload];
}>()

const uid = 'embed-ui-' + useId()
const stepperId = computed(() => props.id ?? uid)

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const textbox = ref<InstanceType<typeof UiTextbox> | null>(null)
const model = ref('')
const violations = ref<VIOLATION[]>([])

const range = computed(() => normalizeRange(props.min ?? -Infinity, props.max ?? Infinity))
const minValue = computed(() => range.value[0])
const maxValue = computed(() => range.value[1])

const stepValue = computed(() => {
  const resolved = toNumber(props.step)

  return resolved === null || resolved <= 0
    ? 1
    : resolved
})

const decimalsResolved = computed(() => parseDecimals(props.decimals))
const allowNegative = computed(() => !Number.isFinite(minValue.value) || minValue.value < 0)

const resolvedTextboxOptions = computed(() => props.textboxOptions ?? {})

const currentValue = computed(() => toNumber(model.value))
const hasViolations = computed(() => violations.value.length > 0)

const increaseLabel = computed(() => i18n.value.t('increaseBy', { step: stepValue.value }))
const decreaseLabel = computed(() => i18n.value.t('decreaseBy', { step: stepValue.value }))

const canIncrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false
  }

  if (!props.clamp || !Number.isFinite(maxValue.value)) {
    return true
  }

  const value = currentValue.value
  const fallback = defaultValueOnEmpty(props.nullable, minValue.value, maxValue.value)
  const base = value ?? fallback

  return base === null || base < maxValue.value
})

const canDecrease = computed(() => {
  if (props.disabled || props.readonly) {
    return false
  }

  if (!props.clamp || !Number.isFinite(minValue.value)) {
    return true
  }

  const value = currentValue.value
  const fallback = defaultValueOnEmpty(props.nullable, minValue.value, maxValue.value)
  const base = value ?? fallback

  return base === null || base > minValue.value
})

const spinbuttonAttributes = computed(() => ({
  role: 'spinbutton',
  inputmode: 'decimal',
  'aria-valuenow': currentValue.value === null ? undefined : String(currentValue.value),
  'aria-valuemin': Number.isFinite(minValue.value) ? String(minValue.value) : undefined,
  'aria-valuemax': Number.isFinite(maxValue.value) ? String(maxValue.value) : undefined,
  'aria-invalid': hasViolations.value ? 'true' : 'false',
  'aria-readonly': props.readonly ? 'true' : 'false',
  'aria-required': props.required ? 'true' : 'false',
  'aria-label': i18n.value.t('label'),
}))

const toModelString = (value: number | null): string => {
  return value === null
    ? ''
    : String(value)
}

const roundForStep = (value: number, previous: number): number => {
  if (decimalsResolved.value !== '*') {
    return Number(value.toFixed(decimalsResolved.value))
  }

  const precision = Math.max(
    decimalsOf(stepValue.value),
    decimalsOf(previous)
  )

  return Number(value.toFixed(precision))
}

const normalizeCandidate = (
  candidate: number | null,
  options: {
    preserveRaw?: string;
    includeNan?: boolean;
  } = {}
): {
  value: number | null;
  display: string;
  codes: VIOLATION[];
} => {
  if (candidate === null) {
    const value = defaultValueOnEmpty(props.nullable, minValue.value, maxValue.value)

    return {
      value,
      display: toModelString(value),
      codes: options.includeNan ? [VIOLATION.NAN] : [],
    }
  }

  const normalized = normalizeByDecimals(candidate, decimalsResolved.value)

  if (props.clamp) {
    const value = clampValue(normalized, minValue.value, maxValue.value)

    return {
      value,
      display: toModelString(value),
      codes: [],
    }
  }

  const codes = violationsOf(normalized, minValue.value, maxValue.value)

  return {
    value: normalized,
    display: options.preserveRaw ?? toModelString(normalized),
    codes,
  }
}

const report = (value: number | null, codes: VIOLATION[]) => {
  const payload: ViolationPayload = {
    value,
    codes,
  }

  violations.value = [...codes]
  emit('violation', payload)
}

const emitValue = (value: number | null) => {
  emit('update:value', value)
  emit('change', value)
}

const applyTextValue = (input: string, preserveRaw = false) => {
  const sanitized = sanitizeDecimal(input, allowNegative.value, decimalsResolved.value)
  const parsed = toNumber(sanitized)
  const includeNan = sanitized.trim().length > 0 && parsed === null

  const resolved = normalizeCandidate(parsed, {
    includeNan,
    preserveRaw: preserveRaw ? sanitized : undefined,
  })

  model.value = resolved.display
  report(resolved.value, resolved.codes)
  emitValue(resolved.value)
}

const applyNumericValue = (
  candidate: number,
  mode: 'increase' | 'decrease' | null
) => {
  const resolved = normalizeCandidate(candidate)

  model.value = resolved.display
  report(resolved.value, resolved.codes)
  emitValue(resolved.value)

  if (mode === 'increase') {
    emit('increase', resolved.value)
  }

  if (mode === 'decrease') {
    emit('decrease', resolved.value)
  }
}

const baseValue = (): number => {
  const current = currentValue.value

  if (current !== null) {
    return current
  }

  const fallback = defaultValueOnEmpty(props.nullable, minValue.value, maxValue.value)
  return fallback ?? 0
}

const increase = () => {
  if (!canIncrease.value) {
    return
  }

  const previous = baseValue()
  const next = roundForStep(previous + stepValue.value, previous)

  applyNumericValue(next, 'increase')
}

const decrease = () => {
  if (!canDecrease.value) {
    return
  }

  const previous = baseValue()
  const next = roundForStep(previous - stepValue.value, previous)

  applyNumericValue(next, 'decrease')
}

const setBoundaryValue = (key: 'min' | 'max') => {
  const value = key === 'min'
    ? minValue.value
    : maxValue.value

  if (!Number.isFinite(value)) {
    return
  }

  applyNumericValue(value, null)
}

const stepByMultiplier = (multiplier: number) => {
  if (props.disabled || props.readonly) {
    return
  }

  const previous = baseValue()
  const next = roundForStep(previous + stepValue.value * multiplier, previous)

  applyNumericValue(next, null)
}

const onTextboxValue = (value: string | number) => {
  applyTextValue(String(value), !props.clamp)
}

const onTextboxKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      increase()
      return

    case 'ArrowDown':
      event.preventDefault()
      decrease()
      return

    case 'PageUp':
      event.preventDefault()
      stepByMultiplier(10)
      return

    case 'PageDown':
      event.preventDefault()
      stepByMultiplier(-10)
      return

    case 'Home':
      event.preventDefault()
      setBoundaryValue('min')
      return

    case 'End':
      event.preventDefault()
      setBoundaryValue('max')
      return

    case 'Enter':
      applyTextValue(model.value)
      return

    default:
      return
  }
}

const onTextboxFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const onTextboxBlur = (event: Event) => {
  applyTextValue(model.value)
  emit('blur', event)
}

const syncFromExternal = (value: UiNumberStepperProperties['value']) => {
  if (value === null || value === undefined || `${value}`.trim() === '') {
    model.value = ''
    violations.value = []
    return
  }

  const numeric = toNumber(value)
  if (numeric === null) {
    model.value = ''
    violations.value = []
    return
  }

  const resolved = normalizeCandidate(numeric)

  model.value = resolved.display
  violations.value = [...resolved.codes]
}

watch(() => props.value, syncFromExternal, { immediate: true })
watch(() => [props.min, props.max, props.decimals, props.clamp, props.nullable], () => syncFromExternal(props.value))

defineExpose<UiNumberStepperMethods>({
  focus: () => textbox.value?.focus(),
  blur: () => textbox.value?.blur(),
  increase,
  decrease,
})
</script>

<style lang="less" src="./number-stepper.less" />

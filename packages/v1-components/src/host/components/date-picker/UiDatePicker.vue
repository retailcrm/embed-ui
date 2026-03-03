<template>
    <span
        :id="boxId"
        ref="trigger"
        :aria-controls="popperId"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-expanded="showCalendar ? 'true' : 'false'"
        :aria-haspopup="'dialog'"
        :aria-readonly="readonly ? 'true' : 'false'"
        class="ui-v1-date-picker"
        role="combobox"
        v-bind="$attrs"
        @mousedown="onTriggerMouseDown"
    >
        <span
            v-if="$slots['trigger']"
            @click="toggle"
        >
            <slot name="trigger" />
        </span>

        <UiTextbox
            v-else
            :id="inputId"
            ref="textbox"
            :clearable="hasFormattedValue && !readonly && !disabled"
            :value="formatted"
            :placeholder="placeholder"
            :active="showCalendar"
            :disabled="disabled"
            :readonly="readonly"
            v-bind="resolvedTextboxOptions"
            class="ui-v1-date-picker__trigger"
            @focus="open"
            @keydown="onTextboxKeydown"
            @clear="reset"
        >
            <template v-if="$slots['leading-icon']" #leading-icon>
                <slot name="leading-icon" />
            </template>

            <template #trailing-icon>
                <slot name="trailing-icon">
                    <IconCalendar
                        aria-hidden="true"
                        class="ui-v1-date-picker__icon"
                    />
                </slot>
            </template>
        </UiTextbox>

        <UiPopper
            :id="popperId"
            :visible="showCalendar"
            :target="triggerTarget"
            :global-triggers="[]"
            :container="container"
            :placement="resolvedPlacement"
            :aria-hidden="showCalendar ? 'false' : 'true'"
            :class="['ui-v1-date-picker__popper', popperClass]"
            :disabled="disabled || readonly"
            v-bind="resolvedPopperOptions"
            role="dialog"
            @update:visible="onVisibleChange"
        >
            <div
                :id="popperContentId"
                ref="popperContent"
                class="ui-v1-date-picker__popper-content"
                @click.stop
            >
                <UiDatePickerQuickMenu
                    v-if="quickOptions.length > 0"
                    :value="view"
                    :items="quickOptions"
                    :nullable="nullable"
                    @change="onQuickChange"
                />

                <div class="ui-v1-date-picker__workspace">
                    <UiCalendar
                        ref="calendar"
                        :value="view"
                        :appearance="calendarAppearance"
                        :type="calendarType"
                        :max-date="maxDate"
                        :min-date="minDate"
                        :locale="locale"
                        :first-day-of-week="firstDayOfWeek ?? undefined"
                        :nullable="nullable"
                        @change="onCalendarChange"
                    />

                    <div
                        v-if="synchronization === SYNCHRONIZATION.CONFIRMED"
                        :class="{
                            'ui-v1-date-picker__footer': true,
                            'ui-v1-date-picker__footer_horizontal': appearance === APPEARANCE.DOUBLE,
                        }"
                    >
                        <div class="ui-v1-date-picker__action">
                            <UiButton
                                appearance="tertiary"
                                class="ui-v1-date-picker__button"
                                @click="reset"
                            >
                                {{ i18n.t('clear') }}
                            </UiButton>

                            <UiButton
                                class="ui-v1-date-picker__button"
                                @click="apply"
                            >
                                {{ i18n.t('apply') }}
                            </UiButton>
                        </div>
                    </div>
                </div>
            </div>
        </UiPopper>
    </span>
</template>

<script lang="ts" setup>
import type { Alignment } from '@floating-ui/dom'
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type { Side } from '@floating-ui/dom'
import type { UiCalendarMethods } from '@/common/components/calendar'
import type { UiDatePickerMethods } from '@/common/components/date-picker'
import type { UiTextboxProperties } from '@/common/components/textbox'

import type { Locale } from '@/common/components/date'
import type { PlacementOptions } from '@/common/components/popper'
import type { QuickDate, QuickOption } from '@/common/components/date-picker'

import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useSlots,
  watch,
} from 'vue'

import IconCalendar from '~assets/sprites/actions/calendar.svg'

import UiButton from '@/host/components/button/UiButton.vue'
import UiCalendar from '@/host/components/calendar/UiCalendar.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import UiDatePickerQuickMenu from './UiDatePickerQuickMenu.vue'

import { APPEARANCE } from '@/common/components/calendar'
import { formatDateValue } from '@/common/components/date-picker'
import { I18nInjectKey } from '@/host/i18n/plugin'
import { isDate, isDateArray, isDateValid } from '@/common/components/calendar'
import { isPlacementLiteral, isPlacementOptions } from '@/common/components/popper'
import {
  isQuickDateEqual,
  normalizeDate,
  normalizeDateRange,
  normalizeQuickDate,
} from '@/common/components/date-picker'
import { omit } from '@/common/utils'
import { sortDates } from '@/common/components/calendar'
import { SYNCHRONIZATION } from '@/common/components/date-picker'
import { TYPE } from '@/common/components/calendar'

import _i18n from './i18n'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  value: {
    type: null as unknown as PropType<Date | Date[] | null>,
    validator: (value: unknown) => value === null || isDate(value) || isDateArray(value),
    default: null,
  },

  maxDate: {
    type: null as unknown as PropType<Date | null>,
    validator: (value: unknown) => value === null || isDate(value),
    default: null,
  },

  minDate: {
    type: null as unknown as PropType<Date | null>,
    validator: (value: unknown) => value === null || isDate(value),
    default: null,
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

  type: {
    type: String as unknown as PropType<TYPE | `${TYPE}`>,
    validator: (type: string) => Object.values(TYPE).includes(type as TYPE),
    default: TYPE.SINGLE,
  },

  appearance: {
    type: String as unknown as PropType<APPEARANCE | `${APPEARANCE}`>,
    validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    default: APPEARANCE.SINGLE,
  },

  synchronization: {
    type: String as unknown as PropType<SYNCHRONIZATION | `${SYNCHRONIZATION}`>,
    validator: (value: string) => Object.values(SYNCHRONIZATION).includes(value as SYNCHRONIZATION),
    default: SYNCHRONIZATION.INSTANT,
  },

  firstDayOfWeek: {
    type: null as unknown as PropType<number | null>,
    validator: (value: unknown) => value === null
      || typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 6,
    default: null,
  },

  format: {
    type: Function as unknown as PropType<((date: Date, omitYear?: boolean) => string) | null>,
    default: null,
  },

  omitYear: {
    type: Boolean,
    default: false,
  },

  placeholder: {
    type: String,
    default: '',
  },

  container: {
    type: null as unknown as PropType<string | null>,
    validator: (value: unknown) => value === null || typeof value === 'string',
    default: null,
  },

  placement: {
    type: [String, Object] as PropType<Side | `${Side}-${Alignment}` | PlacementOptions>,
    validator: (value: unknown) => isPlacementLiteral(value) || isPlacementOptions(value),
    default: 'bottom',
  },

  popperClass: {
    type: null as unknown as PropType<string | null>,
    default: null,
  },

  popperOptions: {
    type: Object,
    default: () => ({}),
  },

  quickOptions: {
    type: Array as unknown as PropType<QuickOption[]>,
    validator: (items: unknown) => {
      return Array.isArray(items) && items.every((item) => {
        return typeof item === 'object'
          && item !== null
          && 'label' in item
          && typeof item.label === 'string'
          && 'value' in item
          && (isDate(item.value) || isDateArray(item.value))
      })
    },
    default: () => [],
  },

  textboxOptions: {
    type: Object as unknown as PropType<Partial<UiTextboxProperties>>,
    default: () => ({}),
  },

  locale: {
    type: null as unknown as PropType<Locale | undefined>,
    validator: (value) => typeof value === 'undefined' || ['en-GB', 'es-ES', 'ru-RU'].includes(value as Locale),
    default: undefined,
  },
})

const emit = defineEmits([
  'open',
  'close',
  'change',
  'update:value',
])

const uid = useId()
const boxId = computed(() => props.id ?? uid)
const inputId = computed(() => `${boxId.value}-input`)
const popperId = computed(() => `${boxId.value}-popper`)
const popperContentId = computed(() => `${boxId.value}-content`)

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const trigger = ref<HTMLElement | null>(null)
const popperContent = ref<HTMLElement | null>(null)
const textbox = ref<InstanceType<typeof UiTextbox> | null>(null)
const calendar = ref<InstanceType<typeof UiCalendar> | null>(null)
const slots = useSlots()

const triggerTarget = computed(() => trigger)
const calendarAppearance = computed(() => props.appearance as APPEARANCE)
const calendarType = computed(() => props.type as TYPE)
const resolvedPlacement = computed(() => props.placement as Side | `${Side}-${Alignment}` | PlacementOptions)

const showCalendar = ref(false)
const view = ref<QuickDate>(normalizeQuickDate(props.value))

const resolvedTextboxOptions = computed(() => omit(
  props.textboxOptions,
  ['id', 'value', 'placeholder', 'clearable', 'disabled', 'readonly', 'active']
))

const resolvedPopperOptions = computed(() => omit(
  props.popperOptions,
  ['visible', 'target', 'targetTriggers', 'popperTriggers', 'globalTriggers', 'container', 'placement']
))

const formatDate = (date: Date): string => {
  return props.format
    ? props.format(date, props.omitYear)
    : formatDateValue(date, props.omitYear, props.locale)
}

const formatted = computed((): string => {
  if (props.value === null) {
    return ''
  }

  if (isDateArray(props.value)) {
    const normalized = normalizeDateRange(props.value)

    if (normalized.length === 0) {
      return ''
    }

    if (normalized.length === 1) {
      return formatDate(normalized[0])
    }

    const [first, last] = sortDates(normalized)
    if (!first || !last) {
      return ''
    }

    return `${formatDate(first)} - ${formatDate(last)}`
  }

  if (isDate(props.value) && isDateValid(props.value)) {
    const normalized = normalizeDate(props.value)
    return normalized ? formatDate(normalized) : ''
  }

  return ''
})

const hasFormattedValue = computed(() => formatted.value.length > 0)
const synchronizationIsInstant = computed(() => props.synchronization === SYNCHRONIZATION.INSTANT)

const open = (): void => {
  if (props.disabled || props.readonly || showCalendar.value) {
    return
  }

  showCalendar.value = true
  emit('open')
}

const close = (): void => {
  if (!showCalendar.value) {
    return
  }

  showCalendar.value = false
  emit('close')
}

const completeRange = () => {
  if (!isDateArray(view.value) || view.value.length !== 1) {
    return
  }

  const [first] = normalizeDateRange(view.value)
  if (!first) {
    return
  }

  const last = new Date(first)
  last.setHours(23, 59, 59, 999)

  view.value = [first, last]
}

const submit = () => {
  if (view.value === null) {
    emit('change', null)
    emit('update:value', null)
    return
  }

  if (isDate(view.value)) {
    const date = normalizeDate(view.value)
    emit('change', date)
    emit('update:value', date)
    return
  }

  const range = normalizeDateRange(view.value)
  emit('change', range.length > 0 ? range : null)
  emit('update:value', range.length > 0 ? range : null)
}

const toggle = (): void => {
  if (!showCalendar.value) {
    open()
    return
  }

  if (synchronizationIsInstant.value && props.type === TYPE.RANGE && isDateArray(view.value)) {
    completeRange()
    submit()
  }

  close()
  textbox.value?.blur()
}

const reset = (): void => {
  view.value = null

  emit('change', null)
  emit('update:value', null)

  textbox.value?.focus()
}

const apply = (): void => {
  if (props.type === TYPE.RANGE && isDateArray(view.value)) {
    completeRange()
  }

  submit()
  close()
}

defineExpose({
  open,
  close,
  toggle,
} satisfies UiDatePickerMethods)

const onCalendarChange = (date: Date | Date[] | null): void => {
  if (synchronizationIsInstant.value && (date === null || isDateArray(date) && date.length === 0)) {
    reset()
    return
  }

  const normalized = normalizeQuickDate(date)
  view.value = normalized

  if (synchronizationIsInstant.value) {
    submit()

    const shouldClose = props.type === TYPE.RANGE
      ? isDateArray(normalized) && normalized.length === 2
      : isDate(normalized)

    if (shouldClose) {
      close()
    }
  }

  if (normalized !== null) {
    if (isDate(normalized)) {
      ;(calendar.value as unknown as UiCalendarMethods | null)?.viewTo(normalized)
    } else if (normalized.length > 0) {
      ;(calendar.value as unknown as UiCalendarMethods | null)?.viewTo(...normalized)
    }
  }
}

const onQuickChange = (date: QuickDate): void => onCalendarChange(
  date === null
    ? null
    : isDate(date)
      ? new Date(date)
      : date.map((item) => new Date(item))
)

const onTriggerMouseDown = (event: MouseEvent): void => {
  if (event.button !== 0 || props.disabled || props.readonly || 'trigger' in slots) {
    return
  }

  const target = event.target as Node | null
  const triggerElement = trigger.value

  if (!target || !triggerElement?.contains(target)) {
    return
  }

  if ((event.target as HTMLElement | null)?.closest('.ui-v1-textbox__eraser')) {
    return
  }

  toggle()
}

const onTextboxKeydown = (event: KeyboardEvent): void => {
  if (props.disabled || props.readonly) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()

    if (showCalendar.value && props.synchronization === SYNCHRONIZATION.CONFIRMED) {
      apply()
      return
    }

    open()
    return
  }

  if ((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === ' ') && !showCalendar.value) {
    event.preventDefault()
    open()
  }
}

const onVisibleChange = (visible: boolean): void => {
  if (!visible) {
    close()
  }
}

const onGlobalTap = (event: MouseEvent | TouchEvent) => {
  if (!showCalendar.value) {
    return
  }

  const target = event.target as Node | null
  if (!target) {
    return
  }

  if (trigger.value?.contains(target) || popperContent.value?.contains(target)) {
    return
  }

  if (synchronizationIsInstant.value && props.type === TYPE.RANGE && isDateArray(view.value)) {
    completeRange()
    submit()
  }

  close()
}

watch(() => props.value, (value) => {
  const normalized = normalizeQuickDate(value)

  if (!isQuickDateEqual(normalized, view.value)) {
    view.value = normalized
  }
})

watch(showCalendar, (opened) => {
  if (!opened || view.value === null) {
    return
  }

  if (isDate(view.value)) {
    ;(calendar.value as unknown as UiCalendarMethods | null)?.viewTo(view.value)
    return
  }

  if (view.value.length > 0) {
    ;(calendar.value as unknown as UiCalendarMethods | null)?.viewTo(...view.value)
  }
})

onMounted(() => {
  document.body.addEventListener('click', onGlobalTap)
  document.body.addEventListener('touchstart', onGlobalTap)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', onGlobalTap)
  document.body.removeEventListener('touchstart', onGlobalTap)
})
</script>

<style lang="less" src="./date-picker.less" />

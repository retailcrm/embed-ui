<template>
    <div
        :id="boxId"
        ref="root"
        :aria-activedescendant="expanded && activeOptionId ? activeOptionId : undefined"
        :aria-controls="listboxId"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-haspopup="'listbox'"
        :aria-label="i18n.t('time')"
        :aria-readonly="readonly ? 'true' : 'false'"
        :class="{
            'ui-v1-time-picker': true,
            'ui-v1-time-picker_disabled': disabled,
            'ui-v1-time-picker_readonly': readonly,
        }"
        role="combobox"
        v-bind="$attrs"
        @mousedown="onRootMouseDown"
    >
        <UiTextbox
            :id="inputId"
            ref="textbox"
            :value="value"
            :placeholder="placeholder"
            :clearable="Boolean(value) && !readonly && !disabled"
            :disabled="disabled"
            :readonly="readonly"
            v-bind="resolvedTextboxOptions"
            class="ui-v1-time-picker__input"
            @input="onInput"
            @keydown="onKeyDown"
            @focus="onFocus"
            @blur="onBlur"
            @clear="onClear"
        >
            <template #trailing-icon>
                <slot
                    v-if="showClockIcon"
                    name="trailing-icon"
                >
                    <IconTime
                        aria-hidden="true"
                        class="ui-v1-time-picker__icon"
                    />
                </slot>
            </template>
        </UiTextbox>

        <UiPopper
            :id="listboxId"
            :visible="expanded"
            :target="rootTarget"
            :global-triggers="[]"
            :container="container"
            :aria-hidden="expanded ? 'false' : 'true'"
            :disabled="disabled || readonly"
            :style="menuStyle"
            class="ui-v1-time-picker__menu"
            role="listbox"
            @update:visible="onVisibleChange"
            @attached="onPopperAttached"
        >
            <UiScrollBox
                ref="scrollable"
                class="ui-v1-time-picker__list"
            >
                <UiMenuItem
                    v-for="(time, index) in variants"
                    :id="optionId(index)"
                    :key="`${time}-${index}`"
                    :ref="addItemRef(index)"
                    :active="activeTime === time"
                    :aria-selected="value === time ? 'true' : 'false'"
                    :data-time="time"
                    :class="{
                        'ui-v1-time-picker__item': true,
                        'ui-v1-time-picker__item_selected': value === time,
                    }"
                    role="option"
                    @mouseenter="activeTime = time"
                    @mousedown.prevent="select(time)"
                >
                    {{ time }}
                </UiMenuItem>

                <div
                    v-if="!variants.length"
                    aria-disabled="true"
                    class="ui-v1-time-picker__empty"
                    role="option"
                >
                    {{ i18n.t('empty') }}
                </div>
            </UiScrollBox>
        </UiPopper>
    </div>
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type { UiTextboxProperties } from '@/common/components/textbox'
import type { UiTimePickerMethods } from '@/common/components/time-picker'

import {
  computed,
  inject,
  nextTick,
  ref,
  useId,
  watch,
} from 'vue'

import IconTime from '~assets/sprites/actions/time.svg'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'
import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { omit } from '@/common/utils'

import { I18nInjectKey } from '@/host/i18n/plugin'

import {
  isValid,
  isValidTimeArray,
  nearest,
  normalize,
  parse,
  sanitize,
  timeOf,
  timeVariants as buildTimeVariants,
} from '@/common/components/time-picker'

import _i18n from './i18n'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Уникальный идентификатор */
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  /** Время в формате hh:mm */
  value: {
    type: String,
    default: '',
  },

  /** Плейсхолдер поля ввода */
  placeholder: {
    type: String,
    default: '__:__',
  },

  /** Шаг вариантов времени в минутах */
  interval: {
    type: Number,
    validator: (interval: number) => interval > 0 && Number.isInteger(interval),
    default: 30,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Только чтение */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** Контейнер для popper */
  container: {
    type: null as unknown as PropType<string | null>,
    validator: (value: unknown) => value === null || typeof value === 'string',
    default: null,
  },

  /** Свой набор вариантов времени */
  timeVariants: {
    type: Array as unknown as PropType<string[]>,
    validator: (items: string[]) => items.every((time) => isValid(time)),
    default: () => [],
  },

  /** Дополнительные настройки поля ввода */
  textboxOptions: {
    type: Object as unknown as PropType<Partial<UiTextboxProperties>>,
    default: () => ({}),
  },

  /** Минимальное время [hours, minutes] */
  minTime: {
    type: null as unknown as PropType<[number, number] | null>,
    validator: (value: unknown) => value === null || isValidTimeArray(value),
    default: null,
  },

  /** Максимальное время [hours, minutes] */
  maxTime: {
    type: null as unknown as PropType<[number, number] | null>,
    validator: (value: unknown) => value === null || isValidTimeArray(value),
    default: null,
  },
})

const emit = defineEmits([
  'change',
  'update:value',
  'focus',
  'blur',
])

const uid = useId()
const boxId = computed(() => props.id ?? uid)
const inputId = computed(() => `${boxId.value}-input`)
const listboxId = computed(() => `${boxId.value}-listbox`)

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const root = ref<HTMLElement | null>(null)
const rootTarget = computed(() => root)
const textbox = ref<InstanceType<typeof UiTextbox> | null>(null)
const scrollable = ref<InstanceType<typeof UiScrollBox> | null>(null)

const expanded = ref(false)
const oldValue = ref(props.value)
const position = ref(0)
const activeTime = ref('')
const menuWidth = ref(120)

const items = new Map<number, HTMLElement>()

const resolvedTextboxOptions = computed(() => omit(
  props.textboxOptions,
  ['id', 'value', 'placeholder', 'clearable', 'disabled', 'readonly']
))

const variants = computed((): string[] => {
  if (props.timeVariants.length) {
    return props.timeVariants.filter((time) => isValid(time))
  }

  return buildTimeVariants(props.interval, props.minTime, props.maxTime)
})

const activeOptionId = computed(() => {
  const index = variants.value.indexOf(activeTime.value)
  return index >= 0 ? optionId(index) : undefined
})

const menuStyle = computed(() => ({ width: `${menuWidth.value}px` }))
const showClockIcon = computed(() => !props.value || props.readonly || props.disabled)

const optionId = (index: number): string => `${listboxId.value}-option-${index}`

const asElement = (componentOrElement: ComponentPublicInstance | Element): HTMLElement | null => {
  if (componentOrElement instanceof HTMLElement) {
    return componentOrElement
  }

  const element = (componentOrElement as { $el?: Element }).$el
  return element instanceof HTMLElement ? element : null
}

const addItemRef = (index: number) => (item: Element | ComponentPublicInstance | null): void => {
  if (!item) {
    items.delete(index)
    return
  }

  const element = asElement(item)
  if (element) {
    items.set(index, element)
  }
}

const updateMenuWidth = () => {
  const width = root.value?.getBoundingClientRect().width ?? 0

  if (width > 0) {
    menuWidth.value = Math.ceil(width)
  }
}

const getInitialTime = (): string => {
  if (!variants.value.length) {
    return ''
  }

  return nearest(props.value || timeOf(new Date()), variants.value)
}

const scrollToIndex = (index: number): void => {
  const option = items.get(index)
  const menu = scrollable.value?.$el as HTMLElement | undefined

  if (!option || !menu) {
    return
  }

  const top = option.offsetTop - menu.clientHeight / 2 + option.clientHeight / 2
  menu.scrollTop = Math.max(top, 0)
}

const scrollToTime = (time: string): void => {
  if (!variants.value.length) {
    activeTime.value = ''
    return
  }

  activeTime.value = nearest(time, variants.value)

  const index = variants.value.indexOf(activeTime.value)
  if (index >= 0) {
    scrollToIndex(index)
  }
}

const syncActive = () => {
  scrollToTime(getInitialTime())
}

const emitChange = (value: string): void => {
  emit('change', value)
  emit('update:value', value)
}

const open = (): void => {
  if (props.disabled || props.readonly || expanded.value) {
    return
  }

  expanded.value = true
  updateMenuWidth()
  syncActive()

  nextTick(() => {
    scrollable.value?.update()
    scrollToTime(getInitialTime())
  })
}

const close = (): void => {
  expanded.value = false
}

const focus = (): void => {
  textbox.value?.focus()
}

defineExpose({
  open,
  close,
  focus,
} satisfies UiTimePickerMethods)

const actualizeCaretOnNextTick = () => nextTick(() => {
  textbox.value?.setSelectionRange(position.value, position.value)
})

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement | null
  const nextValue = sanitize(input?.value ?? '')

  if (input && input.value !== nextValue) {
    input.value = nextValue
  }

  if (nextValue === props.value) {
    actualizeCaretOnNextTick()
    return
  }

  oldValue.value = nextValue
  position.value = textbox.value?.getSelectionStart() ?? input?.selectionStart ?? 0

  emitChange(nextValue)

  if (!expanded.value) {
    open()
  }

  scrollToTime(nextValue)

  if (
    position.value === 3
    && position.value < nextValue.length
    && oldValue.value.length <= nextValue.length
    && oldValue.value.length !== position.value
  ) {
    position.value += 1
  }

  actualizeCaretOnNextTick()
}

const moveActive = (step: 1 | -1): void => {
  if (!variants.value.length) {
    return
  }

  const current = variants.value.indexOf(activeTime.value)
  const sourceIndex = current >= 0 ? current : variants.value.indexOf(getInitialTime())
  const nextIndex = Math.min(Math.max(sourceIndex + step, 0), variants.value.length - 1)

  activeTime.value = variants.value[nextIndex]
  scrollToIndex(nextIndex)
}

const onEnter = (): void => {
  if (!variants.value.length) {
    return
  }

  if (expanded.value && activeTime.value) {
    select(activeTime.value)
    return
  }

  if (props.value && isValid(props.value)) {
    close()
    return
  }

  select(nearest(timeOf(new Date()), variants.value))
}

const onKeyDown = (event: KeyboardEvent): void => {
  const input = event.target as HTMLInputElement
  const cursor = input.selectionStart ?? 0

  position.value = event.key === 'Backspace' && props.value[cursor - 1] === ':'
    ? Math.max(cursor - 1, 0)
    : cursor

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    open()
    moveActive(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    open()
    moveActive(-1)
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    onEnter()
    return
  }

  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key === 'Tab') {
    close()
  }
}

const select = (time: string): void => {
  if (props.disabled || props.readonly) {
    return
  }

  activeTime.value = time
  emitChange(time)
  close()
}

const onFocus = (event: FocusEvent): void => {
  emit('focus', event)
  open()

  if (!props.value) {
    const now = timeOf(new Date())
    emitChange(now)
    scrollToTime(now)
  }
}

const onBlur = (event: Event): void => {
  close()
  emit('blur', event)

  if (props.value) {
    const time = parse(props.value)
    emitChange(isValid(time) ? time : normalize(time))
  }
}

const onClear = (): void => {
  emitChange('')
  activeTime.value = getInitialTime()
  close()
}

const onRootMouseDown = (event: MouseEvent): void => {
  if (event.button !== 0 || props.disabled || props.readonly) {
    return
  }

  const target = event.target as Node | null
  const textboxElement = textbox.value?.$el as Element | undefined
  if (!target || !textboxElement?.contains(target)) {
    return
  }

  if (expanded.value) {
    close()
    return
  }

  open()
}

const onVisibleChange = (visible: boolean): void => {
  expanded.value = visible
}

const onPopperAttached = (): void => {
  updateMenuWidth()
  nextTick(() => {
    scrollable.value?.update()
    scrollToTime(getInitialTime())
  })
}

watch(() => props.value, () => {
  oldValue.value = props.value

  if (expanded.value) {
    scrollToTime(getInitialTime())
  }
})

watch(variants, () => {
  if (expanded.value) {
    scrollToTime(getInitialTime())
  }
})
</script>

<style lang="less" src="./time-picker.less" />

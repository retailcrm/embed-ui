<template>
    <div
        v-bind="$attrs"
        :aria-selected="selected ? 'true' : 'false'"
        :class="{
            'ui-v1-select-option': true,
            'ui-v1-select-option_selected': selected,
            'ui-v1-select-option_disabled': disabled,
            'ui-v1-select-option_hidden': hidden,
        }"
        role="option"
        @click="onClick"
    >
        <!-- @slot Слот для переопределения всего контента опции -->
        <slot :highlight="highlight" :selected="selected">
            <UiMenuItem
                :accent="accent"
                :counter="counter"
                :disabled="disabled"
                :size="size"
                :ticker="ticker"
            >
                <template v-if="$slots['leading-icon']" #leading-icon>
                    <!-- @slot Иконка слева от заголовка и описания -->
                    <slot name="leading-icon" :selected="selected" />
                </template>

                <!-- @slot Текстовая метка опции -->
                <slot name="value" :selected="selected">
                    <!-- eslint-disable-next-line -->
          <span v-html="texts.label" />
                </slot>

                <template v-if="texts.description" #description>
                    <!-- eslint-disable-next-line -->
          <span v-html="texts.description" />
                </template>

                <template #trailing-icon>
                    <!-- @slot Иконка справа от заголовка и описания -->
                    <slot name="trailing-icon" :selected="selected">
                        <IconCheckmarkCircle
                            v-if="selected"
                            class="ui-v1-select-option__checkmark-icon"
                            aria-hidden="true"
                        />
                        <IconAddCircleOutlined
                            v-else-if="multiple"
                            class="ui-v1-select-option__add-icon"
                            aria-hidden="true"
                        />
                    </slot>
                </template>
            </UiMenuItem>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import type { Option } from '@/common/components/select'
import type {
  PropType,
  Ref,
} from 'vue'

import IconCheckmarkCircle from '~assets/sprites/actions/checkmark-circle.svg'
import IconAddCircleOutlined from '~assets/sprites/actions/add-circle-outlined.svg'

import { UiMenuItem } from '@/remote/components/menu'

import isEqual from 'lodash.isequal'

import {
  highlight as _highlight,
  uid,
} from '@/common/components/select'

import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'

import { SIZE } from '@/common/components/menu'

import {
  IsSelectedKey,
  RegisterKey,
  SyncKey,
  UnregisterKey,
  ToggleKey,
  FilterKey,
  FilteredKey,
  TickerKey,
  MultipleKey,
  RegisterOptionKey,
  UnregisterOptionKey,
  FastenedKey,
} from '@/host/components/select/injection'

const props = defineProps({
  /** Значение опции */
  value: {
    type: null as unknown as PropType<unknown>,
    required: true,
  },

  /** Заголовок */
  label: {
    type: String,
    required: true,
  },

  /** Описание */
  description: {
    type: String,
    default: '',
  },

  /** Опция выбрана/не выбрана в списке */
  active: {
    type: Boolean,
    default: false,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Размер шрифта, иконок и внутренних отступов компонента */
  size: {
    type: String as unknown as PropType<SIZE>,
    validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.MD,
  },

  /** Счетчик количества */
  counter: {
    type: null as unknown as PropType<string|number|null>,
    validator: (counter: unknown) => counter === null || ['string', 'number'].includes(typeof counter),
    default: null,
  },

  /** Жирное начертание текста */
  accent: {
    type: Boolean,
    default: false,
  },
})

const id = uid('u1-v1-select-option')

const syncInSelect = inject<(id: string, data: {
  label: string;
  value: unknown;
}) => void>(SyncKey, () => {})

const registerInSelect = inject<(option: Option) => void>(RegisterKey, () => {})
const unregisterInSelect = inject<(id: string) => void>(UnregisterKey, () => {})

const registerInGroup = inject<(option: Option) => void>(RegisterOptionKey, () => {})
const unregisterInGroup = inject<(id: string) => void>(UnregisterOptionKey, () => {})
const isSelected = inject<Ref<(value: unknown) => boolean>>(IsSelectedKey, ref(() => false))
const toggle = inject<(value: unknown) => void>(ToggleKey, () => {})

const fastened = inject<boolean>(FastenedKey, false)
const filter = inject<Ref<string>>(FilterKey, ref(''))
const filtered = inject<Ref<boolean>>(FilteredKey, ref(false))
const ticker = inject<Ref<boolean>>(TickerKey, ref(false))
const multiple = inject<Ref<boolean>>(MultipleKey, ref(false))

const highlight = (text: string, style = 'font-weight: 500;') => _highlight(text, filter.value, style)

const texts = computed(() => ({
  label: filtered.value ? highlight(props.label) : props.label,
  description: filtered.value ? highlight(props.description, 'font-weight: 600;') : props.description,
}))

const matched = computed((): boolean => texts.value.label !== props.label || texts.value.description !== props.description)
const selected = computed((): boolean => props.active || isSelected.value(props.value))
const hidden = computed((): boolean => !(fastened || !filtered.value || matched.value))

const onClick = () => {
  if (!props.disabled) {
    toggle(props.value)
  }
}

const off = watch([
  () => props.label,
  () => props.value,
], ([newLabel, newValue], [oldLabel, oldValue]) => {
  if (newLabel !== oldLabel || !isEqual(newValue, oldValue)) {
    syncInSelect(id, {
      label: newLabel,
      value: newValue,
    })
  }
})

onBeforeMount(() => {
  const option: Option = {
    id,
    value: props.value,
    label: props.label,
    isMatched: () => !filtered.value || matched.value,
  }

  registerInSelect(option)
  registerInGroup(option)
})

onBeforeUnmount(() => {
  off()
  unregisterInSelect(id)
  unregisterInGroup(id)
})
</script>

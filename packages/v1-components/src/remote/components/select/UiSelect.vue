<template>
    <UiPopperConnector>
        <UiSelectTrigger
            :id="id"
            :clearable="clearable"
            :disabled="disabled"
            :expanded="state.expanded"
            :filter="state.filter"
            :filterable="filterable"
            :input-size="inputSize"
            :invalid="invalid"
            :multiple="multiple"
            :only-placeholder="onlyPlaceholder"
            :opened="state.expanded"
            :placeholder="placeholder"
            :readonly="readonly"
            :value="state.value"
            :selection="selection"
            @input="onInput"
            @update:value="state.value = $event"
            @update:expanded="state.expanded = $event"
        />

        <UiSelectPopper
            :id="id"
            :disabled="disabled || readonly"
            :multiple="multiple"
            :opened="state.expanded"
            :placement="placement"
            :popper-class="popperClass"
            :popper-fit-trigger="popperFitTrigger"
            :popper-options="popperOptions"
            :popper-triggers="popperTriggers"
            :readonly="readonly"
            :target-triggers="targetTriggers"
            :ticker="ticker"
            :filterable="filterable"
            :options-registry="optionsRegistry"
            @hide="close"
        >
            <div
                v-if="filterable && optionsRegistry.every(o => !o.isMatched()) && noResult"
                class="ui-v1-select__no-results-text"
            >
                {{ noResult }}
            </div>

            <slot />
        </UiSelectPopper>
    </UiPopperConnector>
</template>

<script lang="ts" setup>
import type { Option } from '@/host/components/select/injection'
import type { PropType } from 'vue'
import type { Trigger } from '@/common/components/popper'
import type { TriggerSchema } from '@/common/components/popper'
import type { UiSelectPopperProperties } from '@/common/components/select'
import type { I18nLocalized } from '@/host/i18n'

type A<T> = T extends unknown[] ? T : T[]

import { UiPopperConnector } from '@/remote/components/popper'
import { UiSelectPopper } from './parts'
import { UiSelectTrigger } from './parts'

import { computed } from 'vue'
import { inject } from 'vue'
import { provide } from 'vue'
import { ref } from 'vue'
import { reactive } from 'vue'
import { watch } from 'vue'

import _18n from '@/host/components/select/i18n'

import { PLACEMENT } from '@/common/components/select'
import { SIZE } from '@/common/components/textbox'

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
} from '@/host/components/select/injection'
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

  /** Атрибут placeholder нативного поля ввода input */
  placeholder: {
    type: String,
    default: 'test',
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

  /** Функция для проверки равенства элементов */
  equalsFn: {
    type: Function as unknown as PropType<(a: unknown, b: unknown) => boolean>,
    default: (a: unknown, b: unknown): boolean => a === b,
  },

  /**
   * Сторона цели, у которой появится плавающий элемент,
   * или подробный объект настройки положения и адаптации положения при нехватке места
   */
  placement: {
    type: String as PropType<PLACEMENT | `${PLACEMENT}`>,
    validator: (placement: string) => Object.values(PLACEMENT).includes(placement as PLACEMENT),
    default: PLACEMENT.BOTTOM,
  },

  /** События целевого элемента, по которым производится переключение видимости */
  targetTriggers: {
    type: [Array, Object] as PropType<Trigger[] | TriggerSchema>,
    default: () => ({
      show: ['click'],
    }),
  },

  /** События плавающего элемента, по которым производится переключение видимости */
  popperTriggers: {
    type: [Array, Object] as PropType<Trigger[] | TriggerSchema>,
    default: () => [],
  },

  /**
   * Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
   * По-умолчанию отключает такое поведение
   */
  popperFitTrigger: {
    type: Boolean,
    default: false,
  },

  /** Стиль для плавающего элемента */
  popperClass: {
    type: String,
    default: null,
  },

  /** Набор свойств плавающего элемента. See @/common/components/popper */
  popperOptions: {
    type: Object as PropType<UiSelectPopperProperties['popperOptions']>,
    default: () => ({}),
  },

  /** Размер поля ввода */
  inputSize: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.SM,
  },

  /** Наличие множественного выбора среди элементов выпадающего списка */
  multiple: {
    type: Boolean,
    default: false,
  },

  /** Состояние открытия выпадающего списка */
  expanded: {
    type: Boolean,
    default: false,
  },

  /** Устанавливает в качестве выводимого в input значения только содержимое placeholder */
  onlyPlaceholder: {
    type: Boolean,
    default: false,
  },

  /** Добавляет анимацию показала полной строки при переполнении */
  ticker: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  expanded: props.expanded,
  filter: '',
  value: props.value as unknown | unknown[],
})

const i18n = computed((): I18nLocalized => _18n.init(inject(I18nInjectKey, null)?.locale ?? _18n.fallback))
const noResult = computed(() => i18n.value.t('search.noResult', { filter: state.filter }))

const optionsRegistry = ref<Option[]>([])

const selection = computed(() => {
  const model = arraify<unknown>(state.value)

  const selectedOptions: Option[] = []
  model.forEach(item => {
    const option = optionsRegistry.value.find(o => equals(o.value, item))
    if (option) {
      selectedOptions.push(option)
    }
  })

  return selectedOptions
})

const arraify = <T> (value: T): A<T> => Array.isArray(value)
  ? [...value] as A<T>
  : (typeof value === 'number' || typeof value === 'boolean'  ||  value ? [value] : []) as A<T>

const equals = (a: unknown, b: unknown) => props.equalsFn(a, b)

const contains = (array: unknown[], value: unknown) => array.some(v => equals(v, value))

provide(RegisterKey, (option: Option) => {
  if (optionsRegistry.value.some(item => item.id === option.id)) {
    throw new Error(`[UiSelect] Component with id ${option.id} already registered. Unregister it before using again.`)
  }

  optionsRegistry.value.push(option)
})

provide(SyncKey, (id: string, data: { label: string; value: unknown }) => {
  const option = optionsRegistry.value.find(option => option.id === id)
  if (option) {
    option.label = data.label
    option.value = data.value
  }
})

provide(UnregisterKey, (id: string) => {
  const index = optionsRegistry.value.findIndex(option => option.id === id)

  if (index !== -1) {
    optionsRegistry.value.splice(index, 1)
  }
})

provide(IsSelectedKey, computed(() => (value: unknown): boolean => {
  return Array.isArray(state.value)
    ? contains(state.value as unknown[], value)
    : equals(state.value, value)
}))

provide(ToggleKey, (value: unknown) => {
  if (props.multiple) {
    const model = arraify<unknown>(state.value)
    const index = model.findIndex(item => equals(item, value))

    console.log('toggle', value)
    if (index !== -1) {
      model.splice(index, 1)
    } else {
      model.push(value)
    }

    state.value = model

    if (!props.multiple) {
      close()
    }
  } else {
    state.value = value

    close()
  }
})

provide(FilterKey, computed(() => state.filter))
provide(FilteredKey, computed(() => props.filterable && state.filter.length > 0))
provide(TickerKey, computed(() => props.ticker))
provide(MultipleKey, computed(() => props.multiple))

const onInput = (value: string) => {
  state.filter = value
}

const close = () => {
  if (state.expanded) {
    state.expanded = false
    state.filter = ''
  }

  console.log('expanded', state.value)
}

watch(() => props.expanded, (newVal) => {
  state.expanded = newVal
  if (!newVal) {
    state.filter = ''
  }
})
watch(() => props.value, (newVal) => { state.value = newVal as unknown | unknown[] })
</script>

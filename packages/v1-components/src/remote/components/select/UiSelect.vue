<template>
    <UiPopperConnector>
        <UiSelectTrigger
            :id="resolvedId"
            :value="state.value"
            :multiple="multiple"
            :selection="selection"
            :filter="state.filter"
            :filterable="filterable"
            :clearable="clearable"
            :expanded="state.expanded"
            :invalid="invalid"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder-only="placeholderOnly"
            :placeholder="placeholder"
            :textbox-size="textboxSize"
            :active-descendant="activeOptionId"
            @input="onInput"
            @keydown="onKeyDown"
            @update:value="state.value = $event"
            @update:expanded="state.expanded = $event"
        />

        <UiSelectPopper
            :id="resolvedId"
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
import type { I18nLocalized } from '@/host/i18n'
import type { Option } from '@/host/components/select/injection'
import type { PropType } from 'vue'
import type { SerializedKeyboardEvent } from '@omnicajs/vue-remote/types/events'
import type { Trigger } from '@/common/components/popper'
import type { TriggerSchema } from '@/common/components/popper'
import type { UiSelectPopperProperties } from '@/common/components/select'

type A<T> = T extends unknown[] ? T : T[]

import { computed } from 'vue'
import { inject } from 'vue'
import { provide } from 'vue'
import { reactive } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'

import { UiPopperConnector } from '@/remote/components/popper'

import _18n from '@/host/components/select/i18n'

import { PLACEMENT } from '@/common/components/select'
import { SIZE } from '@/common/components/textbox'
import { uid } from '@/common/components/select'

import {
  ActiveOptionIdKey,
  FilteredKey,
  FilterKey,
} from '@/host/components/select/injection'
import { I18nInjectKey } from '@/host/i18n/plugin'
import {
  IsSelectedKey,
  MultipleKey,
  RegisterKey,
  SyncKey,
  TickerKey,
  ToggleKey,
  UnregisterKey,
} from '@/host/components/select/injection'

import { UiSelectPopper } from './parts'
import { UiSelectTrigger } from './parts'

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
  textboxSize: {
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
  placeholderOnly: {
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

const localId = uid('ui-v1-select')
const resolvedId = computed(() => props.id ?? localId)

const i18n = computed((): I18nLocalized => _18n.init(inject(I18nInjectKey, null)?.locale ?? _18n.fallback))
const noResult = computed(() => i18n.value.t('search.noResult', { filter: state.filter }))

const optionsRegistry = ref<Option[]>([])
const activeOptionId = ref<string | null>(null)

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
const navigableOptions = computed(() => optionsRegistry.value.filter(option => option.isMatched() && !option.disabled))

provide(RegisterKey, (option: Option) => {
  if (optionsRegistry.value.some(item => item.id === option.id)) {
    throw new Error(`[UiSelect] Component with id ${option.id} already registered. Unregister it before using again.`)
  }

  optionsRegistry.value.push(option)
})

provide(SyncKey, (id: string, data: { label: string; value: unknown; disabled: boolean }) => {
  const option = optionsRegistry.value.find(option => option.id === id)
  if (option) {
    option.label = data.label
    option.value = data.value
    option.disabled = data.disabled
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
provide(ActiveOptionIdKey, computed(() => activeOptionId.value))

const onInput = (value: string) => {
  state.filter = value
}

const resolveHighlightedOption = (mode: 'first' | 'last' | 'selected-first' = 'selected-first') => {
  const options = navigableOptions.value
  if (options.length === 0) {
    activeOptionId.value = null
    return
  }

  if (mode === 'first') {
    activeOptionId.value = options[0].id
    return
  }

  if (mode === 'last') {
    activeOptionId.value = options[options.length - 1].id
    return
  }

  const selectedOption = options.find(option => {
    return Array.isArray(state.value)
      ? contains(state.value as unknown[], option.value)
      : equals(state.value, option.value)
  })

  activeOptionId.value = selectedOption?.id ?? options[0].id
}

const moveHighlight = (step: 1 | -1) => {
  const options = navigableOptions.value
  if (options.length === 0) {
    activeOptionId.value = null
    return
  }

  const currentIndex = options.findIndex(option => option.id === activeOptionId.value)
  const nextIndex = currentIndex === -1
    ? (step > 0 ? 0 : options.length - 1)
    : (currentIndex + step + options.length) % options.length

  activeOptionId.value = options[nextIndex].id
}

const selectHighlightedOption = () => {
  const option = navigableOptions.value.find(item => item.id === activeOptionId.value)
  if (!option) {
    return
  }

  if (props.multiple) {
    const model = arraify<unknown>(state.value)
    const index = model.findIndex(item => equals(item, option.value))

    if (index !== -1) {
      model.splice(index, 1)
    } else {
      model.push(option.value)
    }

    state.value = model
  } else {
    state.value = option.value
    close()
  }
}

const onKeyDown = (event: SerializedKeyboardEvent) => {
  if (props.disabled || props.readonly) {
    return
  }

  if (event.key === 'Escape') {
    close()
    return
  }

  if (event.key === 'Tab') {
    close()
    return
  }

  if (event.key === 'Home') {
    if (!state.expanded) {
      state.expanded = true
    }

    resolveHighlightedOption('first')
    return
  }

  if (event.key === 'End') {
    if (!state.expanded) {
      state.expanded = true
    }

    resolveHighlightedOption('last')
    return
  }

  if (event.key === 'ArrowDown') {
    if (!state.expanded) {
      state.expanded = true
      resolveHighlightedOption('first')
      return
    }

    moveHighlight(1)
    return
  }

  if (event.key === 'ArrowUp') {
    if (!state.expanded) {
      state.expanded = true
      resolveHighlightedOption('last')
      return
    }

    moveHighlight(-1)
    return
  }

  if (event.key === 'Enter') {
    if (!state.expanded) {
      state.expanded = true
      resolveHighlightedOption('selected-first')
      return
    }

    selectHighlightedOption()
  }
}

const close = () => {
  if (state.expanded) {
    state.expanded = false
    state.filter = ''
    activeOptionId.value = null
  }
}

watch(() => props.expanded, (newVal) => {
  state.expanded = newVal
  if (!newVal) {
    state.filter = ''
    activeOptionId.value = null
  }
})
watch(() => props.value, (newVal) => { state.value = newVal as unknown | unknown[] })
watch(() => state.expanded, (expanded) => {
  if (expanded) {
    resolveHighlightedOption('selected-first')
  } else {
    activeOptionId.value = null
  }
})
watch(navigableOptions, () => {
  if (!state.expanded) {
    return
  }

  const exists = navigableOptions.value.some(option => option.id === activeOptionId.value)
  if (!exists) {
    resolveHighlightedOption('selected-first')
  }
})
</script>

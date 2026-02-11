<template>
    <UiPopper
        :id="id + '-popper'"
        ref="popper"
        :visible="visible"
        :target-triggers="targetTriggers"
        :popper-triggers="popperTriggers"
        :popper-options="popperOptions"
        :global-triggers="['miss-click']"
        :placement="placement"
        :aria-hidden="!visible ? 'true' : 'false'"
        :aria-multiselectable="multiple ? 'true' : 'false'"
        :class="['ui-v1-select__popper', popperClass]"
        :disabled="disabled || readonly"
        v-bind="$attrs"
        role="listbox"
        @attached="autoScroll"
        @show="$emit('show', $event)"
        @shown="$emit('shown', $event)"
        @hide="$emit('hide', $event)"
        @hidden="$emit('hidden', $event)"
        @dispose="$emit('dispose', $event)"
    >
        <div
            ref="scrollable"
            :style="scrollableStyle"
            :class="{
                'ui-v1-select__content': true,
                'ui-v1-select__content_long': ticker,
            }"
        >
            <div>
                <!-- @slot Дефолтный слот, содержащий пункты выпадающего списка -->
                <slot />
            </div>
        </div>
    </UiPopper>
</template>

<script lang="ts" setup>
import type { Alignment } from '@floating-ui/dom'
import type { CSSProperties } from 'vue'
import type { PropType } from 'vue'
import type { Side } from '@floating-ui/dom'
import type { UiPopperProperties ,
  PlacementOptions,
  Trigger,
  TriggerSchema } from '@/common/components/popper'

import {
  isPlacementLiteral,
  isPlacementOptions,
} from '@/common/components/popper'

import UiPopper from '@/host/components/popper/UiPopper.vue'

import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useElementRef } from '@/host/composables'
import { watch } from 'vue'

import { PLACEMENT } from '@/common/components/select'

const props = defineProps({
  /** Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице */
  id: {
    type: String,
    default: undefined,
  },

  /** Начальное состояние выпадающего списка - открыт/закрыт */
  opened: {
    type: Boolean,
    default: false,
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

  /**
   * Сторона цели, у которой появится плавающий элемент,
   * или подробный объект настройки положения и адаптации положения при нехватке места
   */
  placement: {
    type: [String, Object] as PropType<Side | `${Side}-${Alignment}` | PlacementOptions>,
    validator: (value: unknown) => isPlacementLiteral(value) || isPlacementOptions(value),
    default: PLACEMENT.BOTTOM,
  },

  /** Стиль для плавающего элемента */
  popperClass: {
    type: String,
    default: null,
  },

  /** Набор свойств плавающего элемента. See @/common/components/popper */
  popperOptions: {
    type: Object as PropType<Omit<UiPopperProperties, 'placement' | 'shown' | 'target' | 'triggers'>>,
    default: () => ({}),
  },

  /** Блокировка поля ввода */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Устанавливает поле ввода в состояние доступное только для чтения */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** Наличие множественного выбора среди элементов выпадающего списка */
  multiple: {
    type: Boolean,
    default: false,
  },

  /** Добавляет анимацию показала полной строки при переполнении */
  ticker: {
    type: Boolean,
    default: false,
  },
})

defineEmits([
  /** Смена значения флага видимости плавающего элемента */
  'update:visible',
  /** Появление плавающего элемента */
  'show',
  /** Сокрытие плавающего элемента */
  'hide',
  /** Появление плавающего элемента после окончания перехода */
  'shown',
  /** Сокрытие плавающего элемента после окончания перехода */
  'hidden',
  /** Удаление с формы плавающего элемента */
  'dispose',
])

const target = useElementRef<HTMLElement>()
const popper = ref<InstanceType<typeof UiPopper> | null>(null)
const scrollable = ref<HTMLElement | null>(null)
const width = ref<string>('auto')

const visible = computed(() => props.opened)

const autoScroll = async () => {
  const option = scrollable.value?.querySelector<HTMLElement>('.ui-v1-select-option_selected')
  if (scrollable.value && option) {
    scrollable.value.scrollTop = option.offsetTop
  }
}

const updateWidth = () => width.value = `${target.value?.clientWidth}px`

const scrollableStyle = computed((): CSSProperties => {
  if (props.popperFitTrigger) {
    return { minWidth: width.value }
  }

  const style: CSSProperties = { width: width.value }

  if (parseInt(width.value) > 500) {
    style.maxWidth = width.value
  }

  return style
})

defineExpose({
  adjust: () => popper.value?.adjust(),
  dispose: () => popper.value?.dispose(),
  show: () => popper.value?.show(),
  hide: () => popper.value?.hide(),
})

watch(() => props.opened, () => updateWidth())

onMounted(() => {
})
</script>

<style lang="less" src="./select.less" />
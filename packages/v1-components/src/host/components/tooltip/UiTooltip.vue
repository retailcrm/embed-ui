<template>
    <UiPopper
        ref="popper"
        :visible="visible"
        :target="target"
        :target-triggers="targetTriggers"
        :popper-triggers="popperTriggers"
        :global-triggers="globalTriggers"
        :placement="placement"
        :strategy="strategy"
        :container="container"
        :offset-main-axis="offsetMainAxis"
        :offset-cross-axis="offsetCrossAxis"
        :delay="delay"
        :detach-timeout="detachTimeout"
        :with-arrow="withArrow"
        class="ui-v1-tooltip"
        role="tooltip"
        v-bind="$attrs"
        @update:visible="$emit('update:visible', $event)"
        @show="$emit('show', $event)"
        @shown="$emit('shown', $event)"
        @hide="$emit('hide', $event)"
        @hidden="$emit('hidden', $event)"
        @dispose="$emit('dispose', $event)"
    >
        <!-- @slot Контент всплывающей подсказки -->
        <slot />
    </UiPopper>
</template>

<script lang="ts" setup>
import type {
  Alignment,
  Side,
  Strategy,
} from '@floating-ui/dom'

import type { Numeric } from '@/common/types'

import type {
  Delay,
  PlacementOptions,
  Trigger,
  TriggerSchema,
} from '@/common/components/popper'

import type { PropType, Ref } from 'vue'

import UiPopper from '@/host/components/popper/UiPopper.vue'

import {
  ref,
} from 'vue'

import {
  isPlacementLiteral,
  isPlacementOptions,
} from '@/common/components/popper'

defineProps({
  /** Флаг для ручного переключения видимости */
  visible: {
    type: Boolean,
    default: false,
  },

  /** Ссылка на элемент цели, к которой будет привязан плавающий элемент */
  target: {
    type: Object as PropType<Ref<Element | null>>,
    default: () => ref(null),
  },

  /** События целевого элемента, по которым производится переключение видимости */
  targetTriggers: {
    type: [Array, Object] as PropType<Trigger[] | TriggerSchema>,
    default: () => ({
      show: ['hover'],
      hide: ['click', 'hover'],
    }),
  },

  /** События плавающего элемента, по которым производится переключение видимости */
  popperTriggers: {
    type: [Array, Object] as PropType<Trigger[] | TriggerSchema>,
    default: () => [],
  },

  /** Глобальные события и условия, при которых плавающий элемент будет скрыт */
  globalTriggers: {
    type: Array as PropType<Array<'miss-click' | 'reference-hidden'>>,
    default: () => ['reference-hidden'],
  },

  /**
   * Сторона цели, у которой появится плавающий элемент,
   * или подробный объект настройки положения и адаптации положения при нехватке места
   */
  placement: {
    type: [String, Object] as PropType<Side | `${Side}-${Alignment}` | PlacementOptions>,
    validator: (value: unknown) => isPlacementLiteral(value) || isPlacementOptions(value),
    default: 'bottom',
  },

  /** Способ позиционирования, значение CSS свойство position */
  strategy: {
    type: String as unknown as PropType<Strategy>,
    default: 'absolute',
  },

  /**
   * Контейнер, либо селектор контейнера, внутрь которого будет помещена верстка плавающего элемента.
   * Если не указан, будет взят из глобальных настроек или document.body
   */
  container: {
    type: null as unknown as PropType<string | null>,
    validator: (value: unknown) => value === null || typeof value === 'string',
    default: null,
  },

  /** Сдвиг по основной оси, определяемой из положения элемента */
  offsetMainAxis: {
    type: [Number, String] as PropType<Numeric>,
    validator: (value: Numeric) => !isNaN(Number(value)),
    default: 8,
  },

  /** Сдвиг по перекрестной оси, определяемой из положения элемента */
  offsetCrossAxis: {
    type: [Number, String] as PropType<Numeric>,
    validator: (value: Numeric) => !isNaN(Number(value)),
    default: 0,
  },

  /** Задержка перед показом/скрытием плавающего элемента */
  delay: {
    type: [Number, String, Object] as unknown as PropType<Numeric | Delay>,
    validator: (value: unknown) => typeof value === 'object' || !isNaN(Number(value)),
    default: 0,
  },

  /** Флаг, отключающий возможность показа плавающего элемента */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Время в миллисекундах, через которое плавающий элемент удаляется со страницы, если был скрыт */
  detachTimeout: {
    type: null as unknown as PropType<Numeric | null>,
    default: 5000,
  },

  /** Добавляет стрелку-указатель */
  withArrow: {
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

const popper = ref<InstanceType<typeof UiPopper> | null>(null)

defineExpose({
  adjust: () => popper.value?.adjust(),
  dispose: () => popper.value?.dispose(),
  show: () => popper.value?.show(),
  hide: () => popper.value?.hide(),
})
</script>

<style lang="less" src="./tooltip.less" />

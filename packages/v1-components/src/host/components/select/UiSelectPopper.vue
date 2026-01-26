<template>
  <UiPopper
      ref="popper"
      :visible="visible"
      :target="target"
      :target-triggers="targetTriggers"
      :popper-triggers="popperTriggers"
      :global-triggers="['miss-click']"
      :placement="placement"
      :aria-hidden="!visible ? 'true' : 'false'"
      :aria-multiselectable="multiple ? 'true' : 'false'"
      :class="['ui-v1-select__popper', popperClass]"
      :disabled="disabled || readonly"
      v-bind="$attrs"
      role="listbox"
      @update:visible="$emit('update:visible', $event)"
      @attached="autoScroll"
      @show="$emit('show', $event)"
      @shown="$emit('shown', $event)"
      @hide="$emit('hide', $event)"
      @hidden="$emit('hidden', $event)"
      @dispose="$emit('dispose', $event)"
  >
    <div
        ref="scrollable"
        style="min-width: 271px;"
        class="ui-v1-select__content"
    >
      <div>
        <!-- @slot Дефолтный слот, содержащий пункты выпадающего списка -->
        <slot />
      </div>
    </div>
  </UiPopper>
</template>

<script lang="ts" setup>
import type {
  Alignment,
  Side,
} from '@floating-ui/dom'

import type { UiPopperProperties } from '@/common/components/popper'
import type { PropType, Ref } from 'vue'

import {
  PlacementOptions,
  Trigger,
  TriggerSchema,
  isPlacementLiteral,
  isPlacementOptions,
} from '@/common/components/popper'

import {
  ref,
  nextTick,
  computed,
} from 'vue'

import { PLACEMENT } from '@/common/components/select'

import UiPopper from '@/host/components/popper/UiPopper.vue'

const props = defineProps({
  /** Атрибут value, содержащий выбранный элемент из выпадающего списка */
  value: {
    type: null as unknown as PropType<unknown|unknown[]>,
    default: undefined,
  },

  /** Начальное состояние выпадающего списка - открыт/закрыт */
  opened: {
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
const scrollable = ref<HTMLElement | null>(null)

const visible = computed(() => props.opened)

const autoScroll = async () => {
  const option = scrollable.value?.querySelector<HTMLElement>('.ui-v1-menu-item_selected')
  if (scrollable.value && option) {
    scrollable.value.scrollTop = option.offsetTop
  }
}

defineExpose({
  adjust: () => popper.value?.adjust(),
  dispose: () => popper.value?.dispose(),
  show: () => popper.value?.show(),
  hide: () => popper.value?.hide(),
})
</script>

<style lang="less" src="./select.less" />
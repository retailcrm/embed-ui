<template>
    <Teleport v-if="target && state.attached" :to="container || 'body'">
        <div
            ref="popper"
            :class="{
                'ui-v1-popper': true,
                'ui-v1-popper_shown': state.visible,
                'ui-v1-popper_hidden': !state.visible,
            }"
            v-bind="$attrs"
            @transitionend="state.visible ? $emit('shown') : $emit('hidden')"
        >
            <div
                v-if="withArrow"
                ref="arrow"
                class="ui-v1-popper__arrow"
            />

            <div class="ui-v1-popper__content">
                <!-- @slot Контент плавающего элемента -->
                <slot />
            </div>
        </div>
    </Teleport>
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
  TriggerHandler,
  TriggerSchema,
} from '@/common/components/popper'

import type { PropType, Ref } from 'vue'

import Listener from './Listener'
import Scheduler from './Scheduler'

import {
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'

import isEqual from 'lodash.isequal'

import {
  isPlacementLiteral,
  isPlacementOptions,
} from '@/common/components/popper'

import { autoUpdate } from '@floating-ui/dom'
import { move } from './floating'
import { useTarget } from '@/host/components/popper/composables'

import * as globalEvents from './globalEvents'

import { ProcessedByPopperKey } from '@/common/components/popper'

const props = defineProps({
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
    default: () => [],
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

const emit = defineEmits([
  /** Смена значения флага видимости плавающего элемента */
  'update:visible',
  /** Появление плавающего элемента */
  'show',
  /** Появление плавающего элемента после окончания перехода */
  'shown',
  /** Сокрытие плавающего элемента */
  'hide',
  /** Сокрытие плавающего элемента после окончания перехода */
  'hidden',
  /** Удаление с формы плавающего элемента */
  'dispose',
])

const target = useTarget(props.target)
const popper = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)

const state = reactive({
  attached: false,
  visible: false,
  showing: false,
  hiding: false,
  clicked: false,
  touched: false,
  disposed: true,
})

const delay = computed((): Required<Delay> => {
  const delay = props.delay

  return {
    show: typeof delay === 'object' ? delay.show ?? 0 : Number(delay),
    hide: typeof delay === 'object' ? delay.hide ?? 0 : Number(delay),
  }
})

const positioning = computed(() => ({
  placement: props.placement,
  strategy: props.strategy,
  offsetMainAxis: Number(props.offsetMainAxis),
  offsetCrossAxis: Number(props.offsetCrossAxis),
  ...props.globalTriggers.includes('reference-hidden') && {
    onReferenceHidden: hide,
  },
}))

const adjust = async () => {
  if (target.value && popper.value && !state.disposed) {
    await move(popper.value, arrow.value, target.value, positioning.value)
  }
}

const showingScheduler = new Scheduler()
const detachScheduler = new Scheduler()

const detach = () => state.attached = false

let stop: (() => void) | null = null

const autoAdjustOff = () => {
  if (stop) {
    stop()
    stop = null
  }
}

const autoAdjustOn = () => {
  autoAdjustOff()

  if (target.value && popper.value) {
    stop = autoUpdate(target.value, popper.value, adjust, {
      animationFrame: true,
      elementResize: true,
    })
  }
}

const doShow = async () => {
  detachScheduler.abort()
  showingScheduler.abort()

  if (!state.visible) {
    await new Promise(resolve => requestAnimationFrame(resolve))

    if (!state.hiding) {
      await adjust()
      autoAdjustOn()

      state.visible = true
      emit('update:visible', true)
    }
  }
}

const doHide = async () => {
  showingScheduler.abort()

  if (!state.visible) {
    return
  }

  autoAdjustOff()

  state.visible = false
  emit('update:visible', false)

  detachScheduler.abort()
  if (props.detachTimeout !== null) {
    detachScheduler.schedule(detach, Number(props.detachTimeout))
  }
}

const show = (immediately = false) => {
  if (state.disposed) {
    return
  }

  state.hiding = false
  state.attached = true

  showingScheduler.schedule(doShow, immediately ? 0 : delay.value.show)

  emit('show')

  state.showing = true
  requestAnimationFrame(() => setTimeout(() => state.showing = false))
}

const hide = (immediately = false, reason: 'generic' | 'by-miss-click' = 'generic'): void => {
  state.hiding = true

  showingScheduler.schedule(doHide, immediately ? 0 : delay.value.hide)

  emit('hide', reason)
}

const initialize = (disposed = false): void => {
  if (!disposed) {
    state.disposed = false

    if (target.value) {
      targetListener.start(target.value, props.targetTriggers)
    }

    if (popper.value) {
      popperListener.start(popper.value, props.popperTriggers)
    }
  } else {
    state.disposed = true
  }
}

const dispose = () => {
  if (state.disposed) {
    return
  }

  state.disposed = true

  targetListener.stop()
  popperListener.stop()

  hide(true)

  detach()

  emit('dispose')
}

const contains = (el: Element | null): boolean => popper.value?.contains(el) ?? false

const onGlobalTap = async (event: Event, touch = false) => {
  const captures = state.clicked || contains(event.target as Element)

  await new Promise(resolve => requestAnimationFrame(resolve))

  if (!state.showing && state.visible && props.globalTriggers.includes('miss-click') && !captures) {
    hide(false, 'by-miss-click')

    if (touch) {
      state.touched = true
      setTimeout(() => state.touched = false, 300)
    }
  }
}

const onGlobalClick = (event: Event) => onGlobalTap(event)
const onGlobalTouch = (event: Event) => onGlobalTap(event, true)
const onGlobalMousedown = (event: Event) => {
  state.clicked = contains(event.target as Element)
}

const onShowTriggered: TriggerHandler = (event) => {
  if (!state.visible || state.hiding) {
    event[ProcessedByPopperKey] = true
    if (!state.touched) {
      show()
    }
  }
}

const onHideTriggered: TriggerHandler = (event) => {
  if (!event[ProcessedByPopperKey]) {
    hide()
  }
}

const targetListener = new Listener(onShowTriggered, onHideTriggered)

watch(() => props.targetTriggers, () => targetListener.triggers = props.targetTriggers)

const popperListener = new Listener(onShowTriggered, onHideTriggered)

watch(() => props.popperTriggers, () => popperListener.triggers = props.popperTriggers)

defineExpose({
  /** Программная корректировка положения плавающего элемента относительно цели */
  adjust,
  dispose,
  show,
  hide,
})

watch(() => props.visible, visible => visible ? show() : hide())

watch(target, async (newTarget, oldTarget) => {
  if (newTarget !== oldTarget) {
    targetListener.target = newTarget

    if (state.visible) {
      autoAdjustOn()
      await adjust()
    }
  }
})

watch(positioning, async (newPositioning, oldPositioning) => {
  if (!isEqual(newPositioning, oldPositioning)) {
    await adjust()
  }
})

watch(arrow, async (newArrow, oldArrow) => {
  if (newArrow !== oldArrow) {
    await adjust()
  }
})

watch(() => state.attached, (isAttached, wasAttached) => {
  if (isAttached && !wasAttached) {
    nextTick(async () => {
      if (state.visible) {
        autoAdjustOff()
        await adjust()
        autoAdjustOn()
      }
    })
  }
})

watch(() => props.disabled, disabled => {
  if (disabled) {
    dispose()
  } else if (state.disposed) {
    initialize()

    if (props.visible) {
      show()
    }
  }
})

onMounted(() => {
  globalEvents.on('click', onGlobalClick)
  globalEvents.on('mousedown', onGlobalMousedown)
  globalEvents.on('touchend', onGlobalTouch)

  initialize(props.disabled)

  if (props.visible && !props.disabled) {
    show()
  }
})

onActivated(() => props.visible ? show() : hide())

onDeactivated(() => hide())

onBeforeUnmount(() => {
  autoAdjustOff()

  globalEvents.off('click', onGlobalClick)
  globalEvents.off('mousedown', onGlobalMousedown)
  globalEvents.off('touchend', onGlobalTouch)

  dispose()
})
</script>

<style lang="less" src="./popper.less" />

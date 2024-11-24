<script lang="ts" setup>
import type { PropType, VNode } from 'vue'

import type { Layer } from '@/host/components/modal/layer'
import type { EmbedModal } from '@/host/components/modal/plugin'

import type { UiModalWindowSurfaceMethods } from '@/common/components/modal-window'

import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'
import UiTransition from '@/host/components/transition/UiTransition.vue'

import {
  Teleport,
  computed,
  h,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  useAttrs,
  useSlots,
  vShow,
  watch,
  withDirectives,
} from 'vue'

import { expect } from '@/host/utils'
import { nextAnimationFrame } from '@/host/dom'
import uid from '@/host/uid'

import { layers } from '@/host/components/modal/layer'

import { ModalInjectKey } from '@/host/components/modal/plugin'

import {
  APPEARANCE,
  SCROLLING,
} from '@/common/components/modal-window'

const props = defineProps({
  /** Атрибут id корневого элемента модального окна. Должен быть уникальным на странице */
  id: {
    type: String,
    default: () => uid('embed-modal-window'),
  },

  /** Открыто/закрыто */
  opened: {
    type: Boolean,
    default: true,
  },

  /** Закрываемое. Возможность закрыть модальное окно */
  closable: {
    type: Boolean,
    default: true,
  },

  /** Внешний вид */
  appearance: {
    type: String as unknown as PropType<APPEARANCE>,
    validator: (appearance: string) => expect(appearance).toBeOneOf(APPEARANCE),
    default: APPEARANCE.POPUP,
  },

  /** Вывод на весь экран */
  fullscreen: {
    type: Boolean,
    default: false,
  },

  /**
   * Резиновое. Размещено в центре страницы. Отступы от любой границы составляет 32 px.
   * Резиновое окно не может выходить за пределы области просмотра, так как контент прокручивается внутри него.
   * Шапка и футер у данного типа окна закреплены и не прокручиваются.
   * При достижении ширины 1 680 px окно перестает увеличиваться и фиксируется по центру браузера.
   */
  responsive: {
    type: Boolean,
    default: false,
  },

  /** Время, через которое плавающий элемент удаляется со страницы, если был скрыт */
  disposeTimeout: {
    type: null as unknown as PropType<number|string|null>,
    default: 5000,
  },

  /** Тип прокрутки */
  scrolling: {
    type: String as unknown as PropType<SCROLLING>,
    validator: (scrolling: string) => Object.values(SCROLLING).includes(scrolling as SCROLLING),
    default: SCROLLING.NORMAL,
  },
})

const emit = defineEmits([
  /** Срабатывает при открытии */
  'open',
  /** Срабатывает при закрытии */
  'close',
  /** Срабатывает при отмене закрытия */
  'close-cancel',
  /** Срабатывает при завершении раскрытия */
  'shown',
  /** Срабатывает в начале раскрытия */
  'showing',
  /** Срабатывает при завершении сокрытия */
  'hidden',
  /** Срабатывает в начале сокрытия */
  'hiding',
  /** Срабатывает при прокрутке контейнера по оси y **/
  'scroll:y',
  /** Срабатывает при прокрутке контейнера в самый конец по оси y **/
  'scroll:y:end',
  /** Обновление флага видимости */
  'update:opened',
  /** Срабатывает при изменении состояния перекрытия */
  'update:overlapped',
])

const globals = inject<EmbedModal | null>(ModalInjectKey, null)

const state = reactive({
  attached: false,
  shown: false,
  hiding: false,
  detachTimer: null as number | null,
  overlapped: false,
})

const body = ref<HTMLElement | null>(null)

const layer = computed<Layer>(() => ({
  id: props.id,
  isBlocker: () => true,
  isOverlapped: () => state.overlapped,
  setIsOverlapped: (overlapped: boolean) => {
    if (state.overlapped !== overlapped) {
      state.overlapped = overlapped
      emit('update:overlapped', overlapped)
    }
  },
  emitEscape: () => {
    if (!state.overlapped) {
      close()
    }
  },
}))

type Visibility = 'showing' | 'shown' | 'hiding' | 'hidden'

const visibilityOfOverlay = ref<Visibility>('hidden')
const visibilityOfBody = ref<Visibility>('hidden')
const visibility = computed<Visibility>(() => {
  switch (true) {
    case 'shown' === visibilityOfOverlay.value && 'shown' === visibilityOfBody.value:
      return 'shown'
    case 'showing' === visibilityOfOverlay.value || 'showing' === visibilityOfBody.value:
      return 'showing'
    case 'hiding' === visibilityOfOverlay.value || 'hiding' === visibilityOfBody.value:
      return 'hiding'
  }

  return 'hidden'
})

const detach = () => {
  layers.remove(layer.value)
  state.attached = false
}

const scheduleDetach = () => {
  if (state.detachTimer === null) {
    state.detachTimer = setTimeout(
      () => detach(),
      props.disposeTimeout ? Number(props.disposeTimeout) : 0
    ) as unknown as number
  }
}

const cancelScheduledDetach = () => {
  if (state.detachTimer !== null) {
    clearTimeout(state.detachTimer)
    state.detachTimer = null
  }
}

const show = async () => {
  state.hiding = false

  cancelScheduledDetach()
  if (state.shown) {
    return
  }

  layers.remove(layer.value)
  layers.add(layer.value)
  layers.start()

  state.attached = true

  await nextAnimationFrame()
  await nextAnimationFrame()

  if (!state.hiding) {
    state.shown = true
    emit('update:opened', true)
    emit('open')
  }
}

const hide = () => {
  state.hiding = true

  if (!state.shown) {
    if (state.attached) {
      scheduleDetach()
    }
    return
  }

  state.shown = false
  emit('update:opened', false)
  emit('close')

  layers.remove(layer.value)

  cancelScheduledDetach()
  scheduleDetach()
}

const close = (event: Event | undefined = undefined) => {
  const target = event?.target as Element | undefined
  if (target?.closest('.ps__thumb-y')) {
    return
  }

  if (props.closable) {
    hide()
  } else {
    emit('close-cancel')
  }
}

defineExpose<UiModalWindowSurfaceMethods>({
  open: show,
  close,
})

watch(() => props.id, (_, oldId) => layers.replace(oldId, layer.value))
watch(() => props.opened, opened => opened ? show() : hide())
watch(() => visibility.value, (current, previous) => {
  if (current === previous) {
    return
  }

  if (current === 'shown') {
    emit('shown')
  } else if (current === 'showing') {
    emit('showing')
  } else if (current === 'hidden') {
    emit('hidden')
  } else if (current === 'hiding') {
    emit('hiding')
  }
})

onMounted(() => {
  if (props.opened) {
    show()
  }

  emit('update:overlapped', state.overlapped)
})

onActivated(() => props.opened ? show() : hide())
onDeactivated(hide)
onBeforeUnmount(() => {
  hide()
  detach()
})

const attrs = useAttrs()
const slots = useSlots()

const renderBody = (): VNode => {
  const appearance = props.appearance

  return h(UiTransition, {
    name: 'zoom',
    onBeforeEnter: () => visibilityOfBody.value = 'showing',
    onAfterEnter: () => visibilityOfBody.value = 'shown',
    onBeforeLeave: () => visibilityOfBody.value = 'hiding',
    onAfterLeave: () => visibilityOfBody.value = 'hidden',
  }, () => state.shown ? h('div', {
    ref: body,
    class: {
      'ui-v1-modal-window': true,
      'ui-v1-modal-window_alert': appearance === APPEARANCE.ALERT,
      'ui-v1-modal-window_dialog': appearance === APPEARANCE.DIALOG,
      'ui-v1-modal-window_popup': appearance === APPEARANCE.POPUP,
      'ui-v1-modal-window_hint': appearance === APPEARANCE.HINT,
      'ui-v1-popper-container': true,
    },
  }, slots) : [])
}

const onOverlayClick = (event: Event) => {
  if (event.target === event.currentTarget && !state.overlapped) {
    close(event)
  }
}

const EmbedModalWindowSurface = () => !state.attached ? undefined : h(Teleport, {
  to: globals?.container ?? document.body,
}, h(UiTransition, {
  name: 'fade-2',
  onBeforeEnter: () => visibilityOfOverlay.value = 'showing',
  onAfterEnter: () => visibilityOfOverlay.value = 'shown',
  onBeforeLeave: () => visibilityOfOverlay.value = 'hiding',
  onAfterLeave: () => visibilityOfOverlay.value = 'hidden',
}, {
  default: () => withDirectives(h('div', {
    id: props.id,
    'aria-hidden': visibility.value !== 'shown' ? 'true' : 'false',
    'aria-modal': 'true',
    ...attrs,
    class: [attrs.class, {
      'ui-v1-modal': true,
      'ui-v1-modal_overlapped': state.overlapped,
    }],
    onClick: onOverlayClick,
  }, h(UiScrollBox, {
    class: {
      'ui-v1-modal-window-container': true,
      'ui-v1-modal-window-container_fullscreen': props.fullscreen,
      'ui-v1-modal-window-container_responsive': props.responsive && props.appearance === APPEARANCE.POPUP,
    },
    showOnMac: true,
    native: props.scrolling === SCROLLING.NATIVE,
    onClick: onOverlayClick,
    onPsYReachEnd: (event: Event) => emit('scroll:y:end', event),
    onScroll: (event: Event) => {
      if (!state.overlapped) {
        emit('scroll:y', event, body.value?.getBoundingClientRect()?.toJSON() ?? null)
      }
    },
  }, {
    default: renderBody,
  })), [[vShow, state.shown]]),
}))
</script>

<template>
    <EmbedModalWindowSurface />
</template>

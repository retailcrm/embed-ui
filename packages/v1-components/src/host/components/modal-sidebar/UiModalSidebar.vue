<script lang="ts" setup>
import type { PropType, VNode } from 'vue'

import type { Layer } from '@/host/components/modal/layer'
import type { EmbedModal } from '@/host/components/modal/plugin'

import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'
import UiTransition from '@/host/components/transition/UiTransition.vue'

import IconClear from '~assets/sprites/actions/clear.svg'

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

import { ModalInjectKey } from '@/host/components/modal/plugin'
import { nextAnimationFrame } from '@/host/dom'
import { layers } from '@/host/components/modal/layer'
import uid from '@/host/uid'

import {
  CLOSE_METHOD,
  DIRECTION,
  SCROLLING,
  SIZE,
} from '@/common/components/modal-sidebar'

const props = defineProps({
  /** Атрибут id корневого элемента. Должен быть уникальным на странице */
  id: {
    type: String,
    default: () => uid('embed-modal-sidebar'),
  },

  /** Флаг управления раскрытием панели */
  opened: {
    type: Boolean,
    default: false,
  },

  /** Флаг, указывающий, можно ли закрыть панель */
  closable: {
    type: Boolean,
    default: true,
  },

  /** Определяет направление появления панели */
  direction: {
    type: String as unknown as PropType<DIRECTION>,
    validator: (direction: string) => Object.values(DIRECTION).includes(direction as DIRECTION),
    default: DIRECTION.RIGHT,
  },

  /** Время, через которое плавающий элемент удаляется со страницы, если был скрыт */
  disposeTimeout: {
    type: null as unknown as PropType<number|string|null>,
    default: 5000,
  },

  /** Флаг, задающий фиксированную панель без подложки */
  fixed: {
    type: Boolean,
    default: false,
  },

  /** Тип прокрутки */
  scrolling: {
    type: String as unknown as PropType<SCROLLING>,
    validator: (scrolling: string) => Object.values(SCROLLING).includes(scrolling as SCROLLING),
    default: SCROLLING.NORMAL,
  },

  /** Размер панели */
  size: {
    type: String as unknown as PropType<SIZE>,
    default: SIZE.SM,
  },
})

const emit = defineEmits([
  /** Срабатывает при открытии панели */
  'open',
  /** Срабатывает при закрытии панели. Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar */
  'close',
  /**
   * Срабатывает при попытке закрыть панели, если флаг closable выставлен в false.
   * Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar
   */
  'close-cancel',
  /** Срабатывает при раскрытии и закрытии панели, содержит актуальное значение флага opened */
  'toggle',
  /** Срабатывает при завершении раскрытия */
  'shown',
  /** Срабатывает в начале раскрытия */
  'showing',
  /** Срабатывает при завершении сокрытия */
  'hidden',
  /** Срабатывает в начале сокрытия */
  'hiding',
  /** Изменение значения флага opened */
  'update:opened',
  /** Срабатывает при изменении состояния перекрытия */
  'update:overlapped',
  /** Срабатывает при прокрутке содержимого в самый конец по y-оси */
  'scroll:y:end',
])

const globals = inject<EmbedModal|null>(ModalInjectKey, null)

const state = reactive({
  attached: false,
  shown: false,
  hiding: false,
  detachTimer: null as number | null,
  overlapped: false,
})

const layer = computed<Layer>(() => ({
  id: props.id,
  isBlocker: () => !props.fixed,
  isOverlapped: () => state.overlapped,
  setIsOverlapped: (overlapped: boolean) => {
    if (state.overlapped !== overlapped) {
      state.overlapped = overlapped
      emit('update:overlapped', overlapped)
    }
  },
  emitEscape: () => {
    if (!state.overlapped) {
      close(CLOSE_METHOD.KEY_ESC)
    }
  },
}))

type Visibility = 'showing' | 'shown' | 'hiding' | 'hidden'

const visibilityOfOverlay = ref<Visibility>('hidden')
const visibilityOfSidebar = ref<Visibility>('hidden')
const visibility = computed((): Visibility => {
  switch (true) {
    case 'shown' === visibilityOfOverlay.value && 'shown' === visibilityOfSidebar.value:
      return 'shown'
    case 'showing' === visibilityOfOverlay.value || 'showing' === visibilityOfSidebar.value:
      return 'showing'
    case 'hiding' === visibilityOfOverlay.value || 'hiding' === visibilityOfSidebar.value:
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
    emit('toggle', true)
    emit('open')
  }
}

const hide = (method: CLOSE_METHOD|undefined = undefined) => {
  state.hiding = true

  if (!state.shown) {
    if (state.attached) {
      scheduleDetach()
    }
    return
  }

  state.shown = false
  emit('update:opened', false)
  emit('toggle', false)
  emit('close', method)

  layers.remove(layer.value)

  cancelScheduledDetach()
  scheduleDetach()
}

const close = (method: CLOSE_METHOD|undefined = undefined) => {
  if (props.closable) {
    hide(method)
  } else {
    emit('close-cancel', method)
  }
}

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

const hasSlot = (slotName: string): boolean => slotName in slots
const renderSlot = (slotName: string) => {
  const fn = slots[slotName]
  return fn ? fn({ overlapped: state.overlapped }) : []
}
const normalizeSlot = (slotName: string) => () => renderSlot(slotName)

const renderHeader = (): VNode => {
  return h('header', { class: 'ui-v1-modal-sidebar__header' }, [
    h('div', { class: 'ui-v1-modal-sidebar__header-inner' }, h('div', {
      role: 'heading',
      'aria-level': '1',
      class: 'ui-v1-modal-sidebar__title',
    }, renderSlot('title'))),
    h('div', {
      role: 'button',
      'aria-label': 'Esc',
      class: 'ui-v1-modal-sidebar__close',
      onClick: () => {
        if (!state.overlapped) {
          close(CLOSE_METHOD.CLICK_CROSS)
        }
      },
    }, h(IconClear, {
      width: 32,
      title: 'Esc',
    })),
  ])
}

const renderBody = (): VNode => props.scrolling === SCROLLING.NONE
  ? h('div', { class: 'ui-v1-modal-sidebar__body-fixed' }, renderSlot('default'))
  : h(UiScrollBox, {
    class: 'ui-v1-modal-sidebar__body',
    native: props.scrolling === SCROLLING.NATIVE,
    showOnMac: true,
    onPsYReachEnd: () => emit('scroll:y:end'),
  }, {
    default: normalizeSlot('default'),
  })

const renderFooter = (): VNode[] => hasSlot('footer')
  ? [h('footer', { class: 'ui-v1-modal-sidebar__footer' }, renderSlot('footer'))]
  : []

const renderSidebar = (): VNode => {
  const direction = props.direction
  const size = props.size

  const setVisibility = (visibility: Visibility) => () => visibilityOfSidebar.value = visibility

  return h(UiTransition, {
    name: `slide-${direction}`,
    onBeforeEnter: setVisibility('showing'),
    onAfterEnter: setVisibility('shown'),
    onBeforeLeave: setVisibility('hiding'),
    onAfterLeave: setVisibility('hidden'),
  }, {
    default: () => state.shown ? [
      h('aside', {
        id: props.id + '-sidebar',
        class: {
          'ui-v1-modal-sidebar': true,
          'ui-v1-modal-sidebar_left': direction === DIRECTION.LEFT,
          'ui-v1-modal-sidebar_size_sm': size === SIZE.SM,
          'ui-v1-modal-sidebar_size_lg': size === SIZE.LG,
        },
      }, [
        renderHeader(),
        renderBody(),
        ...renderFooter(),
      ]),
    ] : [],
  })
}

const EmbedModalSidebar = () => {
  const setVisibility = (visibility: Visibility) => () => visibilityOfOverlay.value = visibility

  return !state.attached ? undefined : h(Teleport, {
    to: globals?.container ?? document.body,
  }, h(UiTransition, {
    name: 'fade-2',
    onBeforeEnter: setVisibility('showing'),
    onAfterEnter: setVisibility('shown'),
    onBeforeLeave: setVisibility('hiding'),
    onAfterLeave: setVisibility('hidden'),
  }, {
    default: () => withDirectives(h('div', {
      id: props.id,
      'aria-hidden': visibility.value !== 'shown' ? 'true' : 'false',
      'aria-modal': 'true',
      ...attrs,
      class: [attrs.class, {
        'ui-v1-modal': true,
        'ui-v1-modal_overlapped': state.overlapped,
        'ui-v1-modal-sidebar-overlay': true,
        'ui-v1-modal-sidebar-overlay_fixed': props.fixed,
        [`ui-v1-modal-sidebar-overlay_${props.direction}`]: props.fixed,
      }],
      onClick: (event: Event) => {
        if (event.target === event.currentTarget && !state.overlapped) {
          close(CLOSE_METHOD.CLICK_OUTSIDE)
        }
      },
    }, renderSidebar()), [[vShow, state.shown]]),
  }))
}
</script>

<template>
    <EmbedModalSidebar />
</template>

<style lang="less" src="./modal-sidebar.less" />

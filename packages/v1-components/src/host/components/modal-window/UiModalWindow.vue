<template>
    <UiModalWindowSurface
        :id="id"
        ref="surface"
        :opened="state.opened"
        :closable="closable"
        :appearance="appearance"
        :fullscreen="fullscreen"
        :responsive="responsive"
        :dispose-timeout="disposeTimeout"
        :scrolling="scrolling"
        v-bind="{
            ...$attrs,
            ...($slots.title ? { 'aria-labelledby': id + '-title' } : {})
        }"
        @update:opened="toggle"
        @update:overlapped="state.overlapped = $event"
        @close-cancel="$emit('close-cancel')"
        @shown="$emit('opened')"
        @hidden="$emit('closed')"
        @scroll:y="onScroll"
        @scroll:y:end="$emit('container:scroll:y:end', $event)"
    >
        <div
            :class="{
                'ui-v1-modal-window__header': true,
                'ui-v1-modal-window__header_pinned': $slots.title && state.scrolled
                    && appearance === APPEARANCE.POPUP
                    && !responsive,
            }"
        >
            <div
                v-if="appearance === APPEARANCE.ALERT"
                class="ui-v1-modal-window__icon"
            >
                <!-- @slot Иконка слева от заголовка -->
                <slot name="icon" :overlapped="state.overlapped">
                    <IconWarning />
                </slot>
            </div>

            <div
                v-if="$slots.title"
                :id="id + '-title'"
                class="ui-v1-modal-window__title"
            >
                <!-- @slot Заголовок -->
                <slot name="title" :overlapped="state.overlapped" />
            </div>

            <div
                v-if="appearance !== APPEARANCE.ALERT"
                aria-label="Esc"
                class="ui-v1-modal-window__close"
                role="button"
                @click="state.overlapped ? null : close()"
            >
                <IconClear
                    title="Esc"
                    style="width: 100%"
                />
            </div>
        </div>

        <UiScrollBox
            v-if="responsive"
            class="ui-v1-modal-window__content"
            show-on-mac
            @ps-y-reach-end="$emit('content:scroll:y:end')"
        >
            <!-- @slot Основная разметка -->
            <slot :overlapped="state.overlapped" />
        </UiScrollBox>

        <div
            v-else
            class="ui-v1-modal-window__content"
        >
            <slot :overlapped="state.overlapped" />
        </div>

        <div
            v-if="$slots.footer"
            class="ui-v1-modal-window__footer"
        >
            <div
                v-if="appearance === APPEARANCE.HINT"
                class="ui-v1-modal-window__footer-text"
            >
                <!-- @slot Разметка подвала -->
                <slot name="footer" :overlapped="state.overlapped" />
            </div>

            <slot
                v-else
                name="footer"
                :overlapped="state.overlapped"
            />
        </div>
    </UiModalWindowSurface>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import {
  reactive,
  ref,
  watch,
} from 'vue'

import UiModalWindowSurface from '../modal-window-surface/UiModalWindowSurface.vue'
import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'

import IconClear from '~assets/sprites/actions/clear.svg'
import IconWarning from '~assets/sprites/alerts/warning.svg'

import { expect } from '@/common/utils'
import uid from '@/host/uid'

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

  /** Внешний вид: алерт, диалог, popup, hint */
  appearance: {
    type: String as unknown as PropType<APPEARANCE>,
    validator: (value: string) => expect(value).toBeOneOf(APPEARANCE),
    default: APPEARANCE.POPUP,
  },

  /** Время, через которое плавающий элемент удаляется со страницы, если был скрыт */
  disposeTimeout: {
    type: null as unknown as PropType<number|string|null>,
    default: 5000,
  },

  /** Вывод на весь экран */
  fullscreen: {
    type: Boolean,
    default: false,
  },

  /**
   * Резиновое. Размещено в центре страницы. Отступы от любой границы составляет 32 px.
   * Резиновое не может выходить за пределы браузера, так как контент прокручивается внутри него.
   * Шапка и футер у данного типа окна закреплены и не прокручиваются.
   * При достижении ширины 1 680 px окно перестает увеличиваться и фиксируется по центру браузера.
   */
  responsive: {
    type: Boolean,
    default: false,
  },

  /** Тип прокрутки */
  scrolling: {
    type: String as unknown as PropType<SCROLLING>,
    validator: (scrolling: string) => Object.values(SCROLLING).includes(scrolling as SCROLLING),
    default: SCROLLING.NORMAL,
  },
})

const emit = defineEmits([
  /** Срабатывает при открытии/закрытии */
  'update:opened',
  /** Срабатывает при открытии/закрытии */
  'toggle',
  /** Срабатывает при открытии */
  'open',
  /** Срабатывает при завершении открытия */
  'opened',
  /** Срабатывает при закрытии */
  'close',
  /** Срабатывает при завершении закрытия */
  'closed',
  /** Срабатывает при отмене закрытия */
  'close-cancel',
  /** Срабатывает при прокрутке контейнера */
  'container:scroll:y',
  /** Срабатывает при прокрутке контейнера в самый конец по y-оси */
  'container:scroll:y:end',
  /** Срабатывает при прокрутке контента в самый конец по y-оси */
  'content:scroll:y:end',
])

const state = reactive({
  opened: props.opened,
  scrolled: false,
  overlapped: false,
})

const surface = ref<{ updateScroll: InstanceType<typeof UiScrollBox>['update'] } | null>(null)

const toggle = (force: boolean) => {
  if (state.opened === force) {
    return
  }

  state.opened = force
  emit('update:opened', force)
  emit('toggle', force)

  if (force) {
    emit('open')
  } else {
    emit('close')
  }
}

const open = () => toggle(true)

const close = () => {
  if (props.closable) {
    toggle(false)
  } else {
    emit('close-cancel')
  }
}

const onScroll = (event: Event, bounding: DOMRect | null) => {
  emit('container:scroll:y', event, bounding)
  if (bounding) {
    state.scrolled = bounding.top <= 0
  }
}

defineExpose({
  open,
  close,
  updateScroll: () => surface.value?.updateScroll(),
})

watch(() => props.opened, toggle)
</script>

<style lang="less" src="./modal-window.less" />

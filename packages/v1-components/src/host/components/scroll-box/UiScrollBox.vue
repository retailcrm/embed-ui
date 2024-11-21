<template>
    <component
        :is="tag"
        v-if="(isMac && !showOnMac) || native"
        ref="root"
        v-bind="$attrs"
        class="ui-v1-scroll-box"
        @scroll="onScroll"
    >
        <!-- @slot Содержимое контейнера -->
        <slot />
    </component>

    <PerfectScrollbar
        v-else
        ref="scrollable"
        :class="{ 'ps_visible-on-hover': showOnHover }"
        :tag="tag"
        v-bind="$attrs"
        @ps-y-reach-start="$emit('ps-y-reach-start', $event)"
        @ps-y-reach-end="$emit('ps-y-reach-end', $event)"
        @transitionend="onTransitionEnd"
    >
        <slot />
    </PerfectScrollbar>
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'

import { ref } from 'vue'

import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  /** Наименование тэга-обёртки для нативного скролла */
  tag: {
    type: String,
    default: 'div',
  },

  /** Использовать нативный scroll-box, получаемый через overflow: auto */
  native: {
    type: Boolean,
    default: false,
  },

  /** Показ полосы прокрутки при наведении курсора */
  showOnHover: {
    type: Boolean,
    default: false,
  },

  /** Показ полосы прокрутки на macOS */
  showOnMac: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  /** Появляется при прокрутке до верхнего края */
  'ps-y-reach-start',
  /** Появляется при прокрутке до нижнего края */
  'ps-y-reach-end',
])

const isMac = /Mac/i.test(navigator.userAgent)

const root = ref<HTMLElement | null>(null)
const scrollable = ref<ComponentPublicInstance | null>(null)

const scroll = (y: number) => {
  const el = root.value ?? scrollable.value?.$el as HTMLElement | undefined
  if (el) {
    el.scrollTop = y
  }
}

const update = () => scrollable.value?.$forceUpdate()

defineExpose({
  scroll,
  update,
})

const onScroll = (event: Event): void => {
  const el = event.target as HTMLElement

  if (Math.abs(el.scrollTop - (el.scrollHeight - el.clientHeight)) < 1) {
    emit('ps-y-reach-end', event)
  }

  if (el.scrollTop <= 0) {
    emit('ps-y-reach-start', event)
  }
}

const onTransitionEnd = (e: { propertyName: string }|undefined = undefined) => {
  const oneOf = <T>(variants: T[], thing: unknown) => variants.includes(thing as T)

  if (!props.native && oneOf([
    'height',
    'max-height',
    'opacity',
    'transform',
    'visibility',
  ], e?.propertyName)) {
    update()
  }
}
</script>

<style lang="less" src="./scroll-box.less" />

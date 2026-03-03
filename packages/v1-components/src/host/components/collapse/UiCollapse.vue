<template>
    <transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
    >
        <template v-if="collapseBehaviour === COLLAPSE_BEHAVIOUR.DISPOSE">
            <div v-if="expanded" class="ui-v1-collapse">
                <div>
                    <!-- @slot Слот для коллапсируемого содержимого -->
                    <slot />
                </div>
            </div>
        </template>

        <template v-else>
            <div v-show="expanded" class="ui-v1-collapse">
                <div>
                    <!-- @slot Слот для коллапсируемого содержимого -->
                    <slot />
                </div>
            </div>
        </template>
    </transition>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { onBeforeUnmount } from 'vue'

import { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'

const props = defineProps({
  /** Свёрнут/Развёрнут */
  expanded: {
    type: Boolean,
    default: false,
  },

  /** Поведение при сворачивании */
  collapseBehaviour: {
    type: String as unknown as PropType<COLLAPSE_BEHAVIOUR>,
    default: COLLAPSE_BEHAVIOUR.HIDE,
    validator: (value: string) => Object.values(COLLAPSE_BEHAVIOUR).includes(value as COLLAPSE_BEHAVIOUR),
  },

  /** Продолжительность анимации (в секундах или миллисекундах) */
  duration: {
    type: [Number, String],
    default: undefined,
  },
})

const emit = defineEmits([
  'collapsed',
  'collapsing',
  'expanded',
  'expanding',
])

let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const parseDuration = (value: number | string | undefined): number | null => {
  if (typeof value === 'undefined') {
    return null
  }

  const parsed = Number.parseFloat(String(value))
  if (!Number.isFinite(parsed)) {
    return null
  }

  return parsed <= 10 ? parsed * 1000 : parsed
}

const resolveDuration = (el: Element): number => {
  const fromProp = parseDuration(props.duration as number | string | undefined)
  if (fromProp !== null) {
    return fromProp
  }

  const fromStyle = Number.parseFloat(getComputedStyle(el).transitionDuration) * 1000
  return Number.isFinite(fromStyle) && fromStyle > 0 ? fromStyle : 250
}

const getContentHeight = (el: Element): number => {
  if (!(el instanceof HTMLElement)) {
    return 0
  }

  const content = el.firstElementChild as HTMLElement | null
  return content?.clientHeight ?? 0
}

const onBeforeEnter = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.maxHeight = '0'
    el.style.opacity = '0'
    el.style.overflow = 'hidden'
  }

  emit('expanding')
}

const onEnter = (el: Element, done: () => void) => {
  clearTimer()

  if (el instanceof HTMLElement) {
    el.style.maxHeight = `${getContentHeight(el)}px`
    el.style.opacity = '1'
  }

  timer = setTimeout(() => {
    timer = null
    done()
  }, resolveDuration(el))
}

const onAfterEnter = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.maxHeight = ''
    el.style.overflow = 'visible'
  }

  emit('expanded')
}

const onBeforeLeave = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.maxHeight = `${getContentHeight(el)}px`
    el.style.opacity = '1'
    el.style.overflow = 'hidden'
  }

  emit('collapsing')
}

const onLeave = (el: Element, done: () => void) => {
  clearTimer()

  if (el instanceof HTMLElement) {
    el.style.maxHeight = '0'
    el.style.opacity = '0'
  }

  timer = setTimeout(() => {
    timer = null
    emit('collapsed')
    done()
  }, resolveDuration(el))
}

onBeforeUnmount(() => clearTimer())
</script>

<style lang="less" src="./collapse.less" />

<template>
    <component
        :is="transition ? UiTransition : 'div'"
        v-bind="transition ? {
            appear: true,
            class: 'ui-v1-loader-wrapper',
            name: transition,
        } : {}"
    >
        <div
            :class="{
                'ui-v1-loader': true,
                'ui-v1-loader_fixed': fixed,
                'ui-v1-loader_overlay': overlay,
            }"
            :style="{
                '--diameter': `${diameter}px`,
                '--thickness': `${thickness}px`,
            }"
        >
            <!-- @slot Слот для иконки индикатора -->
            <slot>
                <div class="ui-v1-loader__icon" />
            </slot>
        </div>
    </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import UiTransition from '@/host/components/transition/UiTransition.vue'

defineProps({
  /** Диаметр (размер) окружности индикатора */
  diameter: {
    type: [Number, String],
    default: 40,
  },

  /** Толщина окружности индикатора */
  thickness: {
    type: [Number, String],
    default: 2,
  },

  /** Тип анимации перехода */
  transition: {
    type: null as unknown as PropType<string | null>,
    validator: (value: unknown) => typeof value === 'string' || value === null,
    default: 'fade-2',
  },

  /** Фиксированное позиционирование индикатора */
  fixed: {
    type: Boolean,
    default: false,
  },

  /** Показ полупрозрачной подложки */
  overlay: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="less" src="./loader.less" />

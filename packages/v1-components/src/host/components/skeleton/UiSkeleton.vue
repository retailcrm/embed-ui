<template>
    <div
        :class="{
            'ui-v1-skeleton': true,
            [`ui-v1-skeleton_${appearance}`]: true,
            [`ui-v1-skeleton_${size}`]: true,
            [`ui-v1-skeleton_${animation}`]: true,
        }"
        :style="style"
        aria-hidden="true"
        v-bind="$attrs"
    />
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { Numeric } from '@/common/types'
import type { PropType } from 'vue'

import { computed } from 'vue'

import {
  ANIMATION,
  APPEARANCE,
  guessDimensionStyleValue,
  SIZE,
} from '@/common/components/skeleton'

const props = defineProps({
  /** Визуальная форма скелетона */
  appearance: {
    type: String as PropType<APPEARANCE>,
    validator: (value: APPEARANCE) => Object.values(APPEARANCE).includes(value),
    default: APPEARANCE.RECTANGLE,
  },

  /** Преднастроенный размер */
  size: {
    type: String as PropType<SIZE>,
    validator: (value: SIZE) => Object.values(SIZE).includes(value),
    default: SIZE.MD,
  },

  /** Тип анимации */
  animation: {
    type: String as PropType<ANIMATION>,
    validator: (value: ANIMATION) => Object.values(ANIMATION).includes(value),
    default: ANIMATION.SHIMMER,
  },

  /** Явная ширина. Числовые значения интерпретируются как px */
  width: {
    type: [Number, String] as PropType<Numeric | null>,
    default: null,
  },

  /** Явная высота. Числовые значения интерпретируются как px */
  height: {
    type: [Number, String] as PropType<Numeric | null>,
    default: null,
  },
})

const style = computed<CSSProperties>(() => {
  const width = guessDimensionStyleValue(props.width)
  const height = guessDimensionStyleValue(props.height)

  return {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }
})
</script>

<style lang="less" src="./skeleton.less" />

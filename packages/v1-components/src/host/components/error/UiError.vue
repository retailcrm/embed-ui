<template>
  <div
    :class="{
      'ui-v1-error': true,
      'ui-v1-error_ellipsis': ellipsis,
      'ui-v1-error_right': align === ALIGN.RIGHT,
    }"
  >
    <slot>
      {{ message }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { ALIGN } from '@/common/components/error'

defineProps({
  /** Тест, разметка ошибки */
  message: {
    type: String,
    default: '',
  },

  /** Определяет, по какому краю будет выровнен текст ошибки */
  align: {
    type: String as unknown as PropType<ALIGN>,
    validator: (align: ALIGN) => Object.values(ALIGN).includes(align as unknown as ALIGN),
    default: ALIGN.LEFT,
  },

  /**
   * Определяет, будет ли текст ошибок обрезаться через многоточие или
   *  переноситься на следующую строку
   */
  ellipsis: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" src="./error.less" />

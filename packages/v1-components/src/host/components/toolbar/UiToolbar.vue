<template>
    <slot />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import {
  computed,
  provide,
} from 'vue'

import {
  ToolbarInjectKeys,
  SIZE,
} from './inject'

const props = defineProps({
  size: {
    type: String as PropType<SIZE | `${SIZE}`>,
    default: SIZE.SM,
  },
})

defineOptions({
  inheritAttrs: false,
})

provide(ToolbarInjectKeys.size, computed(() => props.size))
</script>

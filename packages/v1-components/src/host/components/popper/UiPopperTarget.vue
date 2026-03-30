<template>
    <component :is="tag" ref="root" v-bind="$attrs">
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { useElementRef } from '@/host/composables'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  tag: {
    type: String,
    default: 'div',
  },
})

const root = useElementRef()
</script>

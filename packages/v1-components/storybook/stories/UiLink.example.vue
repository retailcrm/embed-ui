<template>
    <UiLink v-bind="$attrs">
        <template v-if="text.length">
            {{ text }}
        </template>
    </UiLink>
</template>

<script lang="ts" setup>
import UiLink from '@/host/components/link/UiLink.vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

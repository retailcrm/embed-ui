<template>
    <UiToolbarLink v-bind="$attrs">
        <template v-if="text.length">
            {{ text }}
        </template>
    </UiToolbarLink>
</template>

<script lang="ts" setup>
import UiToolbarLink from '@/host/components/toolbar-link/UiToolbarLink.vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
    <UiTag v-bind="$attrs">
        <template v-if="text.length">
            {{ text }}
        </template>
    </UiTag>
</template>

<script lang="ts" setup>
import UiTag from '@/host/components/tag/UiTag.vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>
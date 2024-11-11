<template>
    <UiButton v-bind="$attrs">
        <template v-if="text.length">
            {{ text }}
        </template>
    </UiButton>
</template>

<script lang="ts" setup>
import UiButton from '@/host/components/button/UiButton.vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

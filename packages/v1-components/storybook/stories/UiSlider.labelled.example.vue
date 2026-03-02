<template>
    <div style="display: grid; gap: 12px; width: 320px;">
        <UiSlider
            v-model:value="value"
            :type="range ? 'range' : 'single'"
            :min="0"
            :max="100"
            labelled
        >
            <template #label="{ boundary }">
                {{ boundary }}%
            </template>

            <template #handle="{ boundary }">
                {{ boundary }}%
            </template>
        </UiSlider>

        <div>
            <strong>Value:</strong>
            <span v-if="Array.isArray(value)">[{{ value[0] }}, {{ value[1] }}]</span>
            <span v-else>{{ value }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiSlider from '@/host/components/slider/UiSlider.vue'

defineProps({
  range: {
    type: Boolean,
    default: false,
  },
})

const value = ref<number | number[]>([20, 80])
</script>

<template>
    <div style="display: grid; gap: 12px; width: 320px;">
        <UiSlider
            v-model:value="value"
            type="range"
            :min="10"
            :max="60"
        />

        <div><strong>Min/Max:</strong> 10 / 60</div>
        <div><strong>Value:</strong> [{{ value[0] }}, {{ value[1] }}]</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiSlider from '@/host/components/slider/UiSlider.vue'

const value = ref<number[]>([0, 80])
</script>

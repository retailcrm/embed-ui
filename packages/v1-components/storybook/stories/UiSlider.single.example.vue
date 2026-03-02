<template>
    <div style="display: grid; gap: 12px; width: 320px;">
        <UiSlider v-model:value="value" />

        <div><strong>Value:</strong> {{ value }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiSlider from '@/host/components/slider/UiSlider.vue'

const value = ref(20)
</script>

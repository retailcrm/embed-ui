<template>
    <UiNumberStepper
        v-model:value="value"
        :min="0"
        :max="10"
        :step="2"
        :clamp="false"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const value = ref<number | null>(12)
</script>

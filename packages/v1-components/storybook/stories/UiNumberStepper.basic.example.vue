<template>
    <UiNumberStepper
        v-model:value="value"
        :min="0"
        :max="100"
        :step="1"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const value = ref<number | null>(10)
</script>

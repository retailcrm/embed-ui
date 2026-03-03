<template>
    <UiNumberStepper
        v-model:value="value"
        direction="vertical"
        :min="0"
        :max="10"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const value = ref<number | null>(5)
</script>

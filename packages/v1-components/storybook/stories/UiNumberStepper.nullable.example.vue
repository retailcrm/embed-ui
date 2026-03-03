<template>
    <UiNumberStepper
        v-model:value="value"
        nullable
        :min="-100"
        :max="100"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const value = ref<number | null>(null)
</script>

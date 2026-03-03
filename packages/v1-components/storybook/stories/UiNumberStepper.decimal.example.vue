<template>
    <UiNumberStepper
        v-model:value="value"
        :min="-5"
        :max="5"
        :step="0.25"
        :decimals="2"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const value = ref<number | null>(1.5)
</script>

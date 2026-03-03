<template>
    <div style="display: grid; gap: 12px;">
        <UiNumberStepper
            v-model:value="small"
            :outlined="false"
            size="sm"
            :min="0"
            :max="20"
        />

        <UiNumberStepper
            v-model:value="large"
            :outlined="false"
            size="md"
            :min="0"
            :max="20"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiNumberStepper } from '@/host'

const small = ref<number | null>(5)
const large = ref<number | null>(10)
</script>

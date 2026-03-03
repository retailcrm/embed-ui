<template>
    <div style="display: inline-block;">
        <UiDatePicker
            v-model:value="value"
            placeholder="Select date"
        />

        <div style="margin-top: 8px; font-size: 12px; color: #666;">
            Selected: {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

const value = ref<Date | null>(new Date('2024-11-21T00:00:00'))

const label = computed(() => value.value ? value.value.toISOString() : 'null')
</script>

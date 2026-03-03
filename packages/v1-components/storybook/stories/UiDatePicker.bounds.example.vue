<template>
    <div style="display: inline-block;">
        <UiDatePicker
            v-model:value="value"
            :min-date="minDate"
            :max-date="maxDate"
            placeholder="Choose date in available range"
        />

        <div style="margin-top: 8px; font-size: 12px; color: #666;">
            Allowed: {{ minDate.toISOString() }} - {{ maxDate.toISOString() }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

const minDate = new Date('2024-11-05T00:00:00')
const maxDate = new Date('2024-11-25T00:00:00')

const value = ref<Date | null>(new Date('2024-11-14T00:00:00'))
</script>

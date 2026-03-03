<template>
    <div style="display: grid; gap: 8px;">
        <UiTimePicker
            v-model:value="value"
            :min-time="[9, 30]"
            :max-time="[18, 0]"
            placeholder="Working hours"
        />

        <div style="font-size: 12px; color: #666;">
            Range: 09:30 - 18:00, value: {{ value || '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const value = ref('11:00')
</script>

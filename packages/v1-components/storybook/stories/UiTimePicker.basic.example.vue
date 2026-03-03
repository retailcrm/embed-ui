<template>
    <div style="display: grid; gap: 8px;">
        <UiTimePicker
            v-model:value="value"
            placeholder="Select time"
        />

        <div style="font-size: 12px; color: #666;">
            Selected: {{ value || '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const value = ref('10:30')
</script>

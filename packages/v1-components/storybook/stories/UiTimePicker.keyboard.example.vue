<template>
    <div style="display: grid; gap: 8px;">
        <UiTimePicker
            v-model:value="value"
            placeholder="Use keyboard"
        />

        <div style="font-size: 12px; color: #666;">
            Try: ArrowDown/ArrowUp, Enter, Escape, Tab
        </div>

        <div style="font-size: 12px; color: #666;">
            Value: {{ value || '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const value = ref('08:00')
</script>

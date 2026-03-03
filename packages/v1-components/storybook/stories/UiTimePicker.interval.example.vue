<template>
    <div style="display: grid; gap: 8px;">
        <UiTimePicker
            v-model:value="value"
            :interval="15"
            placeholder="15 min interval"
        />

        <div style="font-size: 12px; color: #666;">
            Step: 15 min, value: {{ value || '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const value = ref('09:45')
</script>

<template>
    <div style="display: grid; gap: 8px;">
        <UiTimePicker
            v-model:value="value"
            :time-variants="variants"
            placeholder="Custom variants"
        />

        <div style="font-size: 12px; color: #666;">
            Value: {{ value || '—' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const value = ref('12:25')

const variants = [
  '09:00',
  '09:30',
  '10:00',
  '12:25',
  '16:00',
]
</script>

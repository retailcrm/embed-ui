<template>
    <div style="display: grid; gap: 8px;">
        <UiDatePicker
            v-model:value="value"
            type="range"
            placeholder="Select period"
        />

        <div style="font-size: 12px; color: #666;">
            Selected: {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

const value = ref<Date[] | null>([
  new Date('2024-11-10T00:00:00'),
  new Date('2024-11-19T00:00:00'),
])

const label = computed(() => {
  if (!value.value || value.value.length === 0) {
    return 'null'
  }

  return value.value.map((date) => date.toISOString()).join(' - ')
})
</script>

<template>
    <div style="display: grid; gap: 12px; width: 320px;">
        <UiCalendar
            v-model:value="value"
            type="range"
            :min-date="minDate"
            :max-date="maxDate"
        />

        <div><strong>Min:</strong> {{ minDate.toDateString() }}</div>
        <div><strong>Max:</strong> {{ maxDate.toDateString() }}</div>
        <div><strong>Value:</strong> {{ valueLabel }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const minDate = new Date('2024-11-05')
const maxDate = new Date('2024-11-25')

const value = ref<Date[]>([
  new Date('2024-11-10'),
  new Date('2024-11-19'),
])

const valueLabel = computed(() => {
  if (value.value.length === 0) return '[]'
  if (value.value.length === 1) return `[${value.value[0].toDateString()}]`

  return `[${value.value[0].toDateString()} - ${value.value[1].toDateString()}]`
})
</script>

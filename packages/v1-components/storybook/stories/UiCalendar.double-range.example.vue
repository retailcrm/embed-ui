<template>
    <div style="display: grid; gap: 12px;">
        <UiCalendar
            v-model:value="value"
            appearance="double"
            type="range"
        />

        <div><strong>Value:</strong> {{ valueLabel }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const value = ref<Date[]>([
  new Date('2024-11-10'),
  new Date('2024-12-08'),
])

const valueLabel = computed(() => {
  if (value.value.length === 0) return '[]'
  if (value.value.length === 1) return `[${value.value[0].toDateString()}]`

  return `[${value.value[0].toDateString()} - ${value.value[1].toDateString()}]`
})
</script>

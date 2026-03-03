<template>
    <div style="display: inline-block;">
        <UiDatePicker
            v-model:value="value"
            synchronization="confirmed"
            :quick-options="quickOptions"
            placeholder="Use quick options"
        />

        <div style="margin-top: 8px; font-size: 12px; color: #666;">
            Applied: {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { QuickOption } from '@/common/components/date-picker'

import { computed, ref } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

const value = ref<Date | Date[] | null>(new Date('2024-11-21T00:00:00'))

const quickOptions: QuickOption[] = [
  { label: 'Today', value: new Date('2024-11-21T00:00:00') },
  { label: 'Yesterday', value: new Date('2024-11-20T00:00:00') },
  { label: 'This week', value: [new Date('2024-11-18T00:00:00'), new Date('2024-11-24T00:00:00')] },
]

const label = computed(() => {
  if (!value.value) {
    return 'null'
  }

  return Array.isArray(value.value)
    ? value.value.map((date) => date.toISOString()).join(' - ')
    : value.value.toISOString()
})
</script>

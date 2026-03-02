<template>
    <UiCalendar
        v-model:value="value"
        type="range"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const value = ref<Date[]>([
  new Date('2024-11-10'),
  new Date('2024-11-19'),
])
</script>

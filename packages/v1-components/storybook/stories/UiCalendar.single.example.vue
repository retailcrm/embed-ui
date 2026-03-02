<template>
    <UiCalendar v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const value = ref<Date | null>(new Date())
</script>

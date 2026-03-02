<template>
    <div style="display: grid; gap: 12px; width: 320px;">
        <UiCalendar
            v-model:value="value"
            nullable
        />

        <div>
            <strong>Value:</strong>
            <span v-if="value">
                {{ value.toDateString() }}
            </span>
            <span v-else>
                null
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const value = ref<Date | null>(new Date('2024-11-21'))
</script>

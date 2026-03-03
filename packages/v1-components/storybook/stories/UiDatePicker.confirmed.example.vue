<template>
    <div style="display: inline-block;">
        <UiDatePicker
            v-model:value="value"
            synchronization="confirmed"
            placeholder="Select date and confirm"
        />

        <div style="margin-top: 8px; font-size: 12px; color: #666;">
            Applied: {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

const value = ref<Date | null>(null)

const label = computed(() => value.value ? value.value.toISOString() : 'null')
</script>

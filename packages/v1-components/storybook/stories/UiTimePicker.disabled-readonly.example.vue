<template>
    <div style="display: grid; gap: 16px; max-width: 220px;">
        <div style="display: grid; gap: 8px;">
            <div style="font-size: 12px; color: #666;">
                Disabled
            </div>

            <UiTimePicker
                value="10:30"
                disabled
            />
        </div>

        <div style="display: grid; gap: 8px;">
            <div style="font-size: 12px; color: #666;">
                Readonly
            </div>

            <UiTimePicker
                value="14:00"
                readonly
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'
</script>

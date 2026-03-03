<template>
    <div style="display: grid; gap: 12px; width: 420px;">
        <UiAddButton color="blue">
            Add Button

            <template #description>
                Description
            </template>
        </UiAddButton>

        <UiAddButton
            color="blue"
            disabled
        >
            Add Button

            <template #description>
                Description
            </template>
        </UiAddButton>
    </div>
</template>

<script setup lang="ts">
import UiAddButton from '@/host/components/add-button/UiAddButton.vue'
</script>

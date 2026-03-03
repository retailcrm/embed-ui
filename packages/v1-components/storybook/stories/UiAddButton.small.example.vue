<template>
    <div style="display: flex; align-items: center; gap: 16px;">
        <UiAddButton small>
            Add Button
        </UiAddButton>

        <UiAddButton
            small
            disabled
        >
            Add Button
        </UiAddButton>
    </div>
</template>

<script setup lang="ts">
import UiAddButton from '@/host/components/add-button/UiAddButton.vue'
</script>

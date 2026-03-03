<template>
    <div style="display: grid; gap: 12px; width: 420px;">
        <UiAddButton :height="120">
            Add Button
        </UiAddButton>

        <UiAddButton height="50%">
            Add Button
        </UiAddButton>
    </div>
</template>

<script setup lang="ts">
import UiAddButton from '@/host/components/add-button/UiAddButton.vue'
</script>

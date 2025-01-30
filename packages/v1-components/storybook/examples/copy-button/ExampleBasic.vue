<template>
    <UiCopyButton text="Текст для копирования" size="sm">
        <template #hint>
            Скопировать
        </template>

        <template #hint-copied>
            Скопировано
        </template>
    </UiCopyButton>
</template>

<script lang="ts" setup>
import UiCopyButton from '@/host/components/copy-button/UiCopyButton.vue'
</script>

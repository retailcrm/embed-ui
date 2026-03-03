<template>
    <div style="width: 640px;">
        <UiCollapseBox disabled>
            <template #icon>
                <IconSettingsOutlined />
            </template>

            <template #title>
                Locked settings
            </template>

            <template #description>
                This block is disabled and cannot be expanded.
            </template>

            <template #body-content>
                <p>Hidden content.</p>
            </template>
        </UiCollapseBox>
    </div>
</template>

<script setup lang="ts">
import IconSettingsOutlined from '~assets/sprites/ui/settings-outlined.svg'
import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'
</script>

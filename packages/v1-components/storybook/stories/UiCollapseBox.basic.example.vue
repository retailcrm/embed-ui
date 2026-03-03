<template>
    <div style="width: 640px;">
        <UiCollapseBox v-model:expanded="expanded">
            <template #icon>
                <IconSettingsOutlined />
            </template>

            <template #title>
                Account settings
            </template>

            <template #description>
                Main configuration for your account.
            </template>

            <template #body-content>
                <p>Here you can configure profile, credentials and notification rules.</p>
            </template>
        </UiCollapseBox>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import IconSettingsOutlined from '~assets/sprites/ui/settings-outlined.svg'
import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'

const expanded = ref(true)
</script>

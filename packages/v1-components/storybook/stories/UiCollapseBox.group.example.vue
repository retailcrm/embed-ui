<template>
    <div style="display: grid; gap: 12px; width: 640px;">
        <div><strong>Active id:</strong> {{ activeBoxId ?? 'none' }}</div>

        <UiCollapseGroup v-model:activeBoxId="activeBoxId">
            <UiCollapseBox id="general" color="blue">
                <template #icon>
                    <IconSettingsOutlined />
                </template>

                <template #title>
                    General settings
                </template>

                <template #description>
                    Common parameters for the integration.
                </template>

                <template #body-content>
                    Base URL, retries, timezone and default language.
                </template>
            </UiCollapseBox>

            <UiCollapseBox id="api" color="green">
                <template #icon>
                    <IconCode />
                </template>

                <template #title>
                    API settings
                </template>

                <template #description>
                    Manage tokens and webhook endpoints.
                </template>

                <template #body-content>
                    Token, signature key and callback URL.
                </template>
            </UiCollapseBox>
        </UiCollapseGroup>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import IconCode from '~assets/sprites/technology-and-data/code.svg'
import IconSettingsOutlined from '~assets/sprites/ui/settings-outlined.svg'
import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'
import UiCollapseGroup from '@/host/components/collapse-box/UiCollapseGroup.vue'

const activeBoxId = ref<string | null>('general')
</script>

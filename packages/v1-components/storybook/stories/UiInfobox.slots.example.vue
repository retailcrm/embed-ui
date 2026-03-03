<template>
    <div style="width: 680px;">
        <UiInfobox
            v-model:expanded="expanded"
            expandable
        >
            <template #icon>
                <IconSettingsOutlined />
            </template>

            <template #title>
                Custom slots
            </template>

            <template #toggle="{ expanded: isExpanded }">
                {{ isExpanded ? 'Less' : 'More' }}
            </template>

            Slot API allows replacing icon, title and toggle label.
        </UiInfobox>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

import IconSettingsOutlined from '~assets/sprites/ui/settings-outlined.svg'

const expanded = ref(false)
</script>

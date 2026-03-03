<template>
    <div style="width: 680px;">
        <UiInfobox
            v-model:expanded="expanded"
            title="Connection details"
            expandable
        >
            <template #toggle="{ expanded: isExpanded }">
                {{ isExpanded ? 'Hide details' : 'Show details' }}
            </template>

            Keep credentials secure and rotate them regularly.
        </UiInfobox>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

const expanded = ref(false)
</script>

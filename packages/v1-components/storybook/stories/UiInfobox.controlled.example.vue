<template>
    <div style="display: grid; gap: 8px; width: 680px;">
        <div style="display: flex; gap: 8px;">
            <button type="button" @click="shown = !shown">
                {{ shown ? 'Hide' : 'Show' }}
            </button>

            <button
                type="button"
                :disabled="!expandable"
                @click="expanded = !expanded"
            >
                {{ expanded ? 'Collapse' : 'Expand' }}
            </button>
        </div>

        <UiInfobox
            v-model:shown="shown"
            v-model:expanded="expanded"
            :expandable="expandable"
            title="Controlled infobox"
        >
            State is controlled from external buttons.
        </UiInfobox>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

const shown = ref(true)
const expanded = ref(false)
const expandable = ref(true)
</script>

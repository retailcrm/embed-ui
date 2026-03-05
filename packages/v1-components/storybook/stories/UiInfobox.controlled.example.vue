<template>
    <div style="display: grid; gap: 8px; width: 680px;">
        <div style="display: flex; gap: 8px;">
            <UiButton
                appearance="secondary"
                style="flex: none; align-self: flex-start;"
                @click="shown = !shown"
            >
                {{ shown ? 'Hide' : 'Show' }}
            </UiButton>

            <UiButton
                appearance="secondary"
                style="flex: none; align-self: flex-start;"
                :disabled="!expandable"
                @click="expanded = !expanded"
            >
                {{ expanded ? 'Collapse' : 'Expand' }}
            </UiButton>
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

import UiButton from '@/host/components/button/UiButton.vue'
import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

const shown = ref(true)
const expanded = ref(false)
const expandable = ref(true)
</script>

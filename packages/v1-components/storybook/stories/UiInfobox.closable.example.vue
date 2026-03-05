<template>
    <div style="display: grid; gap: 8px; width: 680px;">
        <UiInfobox
            v-model:shown="shown"
            closable
            title="You can close this infobox"
        >
            Use closable mode when info can be dismissed by the user.
        </UiInfobox>

        <UiButton
            v-if="!shown"
            appearance="secondary"
            style="justify-self: start; width: fit-content;"
            @click="shown = true"
        >
            Show again
        </UiButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

const shown = ref(true)
</script>

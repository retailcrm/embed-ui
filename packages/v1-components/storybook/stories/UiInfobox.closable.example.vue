<template>
    <div style="display: grid; gap: 8px; width: 680px;">
        <UiInfobox
            v-model:shown="shown"
            closable
            title="You can close this infobox"
        >
            Use closable mode when info can be dismissed by the user.
        </UiInfobox>

        <button
            v-if="!shown"
            type="button"
            @click="shown = true"
        >
            Show again
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

const shown = ref(true)
</script>

<template>
    <div style="display: grid; gap: 12px; width: 420px;">
        <button type="button" @click="expanded = !expanded">
            {{ expanded ? 'Hide details' : 'Show details' }}
        </button>

        <UiCollapse :expanded="expanded">
            <div style="border: 1px solid #d5dbe3; border-radius: 8px; background: #f7f9fc; padding: 12px;">
                This block is shown or hidden with the `expanded` prop.
            </div>
        </UiCollapse>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiCollapse from '@/host/components/collapse/UiCollapse.vue'

const expanded = ref(false)
</script>

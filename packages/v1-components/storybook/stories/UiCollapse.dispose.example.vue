<template>
    <div style="display: grid; gap: 12px; width: 420px;">
        <UiButton appearance="secondary" @click="expanded = !expanded">
            {{ expanded ? 'Unmount content' : 'Mount content' }}
        </UiButton>

        <UiCollapse
            :expanded="expanded"
            collapse-behaviour="dispose"
        >
            <div style="border: 1px solid #d5dbe3; border-radius: 8px; background: #f7f9fc; padding: 12px;">
                In `dispose` mode this node is removed from DOM when collapsed.
            </div>
        </UiCollapse>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiCollapse from '@/host/components/collapse/UiCollapse.vue'

const expanded = ref(true)
</script>

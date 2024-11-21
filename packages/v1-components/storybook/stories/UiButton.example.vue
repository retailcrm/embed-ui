<template>
    <UiButton v-bind="$attrs">
        <template v-if="text.length">
            <IconDone v-if="showIcon" />
            {{ text }}
        </template>
    </UiButton>
</template>

<script lang="ts" setup>
import UiButton from '@/host/components/button/UiButton.vue'

import IconDone from '~assets/sprites/actions/done.svg'

defineProps({
  text: {
    type: String,
    default: '',
  },

  showIcon: {
    type: Boolean,
    default: false,
  },
})
</script>

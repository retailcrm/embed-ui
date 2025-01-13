<template>
    <UiAvatar v-bind="$attrs">
        <template v-if="text.length">
            <IconDone v-if="showIcon" />
            {{ text }}
        </template>
    </UiAvatar>
</template>

<script lang="ts" setup>
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'

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

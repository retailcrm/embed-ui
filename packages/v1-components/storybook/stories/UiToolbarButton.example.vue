<template>
    <UiToolbar :size="size">
        <UiToolbarButton v-bind="$attrs">
            <template v-if="text.length">
                <IconDone v-if="showIcon" />
                {{ text }}
            </template>
        </UiToolbarButton>
    </UiToolbar>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import UiToolbar from '@/host/components/toolbar/UiToolbar.vue'
import UiToolbarButton from '@/host/components/toolbar/UiToolbarButton.vue'

import { SIZE } from '@/host/components/toolbar/inject'

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

  size: {
    type: String as PropType<SIZE | `${SIZE}`>,
    default: SIZE.SM,
  },
})
</script>

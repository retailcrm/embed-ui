<template>
    <UiButton
        v-if="!absent"
        :aria-label="label"
        appearance="tertiary"
        class="ui-v1-calendar-navigation__button"
        @click="$emit('click')"
    >
        <IconChevronRight
            :class="{
                'ui-v1-calendar-navigation__icon': true,
                'ui-v1-calendar-navigation__icon_prev': direction === 'prev',
            }"
            aria-hidden="true"
        />
    </UiButton>

    <div
        v-else
        aria-hidden="true"
        class="ui-v1-calendar-navigation__placeholder"
    />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import IconChevronRight from '~assets/sprites/arrows/chevron-right.svg'

import { UiButton } from '@/host'

defineProps({
  label: {
    type: String,
    default: '',
  },

  direction: {
    type: String as unknown as PropType<'prev' | 'next'>,
    validator: (direction: string) => ['prev', 'next'].includes(direction),
    default: 'prev',
  },

  absent: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

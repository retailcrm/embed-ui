<template>
    <UiScrollBox
        class="ui-v1-date-picker__quick-menu"
        role="menu"
        native
    >
        <UiMenuItem
            v-for="(item, index) in items"
            :key="'quick-item-' + index"
            :active="isActive(item.value)"
            :aria-current="isActive(item.value) ? 'true' : 'false'"
            :size="SIZE.SM"
            role="menuitem"
            @click="onClick(item.value)"
        >
            {{ item.label }}
        </UiMenuItem>
    </UiScrollBox>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { QuickDate, QuickOption } from '@/common/components/date-picker'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'

import { isQuickDate, isQuickDateEqual } from '@/common/components/date-picker'
import { SIZE } from '@/common/components/menu'

const props = defineProps({
  value: {
    type: null as unknown as PropType<QuickDate>,
    validator: (value: unknown) => isQuickDate(value),
    default: null,
  },

  items: {
    type: Array as unknown as PropType<QuickOption[]>,
    default: () => ([]),
  },

  nullable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'change': [value: QuickDate];
}>()

const isActive = (date: QuickDate): boolean => isQuickDateEqual(props.value, date)

const onClick = (date: QuickDate): void => {
  emit('change', props.nullable && isActive(date) ? null : date)
}
</script>

<template>
    <button
        :type="type"
        class="ui-v1-table__footer-button"
        v-bind="$attrs"
    >
        <span class="ui-v1-table__footer-button-content">
            <slot />
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { UiTableFooterButtonType } from '@/common/components/table'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  type: {
    type: String as PropType<UiTableFooterButtonType>,
    default: 'button' as UiTableFooterButtonType,
    validator: (type: string) => ['button', 'submit', 'reset'].includes(type),
  },
})
</script>

<style lang="less" src="./table.less" />

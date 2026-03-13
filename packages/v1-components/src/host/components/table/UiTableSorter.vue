<template>
    <button
        type="button"
        class="ui-v1-table__sorter"
        v-bind="$attrs"
    >
        <svg
            aria-hidden="true"
            class="ui-v1-table__sorter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                :class="{
                    'ui-v1-table__sorter-path': true,
                    'ui-v1-table__sorter-path_active': direction === DIRECTION.ASC,
                }"
                d="M16.3,8.3c0-0.1-0.1-0.3-0.1-0.4l-3.8-3.8c-0.2-0.2-0.5-0.2-0.7,0c0,0,0,0,0,0L7.9,7.9c-0.2,0.2-0.2,0.5,0,0.7c0,0,0,0,0,0l0.2,0.2C8.2,8.9,8.3,9,8.4,9h7.2c0.1,0,0.3-0.1,0.4-0.1l0.2-0.2C16.2,8.6,16.3,8.4,16.3,8.3z"
            />

            <path
                :class="{
                    'ui-v1-table__sorter-path': true,
                    'ui-v1-table__sorter-path_active': direction === DIRECTION.DESC,
                }"
                d="M7.7,15.7c0,0.1,0.1,0.3,0.1,0.4l3.8,3.8c0.2,0.2,0.5,0.2,0.7,0c0,0,0,0,0,0l3.8-3.8c0.2-0.2,0.2-0.5,0-0.7c0,0,0,0,0,0l-0.2-0.2c-0.1-0.1-0.2-0.2-0.4-0.1H8.4c-0.1,0-0.3,0.1-0.4,0.1l-0.2,0.2C7.8,15.4,7.7,15.6,7.7,15.7z"
            />
        </svg>

        <span class="ui-v1-table__sorter-label">
            <slot />
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { DIRECTION } from '@/common/components/table'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  direction: {
    type: String as PropType<DIRECTION | `${DIRECTION}` | null>,
    default: null,
    validator: (direction: string | null) => direction === null || Object.values(DIRECTION).includes(direction as DIRECTION),
  },
})
</script>

<style lang="less" src="./table.less" />

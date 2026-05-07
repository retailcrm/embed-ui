<template>
    <UiPopperTarget
        tag="div"
        class="ui-v1-popconfirm-anchor"
        v-bind="$attrs"
        @click="$emit('click', $event)"
    >
        <!-- @slot Целевой элемент, открывающий окно подтверждения -->
        <slot :open="visible" />
    </UiPopperTarget>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { UiPopconfirmTriggerProperties } from '@/common/components/popconfirm'

import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  /** Флаг видимости окна подтверждения */
  visible: {
    type: Boolean as PropType<UiPopconfirmTriggerProperties['visible']>,
    default: false,
  },
})

defineEmits<{
  'click': [event: MouseEvent];
}>()
</script>

<style lang="less" src="./popconfirm.less" />

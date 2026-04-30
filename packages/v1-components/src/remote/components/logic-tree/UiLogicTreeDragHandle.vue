<template>
    <RemoteDragHandle
        :for="props.for"
        :disabled="props.disabled"
        :class="{
            'ui-v1-logic-tree-drag-handle_disabled': props.disabled,
        }"
        as="span"
        class="ui-v1-logic-tree-drag-handle"
        data-skip-node-click="true"
    >
        <slot>
            <IconDrag aria-hidden="true" />
        </slot>
    </RemoteDragHandle>
</template>

<script lang="ts" remote setup>
import { RemoteDragHandle } from '@omnicajs/vue-remote/remote'

import IconDrag from '~assets/sprites/actions/drag.svg'

const props = withDefaults(defineProps<{
  disabled?: boolean;
  for?: string;
}>(), {
  disabled: false,
  for: undefined,
})
</script>

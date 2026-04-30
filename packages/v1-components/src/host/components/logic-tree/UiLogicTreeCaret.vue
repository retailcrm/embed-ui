<template>
    <IconCaretDown
        :class="{
            'ui-v1-logic-tree-caret': true,
            'ui-v1-logic-tree-caret_active': active,
        }"
        aria-hidden="true"
    />
</template>

<script lang="ts" setup>
import type { UiLogicTreeCaretProperties } from '@/common/components/logic-tree'

import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'

withDefaults(defineProps<UiLogicTreeCaretProperties>(), {
  active: false,
})
</script>

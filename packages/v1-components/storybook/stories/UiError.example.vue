<template>
    <UiError v-bind="$attrs" :class="$style['container']">
        <template v-if="useSlot">
            <div :class="$style['content']">
                <IconError :class="$style['icon']" />
                Error message with icon
            </div>
        </template>
    </UiError>
</template>

<script lang="ts" setup>
import UiError from '@/host/components/error/UiError.vue'

import IconError from '~assets/sprites/alerts/error.svg'

defineProps({
  useSlot: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/geometry.less';
@import (reference) '~assets/stylesheets/palette.less';
@import (reference) '~assets/stylesheets/variables.less';

.container {
  border: 1px solid @grey-300;
  border-radius: 8px;
  padding: 8px;
}

.content {
  display: flex;
  align-items: center;
  gap: @spacing-xxs;
}

.icon {
  .square(16px);
}
</style>

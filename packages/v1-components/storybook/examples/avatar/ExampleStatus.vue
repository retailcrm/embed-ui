<template>
    <div :class="$style['container']">
        <div v-for="(status, index) in STATUS" :key="index">
            <UiAvatar
                src="https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg"
                :size="size"
                :status="status"
            />
        </div>
    </div>
</template>

<script setup>
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'

import { STATUS } from '@/common/components/avatar'

defineProps({
  size: {
    type: String,
    default: 'sm',
  },
})
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/geometry.less';
@import (reference) '~assets/stylesheets/palette.less';

.container {
  display: flex;
  justify-content: center;
  padding: 16px;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;
}

.container > * {
  margin-right: 10px;
}
</style>

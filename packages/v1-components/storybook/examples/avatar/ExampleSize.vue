<template>
    <div :class="$style['container']">
        <UiAvatar :src="src" :size="size" />
        <UiAvatar :size="size">
            ЧС
        </UiAvatar>

        <template v-if="size !== 'xs'">
            <UiAvatar :src="src" :size="size" vip bad />
            <UiAvatar :src="src" :size="size" vip />
            <UiAvatar :src="src" :size="size" bad />
            <UiAvatar :size="size" bad>
                ЧС
            </UiAvatar>
        </template>
    </div>
</template>

<script setup>
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'

defineProps({
  size: {
    type: String,
    default: 'sm',
  },
})

const src = 'https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg'
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

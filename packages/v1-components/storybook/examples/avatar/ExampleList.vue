<template>
    <div :class="$style['container']">
        <UiAvatarList v-for="(size, i) in SIZE" :key="i" :size="size">
            <div
                v-for="(avatar, j) in [
                    { src: '', name: 'ЧC' },
                    { src: image, name: 'ЧС' },
                    { src: '', name: 'XC' },
                    { src: image, name: 'ЧС' },
                    { src: image, name: 'ЧС' },
                    { src: '', name: '+8' },
                ].slice(0, countAvatars)"
                :key="j"
                class="ui-v1-avatar-list__item"
            >
                <UiAvatar :src="avatar.src">
                    {{ avatar.name }}
                </UiAvatar>
            </div>
        </UiAvatarList>
    </div>
</template>

<script setup>
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'
import UiAvatarList from '@/host/components/avatar/UiAvatarList.vue'

import { SIZE } from '@/common/components/avatar'

defineProps({
  countAvatars: {
    type: Number,
    default: 0,
  },
})

const image = 'https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg'
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/geometry.less';
@import (reference) '~assets/stylesheets/palette.less';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;
}

.container > * {
  margin-bottom: 10px;
}
</style>

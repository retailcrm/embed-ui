<template>
    <UiMenuItem
        :class="$style['item']"
        :size="size"
        :counter="counter"
        :accent="accent"
    >
        {{ text }}

        <template v-if="avatar" #avatar>
            <UiAvatar :name="text" />
        </template>

        <template v-if="description" #description>
            {{ description }}
        </template>

        <template v-if="leadingIcon" #leading-icon>
            <IconUserOutlined :class="$style['icon']" />
        </template>

        <template v-if="trailingIcon" #trailing-icon>
            <IconCheckmarkCircle :class="$style['icon']" />
        </template>
    </UiMenuItem>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import IconUserOutlined from '~assets/sprites/user/user-outlined.svg'
import IconCheckmarkCircle from '~assets/sprites/actions/checkmark-circle.svg'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'

import { SIZE } from '@/common/components/menu'

defineProps({
  avatar: {
    type: Boolean,
    default: false,
  },

  text: {
    type: String,
    default: 'Audrey Robertson',
  },

  description: {
    type: String,
    default: '',
  },

  counter: {
    type: [String, Number],
    default: null,
  },

  size: {
    type: String as PropType<SIZE | `${SIZE}`>,
    default: SIZE.MD,
  },

  accent: {
    type: Boolean,
    default: false,
  },

  leadingIcon: {
    type: Boolean,
    default: false,
  },

  trailingIcon: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/palette.less';

.item { max-width: 220px; }

.icon { color: @blue-500; }
</style>

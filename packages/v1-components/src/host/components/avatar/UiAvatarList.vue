<template>
    <div :class="['ui-v1-avatar-list', `ui-v1-avatar-list_${size}`]">
        <div
            v-for="(avatar, index) in avatars"
            :key="index"
            class="ui-v1-avatar-list__item"
        >
            <UiAvatar
                :src="avatar.src"
                :name="avatar.name"
            />
        </div>

        <!-- Содержимое компонента -->
        <slot />
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import UiAvatar from './UiAvatar.vue'

import {
  computed,
  provide,
} from 'vue'

import { AvatarSizeKey } from './injection'

import { SIZE } from '@/common/components/avatar'

const props = defineProps({
  /** Список аватарок пользователей */
  avatars: {
    type: Array as unknown as PropType<Array<{ src: string; name: string }>>,
    default: () => ([]),
  },

  /** Размер аватарок */
  size: {
    type: String as unknown as PropType<SIZE>,
    validator: size => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.SM,
  },
})

provide(AvatarSizeKey, computed(() => props.size))
</script>

<template>
    <component
        :is="href ? 'a' : 'div'"
        ref="root"
        :href="href || undefined"
        :class="{
            ['ui-v1-avatar']: true,
            [`ui-v1-avatar_${size}`]: true,
            ['ui-v1-avatar_bad']: bad,
            ['ui-v1-avatar_vip']: vip,
        }"
        v-bind="$attrs"
    >
        <UiImage
            v-if="src"
            :src="src"
            :resize="optimization.resize"
            :crop="optimization.crop"
            class="ui-v1-avatar__image"
            draggable="false"
            @load="loaded = true"
            @error="loaded = false"
        />

        <div v-else-if="!src && unresolved" class="ui-v1-avatar__unresolved">
            <IconHelpOutlined />
        </div>

        <span
            v-if="status && !(vip || bad)"
            :class="{
                ['ui-v1-avatar__status']: true,
                [`ui-v1-avatar__status_${size}`]: true,
                [`ui-v1-avatar__status_${status}`]: status,
            }"
        />

        <div v-if="!(unresolved || loaded)" class="ui-v1-avatar__initials">
          <!-- @slot Инициалы пользователя -->
          <slot>{{ initials }}</slot>
        </div>

        <div v-if="vip || bad" class="ui-v1-avatar__labels">
            <span v-if="vip" class="ui-v1-avatar__label ui-v1-avatar__label_vip">
                <SpriteVIP class="ui-v1-avatar__vip" />
            </span>

            <span v-if="bad" class="ui-v1-avatar__label ui-v1-avatar__label_bad">
                <SpriteBAD class="ui-v1-avatar__bad" />
            </span>
        </div>
    </component>
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/common/preview'
import type { PropType } from 'vue'

import IconHelpOutlined from '../../../../assets/sprites/actions/help-outlined.svg'
import SpriteBAD from '../../../../assets/sprites/user/bad.svg'
import SpriteVIP from '../../../../assets/sprites/user/vip.svg'
import UiImage from '@/host/components/image/UiImage.vue'

import { computed, inject, ref, useSlots } from 'vue'

import { isURL } from '@/common/predicate'

import { AvatarSizeKey } from './injection'

import {
  SIZE,
  STATUS,
} from '@/common/components/avatar'

const firstLetterOf = (name: string) => name.charAt(0).toUpperCase()

const props = defineProps({
  /** Путь к изображению */
  src: {
    type: String,
    validator: (src: string) => isURL(src) || src.length === 0,
    default: '',
  },

  /** Наименование участника */
  name: {
    type: String,
    default: null,
  },

  /** Ссылка для перехода */
  href: {
    type: String,
    validator: (href: string) => isURL(href) || href.length === 0,
    default: '',
  },

  /** Статус пользователя */
  status: {
    type: String,
    validator: (status) => Object.values(STATUS).includes(status as STATUS),
    default: null,
  },

  /** Пометка VIP в карточке пользователя */
  vip: {
    type: Boolean,
    default: false,
  },

  /** Пометка BAD в карточке пользователя */
  bad: {
    type: Boolean,
    default: false,
  },

  /** Размер изображения */
  size: {
    type: String as unknown as PropType<SIZE>,
    validator: (size) => Object.values(SIZE).includes(size as SIZE),
    default: SIZE.SM,
  },

  optimize: {
    type: [Boolean, Object] as PropType<boolean | {
      resize?: Dimensions;
      crop?: Dimensions;
    }>,
    default: true,
  },
})

const slots = useSlots()

const loaded = ref(false)

const unresolved = computed((): boolean => !(props.name || slots.default))

const initials = computed((): string => {
  if (!props.name) {
    return ''
  }

  const [firstName, ...otherNames] = props.name.split(' ')

  return otherNames.length > 0
    ? firstLetterOf(firstName) + firstLetterOf(otherNames[otherNames.length - 1])
    : firstLetterOf(firstName)
})

const size = inject(AvatarSizeKey, computed(() => props.size))

const optimization = computed(() => {
  if (!props.optimize) {
    return { resize: undefined, crop: undefined }
  }

  const processing = typeof props.optimize === 'object' ? props.optimize : {}

  return {
    resize: processing.resize ?? {
      [SIZE.XS]: '48x-',
      [SIZE.SM]: '72x-',
      [SIZE.LG]: '104x-',
    }[size.value] as Dimensions | undefined,
    crop: processing.crop as Dimensions | undefined,
  }
})
</script>

<style>
@import '@/host/components/avatar/avatar.less';
</style>

<template>
    <a
        :href="href"
        :class="{
            ['ui-v1-link']: true,
            [`ui-v1-link_${appearance}`]: true,
            [`ui-v1-link_${size}`]: true,
            [`ui-v1-link_dark`]: !light,
            [`ui-v1-link_light`]: light,
            [`ui-v1-link_accent`]: accent,
            [`ui-v1-link_dotted`]: dotted,
            [`ui-v1-link_ellipsis`]: ellipsis
        }"
        :target="external ? '_blank' : '_self'"
        v-bind="$attrs"
    >
        <span v-if="dotted" class="ui-v1-link__inner">
            <!-- @slot Текст ссылки -->
            <slot />
        </span>

        <template v-else>
            <slot />
        </template>

        <span
            v-if="$slots.icon || external"
            class="ui-v1-link__icon"
        >
            <!-- @slot Слот для иконки -->
            <slot name="icon">
                <IconOpenInNew class="ui-v1-link__icon-sprite" />
            </slot>
        </span>
    </a>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import IconOpenInNew from '~assets/sprites/actions/open-in-new.svg'

import {
  APPEARANCE,
  SIZE,
} from '@/common/components/link'

defineProps({
  /** Атрибут ссылки */
  href: {
    type: String,
    default: 'javascript:void(0);',
  },

  /**
   * Определяет, нужно ли открывать ссылку в новой вкладке.
   * Также добавляется иконка внешней ссылки (если компонент UiIcon установлен)
   */
  external: {
    type: Boolean,
    default: false,
  },

  /** Тип ссылок */
  appearance: {
    type: String as unknown as PropType<APPEARANCE | `${APPEARANCE}`>,
    validator: (appearance: unknown) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    default: APPEARANCE.DEFAULT,
  },

  /** Размер текста */
  size: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    validator: (size: SIZE) => Object.values(SIZE).includes(size),
    default: SIZE.BODY,
  },

  /** Инвертированный цвет ссылок для тёмного фона */
  light: {
    type: Boolean,
    default: false,
  },

  /** Жирное начертание */
  accent: {
    type: Boolean,
    default: false,
  },

  /** Подчеркивание dotted вместо стандартного поведения */
  dotted: {
    type: Boolean,
    default: false,
  },

  /** Определяет, будет ли текст ошибок обрезаться через многоточие или переноситься на следующую строку */
  ellipsis: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" src="./link.less" />

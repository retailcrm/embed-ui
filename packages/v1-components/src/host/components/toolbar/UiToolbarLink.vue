<template>
    <UiLink
        :href="href"
        :external="external"
        :appearance="appearance"
        :light="light"
        :accent="accent"
        :dotted="dotted"
        :ellipsis="ellipsis"
        size="small"
        v-bind="without($attrs, ['class', 'style'])"
    >
        <slot />

        <template v-if="$slots.icon" #icon>
            <slot name="icon" />
        </template>
    </UiLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import UiLink from '@/host/components/link/UiLink.vue'

import { isURL } from '@/common/predicate'
import { without } from '@/common/utils'

import { APPEARANCE } from '@/common/components/link'

defineProps({
  /** Атрибут ссылки */
  href: {
    type: String,
    validator: (href: unknown) => typeof href === 'string' && isURL(href as string),
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

defineOptions({
  inheritAttrs: false,
})
</script>

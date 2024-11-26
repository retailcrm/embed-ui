<template>
    <UiButton
        ref="root"
        :href="href"
        :variant="variant"
        :size="size"
        :active="active"
        :disabled="disabled"
        :locked="locked"
        appearance="secondary"
        v-bind="without($attrs, [
          'appearance',
          'class',
          'style',
          'type'
        ])"
    >
        <slot />
    </UiButton>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { UiButtonMethods } from '@/common/components/button'

import { computed, ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'

import { isURL } from '@/common/predicate'
import { without } from '@/common/utils'

import {
  SIZE,
  VARIANT,
} from '@/common/components/button'

import {
  useToolbarSize,
  SIZE as TOOLBAR_SIZE,
} from '@/host/components/toolbar/inject'

defineProps({
  /** Устанавливает атрибут href якоря */
  href: {
    type: null as unknown as PropType<string | null>,
    validator: (href: unknown) => (typeof href === 'string' && isURL(href as string)) || href === null,
    default: null,
  },

  /** Регулирует цветовую схему кнопки: default, success or danger */
  variant: {
    type: String as PropType<VARIANT | `${VARIANT}`>,
    default: VARIANT.DEFAULT,
  },

  /** Если кнопка активна */
  active: {
    type: Boolean,
    default: false,
  },

  /** Если кнопка отключена */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Если кнопка заблокирована */
  locked: {
    type: Boolean,
    default: false,
  },
})

defineOptions({
  inheritAttrs: false,
})

const root = ref<UiButtonMethods | null>(null)

defineExpose({
  click: () => root.value?.click(),
  focus: () => root.value?.focus(),
  blur: () => root.value?.blur(),
} as UiButtonMethods)

const toolbarSize = useToolbarSize()

const size = computed(() => {
  if (toolbarSize.value === TOOLBAR_SIZE.SM) {
    return SIZE.XS
  }

  return SIZE.SM
})
</script>

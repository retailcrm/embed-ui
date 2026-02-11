<template>
    <div
        ref="root"
        class="ui-v1-copy-button"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click="copy"
    >
        <slot name="trigger">
            <UiButton :size="size" appearance="tertiary">
                <IconCopy />
            </UiButton>
        </slot>

        <UiTooltip
            v-model:visible="visible"
            :target="rootTarget"
            :target-triggers="[]"
            v-bind="{
                delay: { hide: 500 },
                ...tooltipOptions,
            }"
        >
            <div class="ui-v1-copy-button__tooltip">
                <template v-if="copied">
                    <div class="ui-v1-copy-button__icon">
                        <IconCheckmarkCircleOutlined />
                    </div>

                    <div class="ui-v1-copy-button__text">
                        <slot name="hint-copied" />
                    </div>
                </template>

                <slot v-else name="hint" />
            </div>
        </UiTooltip>

        <input
            v-if="!clipboardAvailable"
            ref="input"
            :value="text"
            class="ui-v1-copy-button__area"
            type="text"
        />
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TooltipOptions } from '@/common/components/copy-button'

import IconCheckmarkCircleOutlined from '~assets/sprites/actions/checkmark-circle-outlined.svg'
import IconCopy from '~assets/sprites/media-and-editing/copy.svg'
import UiButton from '@/host/components/button/UiButton.vue'
import UiTooltip from '@/host/components/tooltip/UiTooltip.vue'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import { SIZE } from '@/common/components/button'

const props = defineProps({
  /** Текст для копирования в буфер обмена */
  text: {
    type: String,
    required: true,
  },

  /** Размер кнопки */
  size: {
    type: String as unknown as PropType<SIZE | `${SIZE}`>,
    default: SIZE.XS,
  },

  /** Объект, содержащий параметры настройки Tooltip */
  tooltipOptions: {
    type: Object as PropType<TooltipOptions>,
    default: () => ({}),
  },
})

const root = ref<HTMLElement | null>(null)
const rootTarget = computed(() => root)

const input = ref<HTMLInputElement | null>(null)

const visible = ref(false)
const copied = ref(false)
const clipboardAvailable = ref(false)

let copyTimer = null as ReturnType<typeof setTimeout> | null

const emit = defineEmits(['error'])

onMounted(() => {
  clipboardAvailable.value = navigator.clipboard && 'writeText' in navigator.clipboard
})

const copy = async () => {
  try {
    if (clipboardAvailable.value) {
      await navigator.clipboard.writeText(props.text)

      copied.value = true
    } else {
      input.value?.focus()
      input.value?.select()

      copied.value = document.execCommand('copy')
    }
  } catch (e) {
    emit('error', e)
  }
}

const onMouseEnter = () => {
  visible.value = true

  if (copyTimer) {
    clearTimeout(copyTimer)
    copyTimer = null
  }
}

const onMouseLeave = () => {
  visible.value = false

  if (copyTimer) {
    clearTimeout(copyTimer)
    copyTimer = null
  }

  copyTimer = setTimeout(() => copied.value = false, 200)
}
</script>

<style lang="less" src="./copy-button.less" />

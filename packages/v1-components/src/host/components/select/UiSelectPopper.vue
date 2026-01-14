<template>
  <UiPopper
      :id="id"
      :shown="shown"
      :target="target"
      :triggers="[]"
      :placement="placement"
      :aria-hidden="!shown ? 'true' : 'false'"
      :class="popperClass"
      :disabled="disabled"
      v-bind="mergedOptions"
      role="listbox"
      @attached="$emit('attached')"
      @hide="onHide"
  >
    <div
        ref="content"
        :class="contentClass"
        :style="contentStyle"
        @click="onClick"
        @wheel.stop="onWheel"
    >


      <slot />
    </div>
  </UiPopper>
</template>

<script lang="ts" setup>
import type {
  CSSProperties,
  PropType,
} from 'vue'
import type { UiPopperProperties } from '@/common/components/popper'
import { PLACEMENT } from '@/common/components/select'

import UiPopper from '@/host/components/popper/UiPopper.vue'

defineProps({
  shown: {
    type: Boolean,
    required: true,
  },

  placement: {
    type: String as PropType<PLACEMENT | `${PLACEMENT}`>,
    default: PLACEMENT.BOTTOM,
  },
})

</script>

<style lang="less" src="./select.less" />
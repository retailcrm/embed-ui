<template>
  <div :id="id + '-select'" class="ui-v1-select" v-bind="$attrs">
    <UiSelectTrigger />

    <UiSelectPopper />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import UiSelectTrigger from './UiSelectTrigger.vue'
import UiSelectPopper from './UiSelectPopper.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'

defineProps({
  /** Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице */
  id: {
    type: String,
    default: () => undefined,
  },

  /** Атрибут value, содержащий выбранный элемент из выпадающего списка */
  value: {
    type: null as unknown as PropType<unknown|unknown[]>,
    default: undefined,
  },

  /** Начальное состояние выпадающего списка - открыт/закрыт */
  opened: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" src="./select.less" />
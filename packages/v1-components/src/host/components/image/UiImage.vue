<template>
    <img
        :alt="alt"
        :src="url"
        v-bind="$attrs"
    >
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/common/preview'
import type { PropType } from 'vue'

import { ImageWorkersKey } from '@/common/preview'

import {
  computed,
  inject,
  ref,
} from 'vue'

import { preview } from '@retailcrm/image-preview'

const props = defineProps({
  alt: {
    type: String,
    default: '',
  },

  src: {
    type: String,
    default: '',
  },

  resize: {
    type: null as unknown as PropType<Dimensions | undefined>,
    default: undefined,
  },

  crop: {
    type: null as unknown as PropType<Dimensions | undefined>,
    default: undefined,
  },
})

const workers = inject(ImageWorkersKey, ref([]))
const url = computed(() => {
  if (!props.src) {
    return undefined
  }

  if (props.resize || props.crop) {
    return workers.value.length
      ? preview(workers.value, props.src, props.resize, props.crop)
      : props.src
  }

  return props.src
})
</script>
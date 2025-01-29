<template>
    <slot />
</template>

<script lang="ts" setup>
import {
  computed,
  provide,
  ref,
} from 'vue'

import { ElementRefKey } from '@/host/composables'
import { PopperTargetKey } from '@/host/components/popper/composables'

const target = ref<Element | null>(null)

provide(ElementRefKey, target)
provide(PopperTargetKey, computed(() => target.value))
</script>
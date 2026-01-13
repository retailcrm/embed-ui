<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
import type { Option } from '@/host/components/select/injection'

import { computed, inject, provide } from 'vue'

import {
  FastenedKey,
  RegisterHeaderOptionKey,
  UnregisterHeaderOptionKey,
  RegisterOptionKey,
  UnregisterOptionKey,
} from '@/host/components/select/injection'

const registerHeaderOption = inject<(option: Option) => void>(RegisterHeaderOptionKey, () => {})
const unregisterHeaderOption = inject<(id: string) => void>(UnregisterHeaderOptionKey, () => {})

provide(RegisterOptionKey, registerHeaderOption)
provide(UnregisterOptionKey, unregisterHeaderOption)
provide(FastenedKey, computed(() => true))
</script>

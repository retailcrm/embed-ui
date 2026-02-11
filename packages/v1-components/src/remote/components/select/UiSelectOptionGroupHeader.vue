<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, provide } from 'vue'

import {
  FastenedKey,
  RegisterHeaderOptionKey,
  RegisterOptionKey,
  UnregisterHeaderOptionKey,
  UnregisterOptionKey,
} from '@/host/components/select/injection'

provide(RegisterOptionKey, inject(RegisterHeaderOptionKey, () => {}))
provide(UnregisterOptionKey, inject(UnregisterHeaderOptionKey, () => {}))
provide(FastenedKey, computed(() => true))
</script>

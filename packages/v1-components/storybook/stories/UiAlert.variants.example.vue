<template>
    <div :class="$style['container']">
        <UiAlert
            v-for="variant in variants"
            :key="variant"
            :variant="variant"
            :text="`Variant: ${variant}`"
        />
    </div>
</template>

<script lang="ts" setup>
import UiAlert from '@/host/components/alert/UiAlert.vue'

import { VARIANT } from '@/common/components/alert'

const variants = [
  VARIANT.PRIMARY,
  VARIANT.WARNING,
  VARIANT.SUCCESS,
  VARIANT.DANGER,
]
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  gap: @spacing-xs;
}
</style>

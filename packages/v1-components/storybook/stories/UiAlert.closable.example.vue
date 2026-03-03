<template>
    <div :class="$style['container']">
        <UiAlert
            v-if="shown"
            closable
            text="You can close this alert manually"
            @hidden="onHidden"
        />

        <button type="button" @click="shown = true">
            Show alert
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiAlert from '@/host/components/alert/UiAlert.vue'

const shown = ref(true)

const onHidden = () => {
  shown.value = false
}
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/palette.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  gap: @spacing-xs;
}

:global(button) {
  width: fit-content;
  border: 1px solid @grey-500;
  border-radius: @border-radius-sm;
  background: #fff;
  padding: @spacing-xxs @spacing-xs;
  cursor: pointer;
}
</style>

<template>
    <div :class="$style['container']">
        <UiSwitch
            id="ui-switch-square"
            v-model:value="value"
            square
        />

        <label for="ui-switch-square">
            Square style
        </label>

        <div :class="$style['state']">
            Value: {{ value }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiSwitch from '@/host/components/switch/UiSwitch.vue'

const value = ref(true)
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: @spacing-xs;
  row-gap: @spacing-xs;
  align-items: center;
  padding: @spacing-s;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;

  :global(label) {
    cursor: pointer;
  }
}

.state {
  grid-column: 1 / -1;
}
</style>

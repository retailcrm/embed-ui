<template>
    <div :class="$style['container']">
        <div :class="$style['switch']">
            <UiSwitch
                id="ui-switch-controlled"
                :value="value"
                @update:value="value = $event"
            />

            <label for="ui-switch-controlled">
                Controlled switch
            </label>
        </div>

        <div :class="$style['controls']">
            <button type="button" @click="value = true">
                Set on
            </button>

            <button type="button" @click="value = false">
                Set off
            </button>
        </div>

        <div>
            Value: {{ value }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiSwitch from '@/host/components/switch/UiSwitch.vue'

const value = ref(false)
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  gap: @spacing-xs;
  padding: @spacing-s;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: @spacing-xs;

  :global(label) {
    cursor: pointer;
  }
}

.controls {
  display: inline-flex;
  gap: @spacing-xs;

  :global(button) {
    border: 1px solid @grey-500;
    border-radius: @border-radius-sm;
    background: #fff;
    padding: @spacing-xxs @spacing-xs;
    cursor: pointer;
  }
}
</style>

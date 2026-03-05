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
            <UiButton
                appearance="secondary"
                style="flex: none; align-self: flex-start;"
                @click="value = true"
            >
                Set on
            </UiButton>

            <UiButton
                appearance="secondary"
                style="flex: none; align-self: flex-start;"
                @click="value = false"
            >
                Set off
            </UiButton>
        </div>

        <div>
            Value: {{ value }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
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
}
</style>

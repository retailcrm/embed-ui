<template>
    <div :class="$style['container']">
        <div :class="$style['option']">
            <UiSwitch
                id="ui-switch-disabled-off"
                :value="false"
                disabled
            />

            <label for="ui-switch-disabled-off">
                Disabled off
            </label>
        </div>

        <div :class="$style['option']">
            <UiSwitch
                id="ui-switch-disabled-on"
                :value="true"
                disabled
            />

            <label for="ui-switch-disabled-on">
                Disabled on
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiSwitch from '@/host/components/switch/UiSwitch.vue'
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

.option {
  display: inline-flex;
  align-items: center;
  gap: @spacing-xs;

  :global(label) {
    color: @grey-800;
    cursor: default;
  }
}
</style>

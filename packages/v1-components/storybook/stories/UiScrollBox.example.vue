<template>
    <div :class="$style['wrapper']">
        <UiScrollBox v-bind="$attrs" :class="$style['block']">
            <div :class="[$style['content'], $style['content_tall']]" />
        </UiScrollBox>

        <UiScrollBox v-bind="$attrs" :class="$style['block']">
            <div :class="[$style['content'], $style['content_wide']]" />
        </UiScrollBox>
    </div>
</template>

<script lang="ts" setup>
import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/geometry.less';
@import (reference) '~assets/stylesheets/variables.less';

.wrapper {
  display: flex;
}

.block {
  width: 120px;
  height: 147px;
  border-radius: @border-radius-lg;
  box-shadow: @drop-shadow-m;

  &:not(:last-child) {
    margin-right: @spacing-xs;
  }
}

.content {
  width: 100%;
  height: 100%;

  &_wide { width: 300px; }
  &_tall { height: 300px; }
}
</style>

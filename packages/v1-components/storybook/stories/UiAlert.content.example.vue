<template>
    <div :class="$style['container']">
        <UiAlert ellipsis text="Very long alert message that should be truncated with ellipsis in one line mode." />

        <UiAlert small>
            Small alert with custom slot content
        </UiAlert>

        <UiAlert fluid>
            <strong>Full width content</strong> can hold more complex markup and longer text blocks.
        </UiAlert>
    </div>
</template>

<script lang="ts" setup>
import UiAlert from '@/host/components/alert/UiAlert.vue'
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  gap: @spacing-xs;
  max-width: 420px;
}
</style>

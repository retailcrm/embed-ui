<template>
    <div
        class="ui-v1-table__footer-section"
        v-bind="$attrs"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<style lang="less" src="./table.less" />

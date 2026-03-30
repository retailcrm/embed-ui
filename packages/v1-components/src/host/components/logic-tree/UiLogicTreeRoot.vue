<template>
    <div
        :class="{
            'ui-v1-logic-tree': true,
            'ui-v1-logic-tree_surface': surface,
        }"
        v-bind="$attrs"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

defineProps({
  /** Оборачивает всё дерево в общий контейнер-карточку */
  surface: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="less" src="./logic-tree.less" />

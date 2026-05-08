<template>
    <footer
        class="ui-v1-page-footer"
        v-bind="$attrs"
    >
        <div
            v-if="'actions' in $slots"
            class="ui-v1-page-footer__actions"
        >
            <slot name="actions" />
        </div>

        <div
            v-if="'aside' in $slots"
            class="ui-v1-page-footer__aside"
        >
            <slot name="aside" />
        </div>
    </footer>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<style lang="less" src="./page-footer.less" />

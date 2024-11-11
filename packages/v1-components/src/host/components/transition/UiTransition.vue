<template>
    <transition
        :name="'ui-v1-transition-' + name"
        :appear="appear"
    >
        <!-- @slot Разметка, к которой добавляется анимация перехода -->
        <slot />
    </transition>
</template>

<script lang="ts" setup>
defineProps({
  /** Наименование анимации перехода */
  name: {
    type: String,
    default: 'fade',
  },

  /** Запуск анимации перехода при появлении элемента */
  appear: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" src="./transition.less" />

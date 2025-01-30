<template>
    <div :class="$style['container']">
        <div :class="$style['content-row']">
            <UiAvatar size="xs" />
            <UiAvatar />
            <UiAvatar size="lg" />
        </div>

        <div :class="$style['content-row']">
            <UiAvatar size="xs" vip />
            <UiAvatar bad />
            <UiAvatar size="lg" bad vip />
        </div>

        <div :class="$style['content-row']">
            <UiAvatar size="xs" status="free" />
            <UiAvatar status="break" />
            <UiAvatar size="lg" status="dinner" />
        </div>
    </div>
</template>

<script setup>
import UiAvatar from '@/host/components/avatar/UiAvatar.vue'
</script>

<style lang="less" module>
@import (reference) '@/host/components/avatar/avatar.less';

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #DEE2E6;
  border-radius: 8px;
}

.content-row {
  display: inherit;
  align-items: center;
  margin-bottom: 10px;
}

.content-row > * {
  margin-right: 10px;
}
</style>

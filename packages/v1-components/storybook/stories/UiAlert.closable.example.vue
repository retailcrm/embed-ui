<template>
    <div :class="$style['container']">
        <UiAlert
            v-if="shown"
            closable
            text="You can close this alert manually"
            @hidden="onHidden"
        />

        <UiButton appearance="secondary" @click="shown = true">
            Show alert
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiAlert from '@/host/components/alert/UiAlert.vue'
import UiButton from '@/host/components/button/UiButton.vue'

const shown = ref(true)

const onHidden = () => {
  shown.value = false
}
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  display: grid;
  gap: @spacing-xs;
  justify-items: start;
}
</style>

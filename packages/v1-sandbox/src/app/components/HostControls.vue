<template>
    <section
        :class="$style['host-controls']"
        data-testid="host-controls"
    >
        <div :class="$style['host-controls__title']">
            Host environment
        </div>

        <div
            :class="$style['host-controls__status']"
            data-testid="host-run-mode"
        >
            {{ runModeLabel }}
        </div>
    </section>
</template>

<script setup lang="ts">
import type { SandboxLaunchConfig } from '@/dev/launch'

import { computed } from 'vue'

const props = defineProps<{
  config: SandboxLaunchConfig;
}>()

const runModeLabel = computed(() => props.config.mode === 'page'
  ? `Page: ${props.config.pageCode}`
  : `Widgets: ${props.config.targets.length}`)
</script>

<style scoped lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.host-controls {
    align-items: center;
    background: #fff;
    border: 1px solid @grey-500;
    border-radius: @border-radius-lg;
    display: flex;
    gap: @spacing-s;
    min-height: 72px;
    padding: @spacing-s 20px;
    width: min(100%, 760px);

    &__title {
        color: @grey-900;
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
    }

    &__status {
        color: @black-500;
        flex: 1;
        font-size: 15px;
    }
}
</style>

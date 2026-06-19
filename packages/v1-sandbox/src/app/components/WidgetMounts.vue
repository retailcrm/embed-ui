<template>
    <section
        :class="$style['widget-mounts']"
        aria-label="Widget targets"
        role="region"
    >
        <WidgetMount
            v-for="mount in mounts"
            :key="mount.id"
            :mount="mount"
            :set-tree="setTree"
        />
    </section>
</template>

<script setup lang="ts">
import type { HostedTreeRef, SandboxMount } from '@/app/types'

import WidgetMount from '@/app/components/WidgetMount.vue'

defineProps<{
  mounts: SandboxMount[];
  setTree(mount: SandboxMount, tree: HostedTreeRef | null): void;
}>()
</script>

<style lang="less" module>
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/variables.less";

.widget-mounts {
    display: grid;
    gap: @spacing-m;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
</style>

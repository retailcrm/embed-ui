<template>
    <section
        :class="$style['page-mount']"
        :data-page-code="mount.label"
        :data-testid="mount.testId"
    >
        <HostedTree
            :ref="setTree"
            :provider="provider"
            :receiver="mount.receiver"
        />
    </section>
</template>

<script setup lang="ts">
import type { HostedTreeRef, SandboxMount } from '@/app/runtime/mounts'
import type { VNodeRef } from 'vue'

import {
  createProvider as createHostProvider,
} from '@retailcrm/embed-ui-v1-components/host'
import { HostedTree } from '@omnicajs/vue-remote/host'
import { markRaw } from 'vue'

const props = defineProps<{
  mount: SandboxMount;
  setTree(mount: SandboxMount, tree: HostedTreeRef | null): void;
}>()

const provider = markRaw(createHostProvider())

const setTree: VNodeRef = (tree) => {
  props.setTree(props.mount, tree as HostedTreeRef | null)
}
</script>

<style scoped lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";

.page-mount {
    background: @grey-100;
    min-height: calc(100vh - 112px);
    padding: 0;
}
</style>

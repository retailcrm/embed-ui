<template>
    <section
        :class="$style['page-mount']"
        :aria-label="`Page extension: ${mount.label}`"
        role="region"
    >
        <HostedTree
            :ref="setTree"
            :provider="provider"
            :receiver="mount.receiver"
        />
    </section>
</template>

<script setup lang="ts">
import type { HostedTreeRef, SandboxMount } from '@/app/types'
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

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";

.page-mount {
    background: @grey-100;
    min-height: calc(100vh - 112px);
    padding: 0;
}
</style>

<template>
    <section
        :class="$style['widget-mount']"
        :data-target="mount.label"
        :data-testid="mount.testId"
    >
        <div :class="$style['widget-mount__label']">
            {{ mount.label }}
        </div>

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
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.widget-mount {
    background: #fff;
    border: 1px dashed @grey-600;
    border-radius: @border-radius-lg;
    min-height: 180px;
    padding: @spacing-m;
    width: 100%;

    &__label {
        color: @grey-900;
        font-size: 13px;
        font-weight: 700;
        margin-bottom: @spacing-s;
        text-transform: uppercase;
    }
}
</style>

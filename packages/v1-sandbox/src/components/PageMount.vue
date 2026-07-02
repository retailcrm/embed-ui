<template>
    <section
        :class="$style['page-mount']"
        :aria-label="t('ariaLabel', { page: mount.label })"
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
import type { VNodeRef } from 'vue'

import type { HostedTreeRef, SandboxMount } from '@/app/types'

import {
  createProvider as createHostProvider,
} from '@retailcrm/embed-ui-v1-components/host'
import { HostedTree } from '@omnicajs/vue-remote/host'
import { markRaw } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  mount: SandboxMount;
  setTree(mount: SandboxMount, tree: HostedTreeRef | null): void;
}>()

const { t } = useI18n()
const provider = markRaw(createHostProvider())

const setTree: VNodeRef = (tree) => {
  props.setTree(props.mount, tree as HostedTreeRef | null)
}
</script>

<i18n locale="en-GB">
{
  "ariaLabel": "Page extension: {page}"
}
</i18n>

<i18n locale="es-ES">
{
  "ariaLabel": "Extensión de página: {page}"
}
</i18n>

<i18n locale="ru-RU">
{
  "ariaLabel": "Страница расширения: {page}"
}
</i18n>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";

.page-mount {
    background: @grey-100;
    min-height: calc(100vh - 112px);
    padding: 0;
}
</style>

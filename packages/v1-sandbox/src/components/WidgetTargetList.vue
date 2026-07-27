<template>
    <section
        :class="$style['widget-target-list']"
        :aria-label="t('ariaLabel')"
        role="region"
    >
        <WidgetTarget
            v-for="mount in mounts"
            :key="mount.id"
            :mount="mount"
            :set-tree="setTree"
        />
    </section>
</template>

<script setup lang="ts">
import type { HostedTreeRef, SandboxMount } from '@/app/types'

import { useI18n } from 'vue-i18n'

import WidgetTarget from '@/components/WidgetTarget.vue'

defineProps<{
  mounts: SandboxMount[];
  setTree(mount: SandboxMount, tree: HostedTreeRef | null): void;
}>()

const { t } = useI18n()
</script>

<i18n locale="en-GB">
{
  "ariaLabel": "Widget targets"
}
</i18n>

<i18n locale="es-ES">
{
  "ariaLabel": "Puntos de montaje de widgets"
}
</i18n>

<i18n locale="ru-RU">
{
  "ariaLabel": "Места встраивания виджетов"
}
</i18n>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.widget-target-list {
    display: grid;
    gap: @spacing-m;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
</style>

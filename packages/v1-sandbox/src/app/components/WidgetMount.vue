<template>
    <section
        :class="$style['widget-mount']"
        :aria-label="t('ariaLabel', { target: mount.label })"
        role="region"
    >
        <div :class="$style['widget-mount__label']">
            {{ mount.label }}
        </div>

        <div :class="$style['widget-mount__content']">
            <HostedTree
                :ref="setTree"
                :provider="provider"
                :receiver="mount.receiver"
            />
        </div>
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
  "ariaLabel": "Widget target: {target}"
}
</i18n>

<i18n locale="es-ES">
{
  "ariaLabel": "Target de widget: {target}"
}
</i18n>

<i18n locale="ru-RU">
{
  "ariaLabel": "Цель виджета: {target}"
}
</i18n>

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";
@import (reference) "~assets/stylesheets/variables.less";

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

    &__content {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: @spacing-xs;
        min-width: 0;
    }
}
</style>

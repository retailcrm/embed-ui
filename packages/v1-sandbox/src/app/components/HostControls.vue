<template>
    <section
        :class="$style['host-controls']"
        :aria-label="t('hostControls.title')"
    >
        <div :class="$style['host-controls__title']">
            {{ t('hostControls.title') }}
        </div>

        <div
            :class="$style['host-controls__status']"
            :aria-label="t('hostControls.status')"
            role="status"
        >
            {{ runModeLabel }}
        </div>
    </section>
</template>

<script setup lang="ts">
import type { SandboxLaunchConfig } from '@/dev/launch'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  config: SandboxLaunchConfig;
}>()

const { t } = useI18n({ useScope: 'local' })

const runModeLabel = computed(() => props.config.mode === 'page'
  ? t('hostControls.page', { pageCode: props.config.pageCode })
  : t('hostControls.widgets', { count: props.config.targets.length }))
</script>

<i18n locale="en-GB">
{
    "hostControls": {
        "page": "Page: {pageCode}",
        "status": "Host run mode",
        "title": "Host environment",
        "widgets": "Widgets: {count}"
    }
}
</i18n>

<i18n locale="es-ES">
{
    "hostControls": {
        "page": "Página: {pageCode}",
        "status": "Modo de ejecución del host",
        "title": "Entorno host",
        "widgets": "Widgets: {count}"
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "hostControls": {
        "page": "Страница: {pageCode}",
        "status": "Режим запуска хоста",
        "title": "Host-окружение",
        "widgets": "Виджеты: {count}"
    }
}
</i18n>

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";
@import (reference) "~assets/stylesheets/variables.less";

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

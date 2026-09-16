<template>
    <section
        :id="uid + '-extension-onboarding'"
        :class="$style['extension-onboarding']"
        :aria-labelledby="uid + '-extension-onboarding-title'"
    >
        <div :class="$style['extension-onboarding__content']">
            <h1
                :id="uid + '-extension-onboarding-title'"
                :class="$style['extension-onboarding__title']"
            >
                {{ t('extensionOnboarding.title') }}
            </h1>

            <p
                :class="$style['extension-onboarding__description']"
            >
                {{ t('extensionOnboarding.description') }}
            </p>

            <div :class="$style['extension-onboarding__descriptor']">
                <span>{{ t('extensionOnboarding.descriptor') }}</span>

                <div :class="$style['extension-onboarding__code-block']">
                    <pre :class="$style['extension-onboarding__example']"><code>{{ descriptorExample }}</code></pre>

                    <VCopyButton
                        :label="t('extensionOnboarding.actions.copy')"
                        :text="descriptorExample"
                        :class="$style['extension-onboarding__copy']"
                        size="xs"
                    >
                        <template #hint>
                            {{ t('extensionOnboarding.actions.copy') }}
                        </template>

                        <template #hint-copied>
                            {{ t('extensionOnboarding.actions.copied') }}
                        </template>
                    </VCopyButton>
                </div>
            </div>

            <p :class="$style['extension-onboarding__note']">
                {{ t('extensionOnboarding.note') }}
            </p>

            <p :class="$style['extension-onboarding__mode-note']">
                {{ t('extensionOnboarding.modeNote') }}
            </p>

            <UiButton
                appearance="primary"
                size="sm"
                @click="openDevPanel"
            >
                {{ t('extensionOnboarding.actions.openSandbox') }}
            </UiButton>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import { UiButton } from '@retailcrm/embed-ui-v1-components/host'

import VCopyButton from '@/components/VCopyButton.vue'

const props = defineProps<{
  openDevPanel(): void;
}>()

const { t } = useI18n()

const uid = useId()
const descriptorExample = JSON.stringify({
  runner: 'worker',
  entrypoint: 'http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/script',
  stylesheet: 'http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/stylesheet',
  targets: [],
  pages: ['settings'],
}, null, 2)

const openDevPanel = () => props.openDevPanel()
</script>

<i18n locale="en-GB">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Open developer panel",
            "copy": "Copy",
            "copied": "Copied"
        },
        "description": "Use the sandbox to test JS module pages and widgets locally before installing the module in RetailCRM. Before adding the extension to the sandbox, make sure it is running.",
        "modeNote": "When using the individual fields, then choose a mode: Widgets or Page.",
        "note": "Only two running processes are required: the extension server and the sandbox. You do not need to start an additional server.",
        "title": "Connect an external extension",
        "descriptor": "Runtime descriptor format"
    }
}
</i18n>

<i18n locale="es-ES">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Abrir el panel de desarrollo",
            "copy": "Copiar",
            "copied": "Copiado"
        },
        "description": "Utilice la sandbox para probar localmente las páginas y los widgets del módulo JS antes de instalarlo en RetailCRM. Antes de añadir la extensión a la sandbox, asegúrese de que esté en ejecución.",
        "modeNote": "Si utiliza los campos individuales, elija después un modo: Widgets o Página.",
        "note": "Solo se necesitan dos procesos en ejecución: el servidor de la extensión y la sandbox. No hace falta iniciar un servidor adicional.",
        "title": "Conectar una extensión externa",
        "descriptor": "Formato del descriptor de ejecución"
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Открыть дев-панель",
            "copy": "Скопировать",
            "copied": "Скопировано"
        },
        "description": "Используйте песочницу, чтобы локально проверить страницы и виджеты JS-модуля до его установки в RetailCRM. Перед тем как добавлять расширение в песочницу, убедитесь, что расширение запущено",
        "modeNote": "При заполнении отдельных полей затем выберите режим: Виджеты или Страница.",
        "note": "Для работы нужны только два запущенных процесса: сервер расширения и песочница. Дополнительный сервер запускать не требуется.",
        "title": "Подключите внешнее расширение",
        "descriptor": "Формат передаваемого дескриптора"
    }
}
</i18n>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.extension-onboarding {
    align-items: center;
    display: flex;
    min-height: calc(100vh - 112px);
    padding: @spacing-l;

    &__content {
        display: flex;
        flex-direction: column;
        gap: @spacing-s;
        border: 1px dashed @grey-600;
        border-radius: @border-radius-lg;
        max-width: 760px;
        padding: @spacing-l;
        width: 100%;
    }

    &__eyebrow {
        color: @blue-500;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0;
        margin: 0;
        text-transform: uppercase;
    }

    &__title {
        color: @black-500;
        font-size: 28px;
        line-height: 1.2;
        margin: 0;
    }

    &__description {
        position: relative;
        color: @grey-900;
        font-size: 15px;
        line-height: 1.45;
        margin: 0;
    }

    &__code-block {
        position: relative;
        min-width: 0;
    }

    &__copy {
        position: absolute;
        top: @spacing-xs;
        right: @spacing-xs;
        background: @grey-400;
        border-radius: @border-radius-md;
    }

    &__descriptor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__example {
        background: @grey-400;
        border-radius: @border-radius-md;
        margin: 0;
        overflow: auto;
        padding: @spacing-s;
        white-space: pre;
    }

    &__note,
    &__mode-note {
        color: @grey-900;
        font-size: 13px;
        line-height: 1.4;
        margin: 0;
    }

    &__example {
        color: @black-500;
        display: grid;
        font-size: 13px;
        gap: @spacing-xs;
        line-height: 1.4;

        p,
        dl,
        dd {
            margin: 0;
        }

        code {
            color: @blue-500;
            overflow-wrap: anywhere;
        }
    }

    &__placeholders {
        display: grid;
        gap: @spacing-xs;

        div {
            display: grid;
            gap: 2px;
            grid-template-columns: minmax(120px, auto) 1fr;
        }

        dd {
            color: @grey-900;
        }
    }

    &__field {
        display: grid;
        gap: 6px;
    }

    &__label {
        color: @grey-900;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
    }

    &__input {
        background: #fff;
        border: 1px solid @grey-600;
        border-radius: @border-radius-md;
        color: @black-500;
        font: inherit;
        font-size: 14px;
        min-height: 40px;
        padding: @spacing-xs 10px;
        width: 100%;
    }

}
</style>

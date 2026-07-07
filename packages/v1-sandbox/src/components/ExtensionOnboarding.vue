<template>
    <section
        :id="uid + '-extension-onboarding'"
        :class="$style['extension-onboarding']"
        :aria-labelledby="uid + '-extension-onboarding-title'"
    >
        <div :class="$style['extension-onboarding__content']">
            <p :class="$style['extension-onboarding__eyebrow']">
                {{ t('extensionOnboarding.eyebrow') }}
            </p>

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

            <ol :class="$style['extension-onboarding__steps']">
                <li>{{ t('extensionOnboarding.steps.devServer') }}</li>

                <li>{{ t('extensionOnboarding.steps.entrypoint') }}</li>

                <li>{{ t('extensionOnboarding.steps.runtime') }}</li>

                <li>{{ t('extensionOnboarding.steps.context') }}</li>
            </ol>

            <div :class="$style['extension-onboarding__example']">
                <span>{{ t('extensionOnboarding.example.label') }}</span>

                <code>%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.after&fixture=order-basic</code>
            </div>

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

const props = defineProps<{
  openDevPanel(): void;
}>()

const { t } = useI18n()

const uid = useId()

const openDevPanel = () => props.openDevPanel()
</script>

<i18n locale="en-GB">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Open sandbox controls"
        },
        "description": "Sandbox connects the frontend part of a JS module by external URL: HTML entrypoint or JS script. It loads resources over the network, attaches stylesheet when available and starts the extension through a worker-compatible endpoint.",
        "eyebrow": "JS module delivery",
        "example": {
            "label": "Universal URL example"
        },
        "steps": {
            "devServer": "Run your module dev server that serves frontend resources over HTTP.",
            "entrypoint": "Provide an extension endpoint or entrypoint URL: HTML entrypoint or JS script.",
            "runtime": "Choose mode: widgets use targets, pages use page code from the descriptor.",
            "context": "Select a fixture and, if needed, edit Context JSON in sandbox controls to simulate CRM state."
        },
        "title": "Connect an external extension"
    }
}
</i18n>

<i18n locale="es-ES">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Abrir controles de sandbox"
        },
        "description": "Sandbox conecta la parte frontend de un módulo JS por una URL externa: HTML entrypoint o JS script. Carga los recursos por red, conecta stylesheet si existe y arranca la extensión mediante un endpoint compatible con worker.",
        "eyebrow": "Entrega de módulo JS",
        "example": {
            "label": "Ejemplo universal de URL"
        },
        "steps": {
            "devServer": "Levante el dev server de su módulo que sirve recursos frontend por HTTP.",
            "entrypoint": "Indique la URL de extension endpoint o entrypoint: HTML entrypoint o JS script.",
            "runtime": "Elija mode: widgets usa targets, pages usa page code del descriptor.",
            "context": "Seleccione una fixture y, si hace falta, edite Context JSON en los controles de sandbox para simular el estado de CRM."
        },
        "title": "Conectar una extensión externa"
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Открыть песочницу"
        },
        "description": "Песочница подключает frontend-часть JS-модуля по внешнему URL: HTML entrypoint или JS script. Она загружает ресурсы по сети, подключает stylesheet при наличии и запускает расширение через worker-compatible endpoint.",
        "eyebrow": "Доставка JS-модуля",
        "example": {
            "label": "Универсальный пример URL"
        },
        "steps": {
            "devServer": "Поднимите dev-сервер вашего модуля, который отдаёт frontend-ресурсы по HTTP.",
            "entrypoint": "Укажите URL extension endpoint или entrypoint: HTML entrypoint или JS script.",
            "runtime": "Выберите режим: widgets используют targets, pages используют page code из descriptor.",
            "context": "Выберите фикстуру и при необходимости измените Context JSON в управлении песочницей, чтобы симулировать состояние CRM."
        },
        "title": "Подключите внешнее расширение"
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
        border: 1px dashed @grey-600;
        border-radius: @border-radius-lg;
        display: grid;
        gap: @spacing-s;
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
        color: @grey-900;
        font-size: 15px;
        line-height: 1.45;
        margin: 0;
    }

    &__steps {
        color: @black-500;
        display: grid;
        font-size: 14px;
        gap: @spacing-xs;
        margin: 0;
        padding-left: 18px;
    }

    &__example {
        background: @grey-200;
        border: 1px solid @grey-500;
        border-radius: @border-radius-md;
        color: @black-500;
        display: grid;
        font-size: 13px;
        gap: @spacing-xs;
        line-height: 1.4;
        padding: @spacing-s;

        code {
            color: @blue-500;
            overflow-wrap: anywhere;
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

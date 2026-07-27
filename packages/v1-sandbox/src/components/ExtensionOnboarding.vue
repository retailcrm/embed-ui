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
                <li>{{ t('extensionOnboarding.steps.extensionServer') }}</li>

                <li>{{ t('extensionOnboarding.steps.sandboxServer') }}</li>

                <li>
                    {{ t('extensionOnboarding.steps.extensionUrl') }}
                    <code>{{ extensionUrlExample }}</code>
                </li>
            </ol>

            <p :class="$style['extension-onboarding__note']">
                {{ t('extensionOnboarding.note') }}
            </p>

            <p :class="$style['extension-onboarding__mode-note']">
                {{ t('extensionOnboarding.modeNote') }}
            </p>

            <UiCollapseBox v-model:expanded="isUrlTemplateExpanded">
                <template #icon>
                    <IconSettingsOutlined />
                </template>

                <template #title>
                    {{ t('extensionOnboarding.example.title') }}
                </template>

                <template #body-content>
                    <div :class="$style['extension-onboarding__example']">
                        <p>{{ t('extensionOnboarding.example.description') }}</p>

                        <code>{{ sandboxUrlTemplate }}</code>

                        <dl :class="$style['extension-onboarding__placeholders']">
                            <div>
                                <dt><code>%sandbox-url%</code></dt>
                                <dd>{{ t('extensionOnboarding.example.sandboxUrl') }}</dd>
                            </div>

                            <div>
                                <dt><code>%extension-url%</code></dt>
                                <dd>{{ t('extensionOnboarding.example.extensionUrl') }}</dd>
                            </div>

                            <div>
                                <dt><code>%extension-id%</code></dt>
                                <dd>{{ t('extensionOnboarding.example.extensionId') }}</dd>
                            </div>
                        </dl>

                        <p>
                            {{ t('extensionOnboarding.example.completeExtensionUrl') }}
                            <code>{{ extensionUrlExample }}</code>
                        </p>
                    </div>
                </template>
            </UiCollapseBox>

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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import { UiButton, UiCollapseBox } from '@retailcrm/embed-ui-v1-components/host'

import IconSettingsOutlined from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/settings-outlined.svg'

const props = defineProps<{
  openDevPanel(): void;
}>()

const { t } = useI18n()

const uid = useId()
const isUrlTemplateExpanded = ref(false)
const extensionUrlExample = 'http://127.0.0.1:4175/extension/<uuid>'
const sandboxUrlTemplate = '%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.after&fixture=order-basic'

const openDevPanel = () => props.openDevPanel()
</script>

<i18n locale="en-GB">
{
    "extensionOnboarding": {
        "actions": {
            "openSandbox": "Open sandbox controls"
        },
        "description": "Use the sandbox to check JS module pages and widgets locally before installing the module in RetailCRM.",
        "eyebrow": "Local development",
        "example": {
            "completeExtensionUrl": "Complete extension URL example:",
            "description": "This is a template, not a ready-to-use link. Replace each placeholder with the value for your local environment.",
            "extensionId": "The extension UUID.",
            "extensionUrl": "The base URL of the extension server, for example http://127.0.0.1:4175.",
            "sandboxUrl": "The sandbox URL, for example http://127.0.0.1:4173.",
            "title": "Launch URL template"
        },
        "modeNote": "Then choose a mode: Widgets or Page.",
        "note": "Only two running processes are required: the extension server and the sandbox. You do not need to start an additional server.",
        "steps": {
            "extensionServer": "Start the extension server.",
            "extensionUrl": "Open sandbox controls and enter the extension URL:",
            "sandboxServer": "Start the sandbox."
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
        "description": "Utilice la sandbox para comprobar localmente las páginas y los widgets del módulo JS antes de instalarlo en RetailCRM.",
        "eyebrow": "Desarrollo local",
        "example": {
            "completeExtensionUrl": "Ejemplo de URL completa de la extensión:",
            "description": "Esta es una plantilla, no un enlace listo para usar. Sustituya cada placeholder por el valor de su entorno local.",
            "extensionId": "El UUID de la extensión.",
            "extensionUrl": "La URL base del servidor de la extensión, por ejemplo http://127.0.0.1:4175.",
            "sandboxUrl": "La URL de la sandbox, por ejemplo http://127.0.0.1:4173.",
            "title": "Plantilla de URL de inicio"
        },
        "modeNote": "Después elija un modo: Widgets o Página.",
        "note": "Solo se necesitan dos procesos en ejecución: el servidor de la extensión y la sandbox. No hace falta iniciar un servidor adicional.",
        "steps": {
            "extensionServer": "Inicie el servidor de la extensión.",
            "extensionUrl": "Abra los controles de sandbox e indique la URL de la extensión:",
            "sandboxServer": "Inicie la sandbox."
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
        "description": "Используйте песочницу, чтобы локально проверить страницы и виджеты JS-модуля до его установки в RetailCRM.",
        "eyebrow": "Локальная разработка",
        "example": {
            "completeExtensionUrl": "Пример полного URL расширения:",
            "description": "Это шаблон, а не готовая ссылка. Замените каждое обозначение значением из своего локального окружения.",
            "extensionId": "UUID расширения.",
            "extensionUrl": "Базовый URL сервера расширения, например http://127.0.0.1:4175.",
            "sandboxUrl": "URL песочницы, например http://127.0.0.1:4173.",
            "title": "Шаблон URL запуска"
        },
        "modeNote": "Затем выберите режим: Виджеты или Страница.",
        "note": "Для работы нужны только два запущенных процесса: сервер расширения и песочница. Дополнительный сервер запускать не требуется.",
        "steps": {
            "extensionServer": "Запустите сервер расширения.",
            "extensionUrl": "Откройте управление песочницей и укажите URL расширения:",
            "sandboxServer": "Запустите песочницу."
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

        code {
            color: @blue-500;
            overflow-wrap: anywhere;
        }
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

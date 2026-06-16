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

                <li>{{ t('extensionOnboarding.steps.worker') }}</li>
            </ol>

            <label :class="$style['extension-onboarding__field']">
                <span :class="$style['extension-onboarding__label']">
                    {{ t('extensionOnboarding.extensionUrl') }}
                </span>

                <input
                    :class="$style['extension-onboarding__input']"
                    :value="manifestUrl"
                    :placeholder="t('extensionOnboarding.placeholder')"
                    type="text"
                    @input="updateManifestUrl"
                />
            </label>

            <div
                :class="$style['extension-onboarding__actions']"
                role="group"
            >
                <button
                    :class="[
                        $style['extension-onboarding__button'],
                        $style['extension-onboarding__button_primary'],
                    ]"
                    type="button"
                    @click="useCoreUiExtensionExample"
                >
                    {{ t('extensionOnboarding.actions.useDemoExtension') }}
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    type="button"
                    @click="apply"
                >
                    {{ t('extensionOnboarding.actions.apply') }}
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    type="button"
                    @click="openCoreUiExtensionExampleReturnsPage"
                >
                    {{ t('extensionOnboarding.actions.openDemoPage') }}
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    type="button"
                    @click="openDevPanel"
                >
                    {{ t('extensionOnboarding.actions.configure') }}
                </button>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

const props = defineProps<{
  apply(): void;
  manifestUrl: string;
  openCoreUiExtensionExampleReturnsPage(): void;
  openDevPanel(): void;
  setManifestUrl(value: string): void;
  useCoreUiExtensionExample(): void;
}>()

const { t } = useI18n({ useScope: 'local' })

const uid = useId()

const updateManifestUrl = (event: Event) => {
  props.setManifestUrl((event.target as HTMLInputElement).value)
}
</script>

<i18n locale="en-GB">
{
    "extensionOnboarding": {
        "actions": {
            "apply": "Open with Extension URL",
            "configure": "Configure extension",
            "openDemoPage": "Open example page",
            "useDemoExtension": "Use example extension"
        },
        "description": "Sandbox connects the frontend part of a JS module by external URL: manifest/descriptor, HTML entrypoint or JS script. It loads resources over the network, attaches stylesheet when available and starts the extension through a worker-compatible endpoint.",
        "eyebrow": "JS module delivery",
        "extensionUrl": "Extension URL",
        "placeholder": "https://your-extension-host.ru/extension/module-id",
        "steps": {
            "devServer": "Run your module dev server that serves frontend resources over HTTP.",
            "entrypoint": "Provide an entrypoint or descriptor URL: JS script, HTML entrypoint or JSON manifest.",
            "worker": "For the current scenario, the entrypoint should run `runEndpoint(defineRunner(...))`, and the descriptor should define `runner: \"worker\"`, `targets` and/or `pages`."
        },
        "title": "Connect an external extension"
    }
}
</i18n>

<i18n locale="es-ES">
{
    "extensionOnboarding": {
        "actions": {
            "apply": "Abrir con Extension URL",
            "configure": "Configurar extensión",
            "openDemoPage": "Abrir página de ejemplo",
            "useDemoExtension": "Usar extensión de ejemplo"
        },
        "description": "Sandbox conecta la parte frontend de un módulo JS por una URL externa: manifest/descriptor, HTML entrypoint o JS script. Carga los recursos por red, conecta stylesheet si existe y arranca la extensión mediante un endpoint compatible con worker.",
        "eyebrow": "Entrega de módulo JS",
        "extensionUrl": "Extension URL",
        "placeholder": "https://your-extension-host.ru/extension/module-id",
        "steps": {
            "devServer": "Levante el dev server de su módulo que sirve recursos frontend por HTTP.",
            "entrypoint": "Indique la URL de entrypoint o descriptor: JS script, HTML entrypoint o JSON manifest.",
            "worker": "Para el escenario actual, el entrypoint debe ejecutar `runEndpoint(defineRunner(...))`, y el descriptor debe definir `runner: \"worker\"`, `targets` y/o `pages`."
        },
        "title": "Conectar una extensión externa"
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "extensionOnboarding": {
        "actions": {
            "apply": "Открыть с URL расширения",
            "configure": "Настроить расширение",
            "openDemoPage": "Открыть страницу примера",
            "useDemoExtension": "Использовать пример расширения"
        },
        "description": "Песочница подключает frontend-часть JS-модуля по внешнему URL: manifest/descriptor, HTML entrypoint или JS script. Она загружает ресурсы по сети, подключает stylesheet при наличии и запускает расширение через worker-compatible endpoint.",
        "eyebrow": "Доставка JS-модуля",
        "extensionUrl": "URL расширения",
        "placeholder": "https://your-extension-host.ru/extension/module-id",
        "steps": {
            "devServer": "Поднимите dev-сервер вашего модуля, который отдаёт frontend-ресурсы по HTTP.",
            "entrypoint": "Укажите URL entrypoint или descriptor: JS script, HTML entrypoint или JSON manifest.",
            "worker": "Для актуального сценария entrypoint должен запускать `runEndpoint(defineRunner(...))`, а descriptor — описывать `runner: \"worker\"`, `targets` и/или `pages`."
        },
        "title": "Подключите внешнее расширение"
    }
}
</i18n>

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";
@import (reference) "~assets/stylesheets/variables.less";

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

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: @spacing-xs;
    }

    &__button {
        background: #fff;
        border: 1px solid @grey-600;
        border-radius: @border-radius-md;
        color: @black-500;
        cursor: pointer;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        min-height: 38px;
        padding: @spacing-xs 12px;
    }

    &__button_primary {
        background: @blue-500;
        border-color: @blue-500;
        color: #fff;
    }
}
</style>

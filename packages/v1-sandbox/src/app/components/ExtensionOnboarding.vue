<template>
    <section
        :class="$style['extension-onboarding']"
        data-testid="sandbox-extension-onboarding"
    >
        <div :class="$style['extension-onboarding__content']">
            <p :class="$style['extension-onboarding__eyebrow']">
                External delivery
            </p>

            <h1 :class="$style['extension-onboarding__title']">
                Подключите внешнее расширение
            </h1>

            <p :class="$style['extension-onboarding__description']">
                Sandbox ждёт URL внешнего проекта: JSON manifest, HTML entrypoint
                или JS script. Он загрузит entrypoint по сети и запустит расширение в worker.
            </p>

            <ol :class="$style['extension-onboarding__steps']">
                <li>Поднимите внешний extension server, например `core-ui-extensions-examples`.</li>
                <li>Возьмите URL `/extension/&lt;uuid&gt;` или `/extension/&lt;uuid&gt;/script` из проекта расширения.</li>
                <li>Вставьте его ниже или в control panel и примените конфигурацию.</li>
            </ol>

            <label :class="$style['extension-onboarding__field']">
                <span :class="$style['extension-onboarding__label']">Extension URL</span>
                <input
                    :class="$style['extension-onboarding__input']"
                    :value="manifestUrl"
                    data-testid="sandbox-onboarding-manifest-url"
                    placeholder="http://web-extensions-server.simla.local/extension/<uuid>"
                    type="text"
                    @input="updateManifestUrl"
                />
            </label>

            <div :class="$style['extension-onboarding__actions']">
                <button
                    :class="[
                        $style['extension-onboarding__button'],
                        $style['extension-onboarding__button_primary'],
                    ]"
                    data-testid="sandbox-onboarding-use-core-ui-extension-example"
                    type="button"
                    @click="useCoreUiExtensionExample"
                >
                    Use core example
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    data-testid="sandbox-onboarding-apply"
                    type="button"
                    @click="apply"
                >
                    Открыть с manifestUrl
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    data-testid="sandbox-onboarding-open-core-ui-extension-example-returns"
                    type="button"
                    @click="openCoreUiExtensionExampleReturnsPage"
                >
                    Open returns page
                </button>

                <button
                    :class="$style['extension-onboarding__button']"
                    data-testid="sandbox-onboarding-open-controls"
                    type="button"
                    @click="openDevPanel"
                >
                    Configure extension
                </button>
            </div>

            <button
                :class="$style['extension-onboarding__demo-link']"
                data-testid="sandbox-onboarding-run-demo"
                type="button"
                @click="runLocalDemo"
            >
                Запустить локальный demo fallback
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  apply(): void;
  manifestUrl: string;
  openCoreUiExtensionExampleReturnsPage(): void;
  openDevPanel(): void;
  runLocalDemo(): void;
  setManifestUrl(value: string): void;
  useCoreUiExtensionExample(): void;
}>()

const updateManifestUrl = (event: Event) => {
  props.setManifestUrl((event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="less" module>
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

    &__button,
    &__demo-link {
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

    &__demo-link {
        justify-self: start;
    }
}
</style>

<template>
    <aside :class="$style['dev-panel']">
        <section
            :id="uid + '-dev-panel-controls'"
            :class="$style['dev-panel__card']"
        >
            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-manifest-url'"
                    >
                        {{ t('devPanel.extensionUrl') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.extensionUrl')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip>
                            <span>{{ t('devPanel.tooltips.extensionUrl') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.extensionHint') }}
                </span>

                <UiTextbox
                    :id="uid + '-dev-panel-manifest-url'"
                    :aria-describedby="getErrorDescribedBy('manifestUrl')"
                    :class="$style['dev-panel__control']"
                    :invalid="Boolean(props.validationErrors.manifestUrl)"
                    :placeholder="extensionUrlExample"
                    :value="props.manifestUrl"
                    type="text"
                    @update:value="updateManifestUrl"
                />

                <span
                    v-if="props.validationErrors.manifestUrl"
                    :id="getErrorId('manifestUrl')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.manifestUrl }}
                </span>
            </div>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :id="uid + '-dev-panel-mode-label'"
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-mode'"
                    >
                        {{ t('devPanel.mode') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.mode')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ t('devPanel.tooltips.mode') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <VSelect
                    :id="uid + '-dev-panel-mode'"
                    :aria-describedby="getErrorDescribedBy('mode')"
                    :labelled-by="uid + '-dev-panel-mode-label'"
                    :options="modeOptions"
                    :value="props.mode"
                    @update:value="value => props.setMode(value as SandboxLaunchMode)"
                />

                <span
                    v-if="props.validationErrors.mode"
                    :id="getErrorId('mode')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.mode }}
                </span>
            </div>

            <div
                v-if="props.mode === 'page'"
                :class="$style['dev-panel__field']"
            >
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-page-code'"
                    >
                        {{ t('devPanel.pageCode') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.pageCode')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ t('devPanel.tooltips.pageCode') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <UiTextbox
                    :id="uid + '-dev-panel-page-code'"
                    :aria-describedby="getErrorDescribedBy('pageCode')"
                    :class="$style['dev-panel__control']"
                    :invalid="Boolean(props.validationErrors.pageCode)"
                    :placeholder="t('devPanel.pageCodePlaceholder')"
                    :value="props.pageCode"
                    type="text"
                    @update:value="updatePageCode"
                />

                <span
                    v-if="props.validationErrors.pageCode"
                    :id="getErrorId('pageCode')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.pageCode }}
                </span>
            </div>

            <div
                v-else
                :class="$style['dev-panel__field']"
            >
                <div :class="$style['dev-panel__field-heading']">
                    <div
                        :id="uid + '-dev-panel-targets-label'"
                        :class="$style['dev-panel__field-label']"
                    >
                        {{ t('devPanel.targets') }}
                    </div>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.targets')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ t('devPanel.tooltips.targets') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.targetsHint') }}
                </span>

                <VSelect
                    :id="uid + '-dev-panel-targets'"
                    :aria-describedby="getErrorDescribedBy('targets')"
                    :labelled-by="uid + '-dev-panel-targets-label'"
                    :options="targetOptions"
                    :placeholder="t('devPanel.targetsPlaceholder')"
                    :value="props.selectedTargets"
                    multiple
                    @update:value="updateTargets"
                />

                <span
                    v-if="props.validationErrors.targets"
                    :id="getErrorId('targets')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.targets }}
                </span>
            </div>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :id="uid + '-dev-panel-fixture-label'"
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-fixture'"
                    >
                        {{ t('devPanel.fixture') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="fixtureTooltip"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ fixtureTooltip }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <VSelect
                    :id="uid + '-dev-panel-fixture'"
                    :aria-describedby="getErrorDescribedBy('fixture')"
                    :labelled-by="uid + '-dev-panel-fixture-label'"
                    :options="fixtureOptions"
                    :value="props.fixture"
                    @update:value="props.setFixture"
                />

                <span
                    v-if="props.validationErrors.fixture"
                    :id="getErrorId('fixture')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.fixture }}
                </span>

                <div
                    :class="$style['dev-panel__state']"
                    role="status"
                >
                    <span>
                        {{ t('devPanel.currentRunFixture') }}:
                        <strong>{{ activeFixturePresentation?.name }}</strong>
                    </span>

                    <span v-if="selectedFixtureChanged">
                        {{ t('devPanel.fixturePending', {
                            fixture: selectedFixturePresentation?.name,
                        }) }}
                    </span>
                </div>
            </div>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-context-json'"
                    >
                        {{ t('devPanel.contextJson') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.contextJson')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ t('devPanel.tooltips.contextJson') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.contextJsonHint') }}
                </span>

                <div
                    :class="$style['dev-panel__state']"
                    role="status"
                >
                    <span v-if="!props.extensionConnected">
                        {{ t('devPanel.contextState.disconnected') }}
                    </span>

                    <span v-else-if="props.contextHasManualChanges">
                        {{ t('devPanel.contextState.changed') }}
                    </span>

                    <span v-else>
                        {{ t('devPanel.contextState.fixture') }}
                    </span>
                </div>

                <UiTextbox
                    :id="uid + '-dev-panel-context-json'"
                    :aria-describedby="getErrorDescribedBy('contextJson')"
                    :class="[
                        $style['dev-panel__control'],
                        $style['dev-panel__context-editor'],
                    ]"
                    :input-attributes="{
                        spellcheck: false,
                        wrap: 'off',
                    }"
                    :invalid="Boolean(props.validationErrors.contextJson)"
                    :value="props.contextJson"
                    multiline
                    rows="14"
                    @update:value="props.setContextJson"
                />

                <span
                    v-if="props.validationErrors.contextJson"
                    :id="getErrorId('contextJson')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.contextJson }}
                </span>

                <div :class="$style['dev-panel__context-actions']">
                    <UiButton
                        appearance="secondary"
                        @click="props.formatContextJson"
                    >
                        {{ t('devPanel.actions.formatContextJson') }}
                    </UiButton>

                    <UiButton
                        appearance="secondary"
                        @click="props.resetContextJson"
                    >
                        {{ t('devPanel.actions.resetContextJson') }}
                    </UiButton>

                    <UiButton
                        appearance="secondary"
                        @click="props.downloadContextJson"
                    >
                        {{ t('devPanel.actions.downloadContextJson') }}
                    </UiButton>
                </div>

                <span
                    v-if="props.launchConfigChanged"
                    :class="$style['dev-panel__field-hint']"
                >
                    {{ t('devPanel.contextLaunchPending') }}
                </span>
            </div>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <UiButton
                    appearance="primary"
                    :disabled="isApplyDisabled || props.applyingContext || props.applyingLaunchConfig"
                    @click="props.applyLaunchConfig"
                >
                    {{ t('devPanel.actions.apply') }}
                </UiButton>

                <UiButton
                    appearance="secondary"
                    :disabled="isApplyContextDisabled"
                    @click="props.applyContextJson"
                >
                    {{ t('devPanel.actions.applyContextJson') }}
                </UiButton>
            </div>

            <span :class="$style['dev-panel__field-hint']">
                {{ t('devPanel.applyLaunchHint') }}
            </span>

            <UiAlert
                v-if="props.contextApplySucceeded"
                :text="t('devPanel.contextApplied')"
                variant="success"
                closable
                small
            />
        </section>
    </aside>
</template>

<script setup lang="ts">
import type { DevPanelField, DevPanelValidationErrors } from '@/scenario/validation'
import type { SandboxLaunchMode, SandboxOrderTarget } from '@/scenario/types'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import {
  UiAlert,
  UiButton,
  UiPopperConnector,
  UiTextbox,
  UiTooltip,
} from '@retailcrm/embed-ui-v1-components/host'

import VSelect from '@/components/VSelect.vue'

import HelpOutlined from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/help-outlined.svg'

import { getOrderSandboxFixturePresentations } from '@/app/fixturePresentation'
import { isValidSandboxPageCode } from '@/scenario/validation'
import { ORDER_SANDBOX_SLOTS } from '@/scenario/targets'

const props = defineProps<{
  activeFixture: string;
  applyLaunchConfig(): Promise<void>;
  applyContextJson(): Promise<void>;
  applyingContext: boolean;
  applyingLaunchConfig: boolean;
  contextApplySucceeded: boolean;
  contextHasManualChanges: boolean;
  contextJson: string;
  contextJsonChanged: boolean;
  downloadContextJson(): void;
  extensionConnected: boolean;
  fixture: string;
  formatContextJson(): void;
  launchConfigChanged: boolean;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  resetContextJson(): void;
  selectedTargets: SandboxOrderTarget[];
  setContextJson(value: string | number): void;
  setFixture(value: string | string[]): void;
  setManifestUrl(value: string): void;
  setMode(value: SandboxLaunchMode): void;
  setPageCode(value: string): void;
  setTargetSelected(target: SandboxOrderTarget, checked: boolean): void;
  validationErrors: DevPanelValidationErrors;
}>()

const { t } = useI18n()
const { t: tGlobal } = useI18n({ useScope: 'global' })
const uid = useId()
const extensionUrlExample = 'http://127.0.0.1:4175/extension/<uuid>'
const modeOptions = computed<Array<{
  label: string;
  value: SandboxLaunchMode;
}>>(() => [
  {
    label: t('devPanel.modeOptions.widgets'),
    value: 'widget',
  },
  {
    label: t('devPanel.modeOptions.page'),
    value: 'page',
  },
])
const fixturePresentations = computed(() => getOrderSandboxFixturePresentations(tGlobal))
const activeFixturePresentation = computed(() => fixturePresentations.value.find(
  fixture => fixture.code === props.activeFixture
))
const fixtureOptions = computed(() => fixturePresentations.value.map(fixture => ({
  label: fixture.name,
  value: fixture.code,
})))
const selectedFixturePresentation = computed(() => fixturePresentations.value.find(
  fixture => fixture.code === props.fixture
))
const selectedFixtureChanged = computed(() => props.fixture !== props.activeFixture)
const fixtureTooltip = computed(() => fixturePresentations.value
  .map(fixture => `${fixture.name}: ${fixture.description}`)
  .join(' ')
)
const targetOptions = ORDER_SANDBOX_SLOTS.map(slot => ({
  label: slot.target,
  value: slot.target,
}))
const isApplyDisabled = computed(() => {
  if (!props.manifestUrl.trim() || !props.fixture || !props.mode) return true

  if (props.mode === 'page') return !isValidSandboxPageCode(props.pageCode)

  return props.selectedTargets.length === 0
})
const isApplyContextDisabled = computed(() =>
  !props.contextJsonChanged
  || !props.extensionConnected
  || props.launchConfigChanged
  || props.applyingContext
  || props.applyingLaunchConfig
)

const updateManifestUrl = (value: string | number) => {
  props.setManifestUrl(String(value))
}

const updatePageCode = (value: string | number) => {
  props.setPageCode(String(value))
}

const updateTargets = (value: string | string[]) => {
  const targets = Array.isArray(value) ? value : []

  ORDER_SANDBOX_SLOTS.forEach(({ target }) => {
    const selected = targets.includes(target)

    if (props.selectedTargets.includes(target) !== selected) {
      props.setTargetSelected(target, selected)
    }
  })
}

const getErrorId = (field: DevPanelField): string => `${uid}-dev-panel-${field}-error`

const getErrorDescribedBy = (field: DevPanelField): string | undefined =>
  props.validationErrors[field] ? getErrorId(field) : undefined
</script>

<i18n locale="en-GB">
{
    "devPanel": {
        "actions": {
            "apply": "Apply",
            "applyContextJson": "Apply context",
            "downloadContextJson": "Download JSON",
            "formatContextJson": "Format",
            "resetContextJson": "Undo changes"
        },
        "applyLaunchHint": "Applying launch settings restarts the extension with the selected fixture and replaces the current context, including manual changes.",
        "contextApplied": "Context applied. The extension has been restarted.",
        "contextJson": "Current run Context JSON",
        "contextJsonHint": "Edit the context used by the current run. Applying this JSON restarts the connected extension without changing its launch settings.",
        "contextLaunchPending": "Apply the changed launch settings before applying context.",
        "contextState": {
            "changed": "Context changed manually",
            "disconnected": "Extension is not connected",
            "fixture": "Original fixture context"
        },
        "currentRunFixture": "Current run",
        "extensionHint": "Enter the full extension URL using the example shown in the field. Replace the UUID with the value from extensionrc.json and make sure the resulting page opens in the browser.",
        "extensionUrl": "Manifest / extension URL",
        "fixture": "Selected fixture",
        "fixturePending": "The “{fixture}” fixture has not been applied yet. Use Apply to start it.",
        "mode": "Mode",
        "modeOptions": {
            "page": "Page",
            "widgets": "Widgets"
        },
        "pageCode": "Page code",
        "pageCodePlaceholder": "Enter page code",
        "targets": "Widget mount targets",
        "targetsHint": "Targets are CRM slots where widget runners are mounted. They are used only in widget mode.",
        "targetsPlaceholder": "Select mount targets",
        "tooltips": {
            "contextJson": "Context used by the current connected extension. It is independent from the fixture selected for the next launch.",
            "extensionUrl": "The extension URL can point to any external application that serves the extension, for example http://web-extensions-server.simla.local/extension/.",
            "mode": "Widgets mount into selected CRM targets. Page mounts a page runner by page code.",
            "pageCode": "Use the code from the extension pages registration, not the extension id. Only Latin letters (A–Z, a–z) and hyphens are allowed.",
            "targets": "Targets are widget mount slots. Select the same targets that the extension registers."
        }
    }
}
</i18n>

<i18n locale="es-ES">
{
    "devPanel": {
        "actions": {
            "apply": "Aplicar",
            "applyContextJson": "Aplicar contexto",
            "downloadContextJson": "Descargar JSON",
            "formatContextJson": "Formatear",
            "resetContextJson": "Deshacer cambios"
        },
        "applyLaunchHint": "Al aplicar los parámetros de inicio, la extensión se reinicia con los datos de prueba seleccionados y se sustituye el contexto actual, incluidos los cambios manuales.",
        "contextApplied": "Contexto aplicado. La extensión se ha reiniciado.",
        "contextJson": "JSON del contexto de la ejecución actual",
        "contextJsonHint": "Edite el contexto de la ejecución actual. Al aplicar este JSON, la extensión conectada se reinicia sin cambiar sus parámetros de inicio.",
        "contextLaunchPending": "Aplique los parámetros de inicio modificados antes de aplicar el contexto.",
        "contextState": {
            "changed": "Contexto modificado manualmente",
            "disconnected": "La extensión no está conectada",
            "fixture": "Contexto original de los datos de prueba"
        },
        "currentRunFixture": "Ejecución actual",
        "extensionHint": "Introduzca la URL completa utilizando el ejemplo del campo. Sustituya el UUID por el valor de extensionrc.json y compruebe que la página resultante se abre en el navegador.",
        "extensionUrl": "Manifiesto / URL de la extensión",
        "fixture": "Datos de prueba seleccionados",
        "fixturePending": "Los datos de prueba «{fixture}» aún no se han aplicado. Utilice «Aplicar» para iniciarlos.",
        "mode": "Modo",
        "modeOptions": {
            "page": "Página",
            "widgets": "Widgets"
        },
        "pageCode": "Código de página",
        "pageCodePlaceholder": "Introduzca el código de la página",
        "targets": "Puntos de montaje de widgets",
        "targetsHint": "Los puntos de montaje son áreas de la interfaz de CRM donde se ejecutan los widgets. Solo se utilizan en el modo «Widgets».",
        "targetsPlaceholder": "Seleccione los puntos de montaje",
        "tooltips": {
            "contextJson": "Contexto utilizado por la extensión conectada actualmente. Es independiente de los datos de prueba seleccionados para el siguiente inicio.",
            "extensionUrl": "La URL de la extensión puede apuntar a cualquier aplicación externa que sirva la extensión, por ejemplo http://web-extensions-server.simla.local/extension/.",
            "mode": "En el modo «Widgets», los widgets se añaden a los puntos de montaje seleccionados. En el modo «Página», se ejecuta una página mediante su código.",
            "pageCode": "Utilice el valor code del registro pages, no el UUID de la extensión. Solo se permiten letras latinas (A–Z, a–z) y guiones.",
            "targets": "Los puntos de montaje son áreas de la interfaz de CRM para widgets. Seleccione los mismos puntos que registra la extensión."
        }
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "devPanel": {
        "actions": {
            "apply": "Применить",
            "applyContextJson": "Применить контекст",
            "downloadContextJson": "Скачать JSON",
            "formatContextJson": "Форматировать",
            "resetContextJson": "Отменить изменения"
        },
        "applyLaunchHint": "Применение параметров запуска перезапускает расширение с выбранной фикстурой и заменяет текущий контекст, включая ручные изменения.",
        "contextApplied": "Контекст применён. Расширение перезапущено.",
        "contextJson": "JSON контекста текущего запуска",
        "contextJsonHint": "Изменяет контекст текущего запуска. После применения подключённое расширение перезапускается без изменения параметров запуска.",
        "contextLaunchPending": "Сначала примените изменённые параметры запуска, затем изменяйте контекст.",
        "contextState": {
            "changed": "Контекст изменён вручную",
            "disconnected": "Расширение не подключено",
            "fixture": "Исходный контекст фикстуры"
        },
        "currentRunFixture": "Текущий запуск",
        "extensionHint": "Укажите полный URL расширения по примеру в поле. Замените UUID на значение из extensionrc.json и убедитесь, что получившаяся страница открывается в браузере.",
        "extensionUrl": "Манифест / URL расширения",
        "fixture": "Выбранная фикстура",
        "fixturePending": "Фикстура «{fixture}» ещё не применена. Запустите её кнопкой «Применить».",
        "mode": "Режим",
        "modeOptions": {
            "page": "Страница",
            "widgets": "Виджеты"
        },
        "pageCode": "Код страницы",
        "pageCodePlaceholder": "Введите код страницы",
        "targets": "Места встраивания виджетов",
        "targetsHint": "Места встраивания — это области интерфейса CRM, в которых запускаются виджеты. Они используются только в режиме «Виджеты».",
        "targetsPlaceholder": "Выберите места встраивания",
        "tooltips": {
            "contextJson": "Контекст текущего подключённого расширения. Он не зависит от фикстуры, выбранной для следующего запуска.",
            "extensionUrl": "URL расширения может указывать на любое стороннее приложение, которое отдаёт расширение, например http://web-extensions-server.simla.local/extension/.",
            "mode": "В режиме «Виджеты» виджеты добавляются в выбранные места встраивания. В режиме «Страница» запускается страница по её коду.",
            "pageCode": "Укажите значение code из массива pages в дескрипторе, а не UUID расширения. Допустимы только латинские буквы (A–Z, a–z) и дефисы.",
            "targets": "Места встраивания — это области интерфейса CRM для виджетов. Выберите те же места, которые зарегистрированы расширением."
        }
    }
}
</i18n>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.dev-panel {
    align-content: start;
    display: grid;
    gap: @spacing-s;
    min-width: 0;

    &__card {
        background: #fff;
        border-radius: @border-radius-lg;
        display: grid;
        gap: 14px;
        min-width: 0;
        overflow: hidden;
        padding: 18px;
    }

    &__field-heading {
        align-items: center;
        display: flex;
        gap: @spacing-xxs;
        justify-content: space-between;
        min-width: 0;

        :global(.ui-v1-add-button__content),
        :global(.ui-v1-add-button__content:active),
        :global(.ui-v1-add-button:active .ui-v1-add-button__content) {
            border: none;
        }
    }

    &__card-title {
        color: @black-500;
        font-size: 20px;
        line-height: 1.2;
        margin: 0;
    }

    &__field {
        display: grid;
        gap: 6px;
        min-width: 0;
    }

    &__control {
        width: 100%;
    }

    &__context-editor {
        :global(textarea) {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
            max-height: 480px;
            min-height: 240px;
            overflow: auto;
            resize: vertical;
            white-space: pre;
        }
    }

    &__context-actions {
        display: flex;
        flex-wrap: wrap;
        gap: @spacing-xs;
        padding-top: @spacing-xs;
    }

    &__field-label {
        color: @grey-900;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
    }

    &__field-hint {
        color: @grey-900;
        font-size: 12px;
        line-height: 1.35;
    }

    &__state {
        background: @grey-200;
        border-radius: @border-radius-sm;
        color: @grey-900;
        display: grid;
        font-size: 12px;
        gap: 4px;
        line-height: 1.35;
        padding: @spacing-xs;
    }

    &__error {
        color: @red-500;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.35;
        margin: -4px 0 0;
    }

    &__actions {
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
        gap: @spacing-xs;
        justify-content: space-between;

        &_wrap {
            flex-wrap: wrap;
        }
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
        white-space: nowrap;

        &_primary {
            background: @blue-500;
            border-color: @blue-500;
            color: #fff;
        }
    }

}

@media (max-width: 1280px) {
    .dev-panel {
        max-height: none;
    }
}
</style>

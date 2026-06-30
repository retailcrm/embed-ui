<template>
    <aside :class="$style['dev-panel']">
        <section
            :id="uid + '-dev-panel-controls'"
            :class="$style['dev-panel__card']"
            :aria-labelledby="uid + '-dev-panel-controls-title'"
        >
            <h2 :id="uid + '-dev-panel-controls-title'" :class="$style['dev-panel__card-title']">
                {{ t('devPanel.title') }}
            </h2>

            <div :class="$style['dev-panel__delivery-note']">
                <strong>{{ t('devPanel.delivery.title') }}</strong>

                <span>{{ t('devPanel.delivery.workflow') }}</span>
            </div>

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

                <UiTextbox
                    :id="uid + '-dev-panel-manifest-url'"
                    :aria-describedby="getErrorDescribedBy('manifestUrl')"
                    :class="$style['dev-panel__control']"
                    :invalid="Boolean(props.validationErrors.manifestUrl)"
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

                <SandboxSelect
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
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip :offset-main-axis="4">
                            <span>{{ t('devPanel.tooltips.fixture') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <SandboxSelect
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
            </div>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <label
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-page-code'"
                    >
                        {{ t('devPanel.pageCode') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
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
                    :disabled="props.mode !== 'page'"
                    :invalid="Boolean(props.validationErrors.pageCode)"
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

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-heading']">
                    <div
                        :id="uid + '-dev-panel-targets-label'"
                        :class="$style['dev-panel__field-label']"
                    >
                        {{ t('devPanel.targets') }}
                    </div>

                    <UiPopperConnector>
                        <UiButton
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

                <div
                    :class="$style['dev-panel__target-checklist']"
                    :aria-describedby="getErrorDescribedBy('targets')"
                    :aria-labelledby="uid + '-dev-panel-targets-label'"
                    role="group"
                >
                    <div
                        v-for="(slot, index) in ORDER_SANDBOX_SLOTS"
                        :key="slot.target"
                        :class="$style['dev-panel__target-checklist-item']"
                    >
                        <UiCheckbox
                            :id="`sandbox-target-${index}`"
                            :disabled="props.mode !== 'widget'"
                            :model="props.selectedTargets.includes(slot.target)"
                            @update:model="updateTargetModel(slot.target, $event)"
                        />
                        <label :for="`sandbox-target-${index}`">{{ slot.target }}</label>
                    </div>
                </div>

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
                        :class="$style['dev-panel__field-label']"
                        :for="uid + '-dev-panel-context-json'"
                    >
                        {{ t('devPanel.contextJson') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
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

                <UiTextbox
                    :id="uid + '-dev-panel-context-json'"
                    :aria-describedby="getErrorDescribedBy('contextJson')"
                    :class="$style['dev-panel__control']"
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
            </div>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <UiButton
                    appearance="primary"
                    :disabled="isApplyDisabled"
                    @click="props.applyLaunchConfig"
                >
                    {{ t('devPanel.actions.apply') }}
                </UiButton>

                <UiButton
                    appearance="secondary"
                    :disabled="!props.contextJsonChanged"
                    @click="props.applyContextJson"
                >
                    {{ t('devPanel.actions.applyContextJson') }}
                </UiButton>
            </div>
        </section>
    </aside>
</template>

<script setup lang="ts">
import type { DevPanelField, DevPanelValidationErrors } from '@/dev/validation'
import type { SandboxLaunchMode, SandboxOrderTarget } from '@/dev/types'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import {
  UiButton,
  UiCheckbox,
  UiPopperConnector,
  UiTextbox,
  UiTooltip,
} from '@retailcrm/embed-ui-v1-components/host'

import SandboxSelect from '@/app/components/SandboxSelect.vue'

import HelpOutlined from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/help-outlined.svg'

import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'
import { orderSandboxFixtures } from '@/dev/fixtures'

const props = defineProps<{
  applyLaunchConfig(): void;
  applyContextJson(): Promise<void>;
  contextJson: string;
  contextJsonChanged: boolean;
  fixture: string;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  selectedTargets: SandboxOrderTarget[];
  setContextJson(value: string | number): void;
  setFixture(value: string): void;
  setManifestUrl(value: string): void;
  setMode(value: SandboxLaunchMode): void;
  setPageCode(value: string): void;
  setTargetSelected(target: SandboxOrderTarget, checked: boolean): void;
  validationErrors: DevPanelValidationErrors;
}>()

const { t } = useI18n()
const uid = useId()
const fixtureLabelKeys: Record<string, string> = {
  'order-basic': 'devPanel.fixtures.orderBasic',
  'order-readonly-error': 'devPanel.fixtures.orderReadonlyError',
  'order-with-delivery': 'devPanel.fixtures.orderWithDelivery',
}
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
const fixtureOptions = computed(() => Object.entries(orderSandboxFixtures).map(([code, fixture]) => ({
  label: fixtureLabelKeys[code] ? t(fixtureLabelKeys[code]) : fixture.name,
  value: code,
})))
const isApplyDisabled = computed(() => {
  if (!props.manifestUrl.trim() || !props.fixture || !props.mode) return true

  if (props.mode === 'page') return !props.pageCode.trim()

  return props.selectedTargets.length === 0
})

const updateManifestUrl = (value: string | number) => {
  props.setManifestUrl(String(value))
}

const updatePageCode = (value: string | number) => {
  props.setPageCode(String(value))
}

const updateTarget = (target: SandboxOrderTarget, checked: boolean) => {
  props.setTargetSelected(target, checked)
}

const updateTargetModel = (target: SandboxOrderTarget, value: unknown) => {
  updateTarget(target, Boolean(value))
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
            "applyContextJson": "Apply context"
        },
        "contextJson": "Context JSON",
        "contextJsonHint": "Edit fixture-backed contexts for the current run. Applying this JSON reloads the extension.",
        "delivery": {
            "empty": "Manifest / extension URL is empty. The onboarding page will be shown without a network source.",
            "title": "JS module delivery",
            "workflow": "%extension-url%/extension/%extension-id% → descriptor/entrypoint/script → worker"
        },
        "extensionUrl": "Manifest / extension URL",
        "fixture": "Fixture",
        "fixtures": {
            "orderBasic": "Basic order",
            "orderReadonlyError": "Readonly / error-like",
            "orderWithDelivery": "Order with delivery"
        },
        "mode": "Mode",
        "modeOptions": {
            "page": "Page",
            "widgets": "Widgets"
        },
        "pageCode": "Page code",
        "targets": "Widget mount targets",
        "targetsHint": "Targets are CRM slots where widget runners are mounted. They are used only in widget mode.",
        "title": "Sandbox controls",
        "tooltips": {
            "contextJson": "Current fixture context. Edit it to simulate another CRM state, then apply context.",
            "extensionUrl": "Required full extension endpoint: %extension-url%/extension/%extension-id%. The extension server must be available from the browser.",
            "fixture": "Fixture defines mock CRM data: order context, user, settings, custom fields and initial host state.",
            "mode": "Widgets mount into selected CRM targets. Page mounts a page runner by page code.",
            "pageCode": "Required only in Page mode. Use the page code from the extension pages registration, not the extension id.",
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
            "applyContextJson": "Aplicar contexto"
        },
        "contextJson": "Contexto JSON",
        "contextJsonHint": "Edita los contextos basados en fixture para la ejecución actual. Al aplicar este JSON se recarga la extensión.",
        "delivery": {
            "empty": "Manifest / extension URL está vacío. Sin fuente de red se mostrará onboarding.",
            "title": "Entrega de módulo JS",
            "workflow": "%extension-url%/extension/%extension-id% → descriptor/entrypoint/script → worker"
        },
        "extensionUrl": "Manifest / extension URL",
        "fixture": "Fixture",
        "fixtures": {
            "orderBasic": "Pedido básico",
            "orderReadonlyError": "Readonly / error-like",
            "orderWithDelivery": "Pedido con entrega"
        },
        "mode": "Modo",
        "modeOptions": {
            "page": "Página",
            "widgets": "Widgets"
        },
        "pageCode": "Código de página",
        "targets": "Puntos de montaje de widgets",
        "targetsHint": "Los targets son slots de CRM donde se montan los widget runners. Se usan solo en modo widget.",
        "title": "Controles de sandbox",
        "tooltips": {
            "contextJson": "Contexto actual de la fixture. Edítalo para simular otro estado de CRM y aplica el contexto.",
            "extensionUrl": "Endpoint completo obligatorio de la extensión: %extension-url%/extension/%extension-id%. El servidor debe estar disponible desde el navegador.",
            "fixture": "La fixture define datos mock de CRM: contexto del pedido, usuario, ajustes, campos personalizados y estado inicial del host.",
            "mode": "Widgets monta en los targets CRM seleccionados. Página monta un page runner por código de página.",
            "pageCode": "Obligatorio solo en modo Página. Usa el código de página del registro pages, no el id de la extensión.",
            "targets": "Los targets son slots de montaje de widgets. Selecciona los mismos targets que registra la extensión."
        }
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "devPanel": {
        "actions": {
            "apply": "Применить",
            "applyContextJson": "Применить контекст"
        },
        "contextJson": "Context JSON",
        "contextJsonHint": "Меняет fixture-backed contexts для текущего запуска. После применения расширение перезапускается.",
        "delivery": {
            "empty": "Сейчас Manifest / URL расширения пустой. Без сетевого источника будет показана стартовая страница.",
            "title": "Доставка JS-модуля",
            "workflow": "%extension-url%/extension/%extension-id% → descriptor/entrypoint/script → worker"
        },
        "extensionUrl": "Manifest / URL расширения",
        "fixture": "Фикстура",
        "fixtures": {
            "orderBasic": "Базовый заказ",
            "orderReadonlyError": "Readonly / error-like",
            "orderWithDelivery": "Заказ с доставкой"
        },
        "mode": "Режим",
        "modeOptions": {
            "page": "Страница",
            "widgets": "Виджеты"
        },
        "pageCode": "Код страницы",
        "targets": "Места встраивания виджетов",
        "targetsHint": "Targets — это CRM-слоты, куда монтируются widget runners. Они используются только в режиме виджетов.",
        "title": "Управление песочницей",
        "tooltips": {
            "contextJson": "Текущий контекст из фикстуры. Можно изменить его, чтобы симулировать другое состояние CRM, затем применить контекст.",
            "extensionUrl": "Обязательный полный endpoint расширения: %extension-url%/extension/%extension-id%. Сервер расширения должен быть доступен из браузера.",
            "fixture": "Фикстура задаёт моковые данные CRM: контекст заказа, пользователя, настройки, пользовательские поля и начальное состояние host.",
            "mode": "Виджеты монтируются в выбранные CRM targets. Страница монтирует page runner по коду страницы.",
            "pageCode": "Обязателен только в режиме страницы. Укажите код из pages регистрации расширения, а не id расширения.",
            "targets": "Targets — это слоты для встраивания виджетов. Выберите те же targets, которые регистрирует расширение."
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

    &__delivery-note {
        background: @grey-200;
        border: 1px solid @grey-500;
        border-radius: @border-radius-md;
        color: @black-500;
        display: grid;
        font-size: 13px;
        gap: @spacing-xs;
        line-height: 1.4;
        min-width: 0;
        overflow-wrap: anywhere;
        padding: 12px;
    }

    &__error {
        color: @red-500;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.35;
        margin: -4px 0 0;
    }

    &__target-checklist {
        display: grid;
        gap: @spacing-xs;
        margin-top: @spacing-xs;
    }

    &__target-checklist-item {
        align-items: center;
        color: @black-500;
        display: flex;
        font-size: 14px;
        gap: @spacing-xs;
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

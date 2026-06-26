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

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">
                    {{ t('devPanel.extensionUrl') }}
                </span>

                <UiTextbox
                    :id="uid + '-dev-panel-manifest-url'"
                    :aria-describedby="getErrorDescribedBy('manifestUrl')"
                    :class="$style['dev-panel__control']"
                    :invalid="Boolean(props.validationErrors.manifestUrl)"
                    :value="props.manifestUrl"
                    type="text"
                    @update:value="updateManifestUrl"
                />

                <p
                    v-if="props.validationErrors.manifestUrl"
                    :id="getErrorId('manifestUrl')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.manifestUrl }}
                </p>
            </label>

            <div :class="$style['dev-panel__field']">
                <label
                    :id="uid + '-dev-panel-mode-label'"
                    :class="$style['dev-panel__field-label']"
                    :for="uid + '-dev-panel-mode'"
                >
                    {{ t('devPanel.mode') }}
                </label>

                <SandboxSelect
                    :id="uid + '-dev-panel-mode'"
                    :aria-describedby="getErrorDescribedBy('mode')"
                    :labelled-by="uid + '-dev-panel-mode-label'"
                    :options="modeOptions"
                    :value="props.mode"
                    @update:value="value => props.setMode(value as SandboxLaunchMode)"
                />

                <p
                    v-if="props.validationErrors.mode"
                    :id="getErrorId('mode')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.mode }}
                </p>
            </div>

            <div :class="$style['dev-panel__field']">
                <label
                    :id="uid + '-dev-panel-fixture-label'"
                    :class="$style['dev-panel__field-label']"
                    :for="uid + '-dev-panel-fixture'"
                >
                    {{ t('devPanel.fixture') }}
                </label>

                <SandboxSelect
                    :id="uid + '-dev-panel-fixture'"
                    :aria-describedby="getErrorDescribedBy('fixture')"
                    :labelled-by="uid + '-dev-panel-fixture-label'"
                    :options="fixtureOptions"
                    :value="props.fixture"
                    @update:value="props.setFixture"
                />

                <p
                    v-if="props.validationErrors.fixture"
                    :id="getErrorId('fixture')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.fixture }}
                </p>
            </div>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">
                    {{ t('devPanel.pageCode') }}
                </span>

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

                <p
                    v-if="props.validationErrors.pageCode"
                    :id="getErrorId('pageCode')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.pageCode }}
                </p>
            </label>

            <div :class="$style['dev-panel__field']">
                <div
                    :id="uid + '-dev-panel-targets-label'"
                    :class="$style['dev-panel__field-label']"
                >
                    {{ t('devPanel.targets') }}
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
                            @update:model="value => updateTarget(slot.target, Boolean(value))"
                        />
                        <label :for="`sandbox-target-${index}`">{{ slot.target }}</label>
                    </div>
                </div>

                <p
                    v-if="props.validationErrors.targets"
                    :id="getErrorId('targets')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.targets }}
                </p>
            </div>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">
                    {{ t('devPanel.contextJson') }}
                </span>

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

                <p
                    v-if="props.validationErrors.contextJson"
                    :id="getErrorId('contextJson')"
                    :class="$style['dev-panel__error']"
                    role="alert"
                >
                    {{ props.validationErrors.contextJson }}
                </p>
            </label>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <UiButton
                    appearance="primary"
                    @click="props.applyLaunchConfig"
                >
                    {{ t('devPanel.actions.apply') }}
                </UiButton>

                <UiButton
                    appearance="outlined"
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

import SandboxSelect from '@/app/components/SandboxSelect.vue'

import { UiButton, UiCheckbox, UiTextbox } from '@/app/host-components'

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

const updateManifestUrl = (value: string | number) => {
  props.setManifestUrl(String(value))
}

const updatePageCode = (value: string | number) => {
  props.setPageCode(String(value))
}

const updateTarget = (target: SandboxOrderTarget, checked: boolean) => {
  props.setTargetSelected(target, checked)
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
        "title": "Sandbox controls"
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
        "title": "Controles de sandbox"
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
        "title": "Управление песочницей"
    }
}
</i18n>

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";
@import (reference) "~assets/stylesheets/variables.less";

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
        display: flex;
        flex-wrap: nowrap;
        gap: @spacing-xs;

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

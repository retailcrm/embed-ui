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

                <input
                    :class="$style['dev-panel__input']"
                    :value="props.manifestUrl"
                    type="text"
                    @input="updateManifestUrl"
                />
            </label>

            <div :class="$style['dev-panel__field']">
                <div
                    :id="uid + '-dev-panel-mode-label'"
                    :class="$style['dev-panel__field-label']"
                >
                    {{ t('devPanel.mode') }}
                </div>

                <select
                    :class="$style['dev-panel__native-select']"
                    :value="props.mode"
                    tabindex="-1"
                    @change="updateMode"
                >
                    <option value="widget">
                        {{ t('devPanel.modeOptions.widgets') }}
                    </option>

                    <option value="page">
                        {{ t('devPanel.modeOptions.page') }}
                    </option>
                </select>

                <div :class="$style['dev-panel__select']">
                    <button
                        :aria-label="`${t('devPanel.mode')}: ${selectedModeLabel}`"
                        :aria-expanded="openSelect === 'mode'"
                        :class="$style['dev-panel__select-trigger']"
                        aria-haspopup="listbox"
                        type="button"
                        @click="toggleSelect('mode')"
                    >
                        <span>{{ selectedModeLabel }}</span>

                        <span
                            :class="$style['dev-panel__select-chevron']"
                        >
                            ‹
                        </span>
                    </button>

                    <div
                        v-if="openSelect === 'mode'"
                        :class="$style['dev-panel__select-popper']"
                        :aria-labelledby="uid + '-dev-panel-mode-label'"
                        role="listbox"
                    >
                        <button
                            v-for="option in modeOptions"
                            :key="option.value"
                            :class="[
                                $style['dev-panel__select-option'],
                                option.value === props.mode && $style['dev-panel__select-option_selected'],
                            ]"
                            :aria-selected="option.value === props.mode"
                            role="option"
                            type="button"
                            @click="selectMode(option.value)"
                        >
                            {{ option.label }}
                        </button>
                    </div>
                </div>
            </div>

            <div :class="$style['dev-panel__field']">
                <div
                    :id="uid + '-dev-panel-fixture-label'"
                    :class="$style['dev-panel__field-label']"
                >
                    {{ t('devPanel.fixture') }}
                </div>

                <select
                    :class="$style['dev-panel__native-select']"
                    :value="props.fixture"
                    tabindex="-1"
                    @change="updateFixture"
                >
                    <option
                        v-for="fixtureOption in fixtureOptions"
                        :key="fixtureOption.code"
                        :value="fixtureOption.code"
                    >
                        {{ fixtureOption.name }}
                    </option>
                </select>

                <div :class="$style['dev-panel__select']">
                    <button
                        :aria-label="`${t('devPanel.fixture')}: ${selectedFixtureLabel}`"
                        :aria-expanded="openSelect === 'fixture'"
                        :class="$style['dev-panel__select-trigger']"
                        aria-haspopup="listbox"
                        type="button"
                        @click="toggleSelect('fixture')"
                    >
                        <span>{{ selectedFixtureLabel }}</span>

                        <span
                            :class="$style['dev-panel__select-chevron']"
                        >
                            ‹
                        </span>
                    </button>

                    <div
                        v-if="openSelect === 'fixture'"
                        :class="$style['dev-panel__select-popper']"
                        :aria-labelledby="uid + '-dev-panel-fixture-label'"
                        role="listbox"
                    >
                        <button
                            v-for="option in fixtureOptions"
                            :key="option.code"
                            :class="[
                                $style['dev-panel__select-option'],
                                option.code === props.fixture && $style['dev-panel__select-option_selected'],
                            ]"
                            :aria-selected="option.code === props.fixture"
                            role="option"
                            type="button"
                            @click="selectFixture(option.code)"
                        >
                            {{ option.name }}
                        </button>
                    </div>
                </div>
            </div>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">
                    {{ t('devPanel.pageCode') }}
                </span>

                <input
                    :class="$style['dev-panel__input']"
                    :disabled="props.mode !== 'page'"
                    :value="props.pageCode"
                    type="text"
                    @input="updatePageCode"
                />
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
                    :aria-labelledby="uid + '-dev-panel-targets-label'"
                    role="group"
                >
                    <label
                        v-for="slot in ORDER_SANDBOX_SLOTS"
                        :key="slot.target"
                        :class="$style['dev-panel__target-checklist-item']"
                    >
                        <input
                            :checked="props.selectedTargets.includes(slot.target)"
                            :disabled="props.mode !== 'widget'"
                            type="checkbox"
                            @change="event => updateTarget(slot.target, event)"
                        />
                        <span>{{ slot.target }}</span>
                    </label>
                </div>
            </div>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <button
                    :class="[$style['dev-panel__button'], $style['dev-panel__button_primary']]"
                    type="button"
                    @click="props.applyLaunchConfig"
                >
                    {{ t('devPanel.actions.apply') }}
                </button>

                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="props.reloadExtension"
                >
                    {{ t('devPanel.actions.reloadExtension') }}
                </button>

                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="props.resetState"
                >
                    {{ t('devPanel.actions.resetState') }}
                </button>
            </div>
        </section>

        <section
            :class="$style['dev-panel__card']"
            :aria-labelledby="uid + '-dev-panel-host-api-actions-title'"
        >
            <h2 :id="uid + '-dev-panel-host-api-actions-title'" :class="$style['dev-panel__card-title']">
                {{ t('devPanel.hostApiActions') }}
            </h2>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="runHttpPing"
                >
                    httpCall
                </button>

                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="props.goToOrder"
                >
                    goTo
                </button>

                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="props.pushQuery"
                >
                    pushQuery
                </button>

                <button
                    :class="$style['dev-panel__button']"
                    type="button"
                    @click="props.replaceQuery"
                >
                    replaceQuery
                </button>
            </div>
        </section>

        <section :aria-labelledby="uid + '-dev-panel-host-activity-title'" :class="$style['dev-panel__card']">
            <h2 :id="uid + '-dev-panel-host-activity-title'" :class="$style['dev-panel__card-title']">
                {{ t('devPanel.hostActivity.title') }}
            </h2>

            <ul
                :class="$style['dev-panel__activity-log']"
                aria-live="polite"
            >
                <template v-if="hostActivity.length === 0">
                    <li :class="[$style['dev-panel__activity-item'], $style['dev-panel__activity-item_empty']]">
                        {{ t('devPanel.hostActivity.empty') }}
                    </li>
                </template>

                <template v-else>
                    <li
                        v-for="record in hostActivity"
                        :key="record.id"
                        :class="$style['dev-panel__activity-item']"
                    >
                        <span :class="$style['dev-panel__activity-item-kind']">{{ record.kind }}</span>

                        <code>{{ record.text }}</code>

                        <span :class="$style['dev-panel__activity-item-index']">#{{ record.index }}</span>
                    </li>
                </template>
            </ul>
        </section>

        <section :aria-labelledby="uid + '-dev-panel-state-snapshot-title'" :class="$style['dev-panel__card']">
            <h2 :id="uid + '-dev-panel-state-snapshot-title'" :class="$style['dev-panel__card-title']">
                {{ t('devPanel.stateSnapshot') }}
            </h2>

            <pre
                :class="$style['dev-panel__state-snapshot']"
            >
              {{ stateSnapshot }}
            </pre>
        </section>
    </aside>
</template>

<script setup lang="ts">
import type { OrderSandboxSchemas } from '@/dev/fixtures'
import type { SandboxController } from '@/core/controller'
import type { SandboxLaunchMode } from '@/dev/launch'
import type { SandboxOrderTarget } from '@/dev/targets'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'
import { orderSandboxFixtures } from '@/dev/fixtures'

type OrderSandboxController = SandboxController<OrderSandboxSchemas>
type OpenSelect = 'fixture' | 'mode' | null

const props = defineProps<{
  applyLaunchConfig(): void;
  fixture: string;
  goToOrder(): void;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  pushQuery(): void;
  reloadExtension(): void;
  replaceQuery(): void;
  resetState(): Promise<void>;
  runHttpPing(): Promise<void>;
  sandbox: OrderSandboxController;
  selectedTargets: SandboxOrderTarget[];
  setFixture(value: string): void;
  setManifestUrl(value: string): void;
  setMode(value: SandboxLaunchMode): void;
  setPageCode(value: string): void;
  setTargetSelected(target: SandboxOrderTarget, checked: boolean): void;
}>()

const { t } = useI18n()
const uid = useId()
const openSelect = ref<OpenSelect>(null)
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
  code,
  name: fixtureLabelKeys[code] ? t(fixtureLabelKeys[code]) : fixture.name,
})))
const selectedModeLabel = computed(() =>
  modeOptions.value.find(option => option.value === props.mode)?.label ?? props.mode
)
const selectedFixtureLabel = computed(() =>
  fixtureOptions.value.find(option => option.code === props.fixture)?.name ?? props.fixture
)

const hostActivity = computed(() => [
  ...props.sandbox.state.host.navigation.map((record, index) => ({
    id: `navigation-${index}`,
    index: index + 1,
    kind: record.kind,
    text: record.kind === 'go-to'
      ? `${record.route} ${JSON.stringify(record.params ?? {})}`
      : `${record.location.pathname}${record.location.search}`,
  })),
  ...props.sandbox.state.host.http.map((record, index) => ({
    id: `http-${index}`,
    index: index + 1,
    kind: 'httpCall',
    text: `${record.action} -> ${record.response.status}`,
  })),
])

const stateSnapshot = computed(() => JSON.stringify({
  contexts: props.sandbox.state.contexts,
  custom: props.sandbox.state.custom,
  host: props.sandbox.state.host,
  mode: props.sandbox.state.mode,
}, null, 2))

const updateMode = (event: Event) => {
  props.setMode((event.target as HTMLSelectElement).value as SandboxLaunchMode)
}

const updateFixture = (event: Event) => {
  props.setFixture((event.target as HTMLSelectElement).value)
}

const updateManifestUrl = (event: Event) => {
  props.setManifestUrl((event.target as HTMLInputElement).value)
}

const updatePageCode = (event: Event) => {
  props.setPageCode((event.target as HTMLInputElement).value)
}

const updateTarget = (target: SandboxOrderTarget, event: Event) => {
  props.setTargetSelected(target, (event.target as HTMLInputElement).checked)
}

const toggleSelect = (select: Exclude<OpenSelect, null>) => {
  openSelect.value = openSelect.value === select ? null : select
}

const selectMode = (value: SandboxLaunchMode) => {
  props.setMode(value)
  openSelect.value = null
}

const selectFixture = (value: string) => {
  props.setFixture(value)
  openSelect.value = null
}

const runHttpPing = () => {
  void props.runHttpPing()
}
</script>

<i18n locale="en-GB">
{
    "devPanel": {
        "actions": {
            "apply": "Apply",
            "reloadExtension": "Reload extension",
            "resetState": "Reset state"
        },
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
        "hostActivity": {
            "empty": "No actions",
            "title": "Host activity"
        },
        "hostApiActions": "Host API actions",
        "mode": "Mode",
        "modeOptions": {
            "page": "Page",
            "widgets": "Widgets"
        },
        "pageCode": "Page code",
        "stateSnapshot": "State snapshot",
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
            "reloadExtension": "Recargar extensión",
            "resetState": "Restablecer estado"
        },
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
        "hostActivity": {
            "empty": "Sin acciones",
            "title": "Actividad del host"
        },
        "hostApiActions": "Acciones de Host API",
        "mode": "Modo",
        "modeOptions": {
            "page": "Página",
            "widgets": "Widgets"
        },
        "pageCode": "Código de página",
        "stateSnapshot": "Snapshot de estado",
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
            "reloadExtension": "Перезапустить расширение",
            "resetState": "Сбросить состояние"
        },
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
        "hostActivity": {
            "empty": "Нет действий",
            "title": "Активность хоста"
        },
        "hostApiActions": "Действия Host API",
        "mode": "Режим",
        "modeOptions": {
            "page": "Страница",
            "widgets": "Виджеты"
        },
        "pageCode": "Код страницы",
        "stateSnapshot": "Снимок состояния",
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

    &__card {
        background: #fff;
        border: 1px solid @grey-500;
        border-radius: @border-radius-lg;
        display: grid;
        gap: 14px;
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
        padding: 12px;
    }

    &__input {
        background: #fff;
        border: 1px solid @grey-600;
        border-radius: @border-radius-md;
        color: @black-500;
        font: inherit;
        font-size: 15px;
        min-height: 40px;
        padding: @spacing-xs 10px;
        width: 100%;

        &:disabled {
            background: @grey-200;
            color: @grey-800;
        }
    }

    select&__input {
        appearance: auto;
        background-color: #fff;
    }

    &__native-select {
        height: 1px;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        width: 1px;
    }

    &__select {
        position: relative;
    }

    &__select-trigger {
        align-items: center;
        background: #fff;
        border: 1px solid @grey-600;
        border-radius: @border-radius-md;
        color: @black-500;
        cursor: pointer;
        display: flex;
        font: inherit;
        font-size: 15px;
        justify-content: space-between;
        min-height: 40px;
        padding: @spacing-xs 10px;
        text-align: left;
        width: 100%;
    }

    &__select-chevron {
        color: @grey-900;
        font-size: 18px;
        line-height: 1;
        transform: rotate(-90deg);
    }

    &__select-popper {
        background: #fff;
        border: 1px solid @grey-600;
        border-radius: @border-radius-md;
        box-shadow: @drop-shadow-m;
        display: grid;
        left: 0;
        max-height: 220px;
        opacity: 1;
        overflow: auto;
        padding: 4px;
        position: absolute;
        right: 0;
        top: calc(100% + 4px);
        z-index: 30;
    }

    &__select-option {
        background: #fff;
        border: 0;
        border-radius: @border-radius-sm;
        color: @black-500;
        cursor: pointer;
        font: inherit;
        font-size: 15px;
        min-height: 36px;
        padding: @spacing-xs 10px;
        text-align: left;

        &:hover {
            background: @grey-200;
        }

        &_selected {
            background: @blue-500;
            color: #fff;
        }

        &_selected:hover {
            background: @blue-500;
        }
    }

    &__target-checklist {
        display: grid;
        gap: @spacing-xs;
    }

    &__target-checklist-item {
        align-items: center;
        color: @black-500;
        display: flex;
        font-size: 14px;
        gap: @spacing-xs;

        input {
            height: 16px;
            margin: 0;
            width: 16px;
        }
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

    &__activity-log {
        display: grid;
        gap: @spacing-xs;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &__activity-item {
        background: @grey-200;
        border: 1px solid @grey-400;
        border-radius: @border-radius-md;
        display: grid;
        gap: 4px;
        padding: 10px;

        code {
            color: @black-500;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 12px;
            white-space: pre-wrap;
        }

        &_empty {
            color: @grey-900;
            font-size: 14px;
        }
    }

    &__activity-item-kind {
        color: @blue-500;
        font-size: 12px;
        font-weight: 800;
    }

    &__activity-item-index {
        color: @grey-900;
        font-size: 12px;
    }

    &__state-snapshot {
        background: @black-900;
        border-radius: @border-radius-md;
        color: #dbe7ff;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12px;
        line-height: 1.45;
        margin: 0;
        overflow-x: auto;
        overflow-y: visible;
        padding: 14px;
    }
}

@media (max-width: 1280px) {
    .dev-panel {
        max-height: none;
    }
}
</style>

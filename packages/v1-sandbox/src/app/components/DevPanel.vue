<template>
    <aside
        :class="$style['dev-panel']"
        data-testid="sandbox-dev-panel"
    >
        <section :class="$style['dev-panel__card']">
            <h2 :class="$style['dev-panel__card-title']">
                Sandbox controls
            </h2>

            <div :class="$style['dev-panel__delivery-note']">
                <strong>External delivery</strong>
                <span>extension URL → HTML/manifest/script → worker</span>
                <span v-if="props.manifestUrl">
                    Сейчас используется внешний extension URL.
                </span>
                <span v-else>
                    Сейчас manifest пустой. Без явного direct URL будет показан onboarding.
                </span>

                <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                    <button
                        :class="[
                            $style['dev-panel__button'],
                            $style['dev-panel__button_primary'],
                        ]"
                        data-testid="sandbox-use-core-ui-extension-example"
                        type="button"
                        @click="props.useCoreUiExtensionExample"
                    >
                        Use core example
                    </button>

                    <button
                        :class="$style['dev-panel__button']"
                        data-testid="sandbox-open-core-ui-extension-example-returns"
                        type="button"
                        @click="props.openCoreUiExtensionExampleReturnsPage"
                    >
                        Open returns page
                    </button>

                    <button
                        :class="$style['dev-panel__button']"
                        data-testid="sandbox-run-local-demo"
                        type="button"
                        @click="props.runLocalDemo"
                    >
                        Run local demo fallback
                    </button>
                </div>
            </div>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">Extension URL</span>
                <input
                    :class="$style['dev-panel__input']"
                    :value="props.manifestUrl"
                    data-testid="sandbox-manifest-url"
                    type="text"
                    @input="updateManifestUrl"
                />
            </label>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">Direct extension URL</span>
                <input
                    :class="$style['dev-panel__input']"
                    :value="props.extensionUrl"
                    data-testid="sandbox-extension-url"
                    type="text"
                    @input="updateExtensionUrl"
                />
                <span :class="$style['dev-panel__field-hint']">
                    Used only when Manifest URL is empty.
                </span>
            </label>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-label']">
                    Mode
                </div>

                <select
                    :class="$style['dev-panel__native-select']"
                    :value="props.mode"
                    data-testid="sandbox-mode-select"
                    tabindex="-1"
                    @change="updateMode"
                >
                    <option value="widget">
                        Widgets
                    </option>
                    <option value="page">
                        Page
                    </option>
                </select>

                <div :class="$style['dev-panel__select']">
                    <button
                        :aria-expanded="openSelect === 'mode'"
                        :class="$style['dev-panel__select-trigger']"
                        data-testid="sandbox-mode-select-trigger"
                        type="button"
                        @click="toggleSelect('mode')"
                    >
                        <span>{{ selectedModeLabel }}</span>
                        <span
                            :class="$style['dev-panel__select-chevron']"
                            aria-hidden="true"
                        >
                            ‹
                        </span>
                    </button>

                    <div
                        v-if="openSelect === 'mode'"
                        :class="$style['dev-panel__select-popper']"
                        data-testid="sandbox-mode-select-popper"
                    >
                        <button
                            v-for="option in modeOptions"
                            :key="option.value"
                            :class="[
                                $style['dev-panel__select-option'],
                                option.value === props.mode && $style['dev-panel__select-option_selected'],
                            ]"
                            type="button"
                            @click="selectMode(option.value)"
                        >
                            {{ option.label }}
                        </button>
                    </div>
                </div>
            </div>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-label']">
                    Fixture
                </div>

                <select
                    :class="$style['dev-panel__native-select']"
                    :value="props.fixture"
                    data-testid="sandbox-fixture-select"
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
                        :aria-expanded="openSelect === 'fixture'"
                        :class="$style['dev-panel__select-trigger']"
                        data-testid="sandbox-fixture-select-trigger"
                        type="button"
                        @click="toggleSelect('fixture')"
                    >
                        <span>{{ selectedFixtureLabel }}</span>
                        <span
                            :class="$style['dev-panel__select-chevron']"
                            aria-hidden="true"
                        >
                            ‹
                        </span>
                    </button>

                    <div
                        v-if="openSelect === 'fixture'"
                        :class="$style['dev-panel__select-popper']"
                        data-testid="sandbox-fixture-select-popper"
                    >
                        <button
                            v-for="option in fixtureOptions"
                            :key="option.code"
                            :class="[
                                $style['dev-panel__select-option'],
                                option.code === props.fixture && $style['dev-panel__select-option_selected'],
                            ]"
                            type="button"
                            @click="selectFixture(option.code)"
                        >
                            {{ option.name }}
                        </button>
                    </div>
                </div>
            </div>

            <label :class="$style['dev-panel__field']">
                <span :class="$style['dev-panel__field-label']">Page code</span>
                <input
                    :class="$style['dev-panel__input']"
                    :disabled="props.mode !== 'page'"
                    :value="props.pageCode"
                    data-testid="sandbox-page-code-input"
                    type="text"
                    @input="updatePageCode"
                />
            </label>

            <div :class="$style['dev-panel__field']">
                <div :class="$style['dev-panel__field-label']">
                    Targets
                </div>

                <div
                    :class="$style['dev-panel__target-checklist']"
                    data-testid="sandbox-target-list"
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
                    data-testid="sandbox-apply-config"
                    type="button"
                    @click="props.applyLaunchConfig"
                >
                    Применить
                </button>
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-reload-extension"
                    type="button"
                    @click="props.reloadExtension"
                >
                    Reload extension
                </button>
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-reset-state"
                    type="button"
                    @click="props.resetState"
                >
                    Reset state
                </button>
            </div>
        </section>

        <section :class="$style['dev-panel__card']">
            <h2 :class="$style['dev-panel__card-title']">
                Host API actions
            </h2>

            <div :class="[$style['dev-panel__actions'], $style['dev-panel__actions_wrap']]">
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-http-ping"
                    type="button"
                    @click="runHttpPing"
                >
                    httpCall
                </button>
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-go-to"
                    type="button"
                    @click="props.goToOrder"
                >
                    goTo
                </button>
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-push-query"
                    type="button"
                    @click="props.pushQuery"
                >
                    pushQuery
                </button>
                <button
                    :class="$style['dev-panel__button']"
                    data-testid="sandbox-replace-query"
                    type="button"
                    @click="props.replaceQuery"
                >
                    replaceQuery
                </button>
            </div>
        </section>

        <section :class="$style['dev-panel__card']">
            <h2 :class="$style['dev-panel__card-title']">
                Host activity
            </h2>

            <ul
                :class="$style['dev-panel__activity-log']"
                data-testid="sandbox-host-activity"
            >
                <template v-if="hostActivity.length === 0">
                    <li :class="[$style['dev-panel__activity-item'], $style['dev-panel__activity-item_empty']]">
                        Нет действий
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

        <section :class="$style['dev-panel__card']">
            <h2 :class="$style['dev-panel__card-title']">
                State snapshot
            </h2>

            <pre
                :class="$style['dev-panel__state-snapshot']"
                data-testid="sandbox-state-snapshot"
            >{{ stateSnapshot }}</pre>
        </section>
    </aside>
</template>

<script setup lang="ts">
import type { OrderSandboxSchemas } from '@/dev/fixtures'
import type { SandboxController } from '@/core/controller'
import type { SandboxLaunchMode } from '@/dev/launch'
import type { SandboxOrderTarget } from '@/dev/targets'

import { computed, ref } from 'vue'

import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'
import { orderSandboxFixtures } from '@/dev/fixtures'

type OrderSandboxController = SandboxController<OrderSandboxSchemas>

const props = defineProps<{
  applyLaunchConfig(): void;
  extensionUrl: string;
  fixture: string;
  goToOrder(): void;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  openCoreUiExtensionExampleReturnsPage(): void;
  pageCode: string;
  pushQuery(): void;
  reloadExtension(): void;
  replaceQuery(): void;
  resetState(): Promise<void>;
  runHttpPing(): Promise<void>;
  runLocalDemo(): void;
  sandbox: OrderSandboxController;
  selectedTargets: SandboxOrderTarget[];
  setExtensionUrl(value: string): void;
  setFixture(value: string): void;
  setManifestUrl(value: string): void;
  setMode(value: SandboxLaunchMode): void;
  setPageCode(value: string): void;
  setTargetSelected(target: SandboxOrderTarget, checked: boolean): void;
  useCoreUiExtensionExample(): void;
}>()

type OpenSelect = 'fixture' | 'mode' | null

const openSelect = ref<OpenSelect>(null)
const modeOptions: Array<{
  label: string;
  value: SandboxLaunchMode;
}> = [
  {
    label: 'Widgets',
    value: 'widget',
  },
  {
    label: 'Page',
    value: 'page',
  },
]
const fixtureOptions = computed(() => Object.entries(orderSandboxFixtures).map(([code, fixture]) => ({
  code,
  name: fixture.name,
})))
const selectedModeLabel = computed(() =>
  modeOptions.find(option => option.value === props.mode)?.label ?? props.mode
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

const updateExtensionUrl = (event: Event) => {
  props.setExtensionUrl((event.target as HTMLInputElement).value)
}

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

<style scoped lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

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

@media (max-width: 1300px) {
    .dev-panel {
        max-height: none;
    }
}
</style>

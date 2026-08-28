<template>
    <aside :class="$style['dev-panel']">
        <section
            :id="uid + '-dev-panel-controls'"
            :class="$style['dev-panel__card']"
        >
            <div :class="$style['dev-panel__descriptor-switcher']">
                <UiToggleButton
                    :aria-pressed="isDescriptorJsonVisible"
                    :pressed="isDescriptorJsonVisible"
                    size="xs"
                    @click="toggleDescriptorView"
                >
                    JSON
                </UiToggleButton>
            </div>

            <div
                v-if="isDescriptorJsonVisible"
                :class="$style['dev-panel__field']"
            >
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
                    :class="[
                        $style['dev-panel__control'],
                        $style['dev-panel__json-editor'],
                    ]"
                    :invalid="Boolean(props.validationErrors.manifestUrl)"
                    :placeholder="defaultDescriptor"
                    :value="props.manifestUrl"
                    multiline
                    rows="8"
                    @update:value="updateManifestUrl"
                />
            </div>

            <fieldset
                v-else
                :aria-describedby="getErrorDescribedBy('manifestUrl')"
                :aria-invalid="Boolean(props.validationErrors.manifestUrl)"
                :class="$style['dev-panel__descriptor-fields']"
            >
                <legend :class="$style['dev-panel__field-label']">
                    {{ t('devPanel.descriptorFields') }}
                </legend>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.descriptorFieldsHint') }}
                </span>

                <div :class="$style['dev-panel__descriptor-grid']">
                    <label :class="$style['dev-panel__field']">
                        <span :class="$style['dev-panel__field-label']">
                            {{ t('devPanel.code') }}
                        </span>
                        <UiTextbox
                            :class="$style['dev-panel__control']"
                            :placeholder="t('devPanel.placeholders.code')"
                            :value="descriptorFields.code"
                            type="text"
                            @update:value="updateDescriptorCode"
                        />
                    </label>

                    <label :class="$style['dev-panel__field']">
                        <span :class="$style['dev-panel__field-label']">
                            {{ t('devPanel.baseUrl') }}
                        </span>
                        <UiTextbox
                            :class="$style['dev-panel__control']"
                            :placeholder="t('devPanel.placeholders.baseUrl')"
                            :value="descriptorFields.baseUrl"
                            type="text"
                            @update:value="updateDescriptorBaseUrl"
                        />
                    </label>

                    <label :class="$style['dev-panel__field']">
                        <span :class="$style['dev-panel__field-label']">
                            {{ t('devPanel.entrypoint') }}
                        </span>
                        <UiTextbox
                            :class="$style['dev-panel__control']"
                            :placeholder="t('devPanel.placeholders.entrypoint')"
                            :value="descriptorFields.entrypoint"
                            type="text"
                            @update:value="updateDescriptorEntrypoint"
                        />
                    </label>

                    <div :class="$style['dev-panel__field']">
                        <div :class="$style['dev-panel__field-heading']">
                            <label
                                :class="$style['dev-panel__field-label']"
                                :for="uid + '-dev-panel-descriptor-stylesheet'"
                            >
                                {{ t('devPanel.stylesheet') }}
                            </label>

                            <UiPopperConnector>
                                <UiButton
                                    :aria-label="t('devPanel.tooltips.stylesheet')"
                                    appearance="tertiary"
                                    size="xs"
                                >
                                    <HelpOutlined aria-hidden="true" />
                                </UiButton>

                                <UiTooltip>
                                    <span>{{ t('devPanel.tooltips.stylesheet') }}</span>
                                </UiTooltip>
                            </UiPopperConnector>
                        </div>

                        <UiTextbox
                            :id="uid + '-dev-panel-descriptor-stylesheet'"
                            :class="$style['dev-panel__control']"
                            :placeholder="t('devPanel.placeholders.stylesheet')"
                            :value="descriptorFields.stylesheet"
                            type="text"
                            @update:value="updateDescriptorStylesheet"
                        />
                    </div>
                </div>
            </fieldset>

            <UiAlert
                v-if="props.validationErrors.manifestUrl"
                :id="getErrorId('manifestUrl')"
                :text="props.validationErrors.manifestUrl"
                variant="danger"
                scroll-to-alert
                fluid
                small
            />

            <div
                v-if="!isDescriptorJsonVisible"
                :class="$style['dev-panel__field']"
            >
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
                    @update:value="setDescriptorMode"
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
                v-if="!isDescriptorJsonVisible && props.mode === 'page'"
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
                v-else-if="!isDescriptorJsonVisible"
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
                        $style['dev-panel__json-editor'],
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
                scroll-to-alert
                closable
                small
            />
        </section>
    </aside>
</template>

<script setup lang="ts">
import type { DevPanelField, DevPanelValidationErrors } from '@/scenario/validation'
import type { SandboxLaunchMode, SandboxOrderTarget } from '@/scenario/types'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import {
  UiAlert,
  UiButton,
  UiPopperConnector,
  UiTextbox,
  UiToggleButton,
  UiTooltip,
} from '@retailcrm/embed-ui-v1-components/host'

import VSelect from '@/components/VSelect.vue'

import HelpOutlined from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/help-outlined.svg'

import { getOrderSandboxFixturePresentations } from '@/app/fixturePresentation'
import { isSandboxOrderTarget } from '@/scenario/predicates'
import { isValidSandboxPageCode } from '@/scenario/validation'
import { ORDER_SANDBOX_SLOTS } from '@/scenario/targets'
import { parseSandboxExtensionDescriptorJson } from '@/scenario/descriptor'

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
const isDescriptorJsonVisible = ref(false)
const defaultDescriptor = JSON.stringify({
  code: 'promoModule',
  baseUrl: 'http://web-extensions-server.simla.local',
  entrypoint: '/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/script',
  stylesheet: '/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/stylesheet',
  targets: [],
  pages: ['settings'],
}, null, 2)
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
type EditableDescriptorField = 'baseUrl' | 'code' | 'entrypoint' | 'stylesheet'

type DescriptorFields = Record<EditableDescriptorField, string>

const emptyDescriptorFields = (): DescriptorFields => ({
  baseUrl: '',
  code: '',
  entrypoint: '',
  stylesheet: '',
})

const readDescriptorDraft = (): Record<string, unknown> | null => {
  const value = props.manifestUrl.trim()

  if (!value.startsWith('{')) return null

  try {
    const parsed = JSON.parse(value) as unknown

    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null
  } catch {
    return null
  }
}

const descriptorFields = computed<DescriptorFields>(() => {
  const descriptor = readDescriptorDraft()
  if (!descriptor) return emptyDescriptorFields()

  return {
    baseUrl: typeof descriptor.baseUrl === 'string' ? descriptor.baseUrl : '',
    code: typeof descriptor.code === 'string' ? descriptor.code : '',
    entrypoint: typeof descriptor.entrypoint === 'string' ? descriptor.entrypoint : '',
    stylesheet: typeof descriptor.stylesheet === 'string' ? descriptor.stylesheet : '',
  }
})

const updateDescriptorField = (
  field: EditableDescriptorField,
  value: string | number
): void => {
  const descriptor = readDescriptorDraft() ?? {
    baseUrl: '',
    code: '',
    entrypoint: '',
    pages: props.mode === 'page' && props.pageCode ? [props.pageCode] : [],
    stylesheet: null,
    targets: [...props.selectedTargets],
  }

  descriptor[field] = field === 'stylesheet' && !String(value).trim()
    ? null
    : String(value)

  props.setManifestUrl(JSON.stringify(descriptor, null, 2))
}

const updateDescriptorBaseUrl = (value: string | number) => updateDescriptorField('baseUrl', value)
const updateDescriptorCode = (value: string | number) => updateDescriptorField('code', value)
const updateDescriptorEntrypoint = (value: string | number) => updateDescriptorField('entrypoint', value)
const updateDescriptorStylesheet = (value: string | number) => updateDescriptorField('stylesheet', value)

const updateDescriptorCapabilities = (
  pages: string[],
  targets: SandboxOrderTarget[]
): void => {
  const descriptor = readDescriptorDraft()
  if (!descriptor) return

  descriptor.pages = pages
  descriptor.targets = targets
  props.setManifestUrl(JSON.stringify(descriptor, null, 2))
}

const setDescriptorMode = (value: string | string[]) => {
  const mode = value as SandboxLaunchMode

  props.setMode(mode)
  updateDescriptorCapabilities(
    [],
    mode === 'widget' ? [...props.selectedTargets] : []
  )
}

const toggleDescriptorView = () => {
  isDescriptorJsonVisible.value = !isDescriptorJsonVisible.value

  if (isDescriptorJsonVisible.value) {
    syncLaunchSelectionFromDescriptor(props.manifestUrl)
  }
}

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
  const descriptorJson = String(value)

  props.setManifestUrl(descriptorJson)
  syncLaunchSelectionFromDescriptor(descriptorJson)
}

const syncLaunchSelectionFromDescriptor = (value: string): void => {
  try {
    const descriptor = parseSandboxExtensionDescriptorJson(value)
    const descriptorTargets = descriptor.targets.filter(isSandboxOrderTarget)
    const hasPages = descriptor.pages.length > 0
    const hasTargets = descriptorTargets.length > 0
    const nextMode = hasPages && !hasTargets
      ? 'page'
      : hasTargets && !hasPages
        ? 'widget'
        : props.mode

    if (nextMode === 'page') {
      const canKeepPageCode = props.mode === 'page'
        && descriptor.pages.includes(props.pageCode)
      const nextPageCode = canKeepPageCode
        ? props.pageCode
        : descriptor.pages[0]

      if (props.mode !== 'page') props.setMode('page')
      if (nextPageCode && (props.mode !== 'page' || nextPageCode !== props.pageCode)) {
        props.setPageCode(nextPageCode)
      }

      return
    }

    if (props.mode !== 'widget') props.setMode('widget')

    ORDER_SANDBOX_SLOTS.forEach(({ target }) => {
      const selected = descriptorTargets.includes(target)

      if (props.selectedTargets.includes(target) !== selected) {
        props.setTargetSelected(target, selected)
      }
    })
  } catch {
    // Launch validation reports incomplete or invalid descriptor JSON.
  }
}

const updatePageCode = (value: string | number) => {
  const pageCode = String(value)

  props.setPageCode(pageCode)
  updateDescriptorCapabilities(pageCode ? [pageCode] : [], [])
}

const updateTargets = (value: string | string[]) => {
  const targets = (Array.isArray(value) ? value : []).filter(isSandboxOrderTarget)

  ORDER_SANDBOX_SLOTS.forEach(({ target }) => {
    const selected = targets.includes(target)

    if (props.selectedTargets.includes(target) !== selected) {
      props.setTargetSelected(target, selected)
    }
  })

  updateDescriptorCapabilities([], targets)
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
        "baseUrl": "Base URL",
        "code": "Module code",
        "descriptorFields": "Descriptor fields",
        "descriptorFieldsHint": "Fill in the descriptor fields or switch to JSON. Both representations stay synchronized.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Paste the complete descriptor configuration in JSON format.",
        "extensionUrl": "Descriptor JSON",
        "fixture": "Selected fixture",
        "fixturePending": "The “{fixture}” fixture has not been applied yet. Use Apply to start it.",
        "mode": "Mode",
        "modeOptions": {
            "page": "Page",
            "widgets": "Widgets"
        },
        "pageCode": "Page code",
        "pageCodePlaceholder": "Enter page code",
        "placeholders": {
            "baseUrl": "Enter extension URL",
            "code": "Enter module code",
            "entrypoint": "Enter entrypoint",
            "stylesheet": "Enter stylesheet"
        },
        "stylesheet": "Stylesheet",
        "targets": "Widget mount targets",
        "targetsHint": "Targets are CRM slots where widget runners are mounted. They are used only in widget mode.",
        "targetsPlaceholder": "Select mount targets",
        "tooltips": {
            "contextJson": "Context used by the current connected extension. It is independent from the fixture selected for the next launch.",
            "extensionUrl": "A descriptor contains code, baseUrl, entrypoint, stylesheet, pages and targets. Entrypoint and stylesheet may be relative to baseUrl.",
            "mode": "Widgets mount into selected CRM targets. Page mounts a page runner by page code.",
            "pageCode": "Use the code from the extension pages registration, not the extension id. Only Latin letters (A–Z, a–z) and hyphens are allowed.",
            "stylesheet": "Leave this field empty if the extension has no CSS. Otherwise, enter the path to the stylesheet.",
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
        "baseUrl": "URL base",
        "code": "Código del módulo",
        "descriptorFields": "Campos del descriptor",
        "descriptorFieldsHint": "Complete los campos del descriptor o cambie a JSON. Ambas representaciones permanecen sincronizadas.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Pegue la configuración completa del descriptor en formato JSON.",
        "extensionUrl": "JSON del descriptor",
        "fixture": "Datos de prueba seleccionados",
        "fixturePending": "Los datos de prueba «{fixture}» aún no se han aplicado. Utilice «Aplicar» para iniciarlos.",
        "mode": "Modo",
        "modeOptions": {
            "page": "Página",
            "widgets": "Widgets"
        },
        "pageCode": "Código de página",
        "pageCodePlaceholder": "Introduzca el código de la página",
        "placeholders": {
            "baseUrl": "Introduzca la URL de la extensión",
            "code": "Introduzca el código del módulo",
            "entrypoint": "Introduzca el entrypoint",
            "stylesheet": "Introduzca el stylesheet"
        },
        "stylesheet": "Hoja de estilos",
        "targets": "Puntos de montaje de widgets",
        "targetsHint": "Los puntos de montaje son áreas de la interfaz de CRM donde se ejecutan los widgets. Solo se utilizan en el modo «Widgets».",
        "targetsPlaceholder": "Seleccione los puntos de montaje",
        "tooltips": {
            "contextJson": "Contexto utilizado por la extensión conectada actualmente. Es independiente de los datos de prueba seleccionados para el siguiente inicio.",
            "extensionUrl": "El descriptor contiene code, baseUrl, entrypoint, stylesheet, pages y targets. Entrypoint y stylesheet pueden ser relativos a baseUrl.",
            "mode": "En el modo «Widgets», los widgets se añaden a los puntos de montaje seleccionados. En el modo «Página», se ejecuta una página mediante su código.",
            "pageCode": "Utilice el valor code del registro pages, no el UUID de la extensión. Solo se permiten letras latinas (A–Z, a–z) y guiones.",
            "stylesheet": "Deje este campo vacío si la extensión no tiene CSS. Si tiene estilos, introduzca la ruta del stylesheet.",
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
        "baseUrl": "Базовый URL",
        "code": "Код модуля",
        "descriptorFields": "Поля дескриптора",
        "descriptorFieldsHint": "Заполните поля дескриптора или переключитесь на JSON. Оба представления синхронизированы.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Вставьте конфигурацию дескриптора целиком в формате JSON.",
        "extensionUrl": "JSON дескриптора",
        "fixture": "Выбранная фикстура",
        "fixturePending": "Фикстура «{fixture}» ещё не применена. Запустите её кнопкой «Применить».",
        "mode": "Режим",
        "modeOptions": {
            "page": "Страница",
            "widgets": "Виджеты"
        },
        "pageCode": "Код страницы",
        "pageCodePlaceholder": "Введите код страницы",
        "placeholders": {
            "baseUrl": "Введите URL расширения",
            "code": "Введите код модуля",
            "entrypoint": "Введите entrypoint",
            "stylesheet": "Введите stylesheet"
        },
        "stylesheet": "Stylesheet",
        "targets": "Места встраивания виджетов",
        "targetsHint": "Места встраивания — это области интерфейса CRM, в которых запускаются виджеты. Они используются только в режиме «Виджеты».",
        "targetsPlaceholder": "Выберите места встраивания",
        "tooltips": {
            "contextJson": "Контекст текущего подключённого расширения. Он не зависит от фикстуры, выбранной для следующего запуска.",
            "extensionUrl": "Дескриптор содержит code, baseUrl, entrypoint, stylesheet, pages и targets. Entrypoint и stylesheet могут быть относительными к baseUrl.",
            "mode": "В режиме «Виджеты» виджеты добавляются в выбранные места встраивания. В режиме «Страница» запускается страница по её коду.",
            "pageCode": "Укажите значение code из массива pages в дескрипторе, а не UUID расширения. Допустимы только латинские буквы (A–Z, a–z) и дефисы.",
            "stylesheet": "Оставьте поле пустым, если у расширения нет CSS. Если стили есть, укажите путь к stylesheet.",
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

    &__descriptor-fields {
        border: 0;
        display: grid;
        gap: @spacing-xs;
        margin: 0;
        min-width: 0;
        padding: 0;
    }

    &__descriptor-switcher {
        display: flex;
        justify-content: flex-end;
    }

    &__descriptor-grid {
        display: grid;
        gap: @spacing-s;
        grid-template-columns: repeat(2, minmax(0, 1fr));
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

    &__json-editor {
        :global(textarea) {
            font-size: 12px;
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

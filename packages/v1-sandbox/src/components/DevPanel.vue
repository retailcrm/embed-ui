<template>
    <aside :class="$style['dev-panel']">
        <form
            :id="uid + '-dev-panel-controls'"
            :class="$style['dev-panel__card']"
            @submit.prevent="applyLaunchConfig"
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
                        :for="uid + '-dev-panel-descriptor-json'"
                    >
                        {{ t('devPanel.descriptorJson') }}
                    </label>

                    <UiPopperConnector>
                        <UiButton
                            :aria-label="t('devPanel.tooltips.descriptorJson')"
                            appearance="tertiary"
                            size="xs"
                        >
                            <HelpOutlined aria-hidden="true" />
                        </UiButton>

                        <UiTooltip>
                            <span>{{ t('devPanel.tooltips.descriptorJson') }}</span>
                        </UiTooltip>
                    </UiPopperConnector>
                </div>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.extensionHint') }}
                </span>

                <UiTextbox
                    :id="uid + '-dev-panel-descriptor-json'"
                    :aria-describedby="getErrorDescribedBy('descriptorJson')"
                    :class="[
                        $style['dev-panel__control'],
                        $style['dev-panel__json-editor'],
                    ]"
                    :invalid="Boolean(props.validationErrors.descriptorJson)"
                    :placeholder="defaultDescriptor"
                    :value="props.descriptorJson"
                    multiline
                    rows="8"
                    @update:value="updateDescriptorJson"
                />
            </div>

            <div
                v-else
                :aria-describedby="getErrorDescribedBy('descriptorJson')"
                :aria-invalid="Boolean(props.validationErrors.descriptorJson)"
                :aria-labelledby="uid + '-dev-panel-descriptor-label'"
                :class="$style['dev-panel__descriptor-fields']"
                role="group"
            >
                <div
                    :id="uid + '-dev-panel-descriptor-label'"
                    :class="$style['dev-panel__field-label']"
                >
                    {{ t('devPanel.descriptorFields') }}
                </div>

                <span :class="$style['dev-panel__field-hint']">
                    {{ t('devPanel.descriptorFieldsHint') }}
                </span>

                <div :class="$style['dev-panel__descriptor-grid']">
                    <div :class="$style['dev-panel__field']">
                        <label
                            :class="$style['dev-panel__field-label']"
                            :for="uid + '-dev-panel-descriptor-entrypoint'"
                        >
                            {{ t('devPanel.entrypoint') }}
                        </label>
                        <UiTextbox
                            :id="uid + '-dev-panel-descriptor-entrypoint'"
                            :class="$style['dev-panel__control']"
                            :placeholder="t('devPanel.placeholders.entrypoint')"
                            :value="descriptorFields.entrypoint"
                            type="text"
                            @update:value="updateDescriptorEntrypoint"
                        />
                    </div>

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
            </div>

            <UiAlert
                v-if="props.validationErrors.descriptorJson"
                :id="getErrorId('descriptorJson')"
                :text="props.validationErrors.descriptorJson"
                variant="danger"
                scroll-to-alert
                fluid
                small
            />

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
                    @update:value="setLaunchMode"
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
                        :id="uid + '-dev-panel-page-code-label'"
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

                <VSelect
                    v-if="isDescriptorJsonVisible"
                    :id="uid + '-dev-panel-page-code'"
                    :aria-describedby="getErrorDescribedBy('pageCode')"
                    :labelled-by="uid + '-dev-panel-page-code-label'"
                    :options="pageOptions"
                    :value="props.pageCode"
                    @update:value="props.setPageCode(String($event))"
                />

                <UiTextbox
                    v-else
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
                    :disabled="isApplyDisabled"
                    type="submit"
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
        </form>
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
  descriptorJson: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  resetContextJson(): void;
  selectedTargets: SandboxOrderTarget[];
  setContextJson(value: string | number): void;
  setFixture(value: string | string[]): void;
  setDescriptorJson(value: string): void;
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
  runner: 'worker',
  entrypoint: 'http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/script',
  stylesheet: 'http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/stylesheet',
  targets: [],
  pages: ['settings'],
}, null, 2)
const modeOptions = computed(() => {
  const options: Array<{ label: string; value: SandboxLaunchMode }> = [
    { label: t('devPanel.modeOptions.widgets'), value: 'widget' },
    { label: t('devPanel.modeOptions.page'), value: 'page' },
  ]
  if (!isDescriptorJsonVisible.value || !parsedDescriptor.value) return options

  const { pages, targets } = parsedDescriptor.value
  if (!pages.length && !targets.length) return options

  return options.filter(option => option.value === 'page'
    ? pages.length > 0
    : targets.some(isSandboxOrderTarget))
})
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
const parsedDescriptor = computed(() => {
  try {
    return parseSandboxExtensionDescriptorJson(props.descriptorJson)
  } catch {
    return null
  }
})
const pageOptions = computed(() => (parsedDescriptor.value?.pages ?? []).map(code => ({
  label: code,
  value: code,
})))
const targetOptions = computed(() => ORDER_SANDBOX_SLOTS
  .filter(slot => !isDescriptorJsonVisible.value
    || parsedDescriptor.value?.targets.includes(slot.target))
  .map(slot => ({ label: slot.target, value: slot.target })))
type EditableDescriptorField = 'entrypoint' | 'stylesheet'

type DescriptorFields = Record<EditableDescriptorField, string>

const emptyDescriptorFields = (): DescriptorFields => ({
  entrypoint: '',
  stylesheet: '',
})

const readDescriptorDraft = (): Record<string, unknown> | null => {
  const value = props.descriptorJson.trim()

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
    entrypoint: typeof descriptor.entrypoint === 'string' ? descriptor.entrypoint : '',
    stylesheet: typeof descriptor.stylesheet === 'string' ? descriptor.stylesheet : '',
  }
})

const updateDescriptorField = (
  field: EditableDescriptorField,
  value: string | number
): void => {
  const descriptor = readDescriptorDraft() ?? {
    runner: 'worker',
    entrypoint: '',
    pages: props.mode === 'page' && props.pageCode ? [props.pageCode] : [],
    stylesheet: null,
    targets: [...props.selectedTargets],
  }

  descriptor[field] = field === 'stylesheet' && !String(value).trim()
    ? null
    : String(value)

  props.setDescriptorJson(JSON.stringify(descriptor, null, 2))
}

const updateDescriptorEntrypoint = (value: string | number) => updateDescriptorField('entrypoint', value)
const updateDescriptorStylesheet = (value: string | number) => updateDescriptorField('stylesheet', value)

const addDescriptorCapabilities = (field: 'pages' | 'targets', values: string[]) => {
  if (isDescriptorJsonVisible.value) return

  const descriptor = readDescriptorDraft()
  if (!descriptor) return

  const current = Array.isArray(descriptor[field]) ? descriptor[field] : []
  if (values.every(value => current.includes(value))) return

  descriptor[field] = [...new Set([...current, ...values])]
  props.setDescriptorJson(JSON.stringify(descriptor, null, 2))
}

const setLaunchMode = (value: string | string[]) => {
  const mode = value as SandboxLaunchMode

  if (mode === props.mode) return

  props.setMode(mode)
  syncLaunchSelectionFromDescriptor(props.descriptorJson, mode)
}

const toggleDescriptorView = () => {
  isDescriptorJsonVisible.value = !isDescriptorJsonVisible.value
}

const isApplyDisabled = computed(() => {
  if (props.applyingContext || props.applyingLaunchConfig) return true
  if (!props.descriptorJson.trim() || !props.fixture || !props.mode) return true

  if (props.mode === 'page') return !isValidSandboxPageCode(props.pageCode)

  return props.selectedTargets.length === 0
})
const applyLaunchConfig = () => {
  if (isApplyDisabled.value) return

  return props.applyLaunchConfig()
}
const isApplyContextDisabled = computed(() =>
  !props.contextJsonChanged
  || !props.extensionConnected
  || props.launchConfigChanged
  || props.applyingContext
  || props.applyingLaunchConfig
)

let editedPageCode: string | null = null

const updateDescriptorJson = (value: string | number) => {
  editedPageCode = null
  const descriptorJson = String(value)

  props.setDescriptorJson(descriptorJson)
  syncLaunchSelectionFromDescriptor(descriptorJson)
}

const syncLaunchSelectionFromDescriptor = (
  value: string,
  selectedMode?: SandboxLaunchMode
): void => {
  try {
    const descriptor = parseSandboxExtensionDescriptorJson(value)
    const descriptorTargets = descriptor.targets.filter(isSandboxOrderTarget)
    const hasPages = descriptor.pages.length > 0
    const hasTargets = descriptorTargets.length > 0
    const nextMode = selectedMode ?? (hasPages && !hasTargets
      ? 'page'
      : hasTargets && !hasPages
        ? 'widget'
        : props.mode)

    if (nextMode === 'page') {
      const canKeepPageCode = descriptor.pages.includes(props.pageCode)
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

    const matchingTargets = props.selectedTargets.filter(target => descriptorTargets.includes(target))
    const nextTargets = matchingTargets.length > 0 ? matchingTargets : descriptorTargets

    ORDER_SANDBOX_SLOTS.forEach(({ target }) => {
      const selected = nextTargets.includes(target)

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
  const descriptor = readDescriptorDraft()
  if (!descriptor) return

  const currentPages = Array.isArray(descriptor.pages) ? descriptor.pages : []
  const pages = currentPages.filter(page => page !== editedPageCode)
  editedPageCode = isValidSandboxPageCode(pageCode) && !pages.includes(pageCode) ? pageCode : null
  if (editedPageCode) pages.push(editedPageCode)

  if (JSON.stringify(pages) !== JSON.stringify(currentPages)) {
    descriptor.pages = pages
    props.setDescriptorJson(JSON.stringify(descriptor, null, 2))
  }
}

const updateTargets = (value: string | string[]) => {
  const targets = (Array.isArray(value) ? value : []).filter(isSandboxOrderTarget)

  ORDER_SANDBOX_SLOTS.forEach(({ target }) => {
    const selected = targets.includes(target)

    if (props.selectedTargets.includes(target) !== selected) {
      props.setTargetSelected(target, selected)
    }
  })

  addDescriptorCapabilities('targets', targets)
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
        "descriptorFields": "Descriptor fields",
        "descriptorFieldsHint": "Fill in the descriptor fields or switch to JSON. Both representations stay synchronized.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Paste the complete descriptor configuration in JSON format.",
        "descriptorJson": "Descriptor JSON",
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
            "entrypoint": "Enter entrypoint",
            "stylesheet": "Enter stylesheet"
        },
        "stylesheet": "Stylesheet",
        "targets": "Widget mount targets",
        "targetsHint": "Targets are CRM slots where widget runners are mounted. They are used only in widget mode.",
        "targetsPlaceholder": "Select mount targets",
        "tooltips": {
            "contextJson": "Context used by the current connected extension. It is independent from the fixture selected for the next launch.",
            "descriptorJson": "A descriptor contains runner, entrypoint, stylesheet, pages and targets. Entrypoint and stylesheet must be absolute HTTP(S) URLs. Runner must be worker.",
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
        "descriptorFields": "Campos del descriptor",
        "descriptorFieldsHint": "Complete los campos del descriptor o cambie a JSON. Ambas representaciones permanecen sincronizadas.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Pegue la configuración completa del descriptor en formato JSON.",
        "descriptorJson": "JSON del descriptor",
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
            "entrypoint": "Introduzca el entrypoint",
            "stylesheet": "Introduzca el stylesheet"
        },
        "stylesheet": "Hoja de estilos",
        "targets": "Puntos de montaje de widgets",
        "targetsHint": "Los puntos de montaje son áreas de la interfaz de CRM donde se ejecutan los widgets. Solo se utilizan en el modo «Widgets».",
        "targetsPlaceholder": "Seleccione los puntos de montaje",
        "tooltips": {
            "contextJson": "Contexto utilizado por la extensión conectada actualmente. Es independiente de los datos de prueba seleccionados para el siguiente inicio.",
            "descriptorJson": "El descriptor contiene runner, entrypoint, stylesheet, pages y targets. Entrypoint y stylesheet deben ser URL HTTP(S) absolutas. Runner debe ser worker.",
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
        "descriptorFields": "Поля дескриптора",
        "descriptorFieldsHint": "Заполните поля дескриптора или переключитесь на JSON. Оба представления синхронизированы.",
        "entrypoint": "Entrypoint",
        "extensionHint": "Вставьте конфигурацию дескриптора целиком в формате JSON.",
        "descriptorJson": "JSON дескриптора",
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
            "entrypoint": "Введите entrypoint",
            "stylesheet": "Введите stylesheet"
        },
        "stylesheet": "Stylesheet",
        "targets": "Места встраивания виджетов",
        "targetsHint": "Места встраивания — это области интерфейса CRM, в которых запускаются виджеты. Они используются только в режиме «Виджеты».",
        "targetsPlaceholder": "Выберите места встраивания",
        "tooltips": {
            "contextJson": "Контекст текущего подключённого расширения. Он не зависит от фикстуры, выбранной для следующего запуска.",
            "descriptorJson": "Дескриптор содержит runner, entrypoint, stylesheet, pages и targets. Entrypoint и stylesheet должны быть абсолютными HTTP(S)-адресами. Runner — worker.",
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
        display: grid;
        gap: @spacing-xs;
        min-width: 0;
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

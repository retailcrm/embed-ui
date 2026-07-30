<template>
    <div
        :class="{
            [$style['sandbox-app']]: true,
            [$style['sandbox-app_sidebar-closed']]: !isSidebarOpen,
        }"
    >
        <NavigationRail
            :dev-panel-controls-id="uid + '-sandbox-dev-panel-drawer'"
            :dev-panel-open="isDevPanelOpen"
            @open-dev-panel="openDevPanel"
        />

        <NavigationSidebar
            :id="uid + '-navigation-sidebar'"
            :open="isSidebarOpen"
        />

        <button
            :class="$style['sandbox-app__sidebar-toggle']"
            :aria-label="isSidebarOpen ? t('app.sidebarCollapse') : t('app.sidebarExpand')"
            :aria-expanded="isSidebarOpen"
            :aria-controls="uid + '-navigation-sidebar'"
            type="button"
            @click="toggleSidebar"
        >
            <IconLess
                :class="$style['sandbox-app__sidebar-toggle-glyph']"
                aria-hidden="true"
            />
        </button>

        <main
            :class="$style['sandbox-app__content-panel']"
            :aria-label="t('app.contentAriaLabel')"
        >
            <div
                :class="$style['sandbox-app__extension-canvas']"
                :aria-label="t('app.extensionCanvasAriaLabel')"
                role="region"
                @click.capture="flushRemoteUpdates"
            >
                <ExtensionOnboarding
                    v-if="shouldShowOnboarding"
                    :open-dev-panel="openDevPanel"
                />

                <PageMount
                    v-else-if="launchConfig.mode === 'page' && mounts[0]"
                    :mount="mounts[0]"
                    :set-tree="setMountTree"
                />

                <template v-else-if="launchConfig.mode === 'widget'">
                    <WidgetRunSummary
                        :fixture="launchConfig.fixture"
                        :targets="launchConfig.targets"
                    />

                    <WidgetTargetList
                        :mounts="mounts"
                        :set-tree="setMountTree"
                    />
                </template>
            </div>
        </main>

        <UiModalSidebar
            :id="uid + '-sandbox-dev-panel-drawer'"
            :class="$style['sandbox-app__dev-panel-drawer']"
            :aria-labelledby="uid + '-sandbox-dev-panel-title'"
            :opened="isDevPanelOpen"
            direction="right"
            role="dialog"
            scrolling="native"
            size="lg"
            @update:opened="isDevPanelOpen = $event"
        >
            <template #title>
                <span :id="uid + '-sandbox-dev-panel-title'">
                    {{ t('app.devPanelAriaLabel') }}
                </span>
            </template>

            <DevPanel
                :apply-launch-config="applyLaunchConfig"
                :apply-context-json="applyContextJson"
                :applying-launch-config="isApplyingLaunchConfig"
                :context-json="contextJson"
                :context-json-changed="contextJsonChanged"
                :download-context-json="downloadContextJson"
                :fixture="fixture"
                :format-context-json="formatContextJsonEditor"
                :manifest-url="manifestUrl"
                :mode="mode"
                :page-code="pageCode"
                :reset-context-json="resetContextJson"
                :selected-targets="selectedTargets"
                :set-context-json="setContextJson"
                :set-fixture="setFixture"
                :set-manifest-url="setManifestUrl"
                :set-mode="setMode"
                :set-page-code="setPageCode"
                :set-target-selected="setTargetSelected"
                :validation-errors="devPanelValidationErrors"
            />
        </UiModalSidebar>

        <span
            :class="$style['sandbox-app__run-mode-status']"
            role="status"
        >
            {{ runModeLabel }}
        </span>

        <span
            :class="$style['sandbox-app__host-controls-status']"
        />
    </div>
</template>

<script setup lang="ts">
import type {
  DevPanelField,
  DevPanelValidationErrors,
  DevPanelValidationMessages,
} from '@/scenario/validation'
import type { HostedTreeRef } from '@/app/types'
import type { SandboxExtensionDescriptor } from '@/scenario/types'
import type { SandboxLaunchBridge } from '@/automation/bridge'
import type { SandboxLaunchConfig } from '@/scenario/types'
import type { SandboxLaunchDiagnostic } from '@/app/types'
import type { SandboxLaunchInput } from '@/automation/bridge'
import type { SandboxLaunchMode } from '@/scenario/types'
import type { SandboxMount } from '@/app/types'
import type { SandboxOrderTarget } from '@/scenario/types'
import type { SandboxRuntime, SandboxWorkerApi, StoredLaunchNotice } from '@/app/types'

import { computed } from 'vue'
import { createEndpoint as createRpcEndpoint, fromWebWorker } from '@remote-ui/rpc'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'
import { watch } from 'vue'

import { UiModalSidebar } from '@retailcrm/embed-ui-v1-components/host'

import IconLess from '@retailcrm/embed-ui-v1-components/assets/sprites/arrows/less.svg'

import DevPanel from '@/components/DevPanel.vue'
import ExtensionOnboarding from '@/components/ExtensionOnboarding.vue'
import NavigationRail from '@/components/NavigationRail.vue'
import NavigationSidebar from '@/components/NavigationSidebar.vue'
import PageMount from '@/components/PageMount.vue'
import WidgetRunSummary from '@/components/WidgetRunSummary.vue'
import WidgetTargetList from '@/components/WidgetTargetList.vue'

import RemoteBootstrapWorker from '@/runtime/remoteBootstrap.worker.ts?worker'

import { createDefaultSandboxManifestUrl } from '@/scenario/launch'
import { createMounts } from '@/runtime/mount'
import { createOrderSandboxController } from '@/scenario/fixtures'
import { DEFAULT_SANDBOX_TARGETS } from '@/runtime/mount'
import { getOrderSandboxFixture } from '@/scenario/fixtures'
import { isContextName, isWorkerReadyMessage } from '@/app/predicates'
import { parseSandboxLaunchConfig } from '@/scenario/launch'
import { resolveSandboxExtensionSource } from '@/scenario/manifest'
import { SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY } from '@/automation/bridge'
import { updateSandboxLaunchQuery } from '@/scenario/launch'
import {
  validateContextJsonInput,
  validateLaunchConfigInput,
} from '@/scenario/validation'

const searchParams = new URLSearchParams(window.location.search)
const hasExplicitExtensionUrl = Boolean(searchParams.get('extensionUrl')?.trim())
const hasExplicitLaunchMode = searchParams.has('mode')
const launchConfig = parseSandboxLaunchConfig(searchParams, {
  manifestUrl: createDefaultSandboxManifestUrl(),
  targets: DEFAULT_SANDBOX_TARGETS,
})
const LAUNCH_NOTICE_STORAGE_KEY = 'v1-sandbox:launch-notice'
const fixture = ref(launchConfig.fixture)
const manifestUrl = ref(launchConfig.manifestUrl)
const mode = ref<SandboxLaunchMode>(launchConfig.mode)
const pageCode = ref(launchConfig.pageCode)
const selectedTargets = ref<SandboxOrderTarget[]>([...launchConfig.targets])
const extensionHttpBaseUrl = ref<string | null>(null)
const extensionDescriptorUuid = ref<string | undefined>()
const sandbox = createOrderSandboxController(launchConfig.fixture, {
  getDescriptorUuid: () => extensionDescriptorUuid.value,
  getHttpCallBaseUrl: () => extensionHttpBaseUrl.value,
  globalBridge: {},
})
const mounts = createMounts(launchConfig)
const runtime = ref<SandboxRuntime | null>(null)
const isApplyingLaunchConfig = ref(false)
const isDevPanelOpen = ref(false)
const isSidebarOpen = ref(true)
const { locale, t } = useI18n()
const uid = useId()
const contextJson = ref(formatContextJson())
const devPanelValidationErrors = ref<DevPanelValidationErrors>({})

const shouldShowOnboarding = computed(() => !launchConfig.manifestUrl && !hasExplicitExtensionUrl)
const runModeLabel = computed(() => launchConfig.mode === 'page'
  ? t('app.runMode.page', { pageCode: launchConfig.pageCode })
  : t('app.runMode.widgets', { count: launchConfig.targets.length }))
const contextJsonChanged = computed(() => contextJson.value !== formatContextJson())

watch(() => sandbox.state.contexts.settings['system.locale'], (systemLocale) => {
  if (systemLocale) {
    locale.value = systemLocale
  }
}, { immediate: true })

const flushReceiver = async () => {
  await Promise.all(mounts.map(async (mount) => {
    await mount.receiver.flush()
    mount.tree?.forceUpdate()
  }))
}

const mountExtension = async () => {
  let stylesheet: HTMLLinkElement | null = null

  try {
    const extensionSource = await resolveSandboxExtensionSource(launchConfig)

    if (redirectToInferredPageMode(extensionSource.descriptor)) return

    extensionHttpBaseUrl.value = extensionSource.httpBaseUrl
    extensionDescriptorUuid.value = extensionSource.descriptor.uuid

    const diagnostic = createLaunchDiagnostic(extensionSource.descriptor)

    if (diagnostic) {
      showSandboxAlert(diagnostic.title, diagnostic.message)

      if (diagnostic.blocking) return
    }

    stylesheet = mountExtensionStylesheet(extensionSource.descriptor.stylesheet)
    const connections = await mountWorkerExtension(
      extensionSource.descriptor.uuid,
      extensionSource.entrypoint
    )

    await flushReceiver()

    runtime.value = {
      connections,
      flushTimer: window.setInterval(() => {
        void flushReceiver()
      }, 100),
      mounts,
      stylesheet,
    }
  } catch (error) {
    stylesheet?.remove()
    showSandboxAlert(
      t('app.alerts.runtimeError.title'),
      t('app.alerts.runtimeError.message', { message: getErrorMessage(error) })
    )
  }
}

const redirectToInferredPageMode = (descriptor: SandboxExtensionDescriptor): boolean => {
  const pageCode = descriptor.pages[0]

  if (
    hasExplicitLaunchMode
    || launchConfig.mode !== 'widget'
    || !pageCode
  ) {
    return false
  }

  storeLaunchNotice({
    pageCode,
    type: 'inferred-page-mode',
  })
  window.location.replace(updateSandboxLaunchQuery({
    ...launchConfig,
    mode: 'page',
    pageCode,
  }).toString())

  return true
}

const createLaunchDiagnostic = (
  descriptor: SandboxExtensionDescriptor
): SandboxLaunchDiagnostic | null => {
  if (
    launchConfig.mode === 'page'
    && descriptor.pages.length > 0
    && !descriptor.pages.includes(launchConfig.pageCode)
  ) {
    return {
      blocking: true,
      message: t('app.alerts.missingPageCode.message', {
        pageCode: launchConfig.pageCode,
        pages: descriptor.pages.join(', '),
      }),
      title: t('app.alerts.missingPageCode.title'),
    }
  }

  if (
    launchConfig.mode === 'widget'
    && hasExplicitLaunchMode
    && descriptor.pages.length > 0
    && descriptor.targets.length === 0
  ) {
    return {
      blocking: false,
      message: t('app.alerts.workerPageInWidgetMode.message', {
        pages: descriptor.pages.join(', '),
      }),
      title: t('app.alerts.workerPageInWidgetMode.title'),
    }
  }

  return null
}

const mountWorkerExtension = async (
  uuid: string,
  entrypoint: URL
): Promise<SandboxRuntime['connections']> => {
  const readyChannel = new MessageChannel()
  const worker = createExtensionWorker(uuid, entrypoint, readyChannel.port2)
  const endpoint = createRpcEndpoint<SandboxWorkerApi>(fromWebWorker(worker))

  try {
    await waitForExtensionWorkerReady(readyChannel.port1, worker, uuid)
  } catch (error) {
    endpoint.terminate()
    throw error
  } finally {
    readyChannel.port1.close()
  }

  const endpointApi = sandbox.endpointApi

  endpoint.expose({
    ...endpointApi,
    get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
    httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
  } as unknown as SandboxWorkerApi)

  try {
    for (const mount of mounts) {
      await endpoint.call.run(mount.receiver.receive, mount.runConfig)
    }
  } catch (error) {
    sandbox.disposeContextSubscriptions()
    endpoint.terminate()
    worker.terminate()
    throw error
  }

  return [{
    endpoint,
    kind: 'worker',
    mounts,
    worker,
  }]
}

const disposeRuntimeConnection = (
  connection: SandboxRuntime['connections'][number]
) => {
  connection.endpoint.terminate()
  connection.worker.terminate()
}

const releaseRuntimeConnection = async (
  connection: SandboxRuntime['connections'][number]
) => {
  for (const mount of connection.mounts) {
    await connection.endpoint.call.release(mount.releaseConfig)
  }
}

const disposeRuntime = async () => {
  const current = runtime.value

  if (!current) {
    sandbox.disposeContextSubscriptions()
    return
  }

  window.clearInterval(current.flushTimer)

  try {
    for (const connection of current.connections) {
      try {
        await releaseRuntimeConnection(connection)
      } catch (error) {
        console.warn('[sandbox:manifest] Failed to release extension runtime', error)
      }
    }

    sandbox.disposeContextSubscriptions()
    await flushReceiver()
  } finally {
    current.connections.forEach(disposeRuntimeConnection)
    current.stylesheet?.remove()
    runtime.value = null
  }
}

const flushRemoteUpdates = () => {
  if (!runtime.value) return

  ;[0, 20, 100].forEach((delay) => {
    window.setTimeout(() => {
      void flushReceiver()
    }, delay)
  })
}

const applyLaunchConfig = async () => {
  if (isApplyingLaunchConfig.value) return

  const validationResult = validateLaunchConfigInput({
    fixture: fixture.value,
    manifestUrl: manifestUrl.value,
    mode: mode.value,
    pageCode: pageCode.value,
    targets: selectedTargets.value,
  }, createDevPanelValidationMessages())

  if (!validationResult.success) {
    devPanelValidationErrors.value = validationResult.errors
    isDevPanelOpen.value = true
    return
  }

  devPanelValidationErrors.value = {}

  const config: SandboxLaunchConfig = {
    extensionUrl: '',
    fixture: validationResult.data.fixture,
    manifestUrl: validationResult.data.manifestUrl,
    mode: validationResult.data.mode,
    pageCode: validationResult.data.pageCode,
    targets: validationResult.data.targets.length > 0
      ? validationResult.data.targets
      : DEFAULT_SANDBOX_TARGETS,
    widgetId: launchConfig.widgetId,
  }

  if (config.mode === 'widget') {
    window.location.href = updateSandboxLaunchQuery(config).toString()
    return
  }

  isApplyingLaunchConfig.value = true

  try {
    const extensionSource = await resolveSandboxExtensionSource(config)

    if (!extensionSource.descriptor.pages.includes(config.pageCode)) {
      devPanelValidationErrors.value = {
        ...devPanelValidationErrors.value,
        pageCode: t('app.alerts.missingPageCode.message', {
          pageCode: config.pageCode,
          pages: extensionSource.descriptor.pages.join(', ') || '—',
        }),
      }
      isDevPanelOpen.value = true
      return
    }

    isDevPanelOpen.value = false
    window.location.href = updateSandboxLaunchQuery(config).toString()
  } catch (error) {
    isDevPanelOpen.value = true
    showSandboxAlert(
      t('app.alerts.runtimeError.title'),
      t('app.alerts.runtimeError.message', { message: getErrorMessage(error) })
    )
  } finally {
    isApplyingLaunchConfig.value = false
  }
}

const applyContextJson = async () => {
  const validationResult = validateContextJsonInput(
    contextJson.value,
    Object.keys(sandbox.state.contexts),
    createDevPanelValidationMessages()
  )

  if (!validationResult.success) {
    devPanelValidationErrors.value = {
      ...devPanelValidationErrors.value,
      ...validationResult.errors,
    }

    return
  }

  await disposeRuntime()
  applyContextJsonValue(validationResult.data)
  contextJson.value = formatContextJson()
  clearDevPanelValidationError('contextJson')
  await mountExtension()
}

const setContextJson = (value: string | number) => {
  contextJson.value = String(value)
  clearDevPanelValidationError('contextJson')
}

const formatContextJsonEditor = () => {
  try {
    contextJson.value = JSON.stringify(JSON.parse(contextJson.value), null, 2)
    clearDevPanelValidationError('contextJson')
  } catch {
    const validationResult = validateContextJsonInput(
      contextJson.value,
      Object.keys(sandbox.state.contexts),
      createDevPanelValidationMessages()
    )

    if (!validationResult.success) {
      devPanelValidationErrors.value = {
        ...devPanelValidationErrors.value,
        ...validationResult.errors,
      }
    }
  }
}

const resetContextJson = () => {
  contextJson.value = JSON.stringify(getOrderSandboxFixture(fixture.value).contexts, null, 2)
  clearDevPanelValidationError('contextJson')
}

const downloadContextJson = () => {
  const blob = new Blob([contextJson.value], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.download = `v1-sandbox-${fixture.value}-context.json`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}

const setFixture = (value: string) => {
  fixture.value = value
  clearDevPanelValidationError('fixture')
}

const getPageCodeValidationError = (value: string): string | undefined => {
  const validationResult = validateLaunchConfigInput({
    fixture: fixture.value,
    manifestUrl: manifestUrl.value,
    mode: mode.value,
    pageCode: value,
    targets: selectedTargets.value,
  }, createDevPanelValidationMessages())

  return validationResult.success
    ? undefined
    : validationResult.errors.pageCode
}

const setManifestUrl = (value: string) => {
  manifestUrl.value = value
  clearDevPanelValidationError('manifestUrl')
  clearDevPanelValidationError('pageCode')

  const pageCodeError = getPageCodeValidationError(pageCode.value)

  if (pageCode.value && pageCodeError) {
    devPanelValidationErrors.value = {
      ...devPanelValidationErrors.value,
      pageCode: pageCodeError,
    }
  }
}

const setMode = (value: SandboxLaunchMode) => {
  if (value === 'page' && mode.value !== 'page') {
    pageCode.value = ''
  }

  mode.value = value
  clearDevPanelValidationError('mode')
  clearDevPanelValidationError('pageCode')
  clearDevPanelValidationError('targets')
}

const setPageCode = (value: string) => {
  pageCode.value = value

  const pageCodeError = getPageCodeValidationError(value)

  if (pageCodeError) {
    devPanelValidationErrors.value = {
      ...devPanelValidationErrors.value,
      pageCode: pageCodeError,
    }

    return
  }

  clearDevPanelValidationError('pageCode')
}

const setTargetSelected = (target: SandboxOrderTarget, checked: boolean) => {
  selectedTargets.value = checked
    ? Array.from(new Set([...selectedTargets.value, target]))
    : selectedTargets.value.filter(item => item !== target)
  clearDevPanelValidationError('targets')
}

const setMountTree = (mount: SandboxMount, tree: HostedTreeRef | null) => {
  mount.tree = tree
}

const getCurrentLaunchConfig = (): SandboxLaunchConfig => ({
  extensionUrl: launchConfig.extensionUrl,
  fixture: fixture.value,
  manifestUrl: manifestUrl.value,
  mode: mode.value,
  pageCode: pageCode.value,
  targets: [...selectedTargets.value],
  widgetId: launchConfig.widgetId,
})

const createLaunchConfigFromInput = (input: SandboxLaunchInput): SandboxLaunchConfig => ({
  ...getCurrentLaunchConfig(),
  ...input,
  targets: input.targets
    ? [...input.targets]
    : [...selectedTargets.value],
})

const createLaunchBridge = (): SandboxLaunchBridge => ({
  createLaunchUrl(config) {
    return updateSandboxLaunchQuery(createLaunchConfigFromInput(config)).toString()
  },

  getLaunchConfig() {
    return getCurrentLaunchConfig()
  },

  launch(config) {
    window.location.href = this.createLaunchUrl(config)
  },
})

const installSandboxLaunchBridge = (): (() => void) => {
  const bridge = createLaunchBridge()

  window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] = bridge

  return () => {
    if (window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] === bridge) {
      delete window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]
    }
  }
}

const uninstallSandboxLaunchBridge = installSandboxLaunchBridge()

const createExtensionWorker = (
  uuid: string,
  entrypoint: URL,
  readyPort: MessagePort
): Worker => {
  const worker = new RemoteBootstrapWorker({
    name: `sandbox:${uuid}`,
    type: 'module',
  })

  worker.postMessage({
    extensionUrl: entrypoint.href,
    readyPort,
  }, [readyPort])

  return worker
}

const mountExtensionStylesheet = (href: string | null): HTMLLinkElement | null => {
  if (!href) return null

  const link = document.createElement('link')

  link.dataset.sandboxExtensionStylesheet = 'true'
  link.href = href
  link.rel = 'stylesheet'

  document.head.append(link)

  return link
}

type OrderContextName = Extract<keyof typeof sandbox.state.contexts, string>

enum ExtensionWorkerMessageType {
  Ready = 'sandbox:extension-worker-ready',
  ReadyError = 'sandbox:extension-worker-error',
}

const waitForExtensionWorkerReady = async (
  readyPort: MessagePort,
  worker: Worker,
  uuid: string,
  timeoutMs = 10_000
): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      cleanup()
      reject(new Error(`[sandbox:manifest] Worker bootstrap timed out for '${uuid}'`))
    }, timeoutMs)

    const cleanup = () => {
      window.clearTimeout(timerId)
      readyPort.removeEventListener('message', onMessage)
      worker.removeEventListener('error', onError)
    }

    const onMessage = (event: MessageEvent) => {
      if (!isWorkerReadyMessage(event.data)) return

      if (event.data.type === ExtensionWorkerMessageType.Ready) {
        cleanup()
        resolve()
        return
      }

      if (event.data.type === ExtensionWorkerMessageType.ReadyError) {
        cleanup()
        reject(new Error(
          event.data.error ?? `[sandbox:manifest] Worker bootstrap failed for '${uuid}'`
        ))
      }
    }

    const onError = (event: ErrorEvent) => {
      cleanup()
      reject(event.error ?? new Error(event.message || `[sandbox:manifest] Worker error for '${uuid}'`))
    }

    readyPort.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
    readyPort.start()
  }).catch((error) => {
    worker.terminate()
    throw error
  })
}

const openDevPanel = () => {
  isDevPanelOpen.value = true
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const showSandboxAlert = (title: string, message: string) => {
  window.alert(`${title}\n\n${message}`)
}

function formatContextJson(): string {
  return JSON.stringify(sandbox.snapshot().contexts, null, 2)
}

const applyContextJsonValue = (contexts: Record<string, Record<string, unknown>>) => {
  Object.entries(contexts).forEach(([context, contextValue]) => {
    if (!isOrderContextName(context)) return

    sandbox.patchContext(context, contextValue)
  })
}

const isOrderContextName = (
  value: string
): value is OrderContextName =>
  isContextName(sandbox.state.contexts, value)

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message

  return String(error)
}

const clearDevPanelValidationError = (field: DevPanelField) => {
  if (!devPanelValidationErrors.value[field]) return

  const rest = { ...devPanelValidationErrors.value }

  delete rest[field]

  devPanelValidationErrors.value = rest
}

const createDevPanelValidationMessages = (): DevPanelValidationMessages => ({
  contextJsonContextObject: context => t('app.validation.contextJson.contextObject', { context }),
  contextJsonInvalidJson: t('app.validation.contextJson.invalidJson'),
  contextJsonInvalidJsonAt: (line, column) => t('app.validation.contextJson.invalidJsonAt', {
    column,
    line,
  }),
  contextJsonRootObject: t('app.validation.contextJson.rootObject'),
  contextJsonUnknownContext: context => t('app.validation.contextJson.unknownContext', { context }),
  fixture: t('app.validation.fixture'),
  manifestUrlEndpoint: t('app.validation.manifestUrl.endpoint'),
  manifestUrlFormat: t('app.validation.manifestUrl.format', {
    close: '>',
    open: '<',
  }),
  manifestUrlRequired: t('app.validation.manifestUrl.required'),
  mode: t('app.validation.mode'),
  pageCodeFormat: t('app.validation.pageCodeFormat'),
  pageCodeRequired: t('app.validation.pageCodeRequired'),
  targetRequired: t('app.validation.targetRequired'),
  targetUnknown: target => t('app.validation.targetUnknown', { target }),
})

const readLaunchNotice = (): StoredLaunchNotice | null => {
  const rawNotice = window.sessionStorage.getItem(LAUNCH_NOTICE_STORAGE_KEY)

  window.sessionStorage.removeItem(LAUNCH_NOTICE_STORAGE_KEY)

  if (!rawNotice) return null

  try {
    return JSON.parse(rawNotice) as StoredLaunchNotice
  } catch {
    return null
  }
}

const storeLaunchNotice = (notice: StoredLaunchNotice) => {
  window.sessionStorage.setItem(LAUNCH_NOTICE_STORAGE_KEY, JSON.stringify(notice))
}

const showStoredLaunchNotice = () => {
  const notice = readLaunchNotice()

  if (notice?.type !== 'inferred-page-mode') return

  showSandboxAlert(
    t('app.alerts.inferredPageMode.title'),
    t('app.alerts.inferredPageMode.message', {
      pageCode: notice.pageCode ?? launchConfig.pageCode,
    })
  )
}

onMounted(() => {
  showStoredLaunchNotice()

  if (!shouldShowOnboarding.value) {
    void mountExtension()
  }
})

onBeforeUnmount(() => {
  uninstallSandboxLaunchBridge()
  void disposeRuntime()
  sandbox.dispose()
})
</script>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.sandbox-app {
    background: @grey-200;
    display: grid;
    grid-template-columns: 64px 256px minmax(0, 1fr);
    height: 100vh;
    min-height: 0;
    overflow: hidden;
    position: relative;
    transition: grid-template-columns @transition;

    &_sidebar-closed {
        grid-template-columns: 64px 32px minmax(0, 1fr);
    }

    &_sidebar-closed &__sidebar-toggle {
        left: 82px;
        transform: rotate(180deg);
    }

    &__content-panel {
        background: @grey-100;
        border-radius: 16px 0 0 0;
        box-shadow: 0 8px 16px rgba(30, 34, 72, 0.16);
        grid-column: 3;
        height: 100vh;
        min-height: 0;
        overflow: auto;
        position: relative;
    }

    &__extension-canvas {
        box-sizing: border-box;
        min-height: 100%;
        padding: 56px;
    }

    &__sidebar-toggle {
        align-items: center;
        appearance: none;
        background: #fff;
        border: 1px solid @grey-400;
        border-radius: 50%;
        box-shadow: @drop-shadow-s;
        box-sizing: border-box;
        color: @grey-900;
        cursor: pointer;
        display: flex;
        height: 24px;
        justify-content: center;
        left: 306px;
        line-height: 0;
        min-height: 24px;
        min-width: 24px;
        padding: 0;
        position: absolute;
        top: 30px;
        transition: left @transition, transform @transition;
        width: 24px;
        z-index: 4;

        &:hover,
        &:active {
            background: #fff;
            border-color: @grey-400;
            color: @grey-900;
        }

        &:focus {
            outline: none;
        }

        &:focus-visible {
            outline: 2px solid @blue-500;
            outline-offset: 2px;
        }
    }

    &__sidebar-toggle-glyph {
        display: block;
        flex: 0 0 20px;
        height: 20px;
        width: 20px;
    }

    &__dev-panel-drawer {
        :global(.ui-v1-modal-sidebar) {
            max-width: calc(100vw - 32px);
            width: min(720px, calc(100vw - 32px));
        }

        :global(.ui-v1-modal-sidebar__body) {
            padding: @spacing-m;
        }
    }

    &__run-mode-status,
    &__host-controls-status {
        height: 1px;
        margin: -1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;

        &:not(caption) {
            clip: rect(0 0 0 0);
        }
    }
}
</style>

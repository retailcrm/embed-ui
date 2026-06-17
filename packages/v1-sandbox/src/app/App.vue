<template>
    <div
        :class="[
            $style['sandbox-app'],
            !isSidebarOpen && $style['sandbox-app_sidebar-closed'],
        ]"
    >
        <SandboxRail />

        <SandboxSidebar
            :id="uid + '-sandbox-sidebar'"
            :open="isSidebarOpen"
        />

        <button
            :class="$style['sandbox-app__sidebar-toggle']"
            :aria-label="isSidebarOpen ? t('app.sidebarCollapse') : t('app.sidebarExpand')"
            :aria-expanded="isSidebarOpen"
            :aria-controls="uid + '-sandbox-sidebar'"
            type="button"
            @click="toggleSidebar"
        >
            <span
                :class="$style['sandbox-app__sidebar-toggle-glyph']"
            >
                ‹
            </span>
        </button>

        <main
            :class="$style['sandbox-app__content-panel']"
            :aria-label="t('app.contentAriaLabel')"
        >
            <button
                :class="$style['sandbox-app__dev-panel-toggle']"
                :aria-expanded="isDevPanelOpen"
                :aria-controls="uid + '-sandbox-dev-panel-drawer'"
                type="button"
                @click="openDevPanel"
            >
                {{ t('app.devPanelToggle') }}
            </button>

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

                <WidgetMounts
                    v-else
                    :mounts="mounts"
                    :set-tree="setMountTree"
                />
            </div>
        </main>

        <div
            v-if="isDevPanelOpen"
            :class="$style['sandbox-app__dev-panel-backdrop']"
            @click="closeDevPanel"
        />

        <aside
            v-if="isDevPanelOpen"
            :id="uid + '-sandbox-dev-panel-drawer'"
            :class="$style['sandbox-app__dev-panel-drawer']"
            :aria-label="t('app.devPanelAriaLabel')"
        >
            <button
                :class="$style['sandbox-app__dev-panel-close']"
                :aria-label="t('app.devPanelClose')"
                type="button"
                @click="closeDevPanel"
            >
                <span
                    :class="$style['sandbox-app__dev-panel-close-glyph']"
                >
                    ×
                </span>
            </button>

            <DevPanel
                :apply-launch-config="applyLaunchConfig"
                :fixture="fixture"
                :go-to-order="goToOrder"
                :manifest-url="manifestUrl"
                :mode="mode"
                :page-code="pageCode"
                :push-query="pushQuery"
                :reload-extension="reloadExtension"
                :replace-query="replaceQuery"
                :reset-state="resetState"
                :run-http-ping="runHttpPing"
                :sandbox="sandbox"
                :selected-targets="selectedTargets"
                :set-fixture="setFixture"
                :set-manifest-url="setManifestUrl"
                :set-mode="setMode"
                :set-page-code="setPageCode"
                :set-target-selected="setTargetSelected"
            />
        </aside>

        <span
            :class="$style['sandbox-app__run-mode-status']"
            :aria-label="t('app.runModeAriaLabel')"
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
import type { HostedTreeRef } from '@/app/runtime/mounts'
import type { SandboxExtensionDescriptor } from '@/dev/manifest'
import type { SandboxIframeWidgetApi } from '@/app/runtime/mounts'
import type { SandboxLaunchMode } from '@/dev/launch'
import type { SandboxMount } from '@/app/runtime/mounts'
import type { SandboxOrderTarget } from '@/dev/targets'
import type { SandboxRuntime, SandboxWorkerApi } from '@/app/runtime/mounts'

import { computed } from 'vue'
import {
  createEndpoint as createRpcEndpoint,
  fromIframe,
  fromWebWorker,
} from '@remote-ui/rpc'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'
import { watch } from 'vue'

import DevPanel from '@/app/components/DevPanel.vue'
import ExtensionOnboarding from '@/app/components/ExtensionOnboarding.vue'
import PageMount from '@/app/components/PageMount.vue'
import SandboxRail from '@/app/components/SandboxRail.vue'
import SandboxSidebar from '@/app/components/SandboxSidebar.vue'

import WidgetMounts from '@/app/components/WidgetMounts.vue'

import { createDefaultSandboxManifestUrl } from '@/dev/launch'
import { createMounts } from '@/app/runtime/mounts'
import { createOrderSandboxController } from '@/dev/fixtures'
import { DEFAULT_SANDBOX_TARGETS } from '@/app/runtime/mounts'
import { parseSandboxLaunchConfig } from '@/dev/launch'
import { resolveSandboxExtensionSource } from '@/dev/manifest'
import { updateSandboxLaunchQuery } from '@/dev/launch'

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
const sandbox = createOrderSandboxController(launchConfig.fixture)
const mounts = createMounts(launchConfig)
const runtime = ref<SandboxRuntime | null>(null)
const isDevPanelOpen = ref(false)
const isSidebarOpen = ref(true)
const { locale, t } = useI18n()
const uid = useId()

const shouldShowOnboarding = computed(() => !launchConfig.manifestUrl && !hasExplicitExtensionUrl)
const runModeLabel = computed(() => launchConfig.mode === 'page'
  ? t('app.runMode.page', { pageCode: launchConfig.pageCode })
  : t('app.runMode.widgets', { count: launchConfig.targets.length }))

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

    const diagnostic = createLaunchDiagnostic(extensionSource.descriptor)

    if (diagnostic) {
      showSandboxAlert(diagnostic.title, diagnostic.message)

      if (diagnostic.blocking) return
    }

    stylesheet = mountExtensionStylesheet(extensionSource.descriptor.stylesheet)
    const connections = extensionSource.descriptor.runner === 'iframe'
      ? await mountIframeExtension(extensionSource.descriptor.uuid, extensionSource.entrypoint)
      : await mountWorkerExtension(extensionSource.descriptor.uuid, extensionSource.entrypoint)

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
    || descriptor.runner !== 'worker'
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
  if (descriptor.runner === 'iframe' && launchConfig.mode === 'page') {
    return {
      blocking: true,
      message: t('app.alerts.iframePageMode.message'),
      title: t('app.alerts.iframePageMode.title'),
    }
  }

  if (
    descriptor.runner === 'worker'
    && launchConfig.mode === 'page'
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
    descriptor.runner === 'worker'
    && launchConfig.mode === 'widget'
    && hasExplicitLaunchMode
    && descriptor.pages.length > 0
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
  const worker = createExtensionWorker(uuid, entrypoint)
  const endpoint = createRpcEndpoint<SandboxWorkerApi>(fromWebWorker(worker))

  try {
    await waitForExtensionWorkerReady(worker, uuid)
  } catch (error) {
    endpoint.terminate()
    throw error
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

const mountIframeExtension = async (
  uuid: string,
  entrypoint: URL
): Promise<SandboxRuntime['connections']> => {
  const widgetMounts = mounts.filter(mount => mount.type === 'widget')

  if (widgetMounts.length !== mounts.length) {
    throw new Error('[sandbox:manifest] Iframe runner supports widget targets only. Use mode=widget.')
  }

  const connections: SandboxRuntime['connections'] = []
  const endpointApi = sandbox.endpointApi

  try {
    for (const mount of widgetMounts) {
      const iframe = createExtensionIframe(uuid, entrypoint)
      const endpoint = createRpcEndpoint<SandboxIframeWidgetApi>(fromIframe(iframe, {
        terminate: false,
      }))

      endpoint.expose({
        ...endpointApi,
        get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
        httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
      } as unknown as SandboxIframeWidgetApi)

      connections.push({
        endpoint,
        iframe,
        kind: 'iframe',
        mount,
      })

      await endpoint.call.run(mount.receiver.receive, getWidgetMountTarget(mount))
    }
  } catch (error) {
    connections.forEach(disposeRuntimeConnection)
    throw error
  }

  return connections
}

const getWidgetMountTarget = (mount: SandboxMount): SandboxOrderTarget => {
  if (!('target' in mount.runConfig)) {
    throw new Error(`[sandbox:manifest] Mount '${mount.id}' is not a widget target.`)
  }

  return mount.runConfig.target as SandboxOrderTarget
}

const createExtensionIframe = (uuid: string, entrypoint: URL): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')

  iframe.height = '0'
  iframe.sandbox.add('allow-scripts', 'allow-same-origin')
  iframe.src = entrypoint.href
  iframe.style.display = 'none'
  iframe.title = `sandbox:${uuid}`
  iframe.width = '0'

  document.body.append(iframe)

  return iframe
}

const disposeRuntimeConnection = (
  connection: SandboxRuntime['connections'][number]
) => {
  connection.endpoint.terminate()

  if (connection.kind === 'iframe') {
    connection.iframe.remove()
    return
  }

  connection.worker.terminate()
}

const releaseRuntimeConnection = async (
  connection: SandboxRuntime['connections'][number]
) => {
  if (connection.kind === 'iframe') {
    await connection.endpoint.call.release()
    return
  }

  for (const mount of connection.mounts) {
    await connection.endpoint.call.release(mount.releaseConfig)
  }
}

const disposeRuntime = async () => {
  const current = runtime.value

  if (!current) return

  window.clearInterval(current.flushTimer)

  try {
    for (const connection of current.connections) {
      try {
        await releaseRuntimeConnection(connection)
      } catch (error) {
        console.warn('[sandbox:manifest] Failed to release extension runtime', error)
      } finally {
        disposeRuntimeConnection(connection)
      }
    }

    await flushReceiver()
  } finally {
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

const applyLaunchConfig = () => {
  window.location.href = updateSandboxLaunchQuery({
    extensionUrl: '',
    fixture: fixture.value,
    manifestUrl: manifestUrl.value,
    mode: mode.value,
    pageCode: pageCode.value,
    targets: selectedTargets.value.length > 0
      ? selectedTargets.value
      : DEFAULT_SANDBOX_TARGETS,
    widgetId: launchConfig.widgetId,
  }).toString()
}

const reloadExtension = async () => {
  await disposeRuntime()
  await mountExtension()
}

const resetState = async () => {
  sandbox.reset()
  await reloadExtension()
}

const runHttpPing = async () => {
  await sandbox.endpointApi.httpCall('sandbox.demo.ping', {
    fixture: launchConfig.fixture,
    mode: launchConfig.mode,
  })
}

const pushQuery = () => {
  sandbox.endpointApi.pushQuery({
    sandbox: '1',
    status: sandbox.state.contexts['order/card'].status,
  }, { preserveExisting: true })
}

const replaceQuery = () => {
  sandbox.endpointApi.replaceQuery({
    fixture: launchConfig.fixture,
    mode: launchConfig.mode,
  })
}

const goToOrder = () => {
  sandbox.endpointApi.goTo('/orders/215/edit', {
    source: 'v1-sandbox',
  })
}

const setFixture = (value: string) => {
  fixture.value = value
}

const setManifestUrl = (value: string) => {
  manifestUrl.value = value
}

const setMode = (value: SandboxLaunchMode) => {
  mode.value = value
}

const setPageCode = (value: string) => {
  pageCode.value = value
}

const setTargetSelected = (target: SandboxOrderTarget, checked: boolean) => {
  selectedTargets.value = checked
    ? Array.from(new Set([...selectedTargets.value, target]))
    : selectedTargets.value.filter(item => item !== target)
}

const setMountTree = (mount: SandboxMount, tree: HostedTreeRef | null) => {
  mount.tree = tree
}

const createExtensionWorker = (uuid: string, entrypoint: URL): Worker => {
  const bootstrap = new URL('./runtime/remoteBootstrap.worker.ts', import.meta.url)

  bootstrap.searchParams.set('extension', entrypoint.href)

  return new Worker(bootstrap, {
    name: `sandbox:${uuid}`,
    type: 'module',
  })
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

type WorkerReadyMessage = {
  error?: string;
  type: string;
}

type SandboxLaunchDiagnostic = {
  blocking: boolean;
  message: string;
  title: string;
}

type StoredLaunchNotice = {
  pageCode?: string;
  type: 'inferred-page-mode';
}

enum ExtensionWorkerMessageType {
  Ready = 'sandbox:extension-worker-ready',
  ReadyError = 'sandbox:extension-worker-error',
}

const isWorkerReadyMessage = (value: unknown): value is WorkerReadyMessage =>
  typeof value === 'object' && value !== null && 'type' in value

const waitForExtensionWorkerReady = async (
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
      worker.removeEventListener('message', onMessage)
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

    worker.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
  }).catch((error) => {
    worker.terminate()
    throw error
  })
}

const openDevPanel = () => {
  isDevPanelOpen.value = true
}

const closeDevPanel = () => {
  isDevPanelOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDevPanel()
  }
}

const showSandboxAlert = (title: string, message: string) => {
  window.alert(`${title}\n\n${message}`)
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message

  return String(error)
}

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
  window.addEventListener('keydown', handleKeydown)
  showStoredLaunchNotice()

  if (!shouldShowOnboarding.value) {
    void mountExtension()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  void disposeRuntime()
  sandbox.dispose()
})
</script>

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/variables.less";

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
        background: #fff;
        border: 1px solid @grey-400;
        border-radius: 50%;
        box-shadow: @drop-shadow-s;
        color: @grey-900;
        cursor: pointer;
        display: flex;
        height: 24px;
        justify-content: center;
        left: 306px;
        min-height: 24px;
        padding: 0;
        position: absolute;
        top: 30px;
        transition: left @transition, transform @transition;
        width: 24px;
        z-index: 4;
    }

    &__sidebar-toggle-glyph {
        display: block;
        font-size: 18px;
        line-height: 1;
        transform: translateY(-1px);
    }

    &__dev-panel-toggle {
        background: transparent;
        border: 0;
        color: @blue-500;
        cursor: pointer;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        padding: @spacing-xs;
        position: absolute;
        right: 24px;
        top: 24px;
        z-index: 2;
    }

    &__dev-panel-backdrop {
        background: rgba(13, 15, 31, 0.3);
        inset: 0;
        position: fixed;
        z-index: 10;
    }

    &__dev-panel-drawer {
        background: #fff;
        bottom: 0;
        box-shadow: @drop-shadow-l;
        max-width: calc(100vw - 32px);
        overflow: auto;
        padding: @spacing-xl @spacing-m @spacing-m;
        position: fixed;
        right: 0;
        top: 0;
        width: min(720px, calc(100vw - 32px));
        z-index: 11;
    }

    &__dev-panel-close {
        align-items: center;
        background: #fff;
        border: 1px solid @grey-500;
        border-radius: 50%;
        color: @black-500;
        cursor: pointer;
        display: flex;
        font: inherit;
        height: 32px;
        justify-content: center;
        min-height: 32px;
        padding: 0;
        position: absolute;
        right: @spacing-s;
        top: @spacing-s;
        width: 32px;
    }

    &__dev-panel-close-glyph {
        display: block;
        font-size: 22px;
        line-height: 1;
        transform: translateY(-1px);
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

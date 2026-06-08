import '@retailcrm/embed-ui-v1-components/dist/host.css'

import './styles.css'

import type { SandboxLaunchMode } from '@/dev/launch'
import type { SandboxOrderTarget } from '@/dev/targets'
import type { SandboxRuntime, SandboxWorkerApi } from '@/app/runtime/mounts'

import { createApp } from 'vue'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { createMounts } from '@/app/runtime/mounts'
import { createOrderSandboxController } from '@/dev/fixtures'
import { DEFAULT_DEMO_TARGETS } from '@/app/runtime/mounts'
import { parseSandboxLaunchConfig } from '@/dev/launch'
import { renderDevPanel } from '@/app/components/DevPanel'
import { renderHostControls } from '@/app/components/HostControls'
import { renderPageMount } from '@/app/components/MountSurface'
import { renderRail, renderSidebar } from '@/app/components/Shell'
import { renderWidgetMounts } from '@/app/components/MountSurface'
import { updateSandboxLaunchQuery } from '@/dev/launch'

const App = defineComponent({
  name: 'SandboxApp',

  setup () {
    const launchConfig = parseSandboxLaunchConfig(new URLSearchParams(window.location.search), {
      targets: DEFAULT_DEMO_TARGETS,
    })
    const extensionUrl = ref(launchConfig.extensionUrl)
    const fixture = ref(launchConfig.fixture)
    const mode = ref<SandboxLaunchMode>(launchConfig.mode)
    const pageCode = ref(launchConfig.pageCode)
    const selectedTargets = ref<SandboxOrderTarget[]>([...launchConfig.targets])
    const sandbox = createOrderSandboxController(launchConfig.fixture)
    const mounts = createMounts(launchConfig)
    const runtime = ref<SandboxRuntime | null>(null)

    const flushReceiver = async () => {
      await Promise.all(mounts.map(async (mount) => {
        await mount.receiver.flush()
        mount.tree?.forceUpdate()
      }))
    }

    const mountExtension = async () => {
      const worker = new Worker(launchConfig.extensionUrl, { type: 'module' })
      const endpoint = createRpcEndpoint<SandboxWorkerApi>(worker)
      const endpointApi = sandbox.endpointApi

      endpoint.expose({
        ...endpointApi,
        get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
        httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
      } as unknown as SandboxWorkerApi)

      for (const mount of mounts) {
        await endpoint.call.run(mount.receiver.receive, mount.runConfig)
      }

      await flushReceiver()

      runtime.value = {
        endpoint,
        flushTimer: window.setInterval(() => {
          void flushReceiver()
        }, 100),
        mounts,
        worker,
      }
    }

    const disposeRuntime = async () => {
      const current = runtime.value

      if (!current) return

      window.clearInterval(current.flushTimer)

      try {
        for (const mount of current.mounts) {
          await current.endpoint.call.release(mount.releaseConfig)
        }

        await flushReceiver()
      } finally {
        current.worker.terminate()
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

    const toggleOrderStatus = () => {
      const current = sandbox.state.contexts['order/card'].status
      const next = current === 'new' ? 'client-confirmed' : 'new'

      sandbox.setField('order/card', 'status', next)
      flushRemoteUpdates()
    }

    const applyLaunchConfig = () => {
      window.location.href = updateSandboxLaunchQuery({
        extensionUrl: extensionUrl.value,
        fixture: fixture.value,
        mode: mode.value,
        pageCode: pageCode.value,
        targets: selectedTargets.value.length > 0
          ? selectedTargets.value
          : DEFAULT_DEMO_TARGETS,
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

    const setTargetSelected = (target: SandboxOrderTarget, checked: boolean) => {
      selectedTargets.value = checked
        ? Array.from(new Set([...selectedTargets.value, target]))
        : selectedTargets.value.filter(item => item !== target)
    }

    onMounted(() => {
      void mountExtension()
    })

    onBeforeUnmount(() => {
      void disposeRuntime()
      sandbox.dispose()
    })

    return () => h('div', { class: 'sandbox-root' }, [
      renderRail(),
      renderSidebar(launchConfig),
      h('main', {
        class: 'crm-page',
        'data-testid': 'sandbox-page',
        onClickCapture: flushRemoteUpdates,
      }, [
        h('div', { class: 'workspace-layout' }, [
          h('div', { class: 'workspace-main' }, [
            renderHostControls(launchConfig, sandbox.state.contexts['order/card'].status, toggleOrderStatus),
            launchConfig.mode === 'page'
              ? renderPageMount(mounts[0])
              : renderWidgetMounts(mounts),
          ]),
          renderDevPanel({
            applyLaunchConfig,
            extensionUrl: extensionUrl.value,
            fixture: fixture.value,
            goToOrder,
            mode: mode.value,
            pageCode: pageCode.value,
            pushQuery,
            reloadExtension,
            replaceQuery,
            resetState,
            runHttpPing,
            sandbox,
            selectedTargets: selectedTargets.value,
            setExtensionUrl: (value) => {
              extensionUrl.value = value
            },
            setFixture: (value) => {
              fixture.value = value
            },
            setMode: (value) => {
              mode.value = value
            },
            setPageCode: (value) => {
              pageCode.value = value
            },
            setTargetSelected,
          }),
        ]),
      ]),
    ])
  },
})

createApp(App).mount('#app')

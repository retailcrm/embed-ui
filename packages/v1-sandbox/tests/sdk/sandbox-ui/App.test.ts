import type { App as VueApp } from 'vue'

import type { SandboxExtensionSource } from '@/scenario/manifest'

import { afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'
import { waitFor } from '@testing-library/dom'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

type FakeEndpoint = {
  call: {
    release: ReturnType<typeof vi.fn>;
    run: ReturnType<typeof vi.fn>;
  };
  expose: ReturnType<typeof vi.fn>;
  terminate: ReturnType<typeof vi.fn>;
}

type WorkerReadyMode = 'ready' | 'ready-error' | 'silent'

class FakeWorker extends EventTarget {
  readonly options: WorkerOptions

  readonly postMessage = vi.fn((message: {
    readyPort?: MessagePort;
  }) => {
    if (workerReadyMode === 'silent') return

    message.readyPort?.postMessage(workerReadyMode === 'ready'
      ? { type: 'sandbox:extension-worker-ready' }
      : {
        error: 'worker bootstrap failed',
        type: 'sandbox:extension-worker-error',
      })
  })

  readonly terminate = vi.fn()

  constructor (options: WorkerOptions) {
    super()
    this.options = options
    fakeWorkers.push(this)
  }
}

const resolveSandboxExtensionSourceMock = vi.fn<() => Promise<SandboxExtensionSource>>()
const createEndpointMock = vi.fn<() => FakeEndpoint>()
const fromWebWorkerMock = vi.fn((worker: Worker) => worker)
const disposeContextSubscriptionsMock = vi.fn()
const patchContextMock = vi.fn()
const fakeWorkers: FakeWorker[] = []
let app: VueApp<Element> | null = null
let root: HTMLElement | null = null
let currentEndpoint: FakeEndpoint
let workerReadyMode: WorkerReadyMode = 'ready'

vi.mock('@/scenario/manifest', () => ({
  resolveSandboxExtensionSource: resolveSandboxExtensionSourceMock,
}))

vi.mock('@retailcrm/embed-ui-v1-components/host', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    UiButton: defineComponent({
      name: 'UiButton',
      setup: (_props, { slots }) => () => h('button', slots.default?.()),
    }),
    UiModalSidebar: defineComponent({
      name: 'UiModalSidebar',
      setup: (_props, { slots }) => () => h('div', slots.default?.()),
    }),
  }
})

vi.mock('@remote-ui/rpc', () => ({
  createEndpoint: createEndpointMock,
  fromWebWorker: fromWebWorkerMock,
}))

vi.mock('@/components/DevPanel.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'DevPanelStub',
      props: {
        applyContextJson: {
          required: true,
          type: Function,
        },
      },
      setup: props => () => h('button', {
        'data-testid': 'apply-context-json',
        onClick: () => props.applyContextJson(),
      }),
    }),
  }
})

vi.mock('@/components/ExtensionOnboarding.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'ExtensionOnboardingStub',
      setup: () => () => h('div'),
    }),
  }
})

vi.mock('@/components/NavigationRail.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'NavigationRailStub',
      setup: () => () => h('div'),
    }),
  }
})

vi.mock('@/components/NavigationSidebar.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'NavigationSidebarStub',
      setup: () => () => h('div'),
    }),
  }
})

vi.mock('@/components/PageMount.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'PageMountStub',
      setup: () => () => h('div'),
    }),
  }
})

vi.mock('@/components/WidgetTargetList.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'WidgetTargetListStub',
      setup: () => () => h('div'),
    }),
  }
})

vi.mock('@/runtime/remoteBootstrap.worker.ts?worker', () => ({
  default: FakeWorker,
}))

vi.mock('@/runtime/mount', () => ({
  DEFAULT_SANDBOX_TARGETS: [
    'order/card:common.before',
    'order/card:common.after',
  ],
  createMounts: (config: {
    mode: 'page' | 'widget';
    pageCode: string;
    targets: string[];
    widgetId: string;
  }) => {
    if (config.mode === 'page') {
      return [{
        id: `page:${config.pageCode}`,
        label: config.pageCode,
        receiver: {
          flush: vi.fn(async () => undefined),
          receive: vi.fn(),
        },
        releaseConfig: { code: config.pageCode },
        runConfig: { code: config.pageCode },
        tree: null,
        type: 'page',
      }]
    }

    return config.targets.map(target => ({
      id: `${config.widgetId}:${target.replace(/[^a-z0-9]+/giu, '-')}`,
      label: target,
      receiver: {
        flush: vi.fn(async () => undefined),
        receive: vi.fn(),
      },
      releaseConfig: { id: `${config.widgetId}:${target.replace(/[^a-z0-9]+/giu, '-')}` },
      runConfig: {
        id: `${config.widgetId}:${target.replace(/[^a-z0-9]+/giu, '-')}`,
        target,
      },
      tree: null,
      type: 'widget',
    }))
  },
}))

vi.mock('@/scenario/fixtures', () => ({
  createOrderSandboxController: () => {
    const contexts = {
      settings: {
        'system.locale': 'ru-RU',
      },
    }

    return {
      dispose: vi.fn(),
      disposeContextSubscriptions: disposeContextSubscriptionsMock,
      endpointApi: {
        get: vi.fn(),
        getCustomDictionary: vi.fn(),
        getCustomField: vi.fn(),
        getCustomSchema: vi.fn(),
        getLocation: vi.fn(),
        goTo: vi.fn(),
        httpCall: vi.fn(),
        on: vi.fn(),
        onBeforeRouteLeave: vi.fn(),
        onCustomFieldChange: vi.fn(),
        pushQuery: vi.fn(),
        replaceQuery: vi.fn(),
        set: vi.fn(),
        setCustomField: vi.fn(),
      },
      patchContext: patchContextMock,
      snapshot: () => ({
        contexts,
        host: {
          http: [],
          location: {
            query: {},
          },
        },
      }),
      state: {
        contexts,
      },
    }
  },
}))

const createEndpoint = (): FakeEndpoint => ({
  call: {
    release: vi.fn(async () => undefined),
    run: vi.fn(async () => undefined),
  },
  expose: vi.fn(),
  terminate: vi.fn(),
})

const createExtensionSource = (
  descriptor: Partial<SandboxExtensionSource['descriptor']> = {}
): SandboxExtensionSource => ({
  descriptor: {
    entrypoint: 'http://extension.test/extension/demo/script',
    pages: [],
    runner: 'worker',
    stylesheet: null,
    targets: ['order/card:common.before'],
    uuid: 'demo-extension',
    ...descriptor,
  },
  entrypoint: new URL('http://extension.test/extension/demo/script'),
  httpBaseUrl: 'http://extension.test/',
  manifestUrl: 'http://extension.test/extension/demo',
})

const createTestI18n = () => createI18n({
  fallbackLocale: 'en-GB',
  legacy: false,
  locale: 'ru-RU',
  messages: {
    'en-GB': messagesEnGb,
    'es-ES': messagesEsEs,
    'ru-RU': messagesRuRu,
  },
})

const mountAppWithRuntime = async (query: string, endpoint = createEndpoint()) => {
  currentEndpoint = endpoint
  createEndpointMock.mockReturnValue(currentEndpoint)
  window.history.replaceState(null, '', query)
  vi.resetModules()

  const App = (await import('@/app/App.vue')).default

  root = document.createElement('div')
  document.body.append(root)
  const wrapper = mount(App, {
    attachTo: root,
    global: {
      plugins: [createTestI18n()],
    },
  })
  app = wrapper.vm.$.appContext.app

  return {
    endpoint: currentEndpoint,
    root,
    wrapper,
  }
}

afterEach(async () => {
  app?.unmount()
  app = null
  root?.remove()
  root = null
  document.head.querySelectorAll('[data-sandbox-extension-stylesheet]').forEach(node => node.remove())
  document.body.innerHTML = ''
  fakeWorkers.splice(0)
  workerReadyMode = 'ready'
  await new Promise(resolve => window.setTimeout(resolve, 0))
  vi.clearAllMocks()
  vi.restoreAllMocks()
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
})

test('blocks page extension with unknown page code', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { endpoint } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=page&pageCode=returns'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Страница расширения не найдена\n\nВ расширении нет страницы "returns". Доступные страницы: settings.'
    )
  })
  expect(endpoint.call.run).not.toHaveBeenCalled()
})

test('warns about page-only descriptor in explicit widget mode and continues mounting', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { endpoint } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget&pageCode=orders-dashboard'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Проверьте режим запуска\n\nРасширение содержит страницы: settings. Сейчас выбран режим виджетов; если ожидается страница, переключите mode на page.'
    )
    expect(endpoint.call.run).toHaveBeenCalled()
  })
})

test('shows runtime error when worker bootstrap reports failure', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  workerReadyMode = 'ready-error'
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource())

  const { endpoint } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nworker bootstrap failed'
    )
  })
  expect(endpoint.terminate).toHaveBeenCalledOnce()
  expect(fakeWorkers[0]?.terminate).toHaveBeenCalledOnce()
})

test('shows runtime error and disposes worker when endpoint run fails', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource())
  currentEndpoint = createEndpoint()
  currentEndpoint.call.run.mockRejectedValueOnce(new Error('run failed'))
  await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget',
    currentEndpoint
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nrun failed'
    )
  })
  expect(currentEndpoint.terminate).toHaveBeenCalledOnce()
  expect(fakeWorkers[0]?.terminate).toHaveBeenCalledOnce()
  expect(disposeContextSubscriptionsMock).toHaveBeenCalledOnce()
})

test('disposes context subscriptions before patching context and restarting worker', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { endpoint, wrapper } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=page&pageCode=settings'
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledOnce()
  })

  await wrapper.find('[data-testid="apply-context-json"]').trigger('click')
  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledTimes(2)
  })

  expect(disposeContextSubscriptionsMock).toHaveBeenCalledOnce()
  expect(patchContextMock).toHaveBeenCalledWith('settings', {
    'system.locale': 'ru-RU',
  })
  expect(disposeContextSubscriptionsMock.mock.invocationCallOrder[0])
    .toBeLessThan(endpoint.terminate.mock.invocationCallOrder[0] as number)
  expect(endpoint.terminate.mock.invocationCallOrder[0])
    .toBeLessThan(patchContextMock.mock.invocationCallOrder[0] as number)
  expect(patchContextMock.mock.invocationCallOrder[0])
    .toBeLessThan(endpoint.call.run.mock.invocationCallOrder[1] as number)
})

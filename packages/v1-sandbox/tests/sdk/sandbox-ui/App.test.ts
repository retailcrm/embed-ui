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
import { SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY } from '@/automation/bridge'

type FakeEndpoint = {
  call: {
    release: ReturnType<typeof vi.fn>;
    run: ReturnType<typeof vi.fn>;
  };
  expose: ReturnType<typeof vi.fn>;
  terminate: ReturnType<typeof vi.fn>;
}

type WorkerReadyMode = 'ignored-then-ready' | 'ready' | 'ready-error' | 'silent' | 'worker-error'

class FakeWorker extends EventTarget {
  readonly options: WorkerOptions

  readonly postMessage = vi.fn((message: {
    readyPort?: MessagePort;
  }) => {
    if (workerReadyMode === 'silent') return

    if (workerReadyMode === 'worker-error') {
      queueMicrotask(() => {
        this.dispatchEvent(new ErrorEvent('error', {
          message: 'worker crashed',
        }))
      })

      return
    }

    if (workerReadyMode === 'ignored-then-ready') {
      message.readyPort?.postMessage({ type: 'unrelated-message' })
      message.readyPort?.postMessage({ type: 'sandbox:extension-worker-ready' })

      return
    }

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
const endpointGetMock = vi.fn()
const endpointHttpCallMock = vi.fn()
const forceUpdateMock = vi.fn()
const fakeWorkers: FakeWorker[] = []
let controllerOptions: {
  getDescriptorUuid: () => string | undefined;
  getHttpCallBaseUrl: () => string | null;
} | null = null
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
      props: {
        opened: {
          required: true,
          type: Boolean,
        },
      },
      setup: (_props, { slots }) => () => h('div', [
        slots.title?.(),
        slots.default?.(),
      ]),
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
        applyLaunchConfig: {
          required: true,
          type: Function,
        },
        applyContextJson: {
          required: true,
          type: Function,
        },
        applyingLaunchConfig: {
          required: true,
          type: Boolean,
        },
        contextJson: {
          required: true,
          type: String,
        },
        contextJsonChanged: {
          required: true,
          type: Boolean,
        },
        downloadContextJson: {
          required: true,
          type: Function,
        },
        fixture: {
          required: true,
          type: String,
        },
        formatContextJson: {
          required: true,
          type: Function,
        },
        mode: {
          required: true,
          type: String,
        },
        pageCode: {
          required: true,
          type: String,
        },
        resetContextJson: {
          required: true,
          type: Function,
        },
        setContextJson: {
          required: true,
          type: Function,
        },
        setFixture: {
          required: true,
          type: Function,
        },
        setManifestUrl: {
          required: true,
          type: Function,
        },
        setMode: {
          required: true,
          type: Function,
        },
        setPageCode: {
          required: true,
          type: Function,
        },
        setTargetSelected: {
          required: true,
          type: Function,
        },
        validationErrors: {
          required: true,
          type: Object,
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
      emits: ['openDevPanel'],
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
  const { defineComponent, h, onMounted } = await import('vue')

  return {
    default: defineComponent({
      name: 'PageMountStub',
      props: {
        mount: {
          required: true,
          type: Object,
        },
        setTree: {
          required: true,
          type: Function,
        },
      },
      setup: props => {
        onMounted(() => {
          props.setTree(props.mount, {
            forceUpdate: forceUpdateMock,
          })
        })

        return () => h('div')
      },
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

vi.mock('@/components/WidgetRunSummary.vue', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    default: defineComponent({
      name: 'WidgetRunSummaryStub',
      props: {
        fixture: {
          required: true,
          type: String,
        },
        targets: {
          required: true,
          type: Array,
        },
      },
      setup: props => () => h('section', {
        'aria-label': 'widget-run-summary',
      }, [
        props.fixture,
        ...(props.targets as string[]),
      ]),
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
  orderSandboxFixtures: {
    'order-basic': {},
    'order-with-delivery': {},
  },
  getOrderSandboxFixture: (fixture: string) => ({
    contexts: fixture === 'order-with-delivery'
      ? {
        'order/card': {
          'delivery.address': 'Москва, ул. Ленина, 10',
        },
        'settings': {
          'system.locale': 'ru-RU',
        },
      }
      : {
        settings: {
          'system.locale': 'ru-RU',
        },
      },
  }),
  createOrderSandboxController: (_fixture: string, options: typeof controllerOptions) => {
    controllerOptions = options
    const contexts = {
      settings: {
        'system.locale': 'ru-RU',
      },
    }

    return {
      dispose: vi.fn(),
      disposeContextSubscriptions: disposeContextSubscriptionsMock,
      endpointApi: {
        get: endpointGetMock,
        getCustomDictionary: vi.fn(),
        getCustomField: vi.fn(),
        getCustomSchema: vi.fn(),
        getLocation: vi.fn(),
        goTo: vi.fn(),
        httpCall: endpointHttpCallMock,
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
  controllerOptions = null
  workerReadyMode = 'ready'
  await new Promise(resolve => window.setTimeout(resolve, 0))
  vi.clearAllMocks()
  vi.restoreAllMocks()
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
})

test('renders the sidebar toggle with an icon', async () => {
  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const toggle = wrapper.get('button[aria-label="Свернуть боковую панель"]')

  expect(toggle.find('svg').exists()).toBe(true)
  expect(toggle.classes()).not.toContain('ui-v1-button')
  expect(toggle.text()).not.toContain('<')
})

test('shows the applied fixture and targets in widget mode', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource())

  const { wrapper } = await mountAppWithRuntime(
    '/?fixture=order-with-delivery'
    + '&manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo'
    + '&mode=widget'
    + '&targets=order%2Fcard%3Acommon.before%2Corder%2Fcard%3Acommon.after'
  )
  const summary = wrapper.getComponent({ name: 'WidgetRunSummaryStub' })
  const panel = wrapper.getComponent({ name: 'DevPanelStub' })
  const setFixture = panel.props('setFixture') as (fixture: string) => void
  const setTargetSelected = panel.props('setTargetSelected') as (
    target: string,
    selected: boolean
  ) => void

  expect(summary.props('fixture')).toBe('order-with-delivery')
  expect(summary.props('targets')).toEqual([
    'order/card:common.before',
    'order/card:common.after',
  ])

  setFixture('order-basic')
  setTargetSelected('order/card:common.before', false)
  await wrapper.vm.$nextTick()

  expect(summary.props('fixture')).toBe('order-with-delivery')
  expect(summary.props('targets')).toEqual([
    'order/card:common.before',
    'order/card:common.after',
  ])
})

test('does not show the widget run summary on onboarding', async () => {
  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')

  expect(wrapper.findComponent({ name: 'WidgetRunSummaryStub' }).exists()).toBe(false)
})

test('does not show the widget run summary in page mode', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { wrapper } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo'
    + '&mode=page'
    + '&pageCode=settings'
  )

  expect(wrapper.findComponent({ name: 'WidgetRunSummaryStub' }).exists()).toBe(false)
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
      'Страница расширения не найдена\n\nВ расширении нет страницы «returns». Доступные страницы: settings.'
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
      'Проверьте режим запуска\n\nРасширение содержит страницы: settings. Сейчас выбран режим «Виджеты»; если ожидается страница, выберите режим «Страница».'
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

test('mounts page runtime with stylesheet, host api and launch bridge', async () => {
  workerReadyMode = 'ignored-then-ready'
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    stylesheet: 'http://extension.test/extension/demo/stylesheet',
    targets: [],
  }))

  const { endpoint, wrapper } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=page&pageCode=settings'
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledOnce()
    expect(forceUpdateMock).toHaveBeenCalled()
  })

  const stylesheet = document.head.querySelector<HTMLLinkElement>(
    '[data-sandbox-extension-stylesheet]'
  )
  const options = controllerOptions as NonNullable<typeof controllerOptions>
  const exposedApi = endpoint.expose.mock.calls[0]?.[0] as {
    get: (...args: unknown[]) => unknown;
    httpCall: (...args: unknown[]) => unknown;
  }

  expect(stylesheet?.href).toBe('http://extension.test/extension/demo/stylesheet')
  expect(stylesheet?.rel).toBe('stylesheet')
  expect(options.getDescriptorUuid()).toBe('demo-extension')
  expect(options.getHttpCallBaseUrl()).toBe('http://extension.test/')

  exposedApi.get('settings', 'system.locale')
  exposedApi.httpCall('/returns', { page: 1 })

  expect(endpointGetMock).toHaveBeenCalledWith('settings', 'system.locale')
  expect(endpointHttpCallMock).toHaveBeenCalledWith('/returns', { page: 1 })

  const bridge = window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]

  expect(bridge?.getLaunchConfig()).toMatchObject({
    mode: 'page',
    pageCode: 'settings',
  })
  expect(bridge?.createLaunchUrl({
    mode: 'widget',
    targets: ['order/card:common.after'],
  })).toContain('mode=widget')
  expect(bridge?.createLaunchUrl({
    pageCode: 'returns',
  })).toContain('pageCode=returns')

  const updatesBeforeClick = forceUpdateMock.mock.calls.length

  await wrapper.get('[role="region"]').trigger('click')
  await waitFor(() => {
    expect(forceUpdateMock.mock.calls.length).toBeGreaterThan(updatesBeforeClick)
  })

  wrapper.unmount()
  app = null

  await waitFor(() => {
    expect(endpoint.call.release).toHaveBeenCalledOnce()
    expect(endpoint.terminate).toHaveBeenCalledOnce()
    expect(fakeWorkers[0]?.terminate).toHaveBeenCalledOnce()
    expect(stylesheet?.isConnected).toBe(false)
  })
})

test('updates dev panel fields and reports validation errors', async () => {
  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  callProp('setManifestUrl', '')
  callProp('applyLaunchConfig')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    manifestUrl: 'Укажите URL расширения.',
  })

  callProp('setManifestUrl', 'http://extension.test/extension/demo')
  callProp('setFixture', 'order-with-delivery')
  callProp('setMode', 'page')
  await wrapper.vm.$nextTick()

  expect(panel.props('pageCode')).toBe('')

  callProp('setPageCode', 'settings_2')
  await wrapper.vm.$nextTick()

  expect(panel.props('pageCode')).toBe('settings_2')
  expect(panel.props('validationErrors')).toMatchObject({
    pageCode: 'Код страницы может содержать только латинские буквы (A–Z, a–z) и дефисы.',
  })

  callProp('setPageCode', 'orders-settings')
  callProp('setTargetSelected', 'order/card:common.before', false)
  callProp('setTargetSelected', 'order/card:common.after', true)
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toEqual({})

  callProp('setMode', 'widget')
  callProp('setTargetSelected', 'unknown/target', true)
  callProp('applyLaunchConfig')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    targets: 'Неизвестное место встраивания «unknown/target».',
  })

  callProp('setTargetSelected', 'unknown/target', false)

  callProp('setContextJson', '{')
  await callProp('applyContextJson')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    contextJson: 'Введите валидный JSON. Ошибка в строке 1, столбце 2.',
  })

  callProp('setContextJson', '{}')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toEqual({})

  callProp('setContextJson', '{"settings":[]}')
  await callProp('applyContextJson')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    contextJson: 'Контекст «settings» должен быть JSON-объектом.',
  })

  callProp('setContextJson', '{"unknown":{}}')
  await callProp('applyContextJson')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    contextJson: 'Неизвестный контекст «unknown».',
  })

  await wrapper.get('[role="region"]').trigger('click')
  await wrapper.get('button[aria-label="Свернуть боковую панель"]').trigger('click')

  expect(wrapper.get('button[aria-label="Развернуть боковую панель"]')).toBeDefined()

  wrapper.findComponent({ name: 'NavigationRailStub' }).vm.$emit('openDevPanel')
  wrapper.findComponent({ name: 'UiModalSidebar' }).vm.$emit('update:opened', false)
  await wrapper.vm.$nextTick()
})

test('formats, resets and downloads context json without applying it', async () => {
  const clickedAnchors: HTMLAnchorElement[] = []
  const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:context-json')
  const revokeObjectUrlSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  const anchorClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    clickedAnchors.push(this)
  })
  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  callProp('setContextJson', '{')
  callProp('formatContextJson')
  await wrapper.vm.$nextTick()

  expect(panel.props('contextJson')).toBe('{')
  expect(panel.props('validationErrors')).toMatchObject({
    contextJson: 'Введите валидный JSON. Ошибка в строке 1, столбце 2.',
  })

  callProp('setContextJson', '{"settings":{"system.locale":"en-GB"}}')
  callProp('formatContextJson')
  await wrapper.vm.$nextTick()

  expect(panel.props('contextJson')).toBe(`{
  "settings": {
    "system.locale": "en-GB"
  }
}`)
  expect(patchContextMock).not.toHaveBeenCalled()

  callProp('setFixture', 'order-with-delivery')
  callProp('setContextJson', '{}')
  callProp('resetContextJson')
  await wrapper.vm.$nextTick()

  const resetContext = JSON.parse(panel.props('contextJson') as string) as {
    'order/card': Record<string, unknown>;
  }

  expect(resetContext['order/card']['delivery.address'])
    .toBe('Москва, ул. Ленина, 10')
  expect(panel.props('contextJsonChanged')).toBe(true)
  expect(patchContextMock).not.toHaveBeenCalled()

  callProp('downloadContextJson')

  expect(createObjectUrlSpy).toHaveBeenCalledOnce()
  const downloadedBlob = createObjectUrlSpy.mock.calls[0]?.[0]

  expect(downloadedBlob).toBeInstanceOf(Blob)
  const downloadedText = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('error', () => reject(reader.error))
    reader.addEventListener('load', () => resolve(String(reader.result)))
    reader.readAsText(downloadedBlob as Blob)
  })

  expect(downloadedText).toBe(panel.props('contextJson'))
  expect(anchorClickSpy).toHaveBeenCalledOnce()
  expect(clickedAnchors[0]?.download).toBe('v1-sandbox-order-with-delivery-context.json')
  expect(clickedAnchors[0]?.href).toBe('blob:context-json')
  expect(revokeObjectUrlSpy).toHaveBeenCalledWith('blob:context-json')
})

test('keeps dev panel open and shows available pages when page code is missing', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  wrapper.findComponent({ name: 'NavigationRailStub' }).vm.$emit('openDevPanel')
  callProp('setManifestUrl', 'http://extension.test/extension/demo')
  callProp('setMode', 'page')
  callProp('setPageCode', 'returns')
  await callProp('applyLaunchConfig')
  await wrapper.vm.$nextTick()

  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledOnce()
  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledWith(expect.objectContaining({
    manifestUrl: 'http://extension.test/extension/demo',
    mode: 'page',
    pageCode: 'returns',
  }))
  expect(panel.props('validationErrors')).toMatchObject({
    pageCode: 'В расширении нет страницы «returns». Доступные страницы: settings.',
  })
  expect(wrapper.findComponent({ name: 'UiModalSidebar' }).props('opened')).toBe(true)
  expect(fakeWorkers).toHaveLength(0)
  expect(window.location.search).toBe('?manifestUrl=&mode=widget')

  callProp('setPageCode', 'settings')
  await wrapper.vm.$nextTick()
  expect(panel.props('validationErrors')).toEqual({})

  callProp('setPageCode', 'returns')
  await callProp('applyLaunchConfig')
  callProp('setManifestUrl', 'http://extension.test/extension/changed')
  await wrapper.vm.$nextTick()
  expect(panel.props('validationErrors')).toEqual({})

  await callProp('applyLaunchConfig')
  callProp('setMode', 'widget')
  await wrapper.vm.$nextTick()
  expect(panel.props('validationErrors')).toEqual({})
})

test('shows an empty available pages marker when extension has no pages', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: [],
    targets: [],
  }))

  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  wrapper.findComponent({ name: 'NavigationRailStub' }).vm.$emit('openDevPanel')
  callProp('setManifestUrl', 'http://extension.test/extension/demo')
  callProp('setMode', 'page')
  callProp('setPageCode', 'returns')
  await callProp('applyLaunchConfig')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toMatchObject({
    pageCode: 'В расширении нет страницы «returns». Доступные страницы: —.',
  })
  expect(wrapper.findComponent({ name: 'UiModalSidebar' }).props('opened')).toBe(true)
})

test('closes dev panel after successful page preflight without starting worker', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['returns', 'settings'],
    targets: [],
  }))

  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  wrapper.findComponent({ name: 'NavigationRailStub' }).vm.$emit('openDevPanel')
  callProp('setManifestUrl', 'http://extension.test/extension/demo')
  callProp('setMode', 'page')
  callProp('setPageCode', 'returns')
  await callProp('applyLaunchConfig')
  await wrapper.vm.$nextTick()

  expect(panel.props('validationErrors')).toEqual({})
  expect(wrapper.findComponent({ name: 'UiModalSidebar' }).props('opened')).toBe(false)
  expect(fakeWorkers).toHaveLength(0)
})

test('keeps dev panel open on page preflight failure and ignores repeated apply', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
  let rejectSource: (error: Error) => void = () => {}
  const pendingSource = new Promise<SandboxExtensionSource>((_resolve, reject) => {
    rejectSource = reject
  })

  resolveSandboxExtensionSourceMock.mockReturnValue(pendingSource)

  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')
  const panel = wrapper.findComponent({ name: 'DevPanelStub' })
  const callProp = (name: string, ...args: unknown[]) => {
    const callback = panel.props(name) as (...values: unknown[]) => unknown

    return callback(...args)
  }

  wrapper.findComponent({ name: 'NavigationRailStub' }).vm.$emit('openDevPanel')
  callProp('setManifestUrl', 'http://extension.test/extension/demo')
  callProp('setMode', 'page')
  callProp('setPageCode', 'returns')

  const firstApply = callProp('applyLaunchConfig') as Promise<void>
  const secondApply = callProp('applyLaunchConfig') as Promise<void>

  await wrapper.vm.$nextTick()
  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledOnce()
  expect(panel.props('applyingLaunchConfig')).toBe(true)

  rejectSource(new Error('manifest unavailable'))
  await Promise.all([firstApply, secondApply])
  await wrapper.vm.$nextTick()

  expect(alertSpy).toHaveBeenCalledWith(
    'Не удалось запустить расширение\n\nmanifest unavailable'
  )
  expect(panel.props('applyingLaunchConfig')).toBe(false)
  expect(wrapper.findComponent({ name: 'UiModalSidebar' }).props('opened')).toBe(true)
  expect(fakeWorkers).toHaveLength(0)
})

test('reports worker error event and non-error manifest rejection', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  workerReadyMode = 'worker-error'
  resolveSandboxExtensionSourceMock.mockResolvedValueOnce(createExtensionSource())
  await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nworker crashed'
    )
  })

  app?.unmount()
  app = null
  resolveSandboxExtensionSourceMock.mockRejectedValueOnce('manifest unavailable')
  await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nmanifest unavailable'
    )
  })
})

test('continues runtime disposal when release fails', async () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const endpoint = createEndpoint()

  endpoint.call.release.mockRejectedValueOnce(new Error('release failed'))
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource())

  const { wrapper } = await mountAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget',
    endpoint
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledTimes(2)
  })

  wrapper.unmount()
  app = null

  await waitFor(() => {
    expect(warnSpy).toHaveBeenCalledWith(
      '[sandbox:manifest] Failed to release extension runtime',
      expect.any(Error)
    )
    expect(endpoint.terminate).toHaveBeenCalledOnce()
  })
})

test('ignores malformed stored launch notice', async () => {
  window.sessionStorage.setItem('v1-sandbox:launch-notice', '{')

  const { wrapper } = await mountAppWithRuntime('/?manifestUrl=&mode=widget')

  expect(window.sessionStorage.getItem('v1-sandbox:launch-notice')).toBeNull()
  expect(wrapper.text()).not.toContain('Режим страницы выбран автоматически')
})

test('shows stored inferred page mode notice', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  window.sessionStorage.setItem('v1-sandbox:launch-notice', JSON.stringify({
    pageCode: 'settings',
    type: 'inferred-page-mode',
  }))

  await mountAppWithRuntime('/?manifestUrl=&mode=page&pageCode=settings')

  expect(alertSpy).toHaveBeenCalledWith(
    'Режим страницы выбран автоматически\n\nВ ссылке не был указан режим. Песочница нашла страницу «settings» в расширении и переключила запуск в режим «Страница».'
  )
})

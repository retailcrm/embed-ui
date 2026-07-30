import type SandboxApp from '@/app/App.vue'
import type { SandboxExtensionSource } from '@/scenario/manifest'

import type * as HostComponents from '@retailcrm/embed-ui-v1-components/host'

import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { waitFor, within } from '@testing-library/vue'

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
let App: typeof SandboxApp
let renderedApp: ReturnType<typeof render> | null = null
let currentEndpoint: FakeEndpoint
let workerReadyMode: WorkerReadyMode = 'ready'

vi.mock('@/scenario/manifest', () => ({
  resolveSandboxExtensionSource: resolveSandboxExtensionSourceMock,
}))

vi.mock('@remote-ui/rpc', () => ({
  createEndpoint: createEndpointMock,
  fromWebWorker: fromWebWorkerMock,
}))

vi.mock('@retailcrm/embed-ui-v1-components/host', async (importOriginal) => {
  const actual = await importOriginal<typeof HostComponents>()
  const { defineComponent, h } = await import('vue')

  return {
    ...actual,
    UiModalSidebar: defineComponent({
      inheritAttrs: false,
      name: 'UiModalSidebar',
      props: {
        id: {
          default: undefined,
          type: String,
        },
        opened: {
          required: true,
          type: Boolean,
        },
      },
      setup: (props, { attrs, slots }) => () => props.opened
        ? h('div', {
          ...attrs,
          id: props.id,
          role: 'dialog',
        }, [
          slots.title?.(),
          slots.default?.(),
        ])
        : null,
    }),
  }
})

vi.mock('@omnicajs/vue-remote/host', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    HostedTree: defineComponent({
      name: 'HostedTree',
      setup: (_props, { expose }) => {
        expose({
          forceUpdate: forceUpdateMock,
        })

        return () => h('div')
      },
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
    'order-readonly-error': {},
    'order-with-delivery': {},
  },
  isOrderSandboxFixtureCode: (fixture: string) => [
    'order-basic',
    'order-readonly-error',
    'order-with-delivery',
  ].includes(fixture),
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

beforeAll(async () => {
  App = (await import('@/app/App.vue')).default
})

const renderAppWithRuntime = (query: string, endpoint = createEndpoint()) => {
  currentEndpoint = endpoint
  createEndpointMock.mockReturnValue(currentEndpoint)
  window.history.replaceState(null, '', query)

  renderedApp = render(App, {
    global: {
      plugins: [createTestI18n()],
    },
  })

  return {
    endpoint: currentEndpoint,
    ...renderedApp,
  }
}

afterEach(async () => {
  renderedApp?.unmount()
  renderedApp = null
  cleanup()
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

const openDevPanel = async (): Promise<HTMLElement> => {
  const openButton = screen.getByRole('button', {
    name: 'Открыть управление песочницей',
  })

  await fireEvent.click(openButton)
  await waitFor(() => {
    expect(openButton.getAttribute('aria-expanded')).toBe('true')
  })

  return screen.findByRole('dialog', {
    name: 'Управление песочницей',
  })
}

const selectOption = async (
  container: HTMLElement,
  label: string,
  option: string
) => {
  const combobox = label === 'Места встраивания виджетов'
    ? within(container).getByPlaceholderText('Выберите места встраивания')
    : within(container).getByRole('combobox', { name: label })

  await fireEvent.click(combobox)
  await fireEvent.click(screen.getByRole('option', { name: option }))
}

const configurePageLaunch = async (
  dialog: HTMLElement,
  manifestUrl: string,
  pageCode: string
) => {
  await fireEvent.update(within(dialog).getByRole('textbox', {
    name: 'Манифест / URL расширения',
  }), manifestUrl)
  await selectOption(dialog, 'Режим', 'Страница')
  await fireEvent.update(within(dialog).getByRole('textbox', {
    name: 'Код страницы',
  }), pageCode)
}

test('toggles the navigation sidebar', async () => {
  await renderAppWithRuntime('/?manifestUrl=&mode=widget')
  const collapseButton = screen.getByRole('button', {
    name: 'Свернуть боковую панель',
  })

  expect(collapseButton.getAttribute('aria-expanded')).toBe('true')

  await fireEvent.click(collapseButton)

  expect(screen.getByRole('button', {
    name: 'Развернуть боковую панель',
  }).getAttribute('aria-expanded')).toBe('false')
})

test('shows the applied fixture and targets in widget mode', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource())

  await renderAppWithRuntime(
    '/?fixture=order-with-delivery'
    + '&manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo'
    + '&mode=widget'
    + '&targets=order%2Fcard%3Acommon.before%2Corder%2Fcard%3Acommon.after'
  )
  const summary = await screen.findByRole('region', {
    name: 'Текущий запуск',
  })
  const targets = within(summary).getByRole('list', {
    name: 'Места встраивания',
  })

  expect(within(summary).getByText('Заказ с доставкой')).toBeInstanceOf(HTMLElement)
  expect(within(targets).getByText('order/card:common.before')).toBeInstanceOf(HTMLElement)
  expect(within(targets).getByText('order/card:common.after')).toBeInstanceOf(HTMLElement)

  const dialog = await openDevPanel()

  await selectOption(dialog, 'Фикстура', 'Базовый заказ')
  await selectOption(dialog, 'Места встраивания виджетов', 'order/card:common.before')

  expect(within(summary).getByText('Заказ с доставкой')).toBeInstanceOf(HTMLElement)
  expect(within(targets).getByText('order/card:common.before')).toBeInstanceOf(HTMLElement)
  expect(within(targets).getByText('order/card:common.after')).toBeInstanceOf(HTMLElement)
})

test('does not show the widget run summary on onboarding', async () => {
  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  expect(screen.queryByRole('region', {
    name: 'Текущий запуск',
  })).toBeNull()
})

test('does not show the widget run summary in page mode', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  await renderAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo'
    + '&mode=page'
    + '&pageCode=settings'
  )

  expect(screen.queryByRole('region', {
    name: 'Текущий запуск',
  })).toBeNull()
  expect(await screen.findByRole('region', {
    name: 'Страница расширения: settings',
  })).toBeInstanceOf(HTMLElement)
})

test('blocks page extension with unknown page code', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['settings'],
    targets: [],
  }))

  const { endpoint } = await renderAppWithRuntime(
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

  const { endpoint } = await renderAppWithRuntime(
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

  const { endpoint } = await renderAppWithRuntime(
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
  await renderAppWithRuntime(
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

  const { endpoint } = await renderAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=page&pageCode=settings'
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledOnce()
  })

  const dialog = await openDevPanel()
  const contextEditor = within(dialog).getByRole('textbox', {
    name: 'JSON контекста',
  })

  await fireEvent.update(contextEditor, JSON.stringify({
    settings: {
      'system.locale': 'en-GB',
    },
  }))
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Применить контекст',
  }))

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledTimes(2)
  })

  expect(disposeContextSubscriptionsMock).toHaveBeenCalledOnce()
  expect(patchContextMock).toHaveBeenCalledWith('settings', {
    'system.locale': 'en-GB',
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

  const { endpoint, unmount } = await renderAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=page&pageCode=settings'
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledOnce()
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

  await fireEvent.click(screen.getByRole('region', {
    name: 'Область расширения',
  }))

  unmount()
  renderedApp = null

  await waitFor(() => {
    expect(endpoint.call.release).toHaveBeenCalledOnce()
    expect(endpoint.terminate).toHaveBeenCalledOnce()
    expect(fakeWorkers[0]?.terminate).toHaveBeenCalledOnce()
    expect(stylesheet?.isConnected).toBe(false)
  })
})

test('updates dev panel fields and reports validation errors', async () => {
  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()
  const applyButton = within(dialog).getByRole('button', {
    name: 'Применить',
  }) as HTMLButtonElement
  const manifestInput = within(dialog).getByRole('textbox', {
    name: 'Манифест / URL расширения',
  })

  expect(applyButton.disabled).toBe(true)

  await fireEvent.update(manifestInput, 'http://extension.test/extension/demo')
  await selectOption(dialog, 'Режим', 'Страница')

  const pageCodeInput = within(dialog).getByRole('textbox', {
    name: 'Код страницы',
  }) as HTMLInputElement

  expect(pageCodeInput.value).toBe('')

  await fireEvent.update(pageCodeInput, 'settings_2')

  expect(pageCodeInput.value).toBe('settings_2')
  expect(within(dialog).getByRole('alert').textContent).toBe(
    'Код страницы может содержать только латинские буквы (A–Z, a–z) и дефисы.'
  )
  expect(applyButton.disabled).toBe(true)

  await fireEvent.update(pageCodeInput, 'orders-settings')

  expect(within(dialog).queryByRole('alert')).toBeNull()
  expect(applyButton.disabled).toBe(false)

  const contextEditor = within(dialog).getByRole('textbox', {
    name: 'JSON контекста',
  })
  const applyContextButton = within(dialog).getByRole('button', {
    name: 'Применить контекст',
  })

  await fireEvent.update(contextEditor, '{')
  await fireEvent.click(applyContextButton)

  expect(within(dialog).getByRole('alert').textContent).toBe(
    'Введите валидный JSON. Ошибка в строке 1, столбце 2.'
  )

  await fireEvent.update(contextEditor, '{}')

  expect(within(dialog).queryByRole('alert')).toBeNull()

  await fireEvent.update(contextEditor, '{"settings":[]}')
  await fireEvent.click(applyContextButton)

  expect(within(dialog).getByRole('alert').textContent).toBe(
    'Контекст «settings» должен быть JSON-объектом.'
  )

  await fireEvent.update(contextEditor, '{"unknown":{}}')
  await fireEvent.click(applyContextButton)

  expect(within(dialog).getByRole('alert').textContent).toBe(
    'Неизвестный контекст «unknown».'
  )
})

test('formats, resets and downloads context json without applying it', async () => {
  const clickedAnchors: HTMLAnchorElement[] = []
  const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:context-json')
  const revokeObjectUrlSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  const anchorClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    clickedAnchors.push(this)
  })
  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()
  const contextEditor = within(dialog).getByRole('textbox', {
    name: 'JSON контекста',
  }) as HTMLTextAreaElement

  await fireEvent.update(contextEditor, '{')
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Форматировать',
  }))

  expect(contextEditor.value).toBe('{')
  expect(within(dialog).getByRole('alert').textContent).toBe(
    'Введите валидный JSON. Ошибка в строке 1, столбце 2.'
  )

  await fireEvent.update(contextEditor, '{"settings":{"system.locale":"en-GB"}}')
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Форматировать',
  }))

  expect(contextEditor.value).toBe(`{
  "settings": {
    "system.locale": "en-GB"
  }
}`)
  expect(patchContextMock).not.toHaveBeenCalled()

  await selectOption(dialog, 'Фикстура', 'Заказ с доставкой')
  await fireEvent.update(contextEditor, '{}')
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Сбросить',
  }))

  const resetContext = JSON.parse(contextEditor.value) as {
    'order/card': Record<string, unknown>;
  }

  expect(resetContext['order/card']['delivery.address'])
    .toBe('Москва, ул. Ленина, 10')
  expect((within(dialog).getByRole('button', {
    name: 'Применить контекст',
  }) as HTMLButtonElement).disabled).toBe(false)
  expect(patchContextMock).not.toHaveBeenCalled()

  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Скачать JSON',
  }))

  expect(createObjectUrlSpy).toHaveBeenCalledOnce()
  const downloadedBlob = createObjectUrlSpy.mock.calls[0]?.[0]

  expect(downloadedBlob).toBeInstanceOf(Blob)
  const downloadedText = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('error', () => reject(reader.error))
    reader.addEventListener('load', () => resolve(String(reader.result)))
    reader.readAsText(downloadedBlob as Blob)
  })

  expect(downloadedText).toBe(contextEditor.value)
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

  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()

  await configurePageLaunch(
    dialog,
    'http://extension.test/extension/demo',
    'returns'
  )
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Применить',
  }))

  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledOnce()
  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledWith(expect.objectContaining({
    manifestUrl: 'http://extension.test/extension/demo',
    mode: 'page',
    pageCode: 'returns',
  }))
  expect(await within(dialog).findByRole('alert')).toHaveProperty(
    'textContent',
    'В расширении нет страницы «returns». Доступные страницы: settings.'
  )
  expect(screen.getByRole('dialog', {
    name: 'Управление песочницей',
  })).toBeInstanceOf(HTMLElement)
  expect(fakeWorkers).toHaveLength(0)
  expect(window.location.search).toBe('?manifestUrl=&mode=widget')

  const pageCodeInput = within(dialog).getByRole('textbox', {
    name: 'Код страницы',
  })

  await fireEvent.update(pageCodeInput, 'settings')
  expect(within(dialog).queryByRole('alert')).toBeNull()

  await fireEvent.update(pageCodeInput, 'returns')
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Применить',
  }))
  await within(dialog).findByRole('alert')
  await fireEvent.update(within(dialog).getByRole('textbox', {
    name: 'Манифест / URL расширения',
  }), 'http://extension.test/extension/changed')

  expect(within(dialog).queryByRole('alert')).toBeNull()

  await fireEvent.click(within(dialog).getByRole('combobox', { name: 'Режим' }))
  await fireEvent.click(screen.getByRole('option', { name: 'Виджеты' }))

  expect(within(dialog).queryByRole('alert')).toBeNull()
})

test('shows an empty available pages marker when extension has no pages', async () => {
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: [],
    targets: [],
  }))

  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()

  await configurePageLaunch(
    dialog,
    'http://extension.test/extension/demo',
    'returns'
  )
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Применить',
  }))

  expect(await within(dialog).findByRole('alert')).toHaveProperty(
    'textContent',
    'В расширении нет страницы «returns». Доступные страницы: —.'
  )
  expect(screen.getByRole('dialog', {
    name: 'Управление песочницей',
  })).toBeInstanceOf(HTMLElement)
})

test('closes dev panel after successful page preflight without starting worker', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  resolveSandboxExtensionSourceMock.mockResolvedValue(createExtensionSource({
    pages: ['returns', 'settings'],
    targets: [],
  }))

  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()

  await configurePageLaunch(
    dialog,
    'http://extension.test/extension/demo',
    'returns'
  )
  await fireEvent.click(within(dialog).getByRole('button', {
    name: 'Применить',
  }))

  await waitFor(() => {
    expect(screen.queryByRole('dialog', {
      name: 'Управление песочницей',
    })).toBeNull()
  })
  expect(fakeWorkers).toHaveLength(0)
})

test('keeps dev panel open on page preflight failure and ignores repeated apply', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
  let rejectSource: (error: Error) => void = () => {}
  const pendingSource = new Promise<SandboxExtensionSource>((_resolve, reject) => {
    rejectSource = reject
  })

  resolveSandboxExtensionSourceMock.mockReturnValue(pendingSource)

  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  const dialog = await openDevPanel()

  await configurePageLaunch(
    dialog,
    'http://extension.test/extension/demo',
    'returns'
  )
  const applyButton = within(dialog).getByRole('button', {
    name: 'Применить',
  }) as HTMLButtonElement

  await fireEvent.click(applyButton)
  await fireEvent.click(applyButton)

  expect(resolveSandboxExtensionSourceMock).toHaveBeenCalledOnce()
  expect(applyButton.disabled).toBe(true)

  rejectSource(new Error('manifest unavailable'))

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nmanifest unavailable'
    )
    expect(applyButton.disabled).toBe(false)
  })
  expect(screen.getByRole('dialog', {
    name: 'Управление песочницей',
  })).toBeInstanceOf(HTMLElement)
  expect(fakeWorkers).toHaveLength(0)
})

test('reports worker error event and non-error manifest rejection', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  workerReadyMode = 'worker-error'
  resolveSandboxExtensionSourceMock.mockResolvedValueOnce(createExtensionSource())
  const firstRender = await renderAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget'
  )

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith(
      'Не удалось запустить расширение\n\nworker crashed'
    )
  })

  firstRender.unmount()
  renderedApp = null
  cleanup()
  resolveSandboxExtensionSourceMock.mockRejectedValueOnce('manifest unavailable')
  await renderAppWithRuntime(
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

  const { unmount } = await renderAppWithRuntime(
    '/?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fdemo&mode=widget',
    endpoint
  )

  await waitFor(() => {
    expect(endpoint.call.run).toHaveBeenCalledTimes(2)
  })

  unmount()
  renderedApp = null

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

  await renderAppWithRuntime('/?manifestUrl=&mode=widget')

  expect(window.sessionStorage.getItem('v1-sandbox:launch-notice')).toBeNull()
  expect(screen.queryByText('Режим страницы выбран автоматически')).toBeNull()
})

test('shows stored inferred page mode notice', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  window.sessionStorage.setItem('v1-sandbox:launch-notice', JSON.stringify({
    pageCode: 'settings',
    type: 'inferred-page-mode',
  }))

  await renderAppWithRuntime('/?manifestUrl=&mode=page&pageCode=settings')

  expect(alertSpy).toHaveBeenCalledWith(
    'Режим страницы выбран автоматически\n\nВ ссылке не был указан режим. Песочница нашла страницу «settings» в расширении и переключила запуск в режим «Страница».'
  )
})

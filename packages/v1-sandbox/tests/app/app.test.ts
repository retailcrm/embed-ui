import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'
import type { SandboxExtensionSource } from '@/dev/types'

import { afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { test, vi } from 'vitest'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

type MountOptions<T extends Component> = ComponentMountingOptions<T>

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

const mountWithApp = <T extends Component>(
  component: T,
  options: MountOptions<T> = {}
) => mount(component, {
    ...options,
    global: {
      ...(options.global ?? {}),
      plugins: [
        createTestI18n(),
        ...(options.global?.plugins ?? []),
      ],
      stubs: {
        UiButton: {
          emits: ['click'],
          props: ['ariaControls', 'ariaExpanded', 'disabled'],
          template: `
            <button
              :aria-controls="ariaControls"
              :aria-expanded="ariaExpanded"
              :disabled="disabled"
              type="button"
              v-bind="$attrs"
              @click="$emit('click', $event)"
            >
              <slot />
            </button>
          `,
        },
        UiModalSidebar: {
          emits: ['update:opened'],
          props: ['ariaLabel', 'id', 'opened', 'role'],
          template: `
            <section
              v-if="opened"
              :id="id"
              :aria-label="ariaLabel"
              :role="role || 'dialog'"
            >
              <slot name="title" />
              <slot />
              <button aria-label="close modal sidebar" type="button" @click="$emit('update:opened', false)">close</button>
            </section>
          `,
        },
        ...(options.global?.stubs ?? {}),
      },
    },
  })

const createAppStubs = () => ({
  DevPanel: {
    props: [
      'applyLaunchConfig',
      'applyContextJson',
      'contextJson',
      'open',
      'setManifestUrl',
      'setContextJson',
      'validationErrors',
    ],
    template: `
      <section aria-label="dev panel stub">
        <input
          aria-label="manifest url"
          @input="setManifestUrl($event.target.value)"
        />
        <textarea
          aria-label="context editor"
          :value="contextJson"
          @input="setContextJson($event.target.value)"
        />
        <button aria-label="apply context" type="button" @click="applyContextJson">apply context</button>
        <button aria-label="apply launch" type="button" @click="applyLaunchConfig">apply launch</button>
        <p v-if="validationErrors?.contextJson" role="alert">{{ validationErrors.contextJson }}</p>
        <p v-if="validationErrors?.manifestUrl" role="alert">{{ validationErrors.manifestUrl }}</p>
      </section>
    `,
  },
  ExtensionOnboarding: {
    props: ['openDevPanel'],
    template: `
      <section aria-label="onboarding stub" role="region">
        <button type="button" @click="openDevPanel">open controls</button>
      </section>
    `,
  },
  PageMount: {
    props: ['mount'],
    template: '<section aria-label="page mount stub" role="region">{{ mount.label }}</section>',
  },
  SandboxRail: {
    emits: ['openDevPanel'],
    props: ['devPanelControlsId', 'devPanelOpen'],
    template: `
      <nav :aria-controls="devPanelControlsId" :aria-expanded="devPanelOpen">
        <button type="button" @click="$emit('openDevPanel')">open from rail</button>
      </nav>
    `,
  },
  SandboxSidebar: {
    props: ['id', 'open'],
    template: '<aside :id="id" :data-open="String(open)"><nav /></aside>',
  },
  WidgetMounts: {
    props: ['mounts'],
    template: '<section aria-label="widget mounts stub" role="region">{{ mounts.length }}</section>',
  },
})

const loadApp = async (search = '', resetModules = true): Promise<Component> => {
  if (resetModules) {
    vi.resetModules()
  }

  window.history.pushState({}, '', `/${search}`)

  return (await import('@/app/App.vue')).default
}

const mountApp = async (search = '', resetModules = true) => mountWithApp(await loadApp(search, resetModules), {
  global: {
    stubs: createAppStubs(),
  },
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  window.sessionStorage.clear()
  document.head.querySelectorAll('[data-sandbox-extension-stylesheet]').forEach(element => element.remove())
  document.body.querySelectorAll('iframe').forEach(element => element.remove())
})

test('app shows onboarding, toggles sidebar and opens controls drawer', async () => {
  const wrapper = await mountApp()

  expect(wrapper.get('[role="region"][aria-label="onboarding stub"]').exists()).toBe(true)
  expect(wrapper.get('[role="status"]').text()).toBe('Виджеты: 2')

  await wrapper.get('button[aria-label="Свернуть боковую панель"]').trigger('click')

  expect(wrapper.get('aside').attributes('data-open')).toBe('false')
  expect(wrapper.get('button[aria-label="Развернуть боковую панель"]').exists()).toBe(true)

  await wrapper.get('button').trigger('click')

  expect(wrapper.get('[role="dialog"]').attributes('aria-label')).toBe('Управление песочницей')

  await wrapper.get('button[aria-label="close modal sidebar"]').trigger('click')

  expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
}, 10_000)

test('app validates context json before applying overrides', async () => {
  const wrapper = await mountApp()

  await wrapper.get('button').trigger('click')
  await wrapper.get('textarea[aria-label="context editor"]').setValue('[]')
  await wrapper.get('button[aria-label="apply context"]').trigger('click')

  expect(wrapper.get('[role="alert"]').text()).toBe('Переопределения контекста должны быть JSON-объектом.')
})

test('app validates launch config before updating URL', async () => {
  const wrapper = await mountApp()
  const currentUrl = window.location.href

  await wrapper.get('button').trigger('click')
  await wrapper.get('input[aria-label="manifest url"]').setValue('extension.test/module')
  await wrapper.get('button[aria-label="apply launch"]').trigger('click')

  expect(window.location.href).toBe(currentUrl)
  expect(wrapper.get('[role="alert"]').text()).toBe('Введите абсолютный http/https URL или оставьте поле пустым.')
})

test('app blocks page launch when descriptor does not contain requested page', async () => {
  const alert = vi.fn()
  const worker = vi.fn()
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/page',
      pages: ['settings'],
      runner: 'worker',
      stylesheet: null,
      targets: [],
      uuid: 'page',
    },
    entrypoint: new URL('http://extension.test/page'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/page',
  }

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  vi.stubGlobal('Worker', worker)
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fpage&mode=page&pageCode=returns',
    false
  )
  await flushPromises()

  expect(alert).toHaveBeenCalledWith(
    'Страница расширения не найдена\n\nВ расширении нет страницы "returns". Доступные страницы: settings.'
  )
  expect(worker).not.toHaveBeenCalled()
})

test('app mounts worker extension and reapplies context overrides', async () => {
  const run = vi.fn(async () => undefined)
  const release = vi.fn(async () => undefined)
  const endpointTerminate = vi.fn()
  const expose = vi.fn()
  const workerTerminate = vi.fn()
  const workers: Array<{
    terminate: ReturnType<typeof vi.fn>;
  }> = []
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/widget',
      pages: [],
      runner: 'worker',
      stylesheet: 'http://extension.test/widget/stylesheet',
      targets: ['order/card:common.after'],
      uuid: 'widget',
    },
    entrypoint: new URL('http://extension.test/widget'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/widget',
  }

  vi.resetModules()
  vi.stubGlobal('alert', vi.fn())
  vi.stubGlobal('Worker', class extends EventTarget {
    terminate = workerTerminate

    constructor() {
      super()
      workers.push(this)
      queueMicrotask(() => {
        this.dispatchEvent(new MessageEvent('message', {
          data: {
            type: 'sandbox:extension-worker-ready',
          },
        }))
      })
    }
  })
  vi.doMock('@remote-ui/rpc', () => ({
    createEndpoint: () => ({
      call: {
        release,
        run,
      },
      expose,
      terminate: endpointTerminate,
    }),
    fromIframe: vi.fn(() => ({})),
    fromWebWorker: vi.fn(() => ({})),
  }))
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  const wrapper = await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fwidget&targets=order%2Fcard%3Acommon.after',
    false
  )

  await flushPromises()

  expect(run).toHaveBeenCalledWith(expect.any(Function), {
    id: 'sandbox-widget:order-card-common-after',
    target: 'order/card:common.after',
  })
  expect(expose).toHaveBeenCalled()
  expect(document.head.querySelector('[href="http://extension.test/widget/stylesheet"]')).toBeTruthy()
  expect(workers).toHaveLength(1)

  await wrapper.get('button').trigger('click')

  const context = JSON.parse(wrapper.get('textarea[aria-label="context editor"]').element.value) as {
    'order/card': {
      number: string;
    };
  }

  context['order/card'].number = '999C'

  await wrapper.get('textarea[aria-label="context editor"]').setValue(JSON.stringify(context))
  await wrapper.get('button[aria-label="apply context"]').trigger('click')
  await flushPromises()

  expect(release).toHaveBeenCalled()
  expect(run).toHaveBeenCalledTimes(2)
  expect(wrapper.get('textarea[aria-label="context editor"]').element.value).toContain('"number": "999C"')

  wrapper.unmount()
  await flushPromises()

  expect(endpointTerminate).toHaveBeenCalledTimes(2)
  expect(workerTerminate).toHaveBeenCalledTimes(2)
})

test('app reports runtime errors from extension source resolution', async () => {
  const alert = vi.fn()

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => {
      throw new Error('manifest unavailable')
    }),
  }))

  await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fbroken',
    false
  )
  await flushPromises()

  expect(alert).toHaveBeenCalledWith(
    'Не удалось запустить расширение\n\nmanifest unavailable'
  )
})

test('app blocks iframe runner in page mode', async () => {
  const alert = vi.fn()
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/legacy',
      pages: ['returns'],
      runner: 'iframe',
      stylesheet: null,
      targets: [],
      uuid: 'legacy',
    },
    entrypoint: new URL('http://extension.test/legacy'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/legacy',
  }

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Flegacy&mode=page&pageCode=returns',
    false
  )
  await flushPromises()

  expect(alert).toHaveBeenCalledWith(
    'Неверный режим запуска\n\nЭто legacy iframe-расширение поддерживает только widget targets. Выберите режим виджетов или подключите worker-compatible page extension.'
  )
  expect(document.body.querySelector('iframe')).toBeNull()
})

test('app mounts iframe widget and disposes it on unmount', async () => {
  const alert = vi.fn()
  const run = vi.fn(async () => undefined)
  const release = vi.fn(async () => undefined)
  const endpointTerminate = vi.fn()
  const expose = vi.fn()
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/legacy-widget',
      pages: [],
      runner: 'iframe',
      stylesheet: null,
      targets: ['order/card:common.before'],
      uuid: 'legacy-widget',
    },
    entrypoint: new URL('http://extension.test/legacy-widget'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/legacy-widget',
  }

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  const createElement = document.createElement.bind(document)

  vi.spyOn(document, 'createElement').mockImplementation((tagName, options) => {
    const element = createElement(tagName, options)

    if (tagName.toLowerCase() === 'iframe') {
      Object.defineProperty(element, 'sandbox', {
        value: {
          add: vi.fn(),
        },
      })
    }

    return element
  })
  vi.doMock('@remote-ui/rpc', () => ({
    createEndpoint: () => ({
      call: {
        release,
        run,
      },
      expose,
      terminate: endpointTerminate,
    }),
    fromIframe: vi.fn(() => ({})),
    fromWebWorker: vi.fn(() => ({})),
  }))
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  const wrapper = await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Flegacy-widget&mode=widget&targets=order%2Fcard%3Acommon.before',
    false
  )

  await flushPromises()

  const iframe = document.body.querySelector('iframe')

  expect(alert).not.toHaveBeenCalled()
  expect(iframe?.src).toBe('http://extension.test/legacy-widget')
  expect(iframe?.title).toBe('sandbox:legacy-widget')
  expect(expose).toHaveBeenCalled()
  expect(run).toHaveBeenCalledWith(expect.any(Function), 'order/card:common.before')

  wrapper.unmount()
  await flushPromises()

  expect(release).toHaveBeenCalledWith()
  expect(endpointTerminate).toHaveBeenCalled()
  expect(document.body.querySelector('iframe')).toBeNull()
})

test('app warns when page extension is launched explicitly as widget', async () => {
  const alert = vi.fn()
  const run = vi.fn(async () => undefined)
  const release = vi.fn(async () => undefined)
  const endpointTerminate = vi.fn()
  const workerTerminate = vi.fn()
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/page-as-widget',
      pages: ['returns'],
      runner: 'worker',
      stylesheet: null,
      targets: [],
      uuid: 'page-as-widget',
    },
    entrypoint: new URL('http://extension.test/page-as-widget'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/page-as-widget',
  }

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  vi.stubGlobal('Worker', class extends EventTarget {
    terminate = workerTerminate

    constructor() {
      super()
      queueMicrotask(() => {
        this.dispatchEvent(new MessageEvent('message', {
          data: {
            type: 'sandbox:extension-worker-ready',
          },
        }))
      })
    }
  })
  vi.doMock('@remote-ui/rpc', () => ({
    createEndpoint: () => ({
      call: {
        release,
        run,
      },
      expose: vi.fn(),
      terminate: endpointTerminate,
    }),
    fromIframe: vi.fn(() => ({})),
    fromWebWorker: vi.fn(() => ({})),
  }))
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  const wrapper = await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Fpage-as-widget&mode=widget&targets=order%2Fcard%3Acommon.after',
    false
  )

  await flushPromises()

  expect(alert).toHaveBeenCalledWith(
    'Проверьте режим запуска\n\nРасширение содержит страницы: returns. Сейчас выбран режим виджетов; если ожидается страница, переключите mode на page.'
  )
  expect(run).toHaveBeenCalledWith(expect.any(Function), {
    id: 'sandbox-widget:order-card-common-after',
    target: 'order/card:common.after',
  })

  wrapper.unmount()
  await flushPromises()

  expect(release).toHaveBeenCalled()
  expect(endpointTerminate).toHaveBeenCalled()
})

test('app reports worker bootstrap errors', async () => {
  const alert = vi.fn()
  const endpointTerminate = vi.fn()
  const workerTerminate = vi.fn()
  const extensionSource: SandboxExtensionSource = {
    descriptor: {
      entrypoint: 'http://extension.test/failing-worker',
      pages: [],
      runner: 'worker',
      stylesheet: null,
      targets: ['order/card:common.after'],
      uuid: 'failing-worker',
    },
    entrypoint: new URL('http://extension.test/failing-worker'),
    httpBaseUrl: 'http://extension.test',
    manifestUrl: 'http://extension.test/failing-worker',
  }

  vi.resetModules()
  vi.stubGlobal('alert', alert)
  vi.stubGlobal('Worker', class extends EventTarget {
    terminate = workerTerminate

    constructor() {
      super()
      queueMicrotask(() => {
        this.dispatchEvent(new MessageEvent('message', {
          data: {
            error: 'bootstrap failed',
            type: 'sandbox:extension-worker-error',
          },
        }))
      })
    }
  })
  vi.doMock('@remote-ui/rpc', () => ({
    createEndpoint: () => ({
      call: {
        release: vi.fn(),
        run: vi.fn(),
      },
      expose: vi.fn(),
      terminate: endpointTerminate,
    }),
    fromIframe: vi.fn(() => ({})),
    fromWebWorker: vi.fn(() => ({})),
  }))
  vi.doMock('@/dev/manifest', () => ({
    resolveSandboxExtensionSource: vi.fn(async () => extensionSource),
  }))

  await mountApp(
    '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Ffailing-worker&targets=order%2Fcard%3Acommon.after',
    false
  )
  await flushPromises()

  expect(endpointTerminate).toHaveBeenCalled()
  expect(workerTerminate).toHaveBeenCalled()
  expect(alert).toHaveBeenCalledWith(
    'Не удалось запустить расширение\n\nbootstrap failed'
  )
})

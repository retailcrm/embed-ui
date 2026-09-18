import type { SandboxLaunchBridgeHost } from '@/automation/bridge'

import { afterEach, expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import { nextTick } from 'vue'
import { screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import { getSandboxLaunchBridge } from '@/automation/bridge'
import { mountSandbox } from '@/app/createSandbox'

let app: ReturnType<typeof mountSandbox> | null = null
let root: HTMLElement | null = null

const mountSandboxApp = () => {
  root = document.createElement('div')
  document.body.append(root)
  app = mountSandbox(root)

  return root
}

const readLaunchBridge = () => getSandboxLaunchBridge(window as SandboxLaunchBridgeHost)

afterEach(async () => {
  app?.unmount()
  root?.remove()
  app = null
  root = null
  document.body.innerHTML = ''
  await new Promise(resolve => window.setTimeout(resolve, 0))
  vi.restoreAllMocks()
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
  window.localStorage.clear()
})

test('mounts sandbox with default onboarding screen', () => {
  mountSandboxApp()

  expect(screen.getByRole('heading', {
    name: 'Подключите внешнее расширение',
  })).toBeInstanceOf(HTMLHeadingElement)
  expect(screen.getByRole('status').textContent).toBe('Виджеты: 2')
})

test('mounts sandbox into default app target', () => {
  root = document.createElement('div')
  root.id = 'app'
  document.body.append(root)
  app = mountSandbox()

  expect(screen.getByRole('heading', {
    name: 'Подключите внешнее расширение',
  })).toBeInstanceOf(HTMLHeadingElement)
})

test('toggles sandbox sidebar state', async () => {
  mountSandboxApp()

  const collapseButton = screen.getByRole('button', {
    name: 'Свернуть боковую панель',
  })

  expect(collapseButton.getAttribute('aria-expanded')).toBe('true')

  await fireEvent.click(collapseButton)
  await nextTick()

  const expandButton = screen.getByRole('button', {
    name: 'Развернуть боковую панель',
  })

  expect(expandButton.getAttribute('aria-expanded')).toBe('false')

  await fireEvent.click(expandButton)
  await nextTick()

  expect(screen.getByRole('button', {
    name: 'Свернуть боковую панель',
  }).getAttribute('aria-expanded')).toBe('true')
})

test('opens dev panel and validates launch config input', async () => {
  vi.spyOn(window, 'alert').mockImplementation(() => {})
  mountSandboxApp()

  await fireEvent.click(screen.getByRole('button', {
    name: 'Открыть управление песочницей',
  }))

  const dialog = await screen.findByRole('dialog', {
    name: 'Управление песочницей',
  })
  const applyButton = within(dialog).getByRole('button', {
    name: 'Применить',
  }) as HTMLButtonElement

  expect(applyButton.disabled).toBe(true)

  await fireEvent.click(within(dialog).getByRole('button', { name: 'JSON' }))
  const manifestInput = within(dialog).getByLabelText('JSON дескриптора') as HTMLTextAreaElement

  await fireEvent.update(manifestInput, 'http://extension.test/not-extension/id')
  await nextTick()

  expect(applyButton.disabled).toBe(false)

  await fireEvent.click(applyButton)

  expect((await within(dialog).findByRole('alert')).textContent?.trim())
    .toBe('Введите дескриптор с полями runner, entrypoint, stylesheet, pages и targets. Runner должен быть worker, адреса ресурсов — абсолютными HTTP(S)-адресами.')
})

test('installs and removes the launch bridge', () => {
  mountSandboxApp()

  const bridge = readLaunchBridge()

  expect(bridge).toBeDefined()
  expect(bridge?.getLaunchConfig()).toMatchObject({
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: 'orders-dashboard',
  })

  app?.unmount()
  app = null

  expect(readLaunchBridge()).toBeUndefined()
})

test('keeps context apply disabled without connected extension', async () => {
  mountSandboxApp()

  await fireEvent.click(screen.getByRole('button', {
    name: 'Открыть управление песочницей',
  }))

  const dialog = await screen.findByRole('dialog', {
    name: 'Управление песочницей',
  })

  const contextEditor = within(dialog).getByLabelText('JSON контекста текущего запуска') as HTMLTextAreaElement

  const context = JSON.parse(contextEditor.value) as {
    'order/card': {
      number: string;
    };
  }

  context['order/card'].number = '999C'

  await fireEvent.update(contextEditor, JSON.stringify(context))
  await nextTick()

  const applyContextButton = within(dialog).getByRole('button', {
    name: 'Применить контекст',
  }) as HTMLButtonElement

  expect(applyContextButton.disabled).toBe(true)
  expect(within(dialog).getByText('Расширение не подключено'))
    .toBeInstanceOf(HTMLElement)
})

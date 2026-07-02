import type { MountedSandbox } from '@/automation/browser'

import { afterEach } from 'vitest'
import { describe, expect } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import { screen } from '@testing-library/dom'
import { test, vi } from 'vitest'
import { waitFor } from '@testing-library/dom'
import { within } from '@testing-library/dom'

import { launchSandboxExtension } from '@/automation/browser'

declare const __SANDBOX_FIXTURE_BASE_URL__: string

const extensionUrl = new URL('/index.html', __SANDBOX_FIXTURE_BASE_URL__).href

let sandbox: MountedSandbox | null = null

const resetDocument = () => {
  sandbox?.unmount()
  sandbox = null
  document.body.innerHTML = ''
  document.head.querySelectorAll('[data-sandbox-extension-stylesheet="true"]').forEach(node => node.remove())
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
}

describe('sandbox fixture extension', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    resetDocument()
  })

  test('mounts fixture extension through sandbox bridge', async () => {
    const alerts: string[] = []

    vi.spyOn(window, 'alert').mockImplementation(message => {
      alerts.push(String(message))
    })

    sandbox = await launchSandboxExtension({
      fixture: 'order-basic',
      manifestUrl: extensionUrl,
      mode: 'widget',
      targets: ['order/card:common.after'],
    })

    const widgetMount = await screen.findByRole('region', {
      name: 'Цель виджета: order/card:common.after',
    }, {
      timeout: 15_000,
    })
    const widget = within(widgetMount)

    expect(await widget.findByText('Order fixture demo')).toBeInstanceOf(HTMLElement)
    expect(await widget.findByText('Order #215C')).toBeInstanceOf(HTMLElement)
    expect(await widget.findByText('Target: order/card:common.after')).toBeInstanceOf(HTMLElement)
    expect(await widget.findByRole('button', { name: 'Open order demo' })).toBeInstanceOf(HTMLButtonElement)
    expect(alerts).toEqual([])
  })

  test('restarts real worker extension after context json update', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    sandbox = await launchSandboxExtension({
      fixture: 'order-basic',
      manifestUrl: extensionUrl,
      mode: 'widget',
      targets: ['order/card:common.after'],
    })

    expect(await screen.findByText('Order #215C', {}, {
      timeout: 15_000,
    })).toBeInstanceOf(HTMLElement)

    fireEvent.click(screen.getByRole('button', {
      name: 'Открыть управление песочницей',
    }))

    const dialog = await screen.findByRole('dialog', {
      name: 'Управление песочницей',
    })
    const contextEditor = within(dialog).getByLabelText('Context JSON') as HTMLTextAreaElement
    const context = JSON.parse(contextEditor.value) as {
      'order/card': {
        number: string;
      };
    }

    context['order/card'].number = '999C'
    fireEvent.input(contextEditor, {
      target: {
        value: JSON.stringify(context),
      },
    })
    fireEvent.click(within(dialog).getByRole('button', {
      name: 'Применить контекст',
    }))

    expect(await screen.findByText('Order #999C', {}, {
      timeout: 15_000,
    })).toBeInstanceOf(HTMLElement)
    await waitFor(() => {
      expect(screen.queryByText('Order #215C')).toBeNull()
    })
  })
})

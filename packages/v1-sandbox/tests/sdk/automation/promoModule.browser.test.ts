import type { SandboxOrderTarget } from '@/scenario'
import type { SandboxWorkerRuntime } from '@/automation/browser'

import { afterEach, describe, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/dom'
import { test } from 'vitest'
import { within } from '@testing-library/dom'

import { createExtensionSourceWorker } from '@/automation/browser'
import { createSandboxWorkerRuntime } from '@/automation/browser'

import promoModuleDescriptor from '../../__fixtures__/extensions/promoModule/extensionrc.json'

let runtime: SandboxWorkerRuntime | null = null

describe('promoModule browser runtime', () => {
  afterEach(async () => {
    await runtime?.teardown()
    runtime = null
    document.body.innerHTML = ''
    window.history.replaceState(null, '', '/')
    window.sessionStorage.clear()
  })

  test('loads promo page extension settings', async () => {
    const sourceWorker = createPromoWorker()

    runtime = await createSandboxWorkerRuntime({
      descriptorUuid: promoModuleDescriptor.code,
      ready: sourceWorker.ready,
      worker: sourceWorker.worker,
    })

    await runtime.runPage('settings')

    expect(await screen.findByRole('heading', { name: 'Настройки акций' })).toBeInstanceOf(HTMLElement)
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInstanceOf(HTMLButtonElement)
    expect(screen.getByRole('button', { name: 'Предпросмотр' })).toBeInstanceOf(HTMLButtonElement)
    expect(screen.getByDisplayValue('Весенняя распродажа')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByDisplayValue('PROMO-2026')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByText('150000 ₽')).toBeInstanceOf(HTMLElement)
  })

  test('loads promo widget extension and opens order summary drawer', async () => {
    const sourceWorker = createPromoWorker()
    const target = promoModuleDescriptor.targets[0] as SandboxOrderTarget

    runtime = await createSandboxWorkerRuntime({
      descriptorUuid: promoModuleDescriptor.code,
      ready: sourceWorker.ready,
      worker: sourceWorker.worker,
    })

    await runtime.runWidget(target)

    const openPromos = await screen.findByRole('button', { name: 'Акции' })

    expect(openPromos).toBeInstanceOf(HTMLButtonElement)
    fireEvent.click(openPromos)

    const drawer = await screen.findByRole('dialog')

    expect(await within(drawer).findByText('Акции')).toBeInstanceOf(HTMLElement)
    expect(within(drawer).getByText('Номер заказа')).toBeInstanceOf(HTMLElement)
    expect(within(drawer).getByText('#215C')).toBeInstanceOf(HTMLElement)
    expect(within(drawer).getByText('3 товара в заказе')).toBeInstanceOf(HTMLElement)
  })
})

const createPromoWorker = () =>
  createExtensionSourceWorker(new URL('../../__fixtures__/extensions/promoModule/index.ts', import.meta.url))

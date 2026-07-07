import type { OrderSandboxSchemas } from '@/scenario/fixtures'
import type { ReturnRecord } from '../../__fixtures__/extensions/returnsModule/types'
import type { SandboxHostMiddleware, SandboxHttpCallRequest } from '@/core'
import type { SandboxWorkerRuntime } from '@/automation/browser'

import { afterEach, describe, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/dom'
import { test } from 'vitest'
import { waitFor, within } from '@testing-library/dom'

import { createExtensionSourceWorker } from '@/automation/browser'
import { createSandboxWorkerRuntime } from '@/automation/browser'

import returnsModuleDescriptor from '../../__fixtures__/extensions/returnsModule/extensionrc.json'
import { ReturnStatus } from '../../__fixtures__/extensions/returnsModule/enums'

type ReturnsPayload = {
  filters?: {
    amount?: string;
    date?: string;
    orderNumber?: string;
    status?: string;
  };
  page?: number;
  perPage?: number;
}

type ReturnPayload = {
  id?: number;
}

const returns: ReturnRecord[] = [
  {
    amount: 2270,
    date: '2026-03-16',
    id: 7001,
    items: [
      {
        name: 'Куртка Trail',
        price: 590,
        quantity: 1,
      },
      {
        name: 'Кроссовки Wave',
        price: 840,
        quantity: 2,
      },
    ],
    order: {
      amount: 2270,
      customer: 'Анна Смирнова',
      id: 1,
      items: [
        {
          name: 'Куртка Trail',
          price: 590,
          quantity: 1,
        },
        {
          name: 'Кроссовки Wave',
          price: 840,
          quantity: 2,
        },
      ],
      number: '100241',
    },
    status: ReturnStatus.New,
  },
  {
    amount: 1840,
    date: '2026-03-12',
    id: 7005,
    items: [
      {
        name: 'Фонарик Spark',
        price: 1840,
        quantity: 1,
      },
    ],
    order: {
      amount: 10540,
      customer: 'Виктория Соколова',
      id: 5,
      items: [
        {
          name: 'Фонарик Spark',
          price: 1840,
          quantity: 2,
        },
        {
          name: 'Набор наклеек Simla',
          price: 2090,
          quantity: 3,
        },
        {
          name: 'Куртка Trail',
          price: 590,
          quantity: 1,
        },
      ],
      number: '100245',
    },
    status: ReturnStatus.New,
  },
  {
    amount: 590,
    date: '2026-06-24',
    id: 7025,
    items: [
      {
        name: 'Куртка Trail',
        price: 590,
        quantity: 1,
      },
    ],
    order: {
      amount: 10540,
      customer: 'Виктория Соколова',
      id: 5,
      items: [
        {
          name: 'Фонарик Spark',
          price: 1840,
          quantity: 2,
        },
        {
          name: 'Набор наклеек Simla',
          price: 2090,
          quantity: 3,
        },
        {
          name: 'Куртка Trail',
          price: 590,
          quantity: 1,
        },
      ],
      number: '100245',
    },
    status: ReturnStatus.Approved,
  },
]

let runtime: SandboxWorkerRuntime | null = null

describe('returnsModule browser runtime', () => {
  afterEach(async () => {
    await runtime?.teardown()
    runtime = null
    document.body.innerHTML = ''
    window.history.replaceState(null, '', '/')
    window.sessionStorage.clear()
  })

  test('loads returns page extension, filters, opens and saves return', async () => {
    const sourceWorker = createReturnsWorker()

    runtime = await createSandboxWorkerRuntime({
      descriptorUuid: returnsModuleDescriptor.code,
      httpMiddleware: createReturnsHttpMiddleware(),
      ready: sourceWorker.ready,
      worker: sourceWorker.worker,
    })

    await runtime.runPage('returns')

    expect(await screen.findByText('Возвраты')).toBeInstanceOf(HTMLElement)
    expect(await screen.findByRole('heading', { name: 'Список возвратов' })).toBeInstanceOf(HTMLElement)
    expect(await screen.findByText('Найдено: 3')).toBeInstanceOf(HTMLElement)

    fireEvent.input(screen.getByPlaceholderText('Например 100245'), {
      target: {
        value: '100245',
      },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Применить' }))

    expect(await screen.findByText('Найдено: 2')).toBeInstanceOf(HTMLElement)
    expect(screen.getAllByText('№100245')).toHaveLength(2)

    fireEvent.click(screen.getAllByRole('button', { name: 'Открыть' })[0])

    const drawer = await screen.findByRole('dialog')

    expect(await within(drawer).findByText('Возврат #7005')).toBeInstanceOf(HTMLElement)
    expect(within(drawer).getByText('№100245')).toBeInstanceOf(HTMLElement)

    fireEvent.click(within(drawer).getByRole('button', { name: 'Сохранить' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    const snapshot = runtime.snapshot()
    const calls = snapshot.host.http

    expect(calls.some(call => call.action === '/return')).toBe(true)
    expect(calls.some(call => call.action === '/returns/save')).toBe(true)
    expect(calls.some(call => call.action === '/returns' && isFilteredReturnsPayload(call.payload))).toBe(true)
    expect(calls.every(call => call.uuid === returnsModuleDescriptor.code)).toBe(true)
  })
})

const createReturnsWorker = () =>
  createExtensionSourceWorker(new URL('../../__fixtures__/extensions/returnsModule/index.ts', import.meta.url))

const createReturnsHttpMiddleware = (): SandboxHostMiddleware<OrderSandboxSchemas> => {
  return async request => createJsonResponse(resolveReturnsRequest(request), getResponseStatus(request))
}

const resolveReturnsRequest = (request: SandboxHttpCallRequest): unknown => {
  if (request.action === '/returns') {
    const payload = parsePayload<ReturnsPayload>(request.payload)
    const page = payload.page ?? 1
    const perPage = payload.perPage ?? 8
    const filtered = filterReturns(payload)
    const offset = (page - 1) * perPage

    return {
      page,
      perPage,
      returns: filtered.slice(offset, offset + perPage),
      total: filtered.length,
    }
  }

  if (request.action === '/return') {
    const { id } = parsePayload<ReturnPayload>(request.payload)

    return {
      return: returns.find(item => item.id === id) ?? null,
    }
  }

  if (request.action === '/returns/save') {
    return {
      ok: true,
    }
  }

  return {
    error: `Unsupported action: ${request.action}`,
    ok: false,
  }
}

const getResponseStatus = (request: SandboxHttpCallRequest): number => {
  return [
    '/return',
    '/returns',
    '/returns/save',
  ].includes(request.action) ? 200 : 404
}

const createJsonResponse = (body: unknown, status: number) => ({
  body: JSON.stringify(body),
  status,
})

const parsePayload = <T extends object>(payload: SandboxHttpCallRequest['payload']): T => {
  if (typeof payload === 'string') {
    return JSON.parse(payload) as T
  }

  return (payload ?? {}) as T
}

const filterReturns = (payload: ReturnsPayload): ReturnRecord[] => {
  const filters = payload.filters ?? {}

  return returns.filter(item => {
    if (filters.orderNumber && !item.order.number.includes(filters.orderNumber)) {
      return false
    }

    if (filters.status && item.status !== filters.status) {
      return false
    }

    if (filters.amount && item.amount !== Number(filters.amount)) {
      return false
    }

    if (filters.date && item.date !== filters.date) {
      return false
    }

    return true
  })
}

const isFilteredReturnsPayload = (payload: SandboxHttpCallRequest['payload']): boolean => {
  const parsed = parsePayload<ReturnsPayload>(payload)

  return parsed.filters?.orderNumber === '100245'
}

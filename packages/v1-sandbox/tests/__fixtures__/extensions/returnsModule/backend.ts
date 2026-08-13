import type { ReturnRecord } from './types'

import { ReturnStatus } from './enums'

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

export type ExtensionBackendResponse = {
  body: unknown;
  status: number;
}

const returns: ReturnRecord[] = [
  {
    amount: 2270,
    date: '2026-03-16',
    id: 7001,
    items: [
      { name: 'Куртка Trail', price: 590, quantity: 1 },
      { name: 'Кроссовки Wave', price: 840, quantity: 2 },
    ],
    order: {
      amount: 2270,
      customer: 'Анна Смирнова',
      id: 1,
      items: [
        { name: 'Куртка Trail', price: 590, quantity: 1 },
        { name: 'Кроссовки Wave', price: 840, quantity: 2 },
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
      { name: 'Фонарик Spark', price: 1840, quantity: 1 },
    ],
    order: {
      amount: 10540,
      customer: 'Виктория Соколова',
      id: 5,
      items: [
        { name: 'Фонарик Spark', price: 1840, quantity: 2 },
        { name: 'Набор наклеек Simla', price: 2090, quantity: 3 },
        { name: 'Куртка Trail', price: 590, quantity: 1 },
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
      { name: 'Куртка Trail', price: 590, quantity: 1 },
    ],
    order: {
      amount: 10540,
      customer: 'Виктория Соколова',
      id: 5,
      items: [
        { name: 'Фонарик Spark', price: 1840, quantity: 2 },
        { name: 'Набор наклеек Simla', price: 2090, quantity: 3 },
        { name: 'Куртка Trail', price: 590, quantity: 1 },
      ],
      number: '100245',
    },
    status: ReturnStatus.Approved,
  },
]

export const resolveReturnsBackendRequest = (
  action: string,
  payload: unknown
): ExtensionBackendResponse => {
  if (action === '/returns') {
    const parsed = parsePayload<ReturnsPayload>(payload)
    const page = parsed.page ?? 1
    const perPage = parsed.perPage ?? 8
    const filtered = filterReturns(parsed)
    const offset = (page - 1) * perPage

    return {
      body: {
        page,
        perPage,
        returns: filtered.slice(offset, offset + perPage),
        total: filtered.length,
      },
      status: 200,
    }
  }

  if (action === '/return') {
    const { id } = parsePayload<ReturnPayload>(payload)

    return {
      body: {
        return: returns.find(item => item.id === id) ?? null,
      },
      status: 200,
    }
  }

  if (action === '/returns/save') {
    return {
      body: { ok: true },
      status: 200,
    }
  }

  return {
    body: {
      error: `Unsupported action: ${action}`,
      ok: false,
    },
    status: 404,
  }
}

const parsePayload = <T extends object>(payload: unknown): T => {
  if (typeof payload === 'string') {
    return JSON.parse(payload) as T
  }

  return (payload ?? {}) as T
}

const filterReturns = (payload: ReturnsPayload): ReturnRecord[] => {
  const filters = payload.filters ?? {}

  return returns.filter(item => {
    if (filters.orderNumber && !item.order.number.includes(filters.orderNumber)) return false
    if (filters.status && item.status !== filters.status) return false
    if (filters.amount && item.amount !== Number(filters.amount)) return false
    if (filters.date && item.date !== filters.date) return false

    return true
  })
}

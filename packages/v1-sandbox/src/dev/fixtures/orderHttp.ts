import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type {
  SandboxHostMiddleware,
  SandboxHttpCallRequest,
  SandboxHttpCallResponse,
} from '@/core/host'
import type { SandboxState } from '@/core/state'

type ReturnItem = {
  amount: number;
  date: string;
  id: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  order: {
    amount: number;
    customer: string;
    id: number;
    items: ReturnItem['items'];
    number: string;
  };
  status: 'approved' | 'cancelled' | 'completed' | 'new';
}

type OrderHttpPayload = {
  filters?: {
    orderNumber?: string;
  };
  orderId?: number;
}

const returns: ReturnItem[] = [
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
    status: 'new',
  },
  {
    amount: 2680,
    date: '2026-03-15',
    id: 7002,
    items: [
      { name: 'Рюкзак Shift', price: 1340, quantity: 2 },
    ],
    order: {
      amount: 9290,
      customer: 'Илья Петров',
      id: 2,
      items: [
        { name: 'Рюкзак Shift', price: 1340, quantity: 2 },
        { name: 'Футболка Air', price: 1590, quantity: 3 },
        { name: 'Термокружка Base', price: 1840, quantity: 1 },
      ],
      number: '100242',
    },
    status: 'approved',
  },
  {
    amount: 6860,
    date: '2026-03-14',
    id: 7003,
    items: [
      { name: 'Термокружка Base', price: 2090, quantity: 3 },
      { name: 'Плед Cloud', price: 590, quantity: 1 },
    ],
    order: {
      amount: 11810,
      customer: 'Мария Морозова',
      id: 3,
      items: [
        { name: 'Термокружка Base', price: 2090, quantity: 3 },
        { name: 'Плед Cloud', price: 590, quantity: 1 },
        { name: 'Сумка Roll', price: 840, quantity: 2 },
        { name: 'Наушники Pulse', price: 1090, quantity: 3 },
      ],
      number: '100243',
    },
    status: 'completed',
  },
  {
    amount: 2430,
    date: '2026-03-13',
    id: 7004,
    items: [
      { name: 'Сумка Roll', price: 1090, quantity: 1 },
      { name: 'Наушники Pulse', price: 1340, quantity: 1 },
    ],
    order: {
      amount: 3770,
      customer: 'Дмитрий Орлов',
      id: 4,
      items: [
        { name: 'Сумка Roll', price: 1090, quantity: 1 },
        { name: 'Наушники Pulse', price: 1340, quantity: 2 },
      ],
      number: '100244',
    },
    status: 'cancelled',
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
    status: 'new',
  },
  {
    amount: 11060,
    date: '2026-03-11',
    id: 7006,
    items: [
      { name: 'Куртка Trail', price: 840, quantity: 3 },
      { name: 'Кроссовки Wave', price: 1090, quantity: 1 },
      { name: 'Рюкзак Shift', price: 1340, quantity: 2 },
      { name: 'Футболка Air', price: 1590, quantity: 3 },
    ],
    order: {
      amount: 11060,
      customer: 'Егор Лебедев',
      id: 6,
      items: [
        { name: 'Куртка Trail', price: 840, quantity: 3 },
        { name: 'Кроссовки Wave', price: 1090, quantity: 1 },
        { name: 'Рюкзак Shift', price: 1340, quantity: 2 },
        { name: 'Футболка Air', price: 1590, quantity: 3 },
      ],
      number: '100246',
    },
    status: 'approved',
  },
]

export const createOrderSandboxHttpMiddleware = <M extends ContextSchemaList>():
SandboxHostMiddleware<M> => async (request, state, next) => {
    if (request.action === '/returns') {
      return jsonResponse(createReturnsResponse(request))
    }

    if (request.action === '/returns-count') {
      return jsonResponse({ count: filterReturns(request).length })
    }

    if (request.action === '/receipts') {
      return jsonResponse(createReceiptsResponse(request, state))
    }

    if (request.action === '/receipts-count') {
      return jsonResponse({ count: 2 })
    }

    return next()
  }

const createReturnsResponse = (request: SandboxHttpCallRequest) => {
  const filteredReturns = filterReturns(request)

  return {
    page: 1,
    perPage: 8,
    returns: filteredReturns,
    total: filteredReturns.length,
  }
}

const filterReturns = (request: SandboxHttpCallRequest): ReturnItem[] => {
  const payload = parsePayload(request.payload)
  const orderNumber = payload.filters?.orderNumber?.trim()

  if (!orderNumber) return returns

  return returns.filter(item => item.order.number.includes(orderNumber))
}

const createReceiptsResponse = <M extends ContextSchemaList>(
  request: SandboxHttpCallRequest,
  state: SandboxState<M>
) => {
  const payload = parsePayload(request.payload)
  const orderId = payload.orderId ?? Number(
    (state.contexts as Record<string, Record<string, unknown>>)['order/card']?.id
  )

  return {
    receipts: [
      {
        details: {
          fdNumber: 41859,
          ffdVersion: '1.2',
          fnNumber: '7380440801381848',
          fpd: 2975038937,
          kktRegistrationNumber: '0007642722037997',
          machineNumber: 'KZN030315',
          onlinePayment: true,
          receiptTime: '2024-11-17T11:51:00+03:00',
          shiftNumber: 16,
          taxSystem: 'OSN',
        },
        id: `ORDER${orderId}_645`,
      },
      {
        details: {
          fdNumber: 4696,
          ffdVersion: '1.2',
          fnNumber: '7380440800998420',
          fpd: 3632111203,
          kktRegistrationNumber: '0007642686026725',
          machineNumber: 'KZN1001202',
          onlinePayment: true,
          receiptTime: '2024-10-28T10:32:00+03:00',
          shiftNumber: 18,
          taxSystem: 'OSN',
        },
        id: `ORDER${orderId}_813`,
      },
    ],
  }
}

const parsePayload = (payload: SandboxHttpCallRequest['payload']): OrderHttpPayload => {
  if (!payload) return {}

  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload) as OrderHttpPayload
    } catch {
      return {}
    }
  }

  return payload as OrderHttpPayload
}

const jsonResponse = (value: unknown): SandboxHttpCallResponse => ({
  body: JSON.stringify(value),
  status: 200,
})

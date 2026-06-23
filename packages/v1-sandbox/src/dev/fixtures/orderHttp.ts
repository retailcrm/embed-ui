import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type {
  SandboxHostMiddleware,
  SandboxHttpCallRequest,
  SandboxHttpCallResponse,
} from '@/host'
import type { SandboxState } from '@/state'

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

type OrderNote = {
  author: {
    avatar: string;
    name: string;
  };
  createdAt: string;
  id: number;
  text: string;
}

type OrderHttpHandler<M extends ContextSchemaList> = {
  matches(action: string): boolean;
  name: string;
  resolve(
    request: SandboxHttpCallRequest,
    state: SandboxState<M>
  ): SandboxHttpCallResponse;
}

const SANDBOX_URL_PARSE_BASE = 'http://sandbox.local'

const notes: OrderNote[] = [
  {
    author: {
      avatar: 'DS',
      name: 'Денис Соколов',
    },
    createdAt: '2026-03-16T12:05:00+03:00',
    id: 9001,
    text: 'Клиент просит уточнить срок доставки перед оплатой.',
  },
  {
    author: {
      avatar: 'AM',
      name: 'Анна Морозова',
    },
    createdAt: '2026-03-16T12:18:00+03:00',
    id: 9002,
    text: 'Проверить наличие товара на складе перед подтверждением.',
  },
]

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
SandboxHostMiddleware<M> => {
  const resolveOrderHttpCall = createOrderHttpCallResolver<M>()

  return async (request, state, next) => resolveOrderHttpCall(request, state) ?? next()
}

const createOrderHttpCallResolver = <M extends ContextSchemaList>() => {
  const handlers = createOrderHttpHandlers<M>()

  return (
    request: SandboxHttpCallRequest,
    state: SandboxState<M>
  ): SandboxHttpCallResponse | undefined => {
    const normalizedAction = normalizeAction(request.action)
    const handler = handlers.find(({ matches }) => matches(request.action))

    debugOrderHttp('resolve', {
      action: request.action,
      handler: handler?.name ?? null,
      normalizedAction,
      payload: request.payload,
    })

    return handler?.resolve(request, state)
  }
}

const createOrderHttpHandlers = <M extends ContextSchemaList>(): Array<OrderHttpHandler<M>> => [
  {
    matches: isOrderNotesCountAction,
    name: 'order notes count',
    resolve: () => jsonResponse({ count: notes.length }),
  },
  {
    matches: isOrderNotesAction,
    name: 'order notes list',
    resolve: (request, state) => jsonResponse(createNotesResponse(request, state)),
  },
  {
    matches: isReturnsCountAction,
    name: 'returns count',
    resolve: request => jsonResponse({ count: filterReturns(request).length }),
  },
  {
    matches: isReturnsAction,
    name: 'returns list',
    resolve: request => jsonResponse(createReturnsResponse(request)),
  },
  {
    matches: isReceiptsCountAction,
    name: 'receipts count',
    resolve: () => jsonResponse({ count: 2 }),
  },
  {
    matches: isReceiptsAction,
    name: 'receipts list',
    resolve: (request, state) => jsonResponse(createReceiptsResponse(request, state)),
  },
  {
    matches: isCountAction,
    name: 'unknown count fallback',
    resolve: () => jsonResponse({ count: 0 }),
  },
]

const isOrderNotesAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['notes', 'order-notes', 'comments'])
  && !isCountAction(action)

const isOrderNotesCountAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['notes', 'order-notes', 'comments'])
  && isCountAction(action)

const isReturnsAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['returns'])
  && !isCountAction(action)

const isReturnsCountAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['returns'])
  && isCountAction(action)

const isReceiptsAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['receipts', 'receipt'])
  && !isCountAction(action)

const isReceiptsCountAction = (action: string): boolean =>
  hasAnyActionSegment(action, ['receipts', 'receipt'])
  && isCountAction(action)

const isCountAction = (action: string): boolean =>
  /(?:^|[/_-])count(?:$|[/?#])/iu.test(action)

const hasAnyActionSegment = (action: string, segments: string[]): boolean => {
  const normalized = normalizeAction(action)

  return segments.some(segment => normalized.includes(segment))
}

const normalizeAction = (action: string): string => {
  try {
    const url = new URL(action, SANDBOX_URL_PARSE_BASE)

    debugOrderHttp('normalize-url', {
      action,
      href: url.href,
      pathname: url.pathname,
    })

    return url.pathname.toLowerCase()
  } catch {
    const pathname = action.split('?')[0]

    debugOrderHttp('normalize-fallback', {
      action,
      pathname,
    })

    return pathname.toLowerCase()
  }
}

const debugOrderHttp = (event: string, details: unknown): void => {
  if (typeof console !== 'undefined') {
    console.info(`[sandbox:order-http] ${event}`, details)
  }
}

const createReturnsResponse = (request: SandboxHttpCallRequest) => {
  const filteredReturns = filterReturns(request)

  return {
    count: filteredReturns.length,
    page: 1,
    perPage: 8,
    returns: filteredReturns,
    total: filteredReturns.length,
  }
}

const createNotesResponse = <M extends ContextSchemaList>(
  request: SandboxHttpCallRequest,
  state: SandboxState<M>
) => {
  const orderId = Number(
    parsePayload(request.payload).orderId
    ?? (state.contexts as Record<string, Record<string, unknown>>)['order/card']?.id
  )

  return {
    count: notes.length,
    notes: notes.map(note => ({
      ...note,
      orderId,
    })),
    total: notes.length,
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
  const receipts = [
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
  ]

  return {
    count: receipts.length,
    receipts,
    total: receipts.length,
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

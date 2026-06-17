import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type { CreateSandboxControllerOptions } from '@/core/controller'
import type { SandboxContextOverrides } from '@/core/state'
import type { SandboxController } from '@/core/controller'
import type { SandboxHttpCallRequest, SandboxHttpCallResponse } from '@/core/host'

import {
  schema as currentUserSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/user/current'
import {
  schema as orderCardSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'
import {
  schema as orderCardSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card-settings'
import { schema as settingsSchema } from '@retailcrm/embed-ui-v1-contexts/remote/settings'

import { CoreUiExtension } from '@/enum'
import { createSandboxController } from '@/core/controller'

export const orderSandboxSchemas = {
  'order/card': orderCardSchema,
  'order/card:settings': orderCardSettingsSchema,
  'settings': settingsSchema,
  'user/current': currentUserSchema,
} satisfies ContextSchemaList

export type OrderSandboxSchemas = typeof orderSandboxSchemas

export type OrderSandboxFixture = {
  contexts: SandboxContextOverrides<OrderSandboxSchemas>;
  description: string;
  name: string;
}

export const orderSandboxFixtures = {
  'order-basic': {
    name: 'Базовый заказ',
    description: 'Обычный заказ без доставки, подходит для проверки общих блоков.',
    contexts: {
      'order/card': {
        'currency': 'RUB',
        'customer.email': 'igor.kretov@example.com',
        'customer.firstName': 'Игорь',
        'customer.id': 91742,
        'customer.lastName': 'Кретов',
        'customer.phone': '+7 999 111-22-33',
        'delivery.address': null,
        'id': 215,
        'number': '215C',
        'site': 'demo',
        'status': 'new',
        'type': 'Основной',
      },
      'order/card:settings': {
        'priceEditable': true,
        'productsRemoveAllowed': true,
        'purchasePriceVisible': true,
        'showPriceTypes': true,
      },
      'settings': {
        'system.locale': 'ru-RU',
      },
      'user/current': {
        'email': 'dev@example.com',
        'firstName': 'Dev',
        'groups': ['managers'],
        'id': 17,
        'isAdmin': true,
        'isManager': true,
        'lastName': 'Sandbox',
        'permissions': ['orders_view', 'orders_edit'],
      },
    },
  },
  'order-with-delivery': {
    name: 'Заказ с доставкой',
    description: 'Заказ с адресом и суммой, полезен для delivery/payment widgets.',
    contexts: {
      'order/card': {
        'currency': 'RUB',
        'customer.email': 'igor.kretov@example.com',
        'customer.firstName': 'Игорь',
        'customer.id': 91742,
        'customer.lastName': 'Кретов',
        'customer.phone': '+7 999 111-22-33',
        'delivery.address': 'Москва, ул. Ленина, 10',
        'discount.amount': 500,
        'id': 214,
        'number': '214C',
        'site': 'demo',
        'status': 'client-confirmed',
        'type': 'Основной',
      },
      'order/card:settings': {
        'priceEditable': true,
        'productsRemoveAllowed': true,
        'reserveShipmentDateEditable': true,
        'showPriceTypes': true,
        'useReserve': true,
      },
      'settings': {
        'system.locale': 'ru-RU',
      },
      'user/current': {
        'email': 'dev@example.com',
        'firstName': 'Dev',
        'groups': ['managers'],
        'id': 17,
        'isAdmin': true,
        'isManager': true,
        'lastName': 'Sandbox',
        'permissions': ['orders_view', 'orders_edit', 'delivery_edit'],
      },
    },
  },
  'order-readonly-error': {
    name: 'Readonly / error-like',
    description: 'Отменённый заказ с readonly-настройками для проверки disabled states.',
    contexts: {
      'order/card': {
        'currency': 'RUB',
        'customer.email': 'igor.kretov@example.com',
        'customer.firstName': 'Игорь',
        'customer.id': 91742,
        'customer.lastName': 'Кретов',
        'customer.phone': '+7 999 111-22-33',
        'delivery.address': null,
        'id': 213,
        'number': '213C',
        'site': 'demo',
        'status': 'cancelled',
        'type': 'Основной',
      },
      'order/card:settings': {
        'priceEditable': false,
        'productsRemoveAllowed': false,
        'purchasePriceVisible': false,
        'showPriceTypes': false,
      },
      'settings': {
        'system.locale': 'ru-RU',
      },
      'user/current': {
        'email': 'readonly@example.com',
        'firstName': 'Readonly',
        'groups': ['support'],
        'id': 23,
        'isAdmin': false,
        'isManager': true,
        'lastName': 'Sandbox',
        'permissions': ['orders_view'],
      },
    },
  },
} satisfies Record<string, OrderSandboxFixture>

export type OrderSandboxFixtureCode = keyof typeof orderSandboxFixtures

export const DEFAULT_ORDER_SANDBOX_FIXTURE: OrderSandboxFixtureCode = 'order-basic'

export const getOrderSandboxFixture = (code: string): OrderSandboxFixture =>
  orderSandboxFixtures[isOrderSandboxFixtureCode(code) ? code : DEFAULT_ORDER_SANDBOX_FIXTURE]

export const isOrderSandboxFixtureCode = (code: string): code is OrderSandboxFixtureCode =>
  code in orderSandboxFixtures

export const createOrderSandboxController = (
  fixtureCode: string,
  options: Partial<CreateSandboxControllerOptions<OrderSandboxSchemas>> = {}
): SandboxController<OrderSandboxSchemas> => {
  const fixture = getOrderSandboxFixture(fixtureCode)

  return createSandboxController({
    contexts: fixture.contexts,
    custom: {
      dictionaries: {
        orderSource: [
          { code: 'web', cursor: 'web', text: 'Сайт' },
          { code: 'phone', cursor: 'phone', text: 'Телефон' },
        ],
      },
      entities: {
        order: {
          schema: {
            entity: 'order',
            fields: [
              {
                code: 'sandbox_comment',
                initial: 'Проверка UI в sandbox',
                kind: 'text',
                readonly: false,
              },
              {
                code: 'source',
                dictionaryCode: 'orderSource',
                initial: 'web',
                kind: 'dictionary',
                readonly: false,
              },
            ],
          },
          values: {
            sandbox_comment: 'Проверка UI в sandbox',
            source: 'web',
          },
        },
      },
    },
    globalBridge: false,
    location: {
      pathname: '/orders/215/edit',
      query: {
        sandbox: '1',
      },
    },
    mode: 'preview',
    schemas: orderSandboxSchemas,
    httpCall: async request => resolveOrderSandboxHttpCall(request),
    ...options,
  })
}

const resolveOrderSandboxHttpCall = async (
  request: SandboxHttpCallRequest
): Promise<SandboxHttpCallResponse> => {
  if (isExternalBackendAction(request.action)) {
    return proxyExternalBackendHttpCall(request)
  }

  return {
    body: JSON.stringify({
      action: request.action,
      ok: true,
    }),
    status: 200,
  }
}

const isExternalBackendAction = (action: string): boolean =>
  action.startsWith('/')

const proxyExternalBackendHttpCall = async (
  request: SandboxHttpCallRequest
): Promise<SandboxHttpCallResponse> => {
  const response = await fetch(`${CoreUiExtension.BaseUrl}${request.action}`, {
    body: new URLSearchParams({
      payload: serializeHttpCallPayload(request.payload),
    }),
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })

  return {
    body: await response.text(),
    status: response.status,
  }
}

const serializeHttpCallPayload = (payload: SandboxHttpCallRequest['payload']): string => {
  if (typeof payload === 'string') return payload

  return JSON.stringify(payload ?? {})
}

import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type { CreateSandboxControllerOptions } from '@/controller'
import type { SandboxContextOverrides } from '@/state'
import type { SandboxController } from '@/controller'

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
import { targets } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

import { createSandboxController } from '@/controller'
import { createSandboxHttpMiddleware } from '@/dev/fixtures/httpMiddlewares'
import { isObjectKey } from '@/dev/predicates'

const [
  orderCardContextId,
  orderCardSettingsContextId,
  currentUserContextId,
  settingsContextId,
] = targets['order/card:common.before'].contexts

export const orderSandboxSchemas = {
  [orderCardContextId]: orderCardSchema,
  [orderCardSettingsContextId]: orderCardSettingsSchema,
  [currentUserContextId]: currentUserSchema,
  [settingsContextId]: settingsSchema,
} satisfies ContextSchemaList

export type OrderSandboxSchemas = typeof orderSandboxSchemas

export type OrderSandboxFixture = {
  contexts: SandboxContextOverrides<OrderSandboxSchemas>;
  description: string;
  name: string;
}

type OrderCardContext = NonNullable<OrderSandboxFixture['contexts'][typeof orderCardContextId]>
type OrderCardSettingsContext = NonNullable<OrderSandboxFixture['contexts'][typeof orderCardSettingsContextId]>
type SettingsContext = NonNullable<OrderSandboxFixture['contexts'][typeof settingsContextId]>
type UserCurrentContext = NonNullable<OrderSandboxFixture['contexts'][typeof currentUserContextId]>

const orderSandboxRouting = {
  base_url: '',
  host: '',
  locale: '',
  port: '',
  prefix: '',
  routes: {
    crm_manager_show: {
      defaults: [],
      hosttokens: [],
      methods: [],
      requirements: {
        id: '\\d+',
      },
      schemes: [],
      tokens: [
        ['variable', '/', '\\d+', 'id', true],
        ['text', '/managers'],
      ],
    },
    crm_users_edit: {
      defaults: [],
      hosttokens: [],
      methods: [],
      requirements: {
        id: '\\d+',
      },
      schemes: [],
      tokens: [
        ['text', '/edit'],
        ['variable', '/', '\\d+', 'id', true],
        ['text', '/users'],
      ],
    },
  },
  scheme: 'http',
}

const orderCardBaseContext = {
  'company.BIK': '044525225',
  'company.INN': '7712345678',
  'company.KPP': '771201001',
  'company.OGRN': '1127746123456',
  'company.OGRNIP': null,
  'company.OKPO': '12345678',
  'company.bank': 'ПАО Сбербанк',
  'company.bankAccount': '40702810900000000001',
  'company.bankAddress': 'Москва, ул. Вавилова, 19',
  'company.certificateDate': null,
  'company.certificateNumber': null,
  'company.contragentType': 'legal-entity',
  'company.corrAccount': '30101810400000000225',
  'company.legalAddress': 'Москва, ул. Тверская, 7',
  'company.legalName': 'ООО "Сэндбокс клиент"',
  'company.name': 'Сэндбокс клиент',
  'country': 'RU',
  'currency': 'RUB',
  'customer.email': 'igor.kretov@example.com',
  'customer.externalId': 'customer-91742',
  'customer.firstName': 'Игорь',
  'customer.id': 91742,
  'customer.lastName': 'Кретов',
  'customer.patronymic': 'Андреевич',
  'customer.phone': '+7 999 111-22-33',
  'customer.type': 'customer',
  'delivery.address': null,
  'discount.amount': 0,
  'discount.percent': 0,
  'discount.total': 0,
  'externalId': 'sandbox-order',
  'site': 'demo',
  'type': 'Основной',
} satisfies OrderCardContext

const orderCardSettingsContext = {
  'changePriceTypeByPriority': true,
  'changePriceTypeIfUnavailable': true,
  'defaultUnit': 'шт',
  'duplicatesAllowed': true,
  'priceEditable': true,
  'productsMarkingEnabled': false,
  'productsRemoveAllowed': true,
  'propertiesToShow.additional': ['manufacturer'],
  'propertiesToShow.base': ['article', 'quantity', 'price'],
  'purchasePriceEditable': true,
  'purchasePriceVisible': true,
  'quantityIsFractional': false,
  'reserveDeliveryNoteEditable': true,
  'reserveInvoiceEditable': true,
  'reserveShipmentDateEditable': true,
  'reserveTelephonyEnabled': false,
  'showArticle': true,
  'showPriceTypes': true,
  'useReserve': true,
  'useStores': true,
} satisfies OrderCardSettingsContext

const settingsContext = {
  'image.workers': [],
  'system.locale': 'ru-RU',
  'system.routing': orderSandboxRouting,
} satisfies SettingsContext

const userCurrentContext = {
  'email': 'dev@example.com',
  'firstName': 'Dev',
  'groups': ['managers'],
  'id': 17,
  'isAdmin': true,
  'isManager': true,
  'lastName': 'Sandbox',
  'patronymic': null,
  'permissions': ['orders_view', 'orders_edit', 'delivery_edit', 'products_view'],
  'photo': null,
} satisfies UserCurrentContext

const createOrderCardContext = (overrides: OrderCardContext): OrderCardContext => ({
  ...orderCardBaseContext,
  ...overrides,
})

const createOrderCardSettingsContext = (
  overrides: OrderCardSettingsContext = {}
): OrderCardSettingsContext => ({
  ...orderCardSettingsContext,
  ...overrides,
})

const createUserCurrentContext = (
  overrides: UserCurrentContext = {}
): UserCurrentContext => ({
  ...userCurrentContext,
  ...overrides,
})

const createOrderItem = (
  index: number,
  name: string,
  quantity: number,
  amount: number
) => ({
  bonusesChargeTotal: 0,
  bonusesCreditTotal: 0,
  comment: '',
  discountTotal: 0,
  discounts: [],
  id: 4000 + index,
  index,
  initialPrice: {
    amount,
    currency: 'RUB',
  },
  offer: {
    article: `SKU-${4000 + index}`,
    barcode: null,
    dimensions: {
      H: null,
      L: null,
      W: null,
    },
    id: 5000 + index,
    image: null,
    name,
    properties: [
      {
        code: 'color',
        name: 'Цвет',
        value: index % 2 === 0 ? 'Синий' : 'Черный',
      },
    ],
    purchasePrice: {
      amount: Math.round(amount * 0.7),
      currency: 'RUB',
    },
    unit: 'шт',
    weight: null,
  },
  priceType: {
    code: 'base',
    currency: 'RUB',
    default: true,
    id: 1,
    name: 'Базовая',
    title: 'Базовая',
  },
  product: {
    article: `SKU-${4000 + index}`,
    groups: [
      {
        id: 10,
        name: 'Sandbox товары',
      },
    ],
    id: 6000 + index,
    image: null,
    manufacturer: null,
    markable: false,
    name,
    type: 'PRODUCT' as const,
    unit: 'шт',
    url: null,
  },
  properties: [
    {
      code: 'warehouse',
      name: 'Склад',
      value: 'Основной',
    },
  ],
  purchasePrice: {
    amount: Math.round(amount * 0.7),
    currency: 'RUB',
  },
  quantity,
  status: {
    code: 'new',
    id: 1,
    isCancel: false,
    name: 'Новый',
  },
  type: 'PRODUCT' as const,
  vatRate: 'none' as const,
  vatSum: 0,
})

const orderItems = [
  createOrderItem(0, 'Куртка Trail', 1, 5900),
  createOrderItem(1, 'Кроссовки Wave', 2, 8400),
]

export const orderSandboxFixtures = {
  'order-basic': {
    name: 'Базовый заказ',
    description: 'Обычный заказ без доставки, подходит для проверки общих блоков.',
    contexts: {
      [orderCardContextId]: createOrderCardContext({
        'externalId': 'sandbox-order-215',
        'id': 215,
        'items': orderItems,
        'number': '215C',
        'status': 'new',
      }),
      [orderCardSettingsContextId]: createOrderCardSettingsContext(),
      [currentUserContextId]: createUserCurrentContext(),
      [settingsContextId]: settingsContext,
    },
  },
  'order-with-delivery': {
    name: 'Заказ с доставкой',
    description: 'Заказ с адресом и суммой, полезен для delivery/payment widgets.',
    contexts: {
      [orderCardContextId]: createOrderCardContext({
        'delivery.address': 'Москва, ул. Ленина, 10',
        'discount.amount': 500,
        'discount.percent': 3,
        'discount.total': 500,
        'externalId': 'sandbox-order-214',
        'id': 214,
        'items': [
          ...orderItems,
          createOrderItem(2, 'Рюкзак Shift', 1, 12900),
        ],
        'number': '214C',
        'status': 'client-confirmed',
      }),
      [orderCardSettingsContextId]: createOrderCardSettingsContext({
        'reserveShipmentDateEditable': true,
      }),
      [currentUserContextId]: createUserCurrentContext(),
      [settingsContextId]: settingsContext,
    },
  },
  'order-readonly-error': {
    name: 'Readonly / error-like',
    description: 'Отменённый заказ с readonly-настройками для проверки disabled states.',
    contexts: {
      [orderCardContextId]: createOrderCardContext({
        'externalId': 'sandbox-order-213',
        'id': 213,
        'items': [],
        'number': '213C',
        'status': 'cancelled',
      }),
      [orderCardSettingsContextId]: createOrderCardSettingsContext({
        'priceEditable': false,
        'productsRemoveAllowed': false,
        'purchasePriceVisible': false,
        'showPriceTypes': false,
      }),
      [currentUserContextId]: createUserCurrentContext({
        'email': 'readonly@example.com',
        'firstName': 'Readonly',
        'groups': ['support'],
        'id': 23,
        'isAdmin': false,
        'lastName': 'Sandbox',
        'permissions': ['orders_view'],
      }),
      [settingsContextId]: settingsContext,
    },
  },
} satisfies Record<string, OrderSandboxFixture>

export type OrderSandboxFixtureCode = keyof typeof orderSandboxFixtures

export const DEFAULT_ORDER_SANDBOX_FIXTURE: OrderSandboxFixtureCode = 'order-basic'

export const getOrderSandboxFixture = (code: string): OrderSandboxFixture =>
  orderSandboxFixtures[isOrderSandboxFixtureCode(code) ? code : DEFAULT_ORDER_SANDBOX_FIXTURE]

export const isOrderSandboxFixtureCode = (code: string): code is OrderSandboxFixtureCode =>
  isObjectKey(orderSandboxFixtures, code)

export const createOrderSandboxController = (
  fixtureCode: string,
  options: Partial<CreateSandboxControllerOptions<OrderSandboxSchemas>> = {}
): SandboxController<OrderSandboxSchemas> => {
  const fixture = getOrderSandboxFixture(fixtureCode)
  const {
    httpMiddleware,
    ...controllerOptions
  } = options

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
    httpMiddleware: httpMiddleware ?? createSandboxHttpMiddleware<OrderSandboxSchemas>(),
    location: {
      pathname: '/orders/215/edit',
      query: {
        sandbox: '1',
      },
    },
    mode: 'preview',
    schemas: orderSandboxSchemas,
    ...controllerOptions,
  })
}

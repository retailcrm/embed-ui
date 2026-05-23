import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

type AiText = Pick<TranslationList, 'en-GB'>

export type MutationMode = 'readonly' | 'direct' | 'action'

export type MutationDocumentation = {
  mode: MutationMode;
  action?: string;
  notes: AiText;
}

export type FieldDocumentation = {
  aiNotes?: AiText[];
  mutation?: MutationDocumentation;
  sourceOfTruth?: AiText;
  relatedActions?: string[];
}

export type FieldGroupDocumentation = {
  fields: string[];
  aiNotes: AiText[];
}

export type TypeDocumentation = {
  fields: Record<string, FieldDocumentation>;
}

export type ContextDocumentation = {
  summary: AiText;
  aiNotes?: AiText[];
  fields?: Record<string, FieldDocumentation>;
  fieldGroups?: Record<string, FieldGroupDocumentation>;
  types?: Record<string, TypeDocumentation>;
}

export type ActionDocumentation = {
  aiNotes?: AiText[];
  mutates?: string[];
}

export type ActionScopeDocumentation = {
  summary: AiText;
  actions?: Record<string, ActionDocumentation>;
}

export type CustomContextDocumentation = {
  summary: AiText;
  entity: string;
  supportedKinds: Array<{
    kind: string;
    type: string;
    requiresDictionary: boolean;
  }>;
  usage: {
    initialize: string;
    read: string;
    write: string;
    dictionary: string;
  };
  aiNotes: AiText[];
}

export const contextDocumentation: Record<string, ContextDocumentation> = {
  'customer/card': {
    summary: {
      'en-GB': 'Readonly customer card context with customer identifiers, primary email, and phone list.',
    },
    fields: {
      id: {
        sourceOfTruth: {
          'en-GB': 'CRM customer identifier for the opened customer card.',
        },
      },
      externalId: {
        sourceOfTruth: {
          'en-GB': 'External customer identifier from the source system.',
        },
      },
      email: {
        aiNotes: [{
          'en-GB': 'Use as the current customer email shown on the customer card; it is not a writable order-form field.',
        }],
      },
      phones: {
        aiNotes: [{
          'en-GB': 'Use for customer-card phone display and selection logic. For a widget attached to one phone row, prefer the customer/card:phone context.',
        }],
      },
    },
  },
  'customer/card:phone': {
    summary: {
      'en-GB': 'Readonly context for a single customer phone row target with phone value and row index.',
    },
    fields: {
      value: {
        sourceOfTruth: {
          'en-GB': 'Phone number value for the phone row where the widget is mounted.',
        },
      },
      index: {
        sourceOfTruth: {
          'en-GB': 'Zero-based position of the phone row inside the customer phone list.',
        },
      },
    },
  },
  'order/card': {
    summary: {
      'en-GB': 'Order card context with order identity, customer data, company fields, order items, delivery address, discount and status.',
    },
    aiNotes: [{
      'en-GB': 'Use this context as the source of truth for data already present in the order form.',
    }, {
      'en-GB': 'Use order/card actions for item mutations instead of trying to write the readonly items field.',
    }],
    fields: {
      'items': {
        sourceOfTruth: {
          'en-GB': 'Readonly source of truth for the current order item list.',
        },
        mutation: {
          mode: 'action',
          action: 'order/card actions',
          notes: {
            'en-GB': 'Do not mutate items directly. Use item actions such as changeItemQuantity, changeItemPriceType, changeItemDiscount, changeItemStatus, removeItem or createItem.',
          },
        },
        relatedActions: [
          'createItem',
          'changeItemPrice',
          'changeItemPriceType',
          'changeItemDiscount',
          'changeItemQuantity',
          'changeItemStatus',
          'removeItem',
        ],
        aiNotes: [{
          'en-GB': 'Use items for promotions, product composition analysis, item display and calculations based on the current order form state.',
        }],
      },
      'delivery.address': {
        mutation: {
          mode: 'direct',
          notes: {
            'en-GB': 'Writable delivery address field.',
          },
        },
      },
      'discount.amount': {
        mutation: {
          mode: 'direct',
          notes: {
            'en-GB': 'Writable one-time order discount amount in the order currency.',
          },
        },
      },
      'discount.percent': {
        mutation: {
          mode: 'direct',
          notes: {
            'en-GB': 'Writable one-time order discount percent.',
          },
        },
      },
      'discount.total': {
        sourceOfTruth: {
          'en-GB': 'Readonly calculated total order discount.',
        },
        mutation: {
          mode: 'readonly',
          notes: {
            'en-GB': 'Use this field for display and calculations only; write discount.amount or discount.percent when changing the order discount.',
          },
        },
      },
    },
    fieldGroups: {
      customer: {
        fields: [
          'customer.id',
          'customer.externalId',
          'customer.type',
          'customer.lastName',
          'customer.firstName',
          'customer.patronymic',
          'customer.phone',
          'customer.email',
        ],
        aiNotes: [{
          'en-GB': 'Customer id, externalId and type identify the selected customer and are readonly; contact and name fields are writable order-form values.',
        }],
      },
    },
    types: {
      OrderItem: {
        fields: {
          index: {
            aiNotes: [{
              'en-GB': 'Temporary item identifier used by order/card item action calls.',
            }],
          },
          product: {
            aiNotes: [{
              'en-GB': 'Product data for product logic, promotions and UI display. It can be null.',
            }],
          },
          offer: {
            aiNotes: [{
              'en-GB': 'Trade offer data for SKU-level logic, promotions and UI display. It can be null.',
            }],
          },
          quantity: {
            mutation: {
              mode: 'action',
              action: 'changeItemQuantity',
              notes: {
                'en-GB': 'Use changeItemQuantity(index, quantity) to change item quantity.',
              },
            },
          },
          priceType: {
            mutation: {
              mode: 'action',
              action: 'changeItemPriceType',
              notes: {
                'en-GB': 'Use changeItemPriceType(index, code) to change item price type.',
              },
            },
          },
          discounts: {
            mutation: {
              mode: 'action',
              action: 'changeItemDiscount',
              notes: {
                'en-GB': 'Use changeItemDiscount when item discount mutation is available.',
              },
            },
          },
          discountTotal: {
            mutation: {
              mode: 'readonly',
              notes: {
                'en-GB': 'Readonly calculated item discount total.',
              },
            },
          },
        },
      },
    },
  },
  'order/card:settings': {
    summary: {
      'en-GB': 'Readonly order card settings that describe form capabilities and order item editing rules.',
    },
    fields: {
      priceEditable: {
        aiNotes: [{
          'en-GB': 'Controls whether UI should allow changing item price.',
        }],
      },
      productsRemoveAllowed: {
        aiNotes: [{
          'en-GB': 'Controls whether UI should allow removing items from the order.',
        }],
      },
      quantityIsFractional: {
        aiNotes: [{
          'en-GB': 'Controls whether quantity inputs should allow fractional values.',
        }],
      },
      showPriceTypes: {
        aiNotes: [{
          'en-GB': 'Controls whether price type display and selection are relevant.',
        }],
      },
      useStores: {
        aiNotes: [{
          'en-GB': 'Signals that warehouse scenarios are enabled for the order form.',
        }],
      },
      useReserve: {
        aiNotes: [{
          'en-GB': 'Signals that reservation scenarios are enabled for the order form.',
        }],
      },
    },
  },
  'user/current': {
    summary: {
      'en-GB': 'Readonly current user context with identity, groups, permissions and quick role flags.',
    },
    fields: {
      groups: {
        aiNotes: [{
          'en-GB': 'Use group codes for role/group-based UI decisions.',
        }],
      },
      permissions: {
        aiNotes: [{
          'en-GB': 'Use permission codes for feature gating and conditional action visibility.',
        }],
      },
      isAdmin: {
        aiNotes: [{
          'en-GB': 'Quick flag for administrator-specific UI branches.',
        }],
      },
      isManager: {
        aiNotes: [{
          'en-GB': 'Quick flag for manager-specific UI branches.',
        }],
      },
    },
  },
  settings: {
    summary: {
      'en-GB': 'Readonly CRM settings context with UI locale, Symfony router data, and image preview worker hosts.',
    },
    fields: {
      'system.locale': {
        sourceOfTruth: {
          'en-GB': 'Current CRM UI locale for the opened account session.',
        },
        aiNotes: [{
          'en-GB': 'Use this locale for extension UI localization.',
        }],
      },
      'system.routing': {
        sourceOfTruth: {
          'en-GB': 'Symfony router dump for CRM routes available to the extension.',
        },
        aiNotes: [{
          'en-GB': 'Use this Symfony router data to build CRM route URLs.',
        }, {
          'en-GB': 'Pass the routing data to @omnicajs/symfony-router instead of concatenating CRM URLs manually.',
        }],
      },
      'image.workers': {
        sourceOfTruth: {
          'en-GB': 'List of image preview worker hosts used to build resized or cropped image URLs.',
        },
        aiNotes: [{
          'en-GB': 'Pass these workers to usePreview or @retailcrm/image-preview preview().',
        }, {
          'en-GB': 'If the list is empty, preview helpers return the original image URL.',
        }, {
          'en-GB': 'Workers are used for image preview resizing and cropping, not for uploading or storing images.',
        }],
      },
    },
  },
}

export const actionDocumentation: Record<string, ActionScopeDocumentation> = {
  'order/card': {
    summary: {
      'en-GB': 'Order card actions for mutating order items through the host form contract.',
    },
    actions: {
      createItem: {
        mutates: ['items'],
        aiNotes: [{
          'en-GB': 'Use when a widget needs to add a product or service to the order form.',
        }],
      },
      changeItemPrice: {
        mutates: ['items[].initialPrice'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when changing item price.',
        }],
      },
      changeItemPriceType: {
        mutates: ['items[].priceType'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when changing item price type.',
        }],
      },
      changeItemDiscount: {
        mutates: ['items[].discounts', 'items[].discountTotal'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when changing item discount.',
        }],
      },
      changeItemQuantity: {
        mutates: ['items[].quantity'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when changing item quantity.',
        }],
      },
      changeItemStatus: {
        mutates: ['items[].status'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when changing item status.',
        }],
      },
      removeItem: {
        mutates: ['items'],
        aiNotes: [{
          'en-GB': 'Use with OrderItem.index when removing an item from the order.',
        }],
      },
    },
  },
}

export const customContextDocumentation: Record<string, CustomContextDocumentation> = {
  order: {
    entity: 'order',
    summary: {
      'en-GB': 'Custom fields context for order entity custom fields.',
    },
    supportedKinds: [{
      kind: 'boolean',
      type: 'boolean|null',
      requiresDictionary: false,
    }, {
      kind: 'date',
      type: 'string|null',
      requiresDictionary: false,
    }, {
      kind: 'datetime',
      type: 'string|null',
      requiresDictionary: false,
    }, {
      kind: 'dictionary',
      type: 'string|null',
      requiresDictionary: true,
    }, {
      kind: 'multiselect_dictionary',
      type: 'string[]',
      requiresDictionary: true,
    }, {
      kind: 'email',
      type: 'string|null',
      requiresDictionary: false,
    }, {
      kind: 'integer',
      type: 'number|null',
      requiresDictionary: false,
    }, {
      kind: 'numeric',
      type: 'number|null',
      requiresDictionary: false,
    }, {
      kind: 'string',
      type: 'string|null',
      requiresDictionary: false,
    }, {
      kind: 'text',
      type: 'string|null',
      requiresDictionary: false,
    }],
    usage: {
      initialize: 'const custom = useContext(\'order\'); await custom.initialize()',
      read: 'custom.values[code]',
      write: 'custom.set(code, value)',
      dictionary: 'const dictionary = useDictionary(); await dictionary.query(dictionaryCode, { first: 20 })',
    },
    aiNotes: [{
      'en-GB': 'Call initialize before reading custom field values.',
    }, {
      'en-GB': 'Do not write readonly custom fields; the remote store rejects writes according to schema.',
    }, {
      'en-GB': 'Dictionary and multiselect_dictionary fields require dictionary loading for option labels.',
    }],
  },
}

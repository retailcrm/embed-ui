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
  'ticket/edit': {
    summary: { 'en-GB': 'Ticket creation/editing form augmentation. Reads and writes refer to the current unsaved draft, not persisted ticket data. CRM owns validation, saving and closing.' },
    aiNotes: [
      { 'en-GB': 'Declared for ticket/edit:common.before, ticket/edit:customer.after and ticket/edit:issues.after. Requires a CRM editor host implementation. No viewer target supplies this context. Do not use ticket/view actions to mutate this draft.' },
      { 'en-GB': 'Initialize ticket/edit and ticket/edit:settings separately. Each open editor must have isolated context subscriptions and action scope, including two unsaved tickets with null IDs.' },
      { 'en-GB': 'All actions only modify the form draft. Successful promises mean the host applied and published the draft change; no entity was saved. Failures and unavailable operations reject.' },
      { 'en-GB': 'No save, close, validate, reset or refresh methods are exposed. Readonly valid describes local validation only; it does not guarantee saving permission. Read errors without triggering validation.' },
      { 'en-GB': 'Host rejects conflicting writes while loading, saving or pending and applies the same access, reference hydration and validation rules as the CRM form. A direct field set is optimistic and has no persistence promise.' },
    ],
    fields: {
      'customer.type': { mutation: { mode: 'action', action: 'changeCustomerType', notes: { 'en-GB': 'Uses the same customer/customer_corporate codes as order/card. Host atomically reconciles dependent customer, contact and company fields.' } } },
      'issues': { mutation: { mode: 'action', action: 'addIssue / updateIssue / removeIssue', notes: { 'en-GB': 'Address every question by its opaque local key. New questions have null database IDs; key formats are private and must not be parsed or persisted across editor sessions.' } } },
      'orders': { mutation: { mode: 'action', action: 'addOrder / removeOrder', notes: { 'en-GB': 'The finite selection in the draft, not paginated order search. Removing an order also removes its selected items.' } } },
      'orderItems': { mutation: { mode: 'action', action: 'addOrderItem / removeOrderItem', notes: { 'en-GB': 'Selected order positions in the ticket draft. IDs are order position IDs, not product/offer IDs; quantity and price editing are not supported by the ticket form.' } } },
      'dirty': { aiNotes: [{ 'en-GB': 'Host publishes the whole sidebar dirty state, including embedded sections; cancelling the form does not revert operations already persisted by separate CRM sections.' }] },
      'errors': { aiNotes: [{ 'en-GB': 'Paths use public field names: [] is the form, ["description"] is a field, ["issues", key, "subtopic"] identifies one question field, ["customFields", code] identifies a custom field. Each opaque key is one path segment.' }] },
    },
    fieldGroups: {
      customerProfile: {
        fields: ['customer.lastName', 'customer.firstName', 'customer.patronymic', 'customer.email', 'customer.phone'],
        aiNotes: [{ 'en-GB': 'Writable only for a new individual customer (customer.type=customer and customer.id=null). Existing customer bindings are not editable profiles; changing these fields never updates an existing customer record.' }],
      },
      contactProfile: {
        fields: ['contact.lastName', 'contact.firstName', 'contact.patronymic', 'contact.email', 'contact.phone'],
        aiNotes: [{ 'en-GB': 'These values belong to a new contact of a corporate customer (customer.type=customer_corporate and contact.id=null). Do not expose the internal shared CustomerProfile object as customer.* in corporate mode. Host rejects writes for linked contacts or individual customers.' }],
      },
      newCorporateNames: {
        fields: ['customer.name', 'company.name'],
        aiNotes: [{ 'en-GB': 'customer.name is writable only for a new corporate customer; company.name only for a new company in corporate mode. Host rejects edits to existing bindings. Entity creation remains part of the user-driven CRM save workflow.' }],
      },
    },
  },
  'ticket/edit:settings': {
    summary: { 'en-GB': 'Shared readonly catalogs and user permissions for the ticket form. Draft values and transient form state remain in ticket/edit.' },
    aiNotes: [
      { 'en-GB': 'topics contains parent topics with subtopics. The selected question exposes topic and subtopic separately; updateIssue receives subtopicId and the host derives its parent.' },
      { 'en-GB': 'Catalogs are not per-question allowed transitions. Permission flags exclude validity, loading and saving; the host rechecks all conditions before applying changes.' },
      { 'en-GB': 'No paginated store/customer/responsible search lists are exposed. Existing references selected by actions must be loaded and access-checked by the host.' },
    ],
  },
  'ticket/view': {
    summary: {
      'en-GB': 'Readonly ticket viewer context with questions, customer, contact, company, SLA and per-ticket action availability. Shared settings are in ticket/view:settings. Paginated lists are excluded.',
    },
    aiNotes: [{
      'en-GB': 'This package defines the contract. Ticket viewer targets are declared by v1-endpoint; actual availability requires the CRM host to implement those targets and contexts.',
    }, {
      'en-GB': 'Dates are ISO 8601 strings or null. SLA durations are snapshots in seconds, not a live countdown.',
    }, {
      'en-GB': 'All data belongs to the current viewer instance. Closing it must release subscriptions and reject subsequent actions.',
    }],
    fields: {
      'customer.id': {
        sourceOfTruth: {
          'en-GB': 'CRM customer selected for this ticket; null means no customer is selected.',
        },
      },
      'customer.type': {
        aiNotes: [{
          'en-GB': 'Uses the same CustomerType and meaning as order/card: customer or customer_corporate. The default is customer; use customer.id to determine whether a customer is present.',
        }],
      },
      'customer.name': {
        aiNotes: [{
          'en-GB': 'Display name from the ticket viewer. This slice does not expose the editable name parts available in order/card.',
        }],
      },
      company: {
        aiNotes: [{
          'en-GB': 'Company selected in the ticket; it can differ from the corporate customer main company.',
        }],
      },
      issues: {
        mutation: {
          mode: 'action',
          action: 'changeIssueStatus / changeIssueResponsible',
          notes: {
            'en-GB': 'Status and responsible belong to each question. Pass the question id, not the ticket id, and never substitute the first question for the whole ticket.',
          },
        },
        relatedActions: ['changeIssueStatus', 'changeIssueResponsible'],
      },
      canCreateEmail: {
        aiNotes: [{
          'en-GB': 'Allows opening the new email editor via openEmailEditor, depending on this ticket customer, contact and user permissions. Actual sending availability is checked separately by the email form; this flag does not guarantee that sending is available.',
        }],
      },
      canCreateOrder: {
        aiNotes: [{
          'en-GB': 'Depends on this ticket customer type and user permissions. Availability can change when the selected customer changes.',
        }],
      },
      loadFailed: {
        aiNotes: [{
          'en-GB': 'Previously loaded values may remain visible after a refresh failure. Do not treat them as freshly confirmed data.',
        }],
      },
    },
    fieldGroups: {
      customer: {
        fields: [
          'customer.id',
          'customer.type',
          'customer.name',
          'customer.email',
          'customer.phones',
          'customer.vip',
          'customer.bad',
        ],
        aiNotes: [{
          'en-GB': 'A readonly slice of the same customer entity used in order/card. Shared fields keep their names and meaning; available fields and mutation capabilities differ by context.',
        }],
      },
    },
  },
  'ticket/view:settings': {
    summary: {
      'en-GB': 'Readonly settings for the ticket viewer: shared status catalog and user permissions. None depends on a particular ticket.',
    },
    aiNotes: [{
      'en-GB': 'Requires an explicit CRM host implementation and target profile. Initialize separately from ticket/view. Only ticket/view provides the action scope.',
    }, {
      'en-GB': 'Settings are reactive and can change with the user session. Permission flags do not include temporary loading or mutation locks; these remain in ticket/view.',
    }, {
      'en-GB': 'Host actions must recheck permissions, viewer lifecycle, arguments and conflicting operations, even when the corresponding flag is true.',
    }],
    fields: {
      statuses: {
        sourceOfTruth: {
          'en-GB': 'The active ticketIssueStatuses catalog, excluding inactive groups, loaded without a ticket identifier.',
        },
        aiNotes: [{
          'en-GB': 'Not a list of allowed transitions for an individual issue. Check editable before offering status changes; the catalog itself does not imply edit permission.',
        }],
      },
      editable: {
        aiNotes: [{
          'en-GB': 'Derived from the current user TicketEdit permission. Does not depend on ticket customer or content.',
        }],
      },
      commentable: {
        aiNotes: [{
          'en-GB': 'Permission to add ticket comments. The current CRM viewer uses TicketEdit for this operation.',
        }],
      },
    },
  },
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
  'ticket/edit': {
    summary: { 'en-GB': 'Draft-only form augmentation. Every action resolves after the host applies and publishes the draft change. No action persists entities, saves the ticket, closes or resets the form.' },
    actions: {
      changeCustomerType: { mutates: ['customer.*', 'contact.*', 'company.*'] },
      selectCustomer: { mutates: ['customer.*', 'contact.*', 'company.*'], aiNotes: [{ 'en-GB': 'Selects an existing entity of the current customer.type; the host hydrates the reference, checks access and follows CRM dependency rules.' }] },
      unlinkCustomer: { mutates: ['customer.*', 'contact.*', 'company.*'] },
      selectContact: { mutates: ['contact.*'], aiNotes: [{ 'en-GB': 'Corporate mode only. The host verifies the selected contact belongs to the corporate customer.' }] },
      unlinkContact: { mutates: ['contact.*'] },
      selectCompany: { mutates: ['company.*'], aiNotes: [{ 'en-GB': 'Corporate mode only. The host verifies the selected company belongs to the corporate customer.' }] },
      unlinkCompany: { mutates: ['company.*'] },
      addIssue: { mutates: ['issues'], aiNotes: [{ 'en-GB': 'Uses CRM form defaults, returns a new local key and does not create a persisted question.' }] },
      updateIssue: { mutates: ['issues'], aiNotes: [{ 'en-GB': 'Omitted properties preserve the existing value; null clears a selection and may make the draft invalid. Only typeId, subtopicId, responsible and statusId are accepted. Host must preserve all other questions and hydrate labels/group data.' }] },
      removeIssue: { mutates: ['issues'] },
      addOrder: { mutates: ['orders'], aiNotes: [{ 'en-GB': 'Host loads an accessible existing order; repeat selection does not add duplicates.' }] },
      removeOrder: { mutates: ['orders', 'orderItems'] },
      addOrderItem: { mutates: ['orderItems'], aiNotes: [{ 'en-GB': 'orderItemId identifies an existing position of an order. This action does not create an order, product or offer and does not edit its price or quantity.' }] },
      removeOrderItem: { mutates: ['orderItems'] },
    },
  },
  'ticket/view': {
    summary: {
      'en-GB': 'Host-mediated ticket viewer actions. Mutations resolve after persistence and context reconciliation; failures reject instead of silently succeeding. UI-opening actions resolve when the requested interface opens.',
    },
    actions: {
      createComment: {
        aiNotes: [{
          'en-GB': 'Returns the saved comment id. Comment lists are not part of this context.',
        }],
      },
      changeIssueResponsible: {
        mutates: ['issues[].responsible'],
        aiNotes: [{
          'en-GB': 'Pass { kind: "user" | "group", id: number }. The host maps this reference to its transport contract and preserves other questions.',
        }],
      },
      changeIssueStatus: {
        mutates: ['issues[].status', 'issues[].closedAt', 'issues[].sla', 'sla'],
        aiNotes: [{
          'en-GB': 'Use an issue id from ticket/view.issues and a status id from ticket/view:settings.statuses. Check settings.editable. Host updates must preserve other questions.',
        }],
      },
      openTicketHistory: {
        aiNotes: [{
          'en-GB': 'Opens the standard CRM history interface for the current ticket. The CRM uses the ordinary ticket view permission; there is no separate history visibility setting or history list in this context.',
        }],
      },
      openEmailEditor: {
        aiNotes: [{
          'en-GB': 'Opens the standard email editor with ticket context and the appropriate recipient; sending remains a user action in CRM.',
        }],
      },
      openOrderForm: {
        aiNotes: [{
          'en-GB': 'Opens the standard new order form in a sidebar. It does not navigate to an order page. Resolution does not mean an order was saved. CRM owns linking the saved order to the ticket and reporting a linking failure.',
        }],
      },
    },
  },
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

const orderCustomContextDocumentation: CustomContextDocumentation = {
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
}

export const customContextDocumentation: Record<string, CustomContextDocumentation> = {
  order: orderCustomContextDocumentation,
  ticket: {
    ...orderCustomContextDocumentation,
    entity: 'ticket',
    summary: { 'en-GB': 'Custom fields of the current ticket editor draft. Writes augment the form and are persisted only by the CRM save workflow.' },
    usage: {
      ...orderCustomContextDocumentation.usage,
      initialize: 'const custom = useContext(\'ticket\'); await custom.initialize()',
    },
    aiNotes: [
      ...orderCustomContextDocumentation.aiNotes,
      { 'en-GB': 'Declared for ticket/edit:common.before, ticket/edit:customer.after and ticket/edit:issues.after. Requires an explicit ticket editor host; ticket viewer targets do not expose this custom context.' },
      { 'en-GB': 'Map CRM date values to YYYY-MM-DD strings and datetime values to ISO 8601 strings; map dictionary objects to their codes. Never transfer Date instances or raw dictionary objects.' },
      { 'en-GB': 'Host writes must go through editor custom-field setters, preserving readonly checks and form validation behavior. Schema entity ticket is scoped to this open editor.' },
    ],
  },
}

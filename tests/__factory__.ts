import {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaMap,
  EventHandler,
  EventMap,
  FieldAccessor,
  TypeOf,
  Writable,
} from '~types/context/schema'

import type { Locale } from '~types/context/settings'

import type { Schema as CustomerCardSchema } from '~types/context/customer/card'
import type { Schema as CustomerCardPhoneSchema } from '~types/context/customer/card-phone'
import type { Schema as OrderCardSchema } from '~types/context/order/card'
import type { Schema as SettingsSchema } from '~types/context/settings'

import { keysOf } from '@/utilities'

import { reactive, watch } from 'vue'
import { retain } from '@remote-ui/rpc'

type Getters<S extends ContextSchema> = {
  [F in keyof S]: () => Context<S>[F]
}

type Setters<S extends ContextSchema> = {
  [F in keyof Writable<S>]: (value: Context<S>[F]) => void
}

const createGetter = <S extends ContextSchema>(id: string, getters: Getters<S>) => {
  return <F extends keyof S>(field: '~' | F) => {
    if (field === '~') {
      return keysOf(getters).reduce((context, field) => ({
        ...context,
        [field]: getters[field](),
      }), {} as Context<S>)
    }

    if (field in getters) {
      return getters[field]()
    }

    throw new Error(`[crm:embed:host] Field ${String(field)} is not supported in context ${id}`)
  }
}

const createSetter = <S extends ContextSchema>(id: string, setters: Setters<S>) => {
  return <F extends keyof Writable<S>>(field: F, value: Context<S>[F]) => {
    if (field in setters) {
      setters[field](value)
      return
    }

    throw new Error(`[crm:embed:host] Setting field ${String(field)} is not supported in context ${id}`)
  }
}

const createHandler = <S extends ContextSchema>(id: string, getters: Getters<S>) => {
  type EventName = keyof EventMap<S>
  type FieldName = keyof S

  const map = keysOf(getters).reduce((eventMap, field) => {
    eventMap[`change:${String(field)}` as EventName] = field as EventMap<S>[EventName]

    return eventMap
  }, {} as EventMap<S>)

  return <E extends keyof EventMap<S>>(event: E, handler: EventHandler<S, E>) => {
    if (!(event in map)) {
      throw new Error(`[crm:embed:host] Event ${String(event)} is not supported in context ${id}`)
    }

    retain(handler)

    watch(
      getters[map[event] as FieldName],
      handler as (payload: TypeOf<S[FieldName]>) => void
    )
  }
}

const createAccessor = <S extends ContextSchema>(
  id: string,
  getters: Getters<S>,
  setters: Setters<S>
) => {
  return {
    get: createGetter(id, getters),
    set: createSetter(id, setters),
    on: createHandler(id, getters),
  } as FieldAccessor<S>
}

export const createCustomerCardHostContext = (id: string) => {
  const data = reactive({
    id: null as number | null,
    externalId: null as string | null,
    email: '',
    phones: [] as string[],
  })

  return {
    data,
    accessor: createAccessor<CustomerCardSchema>(id, {
      'id': () => data.id,
      'externalId': () => data.externalId,
      'email': () => data.email,
      'phones': () => data.phones,
    }, {} as Setters<CustomerCardSchema>),
  }
}

export const createCustomerCardPhoneHostContext = (id: string) => {
  const data = reactive({
    value: '+381 11 2345678',
    index: 0,
  })

  return {
    data,
    accessor: createAccessor<CustomerCardPhoneSchema>(id, {
      'value': () => data.value,
      'index': () => data.index,
    }, {} as Setters<CustomerCardPhoneSchema>),
  }
}

export const createOrderCardHostContext = (id: string) => {
  const data = reactive({
    customer: {
      id: 1 as number | null,
      externalId: 'fake externalId' as string | null,
      number: 'fake number' as string | null,
      customerType: 'customer' as 'customer' | 'customer_corporate',
      lastName: 'fakeLastName' as string | null,
      firstName: 'fakeFirstName' as string | null,
      patronymic: 'fakePatronymic' as string | null,
      email: 'fake@gmail.com' as string | null,
      phone: '+381 11 2345678' as string | null,
      country: 'Ru' as string | null,
      currency: 'ru' as string,
      status: 'fakeStatus' as string,
      companyName: 'fake companyName' as string | null,
      companyLegalName: 'fake companyLegalName' as string | null,
      companyLegalAddress: 'fake companyLegalAddress' as string | null,
      companyINN: 'fake companyINN' as string | null,
      companyOKPO: 'fake companyOKPO' as string | null,
      companyBIK: 'fake companyBIK' as string | null,
      companyBank: 'fake companyBank' as string | null,
      companyBankAddress: 'fake companyBankAddress' as string | null,
      companyCorrAccount: 'fake companyCorrAccount' as string | null,
      companyBankAccount: 'fake companyBankAccount' as string | null,
    },
    delivery: {
      address: 'Улица Краља Милутина 2 11000 Београд Србија' as string | null,
    },
  })

  return {
    data,
    accessor: createAccessor<OrderCardSchema>(id, {
      'id': () => data.customer.id,
      'externalId': () => data.customer.externalId,
      'type': () => 'main',
      'site': () => 'shop',
      'number': () => data.customer.number,
      'customer.type': () => data.customer.customerType,
      'customer.lastName': () => data.customer.lastName,
      'customer.firstName': () => data.customer.firstName,
      'customer.patronymic': () => data.customer.patronymic,
      'customer.email': () => data.customer.email,
      'customer.phone': () => data.customer.phone,
      'country': () => data.customer.country,
      'currency': () => data.customer.currency,
      'status': () => data.customer.status,
      'company.name': () => data.customer.companyName,
      'company.legalName': () => data.customer.companyLegalName,
      'company.legalAddress': () => data.customer.companyLegalAddress,
      'company.INN': () => data.customer.companyINN,
      'company.OKPO': () => data.customer.companyOKPO,
      'company.BIK': () => data.customer.companyBIK,
      'company.bank': () => data.customer.companyBank,
      'company.bankAddress': () => data.customer.companyBankAddress,
      'company.corrAccount': () => data.customer.companyCorrAccount,
      'company.bankAccount': () => data.customer.companyBankAccount,
      'delivery.address': () => data.delivery.address,
    }, {
      'customer.lastName': (value) => { data.customer.lastName = value },
      'customer.firstName': (value) => { data.customer.firstName = value },
      'customer.patronymic': (value) => { data.customer.patronymic = value },
      'customer.email': (value) => { data.customer.email = value },
      'customer.phone': (value) => { data.customer.phone = value },
      'company.name': (value) => { data.customer.companyName = value },
      'company.legalName': (value) => { data.customer.companyLegalName = value },
      'company.legalAddress': (value) => { data.customer.companyLegalAddress = value },
      'company.INN': (value) => { data.customer.companyINN = value },
      'company.OKPO': (value) => { data.customer.companyOKPO = value },
      'company.BIK': (value) => { data.customer.companyBIK = value },
      'company.bank': (value) => { data.customer.companyBank = value },
      'company.bankAddress': (value) => { data.customer.companyBankAddress = value },
      'company.corrAccount': (value) => { data.customer.companyCorrAccount = value },
      'company.bankAccount': (value) => { data.customer.companyBankAccount = value },
      'delivery.address': (value) => { data.delivery.address = value },
    }),
  }
}

export const createSettingsHostContext = (id: string) => {
  const data = reactive({
    system: {
      locale: 'en-GB' as Locale,
    },
  })

  return {
    data,
    accessor: createAccessor<SettingsSchema>(id, {
      'system.locale': () => data.system.locale,
    }, {} as Setters<SettingsSchema>),
  }
}

export const createContextAccessor = <M extends ContextSchemaMap>(accessors: {
  [K in keyof M]: FieldAccessor<M[K]>
}): ContextAccessor<M> => {
  const guard = (context: keyof M) => {
    if (!(context in accessors)) {
      throw new Error(`[crm:embed:host] Context ${String(context)} is not available`)
    }
  }

  return {
    get <
      C extends keyof M,
      F extends keyof M[C]
    >(context: C, field: '~' | F) {
      guard(context)

      return accessors[context].get(field)
    },

    set (context, field, value){
      guard(context)

      accessors[context].set(field, value)
    },

    on (context, event, handler) {
      guard(context)

      accessors[context].on(event, handler)
    },
  }
}
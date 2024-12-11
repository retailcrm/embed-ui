import type { Schema } from '@retailcrm/embed-ui-v1-contexts/types/order/card'

import { createAccessor } from '~tests/__util__/createAccessor'
import { reactive } from 'vue'

export const createHostContext = (id: string) => {
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
    accessor: createAccessor<Schema>(id, {
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
import type { Schema } from '~types/context/order/card'

import { defineContext } from '@/context/store'

import {
  isExactly,
  isNull,
  isNumber,
  isString,
  oneOf,
} from '@/predicates'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'externalId': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'type': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'site': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'number': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'customer.type': {
    accepts: oneOf(
      isExactly('customer'),
      isExactly('customer_corporate')
    ),
    defaults: () => 'customer',
    readonly: true,
  },
  'customer.lastName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.firstName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.patronymic': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.phone': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'customer.email': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'country': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'currency': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'status': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'company.name': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.legalName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.legalAddress': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.INN': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.OKPO': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.BIK': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bank': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bankAddress': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.corrAccount': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'company.bankAccount': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
  'delivery.address': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: false,
  },
}

export const useContext = defineContext('order/card', schema)

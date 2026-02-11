import * as customerCard from '@/common/customer/card'
import * as customerCardPhone from '@/common/customer/card-phone'
import * as orderCard from '@/common/order/card'
import * as orderCardSettings from '@/common/order/card-settings'
import * as userCurrent from '@/common/user/current'

import * as orderPredicates from '@/predicates/order/card'

import * as remoteCustomerCard from '@/remote/customer/card'
import * as remoteCustomerCardPhone from '@/remote/customer/card-phone'
import * as remoteOrderCard from '@/remote/order/card'
import * as remoteOrderCardSettings from '@/remote/order/card-settings'
import * as remoteUserCurrent from '@/remote/user/current'
import * as remoteSettings from '@/remote/settings'

import {
  describe,
  expect,
  test,
} from 'vitest'

describe('context module contracts', () => {
  test('exports stable ids and schema objects from common modules', () => {
    expect(customerCard.id).toBe('customer/card')
    expect(customerCardPhone.id).toBe('customer/card:phone')
    expect(orderCard.id).toBe('order/card')
    expect(orderCardSettings.id).toBe('order/card:settings')
    expect(userCurrent.id).toBe('user/current')

    expect(customerCard.schema).toBeTypeOf('object')
    expect(customerCardPhone.schema).toBeTypeOf('object')
    expect(orderCard.schema).toBeTypeOf('object')
    expect(orderCardSettings.schema).toBeTypeOf('object')
    expect(userCurrent.schema).toBeTypeOf('object')
  })

  test('exports order predicate guards', () => {
    expect(orderPredicates.isDimensions).toBeTypeOf('function')
    expect(orderPredicates.isMoney).toBeTypeOf('function')
    expect(orderPredicates.isOffer).toBeTypeOf('function')
    expect(orderPredicates.isProduct).toBeTypeOf('function')
    expect(orderPredicates.isItem).toBeTypeOf('function')
    expect(orderPredicates.isCreateOrderItemInput).toBeTypeOf('function')
  })

  test('exports schema and useContext from remote modules', () => {
    expect(remoteCustomerCard.schema).toBeTypeOf('object')
    expect(remoteCustomerCardPhone.schema).toBeTypeOf('object')
    expect(remoteOrderCard.schema).toBeTypeOf('object')
    expect(remoteOrderCardSettings.schema).toBeTypeOf('object')
    expect(remoteUserCurrent.schema).toBeTypeOf('object')
    expect(remoteSettings.schema).toBeTypeOf('object')

    expect(remoteCustomerCard.useContext).toBeTypeOf('function')
    expect(remoteCustomerCardPhone.useContext).toBeTypeOf('function')
    expect(remoteOrderCard.useContext).toBeTypeOf('function')
    expect(remoteOrderCardSettings.useContext).toBeTypeOf('function')
    expect(remoteUserCurrent.useContext).toBeTypeOf('function')
    expect(remoteSettings.useContext).toBeTypeOf('function')
  })
})

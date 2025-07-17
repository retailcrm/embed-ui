import {
  isNumber,
  isShape,
  isString,
} from '@/predicates'

import {
  describe,
  expect,
  test,
} from 'vitest'

describe('isShape', () => {
  const isMoney = isShape({
    amount: [isNumber, true],
    currency: [isString, true],
  })

  test('validates structures', () => {
    const isProduct = isShape({
      id: [isNumber, true],
      name: [isString, true],
    })

    expect(isProduct(1)).toBe(false)
    expect(isProduct(null)).toBe(false)
    expect(isProduct('Yellow submarine')).toBe(false)
    expect(isProduct({ code: 'submarine' })).toBe(false)
    expect(isProduct({})).toBe(false)
    expect(isProduct({ id: 1 })).toBe(false)
    expect(isProduct({ name: 1 })).toBe(false)

    expect(isProduct({
      id: 1,
      name: 'Yellow submarine',
    })).toBe(true)

    const isProductWhereNameIsOptional = isShape({
      id: [isNumber, true],
      name: [isString, false],
    })

    expect(isProductWhereNameIsOptional(1)).toBe(false)
    expect(isProductWhereNameIsOptional(null)).toBe(false)
    expect(isProductWhereNameIsOptional('Yellow submarine')).toBe(false)
    expect(isProductWhereNameIsOptional({ code: 'submarine' })).toBe(false)
    expect(isProductWhereNameIsOptional({ name: 1 })).toBe(false)

    expect(isProductWhereNameIsOptional({ id: 1 })).toBe(true)
    expect(isProductWhereNameIsOptional({
      id: 1,
      name: 'Yellow submarine',
    })).toBe(true)
  })

  test('validates nested structures', () => {
    const isPrice = isShape({
      ...isMoney.shape,
      type: [isShape({
        id: [isNumber, true],
        code: [isString, true],
      }), true],
    })

    const isPriceWhereCodeIsOptional = isShape({
      ...isMoney.shape,
      type: [isShape({
        id: [isNumber, true],
        code: [isString, false],
      }), true],
    })

    const isProduct = isShape({
      id: [isNumber, true],
      name: [isString, true],
      color: [isString, true],
      price: [isPrice, true],
      cost: [isMoney, true],
    })

    expect(isProduct({
      id: 1,
      name: 'Yellow submarine',
    })).toBe(false)

    expect(isProduct({
      id: 1,
      name: 'Submarine',
      color: 'Yellow',
      price: {
        amount: 100,
        currency: 'USD',
        type: {
          id: 1,
          code: 'basic',
        },
      },
      cost: {
        amount: 100,
        currency: 'USD',
      },
    })).toBe(true)

    expect(isShape({
      id: [isNumber, true],
      name: [isString, true],
      color: [isString, true],
      price: [isPriceWhereCodeIsOptional, true],
      cost: [isMoney, true],
    })({
      id: 1,
      name: 'Submarine',
      color: 'Yellow',
      price: {
        amount: 100,
        currency: 'USD',
        type: {
          id: 1,
        },
      },
      cost: {
        amount: 100,
        currency: 'USD',
      },
    })).toBe(true)
  })
})
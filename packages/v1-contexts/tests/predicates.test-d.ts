import {
  isNumber,
  isShape,
  isString,
} from '@/predicates'
import {
  assertType,
  describe,
  expectTypeOf,
  it,
  test,
} from 'vitest'

type InferShape<S> = S extends (value: unknown) => value is infer U
  ? U
  : never

describe('isShape type inference', () => {
  test('infers required fields', () => {
    const isMoney = isShape({
      amount: [isNumber, true],
      currency: [isString, true],
    })

    assertType<(value: unknown) => value is {
      amount: number;
      currency: string;
    }>(isMoney)

    type Money = InferShape<typeof isMoney>

    expectTypeOf<Money>().toEqualTypeOf<{
      amount: number;
      currency: string;
    }>()

    assertType<Money>({
      amount: 100,
      currency: 'USD',
    })
  })

  it('keeps optional field as T | undefined and not as optional key', () => {
    const isProductWhereNameIsOptional = isShape({
      id: [isNumber, true],
      name: [isString, false],
    })

    assertType<(value: unknown) => value is {
      id: number;
      name: string | undefined;
    }>(isProductWhereNameIsOptional)

    type ProductWithOptionalName = InferShape<typeof isProductWhereNameIsOptional>

    expectTypeOf<ProductWithOptionalName>().toEqualTypeOf<{
      id: number;
      name: string | undefined;
    }>()

    assertType<ProductWithOptionalName>({
      id: 1,
      name: undefined,
    })

    // @ts-expect-error Current inference model marks optional fields as `T | undefined`, but not optional keys.
    assertType<ProductWithOptionalName>({
      id: 1,
    })
  })

  test('infers nested shapes and spread-based composition', () => {
    const isMoney = isShape({
      amount: [isNumber, true],
      currency: [isString, true],
    })

    const isPrice = isShape({
      ...isMoney.shape,
      type: [isShape({
        id: [isNumber, true],
        code: [isString, false],
      }), true],
    })

    type Price = InferShape<typeof isPrice>

    expectTypeOf<Price>().toEqualTypeOf<{
      amount: number;
      currency: string;
      type: {
        id: number;
        code: string | undefined;
      };
    }>()

    const isProduct = isShape({
      id: [isNumber, true],
      name: [isString, true],
      price: [isPrice, true],
      cost: [isMoney, true],
    })

    type Money = InferShape<typeof isMoney>

    assertType<(value: unknown) => value is {
      id: number;
      name: string;
      price: Price;
      cost: Money;
    }>(isProduct)

    type Product = InferShape<typeof isProduct>

    expectTypeOf<Product>().toEqualTypeOf<{
      id: number;
      name: string;
      price: {
        amount: number;
        currency: string;
        type: {
          id: number;
          code: string | undefined;
        };
      };
      cost: {
        amount: number;
        currency: string;
      };
    }>()
  })
})

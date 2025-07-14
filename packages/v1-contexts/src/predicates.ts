export type Predicate<T = unknown> = (value: unknown) => value is T
export type PredicateWithMeta<T = unknown> = Predicate<T> & {
  type: string,
}

export const withMeta = <T>(predicate: Predicate<T>, type: string): PredicateWithMeta<T> => {
  return Object.assign(predicate, { type })
}

export const isArray = withMeta((value: unknown): value is unknown[] => Array.isArray(value), 'unknown[]')
export const isBoolean = withMeta((value: unknown): value is boolean => typeof value === 'boolean', 'boolean')

export const isExactly = <T extends string | number>(expected: T) => {
  return withMeta((value: unknown): value is T => value === expected, JSON.stringify(expected))
}

export const isNull = withMeta((value: unknown): value is null => value === null, 'null')
export const isNumber = withMeta((value: unknown): value is number => typeof value === 'number', 'number')
export const isNumeric = withMeta((value: unknown): value is number | `${number}` => {
  return isNumber(value) || typeof value === 'string' && !isNaN(Number(value))
}, 'number | `${number}`')

export const isObject = withMeta((value: unknown): value is object => typeof value === 'object' && value !== null, 'object')
export const isString = withMeta((value: unknown): value is string => typeof value === 'string', 'string')
export const isSymbol = withMeta((value: unknown): value is string => typeof value === 'symbol', 'symbol')

export const isVoid = withMeta(
  (value: unknown): value is void => value === undefined,
  'void'
)

export const arrayOf = <T>(predicate: PredicateWithMeta<T>) => withMeta(
  (value: unknown): value is T[] => {
    return isArray(value) && value.every(predicate)
  },
  `Array<${predicate.type}>`
)

export const cortegeOf = <T extends PredicateWithMeta[]>(predicates: [...T]) => withMeta(
  (value: unknown): value is {
    [K in keyof T]: T[K] extends PredicateWithMeta<infer U> ? U : never
  } => {
    return isArray(value) &&
      value.length === predicates.length &&
      predicates.every((predicate, index) => predicate(value[index]))
  },
  `[${predicates.map(p => p.type).join(', ')}]`
)

export const oneOf = <T extends unknown[]>(
  ...predicates: [...{ [K in keyof T]: PredicateWithMeta<T[K]> }]
): PredicateWithMeta<T[number]> => withMeta(
  (value: unknown): value is T[number] => {
    return predicates.some(predicate => predicate(value))
  },
  predicates.map(p => p.type).join(' | ')
) as PredicateWithMeta<T[number]>

export type Shape<T extends object> = {
  [K in keyof T]: [Predicate<T[K]>, boolean]
}

// Without `any` inheritance does not work properly
// eslint-disable-next-line
type ExtractType<T extends Shape<any>> = {
  [K in keyof T]: T[K] extends [Predicate<infer U>, true]
    ? U
    : T[K] extends [Predicate<infer U>, false]
      ? U | undefined
      : never;
} extends infer O
  ? O
  : never

// Without `any` inheritance does not work properly
// eslint-disable-next-line
export const isShape = <S extends Shape<any>>(shape: S, type = 'object') => {
  const properties = Object.keys(shape)

  return withMeta((value: unknown): value is ExtractType<S> => {
    return typeof value === 'object' && value !== null && properties.every(p => {
      const config = shape[p as keyof S] as [Predicate, boolean] | Predicate
      const [predicate, required] = isArray(config) ? config : [config, true]
      if (!(p in value)) {
        return !required
      }

      return predicate(value[p as keyof object])
    })
  }, type)
}

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
export const isObject = withMeta((value: unknown): value is object => typeof value === 'object' && value !== null, 'object')
export const isString = withMeta((value: unknown): value is string => typeof value === 'string', 'string')

export const arrayOf = <T>(predicate: PredicateWithMeta<T>) => withMeta(
  (value: unknown): value is T[] => {
    return isArray(value) && value.every(predicate)
  },
  `Array<${predicate.type}>`
)

export const oneOf = (...predicates: PredicateWithMeta[]) => withMeta(
  ((value: unknown) => {
    return predicates.some(predicate => predicate(value))
  }) as Predicate,
  predicates.map(p => p.type).join(' | ')
)

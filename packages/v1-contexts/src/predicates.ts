export type Predicate<T = unknown> = (value: unknown) => value is T
export type PredicateWithMeta<T = unknown> = Predicate<T> & {
  type: string,
}

export const withMeta = <T>(predicate: Predicate<T>, type: string): PredicateWithMeta<T> => {
  return Object.assign(predicate, { type })
}

export const isExactly = <T extends string | number>(expected: T) => {
  return withMeta((value: unknown): value is T => value === expected, JSON.stringify(expected))
}

export const isNull = withMeta((value: unknown): value is null => value === null, 'null')
export const isNumber = withMeta((value: unknown): value is number => typeof value === 'number', 'number')
export const isString = withMeta((value: unknown): value is string => typeof value === 'string', 'string')

export const arrayOf = <T>(predicate: PredicateWithMeta<T>) => withMeta(
  (value: unknown): value is T[] => {
    return Array.isArray(value) && value.every(predicate)
  },
  `Array<${predicate.type}>`
)

export const oneOf = (...predicates: PredicateWithMeta[]) => withMeta(
  ((value: unknown) => {
    return predicates.some(predicate => predicate(value))
  }) as Predicate,
  predicates.map(p => p.type).join(' | ')
)

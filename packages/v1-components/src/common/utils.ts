export const expect = <V>(value: V) => ({
  toBeOneOf<T>(variants: Record<string, T>): boolean {
    return Object.values(variants).includes(value as unknown as T)
  },
})

export const pick = (attrs: Record<string, unknown>, criteria: (key: string) => boolean) => {
  return Object.keys(attrs).filter(criteria).reduce((picked, key) => ({
    ...picked,
    [key]: attrs[key],
  }), {} as typeof attrs)
}

export const without = <T extends object, E extends keyof T>(obj: T, exclude: E[]): Omit<T, E> => {
  const newObj = {} as Omit<T, E>

  Object.entries(obj).forEach(([key, value]) => {
    if (!exclude.includes(key as E)) {
      newObj[key as keyof Omit<T, E>] = value
    }
  })

  return newObj
}

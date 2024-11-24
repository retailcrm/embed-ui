export const expect = <V>(value: V) => ({
  toBeOneOf<T>(variants: Record<string, T>): boolean {
    return Object.values(variants).includes(value as unknown as T)
  },
})

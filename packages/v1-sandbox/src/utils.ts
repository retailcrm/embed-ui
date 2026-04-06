export const keysOf = <T extends object>(value: T): Array<keyof T> => Object.keys(value) as Array<keyof T>

export const clone = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map(item => clone(item)) as T
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.entries(value).reduce((all, [key, entry]) => ({
    ...all,
    [key]: clone(entry),
  }), {} as T)
}

export const syncRecord = <T>(target: Record<string, T>, source: Record<string, T>) => {
  Object.keys(target).forEach((key) => {
    if (!(key in source)) {
      delete target[key]
    }
  })

  Object.entries(source).forEach(([key, value]) => {
    target[key] = clone(value)
  })
}

export const syncArray = <T>(target: T[], source: T[]) => {
  target.splice(0, target.length, ...clone(source))
}

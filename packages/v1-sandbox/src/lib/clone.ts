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

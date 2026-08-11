type JsonValue =
  | JsonValue[]
  | boolean
  | null
  | number
  | string
  | { [key: string]: JsonValue }

const normalizeJsonValue = (value: unknown): JsonValue => {
  if (Array.isArray(value)) {
    return value.map(normalizeJsonValue)
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, normalizeJsonValue(item)])
    )
  }

  return value as JsonValue
}

export const areJsonValuesEqual = (left: unknown, right: unknown): boolean =>
  JSON.stringify(normalizeJsonValue(left)) === JSON.stringify(normalizeJsonValue(right))

export const isContextJsonEqual = (source: string, contexts: unknown): boolean => {
  try {
    return areJsonValuesEqual(JSON.parse(source), contexts)
  } catch {
    return false
  }
}

export const keysOf = <T extends object>(value: T): Array<keyof T> =>
  Object.keys(value) as Array<keyof T>

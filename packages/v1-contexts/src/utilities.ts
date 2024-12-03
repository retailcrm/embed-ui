export const keysOf = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[]

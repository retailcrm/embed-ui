import { clone } from '@/lib/clone'

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

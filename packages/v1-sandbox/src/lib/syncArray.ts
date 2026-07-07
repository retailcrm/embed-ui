import { clone } from '@/lib/clone'

export const syncArray = <T>(target: T[], source: T[]) => {
  target.splice(0, target.length, ...clone(source))
}

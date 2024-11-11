import type { HTMLAttributes } from 'vue'

export type RemoteProperties<T> = HTMLAttributes & T & Record<string, never>

import type { WorkerReadyMessage } from '@/app/types'

export const isContextName = <T extends object>(
  contexts: T,
  value: string
): value is Extract<keyof T, string> =>
    value in contexts

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isWorkerReadyMessage = (
  value: unknown
): value is WorkerReadyMessage =>
  isRecord(value) && typeof value.type === 'string'

import type { SandboxOrderTarget } from '@/scenario/types'

import { ORDER_SANDBOX_TARGETS } from '@/scenario/targets'

export const isObjectKey = <T extends object>(
  object: T,
  value: PropertyKey
): value is Extract<keyof T, string> =>
    value in object

export const isSandboxOrderTarget = (value: string): value is SandboxOrderTarget =>
  ORDER_SANDBOX_TARGETS.includes(value as (typeof ORDER_SANDBOX_TARGETS)[number])

export const isJavascriptMimeType = (contentType: string): boolean => {
  const mimeType = contentType.toLowerCase()

  return mimeType.includes('javascript') || mimeType.includes('ecmascript')
}

export const isHtmlMimeType = (contentType: string): boolean => {
  const mimeType = contentType.toLowerCase()

  return mimeType.includes('text/html')
}

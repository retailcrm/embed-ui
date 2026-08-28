import type { SandboxExtensionDescriptor } from '@/scenario/types'

import { z } from 'zod'

const nonEmptyString = z.string().transform(value => value.trim()).pipe(z.string().min(1))
const absoluteHttpUrl = nonEmptyString.refine((value) => {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
})

const sandboxExtensionDescriptorSchema = z.object({
  code: nonEmptyString,
  baseUrl: absoluteHttpUrl,
  entrypoint: nonEmptyString,
  stylesheet: z.union([nonEmptyString, z.null()]),
  pages: z.array(nonEmptyString),
  targets: z.array(nonEmptyString),
}).strict().superRefine((descriptor, context) => {
  validateResourceUrl(descriptor.entrypoint, descriptor.baseUrl, ['entrypoint'], context)

  if (descriptor.stylesheet) {
    validateResourceUrl(descriptor.stylesheet, descriptor.baseUrl, ['stylesheet'], context)
  }
})

const validateResourceUrl = (
  value: string,
  baseUrl: string,
  path: string[],
  context: z.RefinementCtx
): void => {
  if (resolvesToHttpUrl(value, baseUrl)) return

  context.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Resource URL must resolve to an absolute http/https URL.',
    path,
  })
}

const resolvesToHttpUrl = (value: string, baseUrl: string): boolean => {
  try {
    const url = new URL(value, normalizeSandboxExtensionBaseUrl(baseUrl))

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const normalizeSandboxExtensionBaseUrl = (value: string): string => {
  const url = new URL(value)

  if (!url.pathname.endsWith('/')) url.pathname = `${url.pathname}/`

  return url.href
}

export const resolveSandboxExtensionResourceUrl = (
  value: string,
  baseUrl: string
): URL => new URL(value, normalizeSandboxExtensionBaseUrl(baseUrl))

export const parseSandboxExtensionDescriptor = (
  value: unknown
): SandboxExtensionDescriptor => {
  const result = sandboxExtensionDescriptorSchema.safeParse(value)

  if (!result.success) {
    throw new Error('[sandbox:descriptor] Invalid extension descriptor.')
  }

  return result.data as SandboxExtensionDescriptor
}

export const parseSandboxExtensionDescriptorJson = (
  value: string
): SandboxExtensionDescriptor => {
  let parsed: unknown

  try {
    parsed = JSON.parse(value) as unknown
  } catch {
    throw new Error('[sandbox:descriptor] Invalid extension descriptor JSON.')
  }

  return parseSandboxExtensionDescriptor(parsed)
}

export const serializeSandboxExtensionDescriptor = (
  descriptor: SandboxExtensionDescriptor,
  space?: number
): string => JSON.stringify(descriptor, null, space)

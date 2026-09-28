import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

import type { SandboxExtensionDescriptor } from '@/scenario/types'

import { z } from 'zod'

import { targets } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

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
  entrypoint: absoluteHttpUrl,
  pages: z.array(nonEmptyString),
  runner: z.literal('worker'),
  stylesheet: z.union([absoluteHttpUrl, z.null()]),
  targets: z.array(nonEmptyString.refine(
    (value): value is TargetName => Object.hasOwn(targets, value)
  )),
}).strict()

export const parseSandboxExtensionDescriptor = (
  value: unknown
): SandboxExtensionDescriptor => {
  const result = sandboxExtensionDescriptorSchema.safeParse(value)

  if (!result.success) {
    throw new Error('[sandbox:descriptor] Invalid extension descriptor.')
  }

  return result.data
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

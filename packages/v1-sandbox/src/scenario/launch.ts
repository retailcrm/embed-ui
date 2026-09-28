import type { SandboxLaunchConfig } from '@/scenario/types'

import { z } from 'zod'

import { DEFAULT_SANDBOX_TARGETS } from '@/scenario/targets'
import { DefaultSandbox } from '@/scenario/defaults'
import { isSandboxOrderTarget } from '@/scenario/predicates'
import { parseSandboxExtensionDescriptor } from '@/scenario/descriptor'

export const createSandboxLaunchConfig = (
  input: Partial<SandboxLaunchConfig> = {},
  current?: SandboxLaunchConfig
): SandboxLaunchConfig => ({
  fixture: DefaultSandbox.Fixture,
  mode: DefaultSandbox.Mode,
  pageCode: DefaultSandbox.PageCode,
  ...current,
  ...input,
  targets: [...(input.targets
    ?? input.descriptor?.targets.filter(isSandboxOrderTarget)
    ?? current?.targets
    ?? DEFAULT_SANDBOX_TARGETS)],
})

const launchConfigSchema = z.object({
  descriptor: z.unknown().transform(parseSandboxExtensionDescriptor),
  fixture: z.string().min(1),
  mode: z.enum(['page', 'widget']),
  pageCode: z.string(),
  targets: z.array(z.string().refine(isSandboxOrderTarget)),
}).refine(config => config.mode !== 'widget' || config.targets.length > 0, {
  message: 'Select at least one widget target.',
  path: ['targets'],
})

export const parseSandboxLaunchConfig = (value: unknown): SandboxLaunchConfig =>
  launchConfigSchema.parse(value)

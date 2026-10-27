import type { SandboxFixtureCode } from '@/scenario/fixtures/registry'
import type { SandboxLaunchConfig, SandboxTarget } from '@/scenario/types'

import { z } from 'zod'

import { DefaultSandbox } from '@/scenario/defaults'
import {
  getDefaultSandboxTargets,
  isSandboxFixtureCode,
} from '@/scenario/fixtures/registry'
import { isSandboxTarget } from '@/scenario/predicates'
import { isTargetForSandboxFixture } from '@/scenario/fixtures/registry'
import { parseSandboxExtensionDescriptor } from '@/scenario/descriptor'

export const createSandboxLaunchConfig = (
  input: Partial<SandboxLaunchConfig> = {},
  current?: SandboxLaunchConfig
): SandboxLaunchConfig => {
  const descriptorTargets = input.descriptor?.targets.filter(isSandboxTarget)
  const targets = input.targets ?? descriptorTargets ?? current?.targets
  let fixture = input.fixture ?? current?.fixture ?? DefaultSandbox.Fixture

  if (!input.fixture && targets?.length && !targets.some(target => isTargetForSandboxFixture(target, fixture))) {
    fixture = targets[0].startsWith('ticket/view:') ? 'ticket-basic' : DefaultSandbox.Fixture
  }

  return {
    mode: DefaultSandbox.Mode,
    pageCode: DefaultSandbox.PageCode,
    ...current,
    ...input,
    fixture,
    targets: [...(input.targets
      ?? descriptorTargets?.filter(target => isTargetForSandboxFixture(target, fixture))
      ?? (current?.targets.every(target => isTargetForSandboxFixture(target, fixture))
        ? current.targets : getDefaultSandboxTargets(fixture)))],
  }
}

const launchConfigSchema = z.object({
  descriptor: z.unknown().transform(parseSandboxExtensionDescriptor),
  fixture: z.custom<SandboxFixtureCode>(
    value => typeof value === 'string' && isSandboxFixtureCode(value)
  ),
  mode: z.enum(['page', 'widget']),
  pageCode: z.string(),
  targets: z.array(z.custom<SandboxTarget>(
    value => typeof value === 'string' && isSandboxTarget(value)
  )),
}).refine(config => config.mode !== 'widget' || config.targets.every(target => isTargetForSandboxFixture(target, config.fixture)), {
  message: 'Widget targets must match the selected fixture.',
  path: ['targets'],
}).refine(config => config.mode !== 'widget' || config.targets.length > 0, {
  message: 'Select at least one widget target.',
  path: ['targets'],
})

export const parseSandboxLaunchConfig = (value: unknown): SandboxLaunchConfig =>
  launchConfigSchema.parse(value)

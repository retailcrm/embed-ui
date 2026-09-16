import type {
  ParseSandboxLaunchConfigOptions,
  SandboxLaunchConfig,
  SandboxLaunchMode,
  SandboxOrderTarget,
} from '@/scenario/types'

import { DEFAULT_SANDBOX_TARGET } from '@/scenario/targets'
import { DefaultSandbox } from '@/scenario/defaults'
import { isSandboxOrderTarget } from '@/scenario/predicates'
import {
  parseSandboxExtensionDescriptor,
  parseSandboxExtensionDescriptorJson,
  serializeSandboxExtensionDescriptor,
} from '@/scenario/descriptor'

export type {
  ParseSandboxLaunchConfigOptions,
  SandboxLaunchConfig,
  SandboxLaunchMode,
} from '@/scenario/types'

export const parseSandboxLaunchConfig = (
  params: URLSearchParams,
  options: ParseSandboxLaunchConfigOptions = {}
): SandboxLaunchConfig => {
  const descriptor = parseDescriptorParam(params.get('descriptor')) ?? options.descriptor
  const descriptorTargets = descriptor?.targets.filter(isSandboxOrderTarget) ?? []
  const target = params.get('target') ?? options.targets?.[0]
  const targets = parseTargetsParam(params.get('targets'))
    ?? options.targets
    ?? (target && isSandboxOrderTarget(target) ? [target] : null)
    ?? (descriptorTargets.length > 0 ? descriptorTargets : [DEFAULT_SANDBOX_TARGET])

  return {
    ...(descriptor ? { descriptor } : {}),
    fixture: readStringParam(
      params,
      'fixture',
      options.fixture ?? DefaultSandbox.Fixture
    ),
    mode: parseMode(params.get('mode')) ?? options.mode ?? DefaultSandbox.Mode,
    pageCode: readStringParam(
      params,
      'pageCode',
      options.pageCode ?? DefaultSandbox.PageCode
    ),
    targets: targets.length > 0 ? targets : [DEFAULT_SANDBOX_TARGET],
  }
}

export const updateSandboxLaunchQuery = (
  config: SandboxLaunchConfig,
  base = window.location.href
): URL => {
  const url = new URL(base)
  const descriptor = parseSandboxExtensionDescriptor(config.descriptor)

  url.searchParams.set('descriptor', serializeSandboxExtensionDescriptor(descriptor))

  url.searchParams.set('fixture', config.fixture)
  url.searchParams.set('mode', config.mode)
  url.searchParams.set('pageCode', config.pageCode)
  url.searchParams.set('target', config.targets[0] ?? DEFAULT_SANDBOX_TARGET)
  url.searchParams.set('targets', config.targets.join(','))

  return url
}

const parseDescriptorParam = (
  value: string | null
): SandboxLaunchConfig['descriptor'] => value
  ? parseSandboxExtensionDescriptorJson(value)
  : undefined

const readStringParam = (
  params: URLSearchParams,
  key: string,
  fallback: string
): string => {
  const value = params.get(key)?.trim()

  return value || fallback
}

const parseMode = (value: string | null): SandboxLaunchMode | null => {
  if (value === 'page' || value === 'widget') return value

  return null
}

const parseTargetsParam = (value: string | null): SandboxOrderTarget[] | null => {
  if (!value) return null

  const targets = value
    .split(',')
    .map(target => target.trim())
    .filter(isSandboxOrderTarget)

  return targets.length > 0 ? targets : null
}

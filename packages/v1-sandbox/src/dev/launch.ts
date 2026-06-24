import type {
  ParseSandboxLaunchConfigOptions,
  SandboxLaunchConfig,
  SandboxLaunchMode,
  SandboxOrderTarget,
} from '@/dev/types'

import { DEFAULT_SANDBOX_TARGET } from '@/dev/targets'
import { DefaultSandbox } from '@/enum'
import { isSandboxOrderTarget } from '@/dev/predicates'

export type {
  ParseSandboxLaunchConfigOptions,
  SandboxLaunchConfig,
  SandboxLaunchMode,
} from '@/dev/types'

export const createDefaultSandboxManifestUrl = (): string => DefaultSandbox.Url

export const parseSandboxLaunchConfig = (
  params: URLSearchParams,
  options: ParseSandboxLaunchConfigOptions = {}
): SandboxLaunchConfig => {
  const target = params.get('target') ?? options.targets?.[0] ?? DEFAULT_SANDBOX_TARGET
  const targets = parseTargetsParam(params.get('targets')) ?? options.targets ?? [
    isSandboxOrderTarget(target) ? target : DEFAULT_SANDBOX_TARGET,
  ]

  return {
    code: readOptionalStringParam(
      params,
      'code',
      options.code ?? ''
    ),
    extensionUrl: readStringParam(
      params,
      'extensionUrl',
      options.extensionUrl ?? DefaultSandbox.Url
    ),
    fixture: readStringParam(
      params,
      'fixture',
      options.fixture ?? DefaultSandbox.Fixture
    ),
    manifestUrl: readOptionalStringParam(
      params,
      'manifestUrl',
      options.manifestUrl ?? DefaultSandbox.Url
    ),
    mode: parseMode(params.get('mode')) ?? options.mode ?? DefaultSandbox.Mode,
    pageCode: readStringParam(
      params,
      'pageCode',
      options.pageCode ?? DefaultSandbox.PageCode
    ),
    targets: targets.length > 0 ? targets : [DEFAULT_SANDBOX_TARGET],
    widgetId: readStringParam(
      params,
      'widgetId',
      options.widgetId ?? DefaultSandbox.WidgetId
    ),
  }
}

export const updateSandboxLaunchQuery = (
  config: SandboxLaunchConfig,
  base = window.location.href
): URL => {
  const url = new URL(base)

  url.searchParams.set('extensionUrl', config.extensionUrl)
  url.searchParams.set('code', config.code)
  url.searchParams.set('fixture', config.fixture)
  url.searchParams.set('manifestUrl', config.manifestUrl)
  url.searchParams.set('mode', config.mode)
  url.searchParams.set('pageCode', config.pageCode)
  url.searchParams.set('target', config.targets[0] ?? DEFAULT_SANDBOX_TARGET)
  url.searchParams.set('targets', config.targets.join(','))
  url.searchParams.set('widgetId', config.widgetId)

  return url
}

const readStringParam = (
  params: URLSearchParams,
  key: string,
  fallback: string
): string => {
  const value = params.get(key)?.trim()

  return value || fallback
}

const readOptionalStringParam = (
  params: URLSearchParams,
  key: string,
  fallback: string
): string => {
  if (!params.has(key)) return fallback

  return params.get(key)?.trim() ?? ''
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

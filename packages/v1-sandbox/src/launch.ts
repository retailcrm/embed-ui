import type { SandboxOrderTarget } from '@/targets'

import { DEFAULT_SANDBOX_TARGET, isSandboxOrderTarget } from '@/targets'

export const DEFAULT_SANDBOX_EXTENSION_URL = '/src/demo-extension.ts'
export const DEFAULT_SANDBOX_FIXTURE = 'order-basic'
export const DEFAULT_SANDBOX_MODE = 'widget'
export const DEFAULT_SANDBOX_PAGE_CODE = 'orders-dashboard'
export const DEFAULT_SANDBOX_WIDGET_ID = 'sandbox-widget'

export type SandboxLaunchMode = 'page' | 'widget'

export type SandboxLaunchConfig = {
  extensionUrl: string;
  fixture: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxOrderTarget[];
  widgetId: string;
}

export type ParseSandboxLaunchConfigOptions = Partial<SandboxLaunchConfig>

export const parseSandboxLaunchConfig = (
  params: URLSearchParams,
  options: ParseSandboxLaunchConfigOptions = {}
): SandboxLaunchConfig => {
  const target = params.get('target') ?? options.targets?.[0] ?? DEFAULT_SANDBOX_TARGET
  const targets = parseTargetsParam(params.get('targets')) ?? options.targets ?? [
    isSandboxOrderTarget(target) ? target : DEFAULT_SANDBOX_TARGET,
  ]

  return {
    extensionUrl: readStringParam(
      params,
      'extensionUrl',
      options.extensionUrl ?? DEFAULT_SANDBOX_EXTENSION_URL
    ),
    fixture: readStringParam(
      params,
      'fixture',
      options.fixture ?? DEFAULT_SANDBOX_FIXTURE
    ),
    mode: parseMode(params.get('mode')) ?? options.mode ?? DEFAULT_SANDBOX_MODE,
    pageCode: readStringParam(
      params,
      'pageCode',
      options.pageCode ?? DEFAULT_SANDBOX_PAGE_CODE
    ),
    targets: targets.length > 0 ? targets : [DEFAULT_SANDBOX_TARGET],
    widgetId: readStringParam(
      params,
      'widgetId',
      options.widgetId ?? DEFAULT_SANDBOX_WIDGET_ID
    ),
  }
}

export const updateSandboxLaunchQuery = (
  config: SandboxLaunchConfig,
  base = window.location.href
): URL => {
  const url = new URL(base)

  url.searchParams.set('extensionUrl', config.extensionUrl)
  url.searchParams.set('fixture', config.fixture)
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

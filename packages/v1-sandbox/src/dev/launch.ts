import type { SandboxOrderTarget } from '@/dev/targets'

import { DEFAULT_SANDBOX_TARGET, isSandboxOrderTarget } from '@/dev/targets'

export const DEFAULT_SANDBOX_EXTENSION_URL = '/src/demo-extension/index.ts'
export const DEFAULT_SANDBOX_FIXTURE = 'order-basic'
export const DEFAULT_SANDBOX_MANIFEST_URL = ''
export const DEFAULT_SANDBOX_MODE = 'widget'
export const DEFAULT_SANDBOX_PAGE_CODE = 'orders-dashboard'
export const DEFAULT_SANDBOX_WIDGET_ID = 'sandbox-widget'
export const CORE_UI_EXTENSION_EXAMPLE_BASE_URL = 'http://web-extensions-server.simla.local'
export const CORE_UI_EXTENSION_EXAMPLE_ENTRYPOINT_URL = 'http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7'
export const CORE_UI_EXTENSION_EXAMPLE_PAGE_CODE = 'returns'
export const CORE_UI_EXTENSION_EXAMPLE_TARGET = 'order/card:common.after'

export type SandboxLaunchMode = 'page' | 'widget'

export type SandboxLaunchConfig = {
  extensionUrl: string;
  fixture: string;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxOrderTarget[];
  widgetId: string;
}

export type ParseSandboxLaunchConfigOptions = Partial<SandboxLaunchConfig>

export const createDefaultSandboxManifestUrl = (): string => DEFAULT_SANDBOX_MANIFEST_URL

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
    manifestUrl: readOptionalStringParam(
      params,
      'manifestUrl',
      options.manifestUrl ?? DEFAULT_SANDBOX_MANIFEST_URL
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

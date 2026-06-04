import type { SandboxOrderTarget } from '@/targets'

import { DEFAULT_SANDBOX_TARGET, isSandboxOrderTarget } from '@/targets'

export const DEFAULT_SANDBOX_EXTENSION_URL = '/src/demo-extension.ts'
export const DEFAULT_SANDBOX_FIXTURE = 'order-basic'
export const DEFAULT_SANDBOX_WIDGET_ID = 'sandbox-widget'

export type SandboxLaunchConfig = {
  extensionUrl: string;
  fixture: string;
  target: SandboxOrderTarget;
  widgetId: string;
}

export type ParseSandboxLaunchConfigOptions = Partial<SandboxLaunchConfig>

export const parseSandboxLaunchConfig = (
  params: URLSearchParams,
  options: ParseSandboxLaunchConfigOptions = {}
): SandboxLaunchConfig => {
  const target = params.get('target') ?? options.target ?? DEFAULT_SANDBOX_TARGET

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
    target: isSandboxOrderTarget(target) ? target : DEFAULT_SANDBOX_TARGET,
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
  url.searchParams.set('target', config.target)
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

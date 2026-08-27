import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

export type SandboxOrderTarget = Extract<TargetName, `order/card:${string}`>

export type SandboxSlotDefinition = {
  id: string;
  label: string;
  target: SandboxOrderTarget;
}

export type SandboxLaunchMode = 'page' | 'widget'

export type SandboxLaunchConfig = {
  descriptor?: SandboxExtensionDescriptor;
  extensionUrl: string;
  fixture: string;
  manifestUrl: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxOrderTarget[];
  widgetId: string;
}

export type ParseSandboxLaunchConfigOptions = Partial<SandboxLaunchConfig>

export type SandboxExtensionDescriptor = {
  code: string;
  baseUrl: string;
  entrypoint: string;
  stylesheet: string | null;
  pages: string[];
  targets: TargetName[];
}

export type SandboxExtensionSource = {
  descriptor: SandboxExtensionDescriptor;
  entrypoint: URL;
  httpBaseUrl: string | null;
  manifestUrl: string | null;
}

export type FetchLike = typeof fetch

export type ResolveSandboxExtensionSourceOptions = {
  fetch?: FetchLike;
}

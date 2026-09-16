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
  entrypoint: string;
  pages: string[];
  runner: 'worker';
  stylesheet: string | null;
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

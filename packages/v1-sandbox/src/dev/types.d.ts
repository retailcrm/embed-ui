import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

export type SandboxOrderTarget = Extract<TargetName, `order/card:${string}`>

export type SandboxSlotDefinition = {
  id: string;
  label: string;
  target: SandboxOrderTarget;
}

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

export type SandboxExtensionRunner = 'iframe' | 'worker'

export type SandboxExtensionDescriptor = {
  entrypoint: string;
  pages: string[];
  runner: SandboxExtensionRunner;
  stylesheet: string | null;
  targets: TargetName[];
  uuid: string;
}

export type SandboxExtensionSource = {
  descriptor: SandboxExtensionDescriptor;
  entrypoint: URL;
  manifestUrl: string | null;
}

export type FetchLike = typeof fetch

export type ResolveSandboxExtensionSourceOptions = {
  fetch?: FetchLike;
}

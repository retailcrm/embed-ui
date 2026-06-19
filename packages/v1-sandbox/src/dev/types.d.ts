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

export type SandboxExtensionPage = {
  code: string;
}

export type SandboxExtensionDescriptor = {
  entrypoint: string;
  pages: string[];
  runner: SandboxExtensionRunner;
  stylesheet: string | null;
  targets: string[];
  uuid: string;
}

export type SandboxExtensionManifest = {
  code?: string;
  entrypoint?: string;
  pages?: Array<string | SandboxExtensionPage>;
  runner?: SandboxExtensionRunner;
  scripts?: string[];
  stylesheet?: string | null;
  targets?: string[];
  uuid?: string;
  version?: string;
}

export type SandboxExtensionSource = {
  descriptor: SandboxExtensionDescriptor;
  entrypoint: URL;
  manifest: SandboxExtensionManifest | null;
  manifestUrl: string | null;
}

export type FetchLike = typeof fetch

export type ResolveSandboxExtensionSourceOptions = {
  fetch?: FetchLike;
}

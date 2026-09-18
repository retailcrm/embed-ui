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
  fixture: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxOrderTarget[];
}

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
}

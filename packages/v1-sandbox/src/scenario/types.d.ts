import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

export type SandboxOrderTarget = Extract<TargetName, `order/card:${string}`>

export type SandboxTicketTarget = Extract<TargetName, `ticket/view:${string}`>

export type SandboxTarget = SandboxOrderTarget | SandboxTicketTarget

export type SandboxSlotDefinition<T extends SandboxTarget = SandboxTarget> = {
  id: string;
  label: string;
  target: T;
}

export type SandboxLaunchMode = 'page' | 'widget'

export type SandboxLaunchConfig = {
  descriptor?: SandboxExtensionDescriptor;
  fixture: string;
  mode: SandboxLaunchMode;
  pageCode: string;
  targets: SandboxTarget[];
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

import type { InitOptions } from './args'

export const TARGET_SECTIONS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const

export type DependencySection = typeof TARGET_SECTIONS[number]
export type PackageJson = Record<string, unknown>

export interface Formatting {
  indent: string;
  newline: string;
  trailingNewline: boolean;
}

export interface InstallablePackage {
  id: string;
  name: string;
  section: DependencySection;
  description: string;
  hooks?: InstallablePackageHook[];
}

export interface InstallablePackageHook {
  type: 'agents' | 'config';
  binName: string;
  command: 'init-agents' | 'init-config';
  failureMode: 'advisory' | 'required';
  requiresMcp?: boolean;
}

export interface PackageChange {
  type: 'field' | 'install' | 'script' | 'update';
  section?: DependencySection;
  name: string;
  currentRange?: string | null;
  nextRange: string;
}

export interface InitChanges {
  preflight: string[];
  packageJson: PackageChange[];
  directories: string[];
  files: string[];
  agents: string[];
  mcp: string[];
  hooks: string[];
  install: string | null;
  skipped: string[];
  warnings: string[];
}

export type InitFileWriter = (
  filePath: string,
  content: string,
  options: InitOptions,
  changes: InitChanges
) => boolean

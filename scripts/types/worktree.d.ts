export type PackageExports =
  | string
  | Record<string, string | Record<string, string>>

export type PackageDependencies = Record<string, string>

export interface PackageManifest {
  name?: string;
  version?: string;
  license?: string;
  main?: string;
  module?: string;
  exports?: PackageExports;
  workspaces?: string[];
  dependencies?: PackageDependencies;
  devDependencies?: PackageDependencies;
  optionalDependencies?: PackageDependencies;
  peerDependencies?: PackageDependencies;
}

export type PackageNode = {
  name: string;
  level: number;
  version: string;
  path: string;
  main?: string;
  module?: string;
  exports?: PackageExports;
  dependencies: PackageDependencies;
  devDependencies: PackageDependencies;
  optionalDependencies: PackageDependencies;
  peerDependencies: PackageDependencies;
  workspaces: string[];
  worktree: PackageNode[];
  parentPath: string;
  parentWorkspace: string | null;
}
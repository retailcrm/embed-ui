import path from 'node:path'
import process from 'node:process'

import yargs from 'yargs'

export const PACKAGE_MANAGERS = ['yarn', 'npm', 'pnpm', 'bun'] as const

export type PackageManager = typeof PACKAGE_MANAGERS[number]

export interface UpdateOptions {
  command: 'update';
  target: string;
  version: string | null;
  dryRun: boolean;
  exact: boolean;
  add: boolean;
  packages: string[] | null;
}

export interface InitOptions {
  command: 'init';
  cwd: string;
  target: string | null;
  version: string | null;
  dryRun: boolean;
  exact: boolean;
  packages: string[] | null;
  with: string[] | null;
  packageManager: PackageManager | null;
  noInstall: boolean;
  force: boolean;
  forceDeps: boolean;
  fixSections: boolean;
  forceFiles: boolean;
  noDirs: boolean;
  dirs: string[] | null;
  srcDir: string | null;
  noTemplate: boolean;
  template: string;
  pageCode: string;
  widgetTarget: string;
  noAgents: boolean;
  forceAgents: boolean;
  agentsOnly: boolean;
  noMcp: boolean;
  forceMcp: boolean;
  mcpClientConfigs: string[] | null;
}

export type CliOptions = InitOptions | UpdateOptions

export const HELP_TEXT = `Usage:
  npx @retailcrm/embed-ui [target] [version] [options]
  npx @retailcrm/embed-ui init [target] [options]

Options:
  -t, --target <path>     Target path (default: current directory)
  -v, --version <ver>     Target version. If omitted, latest npm version is used
      --exact             Use exact version instead of range
      --dry-run           Show changes without writing package.json
      --add               Add selected embed-ui packages into one package.json
      --packages <list>   Comma-separated package ids or names for --add/init
      --cwd <path>        Project working directory for init
      --package-manager   Package manager for init installs
      --no-install        Do not run package manager install in init mode
      --force-deps        Replace incompatible existing init dependencies
      --fix-sections      Move init dependencies to expected package.json sections
      --no-agents         Do not create or update AGENTS.md in init mode
      --no-mcp            Do not add package MCP instructions in init mode
      --mcp-client-configs Comma-separated MCP client configs to create (cursor,junie,vscode)
  -h, --help              Show this help

Examples:
  npx @retailcrm/embed-ui
  npx @retailcrm/embed-ui --version 0.9.11
  npx @retailcrm/embed-ui ./my-project 0.9.11
  npx @retailcrm/embed-ui --target ./my-project --dry-run
  npx @retailcrm/embed-ui --add
  npx @retailcrm/embed-ui --add --packages components,contexts
  npx @retailcrm/embed-ui init ./web --package-manager yarn
`

const isSemverLike = (value: string): boolean => /^v?\d+\.\d+\.\d+/.test(value)
const stripLeadingV = (value: string): string => value.replace(/^v/, '')

export const parsePackageList = (value: string): string[] =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

export const parseInitArgs = (argv: string[]): InitOptions => {
  const normalizedArgv = argv.map((argument) => {
    if (argument === '--no-dirs') {
      return '--no-dirs-enabled'
    }

    if (argument === '--no-template') {
      return '--no-template-enabled'
    }

    return argument
  })
  const parsed = yargs(normalizedArgv)
    .scriptName('embed-ui')
    .usage('Usage: $0 init [target] [options]')
    .help(false)
    .version(false)
    .exitProcess(false)
    .strictOptions()
    .parserConfiguration({
      'camel-case-expansion': true,
      'boolean-negation': true,
    })
    .option('cwd', {
      type: 'string',
      default: process.cwd(),
      describe: 'Project working directory',
    })
    .option('help', {
      alias: 'h',
      type: 'boolean',
    })
    .option('target', {
      alias: 't',
      type: 'string',
      describe: 'Frontend target directory relative to cwd',
    })
    .option('version', {
      alias: 'v',
      type: 'string',
      coerce: stripLeadingV,
      describe: 'Target package version',
    })
    .option('packages', {
      type: 'string',
      coerce: parsePackageList,
      describe: 'Comma-separated init package ids or names',
    })
    .option('with', {
      type: 'string',
      coerce: parsePackageList,
      describe: 'Additional published package ids or names',
    })
    .option('package-manager', {
      type: 'string',
      choices: PACKAGE_MANAGERS,
      describe: 'Package manager used for install',
    })
    .option('dirs', {
      type: 'string',
      coerce: parsePackageList,
      describe: 'Comma-separated directory presets',
    })
    .option('src-dir', {
      type: 'string',
      describe: 'Frontend source root relative to cwd',
    })
    .option('template', {
      type: 'string',
      default: 'order-card',
      describe: 'Starter template name',
    })
    .option('page-code', {
      type: 'string',
      default: 'settings',
      describe: 'Starter embedded page code',
    })
    .option('widget-target', {
      type: 'string',
      default: 'order/card:common.after',
      describe: 'Starter widget target',
    })
    .option('dry-run', { type: 'boolean', default: false })
    .option('exact', { type: 'boolean', default: false })
    .option('install', { type: 'boolean', default: true })
    .option('force', { type: 'boolean', default: false })
    .option('force-deps', { type: 'boolean', default: false })
    .option('fix-sections', { type: 'boolean', default: false })
    .option('force-files', { type: 'boolean', default: false })
    .option('dirs-enabled', { type: 'boolean', default: true })
    .option('template-enabled', { type: 'boolean', default: true })
    .option('agents', { type: 'boolean', default: true })
    .option('force-agents', { type: 'boolean', default: false })
    .option('agents-only', { type: 'boolean', default: false })
    .option('mcp', { type: 'boolean', default: true })
    .option('force-mcp', { type: 'boolean', default: false })
    .option('mcp-client-configs', {
      type: 'string',
      coerce: parsePackageList,
      describe: 'Comma-separated MCP client config ids',
    })
    .parseSync()

  if (parsed.help || parsed.h) {
    console.log(HELP_TEXT)
    process.exit(0)
  }

  const positionals = parsed._.map(String)
  if (positionals.length > 1) {
    throw new Error('Too many positional arguments')
  }

  if (!parsed.mcp && parsed.mcpClientConfigs?.length) {
    throw new Error('Option --mcp-client-configs cannot be used together with --no-mcp')
  }

  return {
    command: 'init',
    cwd: path.resolve(process.cwd(), parsed.cwd),
    target: parsed.target ?? positionals[0] ?? null,
    version: parsed.version ?? null,
    dryRun: parsed.dryRun,
    exact: parsed.exact,
    packages: parsed.packages ?? null,
    with: parsed.with ?? null,
    packageManager: parsed.packageManager ?? null,
    noInstall: !parsed.install,
    force: parsed.force,
    forceDeps: parsed.forceDeps,
    fixSections: parsed.fixSections,
    forceFiles: parsed.forceFiles,
    noDirs: !parsed.dirsEnabled,
    dirs: parsed.dirs ?? null,
    srcDir: parsed.srcDir ?? null,
    noTemplate: !parsed.templateEnabled,
    template: parsed.template,
    pageCode: parsed.pageCode,
    widgetTarget: parsed.widgetTarget,
    noAgents: !parsed.agents,
    forceAgents: parsed.forceAgents,
    agentsOnly: parsed.agentsOnly,
    noMcp: !parsed.mcp,
    forceMcp: parsed.forceMcp,
    mcpClientConfigs: parsed.mcpClientConfigs ?? null,
  }
}

export const parseArgs = (argv: string[]): CliOptions => {
  if (argv[0] === 'init') {
    return parseInitArgs(argv.slice(1))
  }

  const parsed = yargs(argv)
    .scriptName('embed-ui')
    .usage('Usage: $0 [target] [version] [options]')
    .help(false)
    .version(false)
    .exitProcess(false)
    .strictOptions()
    .option('target', {
      alias: 't',
      type: 'string',
      default: process.cwd(),
    })
    .option('help', {
      alias: 'h',
      type: 'boolean',
    })
    .option('version', {
      alias: 'v',
      type: 'string',
      coerce: stripLeadingV,
    })
    .option('dry-run', { type: 'boolean', default: false })
    .option('exact', { type: 'boolean', default: false })
    .option('add', { type: 'boolean', default: false })
    .option('packages', {
      type: 'string',
      coerce: parsePackageList,
    })
    .parseSync()

  if (parsed.help || parsed.h) {
    console.log(HELP_TEXT)
    process.exit(0)
  }

  const positionals = parsed._.map(String)

  if (positionals.length > 2) {
    throw new Error('Too many positional arguments')
  }

  const options: UpdateOptions = {
    command: 'update',
    target: path.resolve(process.cwd(), parsed.target),
    version: parsed.version ?? null,
    dryRun: parsed.dryRun,
    exact: parsed.exact,
    add: parsed.add,
    packages: parsed.packages ?? null,
  }

  if (positionals.length >= 1) {
    const first = positionals[0]
    if (!options.version && isSemverLike(first)) {
      options.version = stripLeadingV(first)
    } else {
      options.target = path.resolve(process.cwd(), first)
    }
  }

  if (positionals.length === 2) {
    if (options.version) {
      throw new Error('Version is already specified')
    }

    options.version = stripLeadingV(positionals[1])
  }

  if (options.packages && !options.add) {
    throw new Error('Option --packages can only be used together with --add')
  }

  return options
}

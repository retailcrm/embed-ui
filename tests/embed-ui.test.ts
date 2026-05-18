// @vitest-environment node

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { isSameExecutablePath, parseArgs, parseInitArgs } from '../src/cmd/embed-ui'
import { resolvePackageHookCommand } from '../src/cmd/embed-ui/package-hook-runner'
import { runAdd, runInit, runUpdate } from '../src/cmd/embed-ui'

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'embed-ui-'))

const writeFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
}

const readJsonFile = <T>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath, 'utf8')) as T

describe('embed-ui CLI', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  test('updates package.json files in the whole subtree and preserves indentation', () => {
    const tempDir = createTempDir()
    const rootPackageJsonPath = path.join(tempDir, 'package.json')
    const nestedPackageJsonPath = path.join(tempDir, 'packages/app/package.json')
    const ignoredPackageJsonPath = path.join(tempDir, 'node_modules/ignored/package.json')

    writeFile(rootPackageJsonPath, [
      '{',
      '\t"name": "root-app",',
      '\t"dependencies": {',
      '\t\t"@retailcrm/embed-ui-v1-components": "^0.9.0"',
      '\t}',
      '}',
      '',
    ].join('\n'))

    writeFile(nestedPackageJsonPath, [
      '{',
      '    "name": "nested-app",',
      '    "dependencies": {',
      '        "@retailcrm/embed-ui-v1-contexts": "~0.8.0"',
      '    }',
      '}',
      '',
    ].join('\n'))

    writeFile(ignoredPackageJsonPath, [
      '{',
      '  "name": "ignored",',
      '  "dependencies": {',
      '    "@retailcrm/embed-ui-v1-types": "^0.1.0"',
      '  }',
      '}',
      '',
    ].join('\n'))

    vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runUpdate({
      command: 'update',
      target: tempDir,
      version: '1.2.3',
      dryRun: false,
      exact: false,
      add: false,
      packages: null,
    })

    expect(fs.readFileSync(rootPackageJsonPath, 'utf8')).toContain(
      '\t\t"@retailcrm/embed-ui-v1-components": "^1.2.3"'
    )
    expect(fs.readFileSync(nestedPackageJsonPath, 'utf8')).toContain(
      '        "@retailcrm/embed-ui-v1-contexts": "~1.2.3"'
    )
    expect(fs.readFileSync(ignoredPackageJsonPath, 'utf8')).toContain(
      '"@retailcrm/embed-ui-v1-types": "^0.1.0"'
    )
  })

  test('direct execution check accepts symlinked bin paths', () => {
    const tempDir = createTempDir()
    const realPath = path.join(tempDir, 'embed-ui.mjs')
    const symlinkPath = path.join(tempDir, 'embed-ui')

    writeFile(realPath, '#!/usr/bin/env node\n')
    fs.symlinkSync(realPath, symlinkPath)

    expect(isSameExecutablePath(symlinkPath, pathToFileURL(realPath).href)).toBe(true)
    expect(isSameExecutablePath(path.join(tempDir, 'missing'), pathToFileURL(realPath).href)).toBe(false)
  })

  test('add mode updates only the target package.json and preserves CRLF', async () => {
    const tempDir = createTempDir()
    const packageJsonPath = path.join(tempDir, 'package.json')
    const nestedPackageJsonPath = path.join(tempDir, 'packages/app/package.json')

    writeFile(
      packageJsonPath,
      '{\r\n    "name": "add-app"\r\n}\r\n'
    )

    writeFile(
      nestedPackageJsonPath,
      '{\n  "name": "nested-app"\n}\n'
    )

    vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await runAdd({
      command: 'update',
      target: tempDir,
      version: '2.0.0',
      dryRun: false,
      exact: false,
      add: true,
      packages: ['components', 'testing'],
    })

    const updatedPackageJson = fs.readFileSync(packageJsonPath, 'utf8')

    expect(updatedPackageJson.includes('\r\n')).toBe(true)
    expect(updatedPackageJson).toBe([
      '{',
      '    "name": "add-app",',
      '    "dependencies": {',
      '        "@retailcrm/embed-ui-v1-components": "^2.0.0"',
      '    },',
      '    "devDependencies": {',
      '        "@retailcrm/embed-ui-v1-testing": "^2.0.0"',
      '    }',
      '}',
      '',
    ].join('\r\n'))

    expect(fs.readFileSync(nestedPackageJsonPath, 'utf8')).toBe('{\n  "name": "nested-app"\n}\n')
  })

  test('parseArgs rejects --packages without --add', () => {
    expect(() => parseArgs(['--packages', 'components'])).toThrow(
      'Option --packages can only be used together with --add'
    )
  })

  test('parseArgs supports init command with cwd and frontend target', () => {
    const options = parseArgs([
      'init',
      './web',
      '--cwd',
      '/tmp/module',
      '--package-manager',
      'yarn',
      '--no-install',
      '--no-agents',
    ])

    expect(options.command).toBe('init')
    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    expect(options.target).toBe('./web')
    expect(options.cwd).toBe('/tmp/module')
    expect(options.packageManager).toBe('yarn')
    expect(options.noInstall).toBe(true)
    expect(options.noAgents).toBe(true)
  })

  test('parseArgs supports init dependency conflict controls', () => {
    const options = parseArgs([
      'init',
      '--force-deps',
      '--fix-sections',
      '--interactive',
      '--no-configs',
      '--no-install',
      '--no-agents',
    ])

    expect(options.command).toBe('init')
    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    expect(options.forceDeps).toBe(true)
    expect(options.fixSections).toBe(true)
    expect(options.interactive).toBe(true)
    expect(options.noConfigs).toBe(true)
  })

  test('interactive init mode requires a TTY', async () => {
    const tempDir = createTempDir()

    await expect(runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--interactive',
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
      ]),
      version: '1.2.3',
    })).rejects.toThrow('Interactive init mode requires a TTY')
  })

  test('parseArgs supports opt-in MCP client configs', () => {
    const options = parseArgs([
      'init',
      '--mcp-client-configs',
      'cursor,vscode',
      '--no-install',
      '--no-agents',
    ])

    expect(options.command).toBe('init')
    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    expect(options.mcpClientConfigs).toEqual(['cursor', 'vscode'])
  })

  test('parseInitArgs rejects testing package in init mode', async () => {
    const tempDir = createTempDir()

    await expect(runInit({
      ...parseInitArgs(['--cwd', tempDir, '--packages', 'testing', '--no-install', '--no-agents']),
      version: '1.2.3',
    })).rejects.toThrow('@retailcrm/embed-ui-v1-testing is not published for public init yet')
  })

  test('init mode creates package.json, configs and starter template without install', async () => {
    const tempDir = createTempDir()

    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    vi.stubEnv('LANG', 'ru_RU.UTF-8')

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
      ]),
      version: '1.2.3',
    })

    const packageJson = JSON.parse(fs.readFileSync(path.join(tempDir, 'package.json'), 'utf8'))

    expect(packageJson.type).toBe('module')
    expect(packageJson.scripts).toMatchObject({
      build: 'vite build',
      eslint: 'eslint .',
      'eslint:fix': 'eslint --fix .',
      'publish-extension': 'node scripts/publish-extension.mjs',
    })
    expect(packageJson.dependencies).toMatchObject({
      '@retailcrm/embed-ui': '^1.2.3',
      '@retailcrm/embed-ui-v1-components': '^1.2.3',
      '@retailcrm/embed-ui-v1-contexts': '^1.2.3',
      '@retailcrm/embed-ui-v1-endpoint': '^1.2.3',
      '@retailcrm/embed-ui-v1-types': '^1.2.3',
      '@omnicajs/vue-remote': '^0.2.23',
      pinia: '^2.2',
      vue: '^3.5',
      'vue-i18n': '^11',
    })
    expect(packageJson.devDependencies).toMatchObject({
      '@eslint/js': '^9.39',
      '@intlify/eslint-plugin-vue-i18n': '~4.3.0',
      '@intlify/unplugin-vue-i18n': '^11.1',
      '@omnicajs/eslint-plugin-dependencies': '^0.0.2',
      '@types/node': '^22.19',
      '@vitejs/plugin-vue': '^6.0',
      '@vue/language-server': '^3.2',
      eslint: '^9.39',
      'eslint-plugin-vue': '^10.9',
      globals: '^16.5',
      less: '^4.6',
      typescript: '^5.9',
      'typescript-eslint': '^8.59',
      vite: '^7.3',
      'vite-svg-loader': '^5.1',
      'vue-eslint-parser': '^10.4',
    })

    expect(fs.existsSync(path.join(tempDir, 'tsconfig.json'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, 'tsconfig.json'), 'utf8')).toContain('"resolveJsonModule": true')
    expect(fs.readFileSync(path.join(tempDir, 'env.d.ts'), 'utf8')).toContain('declare module \'*.svg\'')
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain(
      '@intlify/vue-i18n/no-dynamic-keys'
    )
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain(
      'pluginVueI18n.configs.recommended'
    )
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain(
      'order: [\'template\', \'script\', \'i18n\', \'style\']'
    )
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain(
      '\'vue/html-indent\': [\'error\', 4'
    )
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain(
      '\'vue/script-indent\': [\'error\', 2'
    )
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain('value-vue-components')
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain('partitions: {')
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain(
      '@intlify/unplugin-vue-i18n/vite'
    )
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain(
      '@omnicajs/vue-remote/vite-plugin'
    )
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain('vite-svg-loader')
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain('defaultImport: \'component\'')
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain('vueRemoteVitePlugin()')
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain('vueI18n({')
    expect(fs.readFileSync(path.join(tempDir, 'vite.config.ts'), 'utf8')).toContain(
      '\'@\': path.resolve(root, \'web\')'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/i18n/index.ts'), 'utf8')).toContain('./locales/en-GB.json')
    expect(fs.existsSync(path.join(tempDir, 'web/i18n/locales/ru-RU.json'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, 'web/endpoint/endpoint.worker.ts'), 'utf8')).toContain(
      '\'order/card:common.after\': defineWidgetRunner(OrderCommonAfterWidget, setupApp)'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/endpoint/endpoint.worker.ts'), 'utf8')).toContain(
      'const settings = useSettingsContext()'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/endpoint/endpoint.worker.ts'), 'utf8')).toContain(
      'i18n.global.locale.value = locale.value'
    )
    const settingsPage = fs.readFileSync(path.join(tempDir, 'web/pages/SettingsPage.vue'), 'utf8')
    const orderWidget = fs.readFileSync(path.join(tempDir, 'web/widgets/OrderCommonAfterWidget.vue'), 'utf8')

    expect(settingsPage.indexOf('<template>')).toBeLessThan(settingsPage.indexOf('<script'))
    expect(settingsPage.indexOf('<script')).toBeLessThan(settingsPage.indexOf('<i18n'))
    expect(settingsPage.indexOf('<i18n')).toBeLessThan(settingsPage.indexOf('<style'))
    expect(orderWidget.indexOf('<template>')).toBeLessThan(orderWidget.indexOf('<script'))
    expect(orderWidget.indexOf('<script')).toBeLessThan(orderWidget.indexOf('<i18n'))
    expect(orderWidget.indexOf('<i18n')).toBeLessThan(orderWidget.indexOf('<style'))

    expect(settingsPage).toContain(
      '<script lang="ts" remote setup>'
    )
    expect(settingsPage).toContain(
      '    <main :class="$style[\'settings-page\']">'
    )
    expect(settingsPage).toContain(
      '<style lang="less" module>'
    )
    expect(settingsPage).toContain(
      ':class="$style[\'settings-page\']"'
    )
    expect(settingsPage).toContain(
      ':class="$style[\'settings-form\']"'
    )
    expect(settingsPage).toContain(
      '@retailcrm/embed-ui-v1-components/assets/stylesheets/typography.less'
    )
    expect(settingsPage).toContain(
      '&__heading {'
    )
    expect(settingsPage).toContain(
      '.h4-accent(24px);'
    )
    expect(settingsPage).toContain(
      'import ExtensionIcon from \'@/shared/assets/extension.svg\''
    )
    expect(settingsPage).toContain(
      'UiPageHeader'
    )
    expect(settingsPage).toContain(
      'UiField'
    )
    expect(settingsPage).toContain(
      '<i18n locale="ru-RU" lang="json">'
    )
    expect(orderWidget).toContain(
      '<script lang="ts" remote setup>'
    )
    expect(orderWidget).toContain(
      '    <UiToolbarButton @click="openSidebar">'
    )
    expect(orderWidget).toContain(
      'useI18n({ useScope: \'local\' })'
    )
    expect(orderWidget).toContain(
      '<style lang="less" module>'
    )
    expect(orderWidget).toContain(
      '@retailcrm/embed-ui-v1-components/assets/stylesheets/typography.less'
    )
    expect(orderWidget).toContain(
      ':class="$style[\'order-widget-sidebar\']"'
    )
    expect(orderWidget).toContain(
      '&__lead {'
    )
    expect(orderWidget).toContain(
      '.text-small();'
    )
    expect(orderWidget).toContain(
      'UiToolbarButton'
    )
    expect(orderWidget).toContain(
      'UiModalSidebar'
    )
    expect(orderWidget).toContain(
      'UiModalWindow'
    )
    expect(fs.existsSync(path.join(tempDir, 'web/shared/assets/extension.svg'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, 'extensionrc.json'), 'utf8')).toContain(
      '"runner": "worker"'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/publish-extension.mjs'), 'utf8')).toContain(
      'extensionrc.json'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      '# Фронтенд расширения RetailCRM'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'Код страницы: `settings`'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'Цель виджета: `order/card:common.after`'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'npm run eslint'
    )
  })

  test('init preflight warns about incompatible dependencies without rewriting them', async () => {
    const tempDir = createTempDir()
    const packageJsonPath = path.join(tempDir, 'package.json')

    writeFile(packageJsonPath, JSON.stringify({
      name: 'existing-app',
      type: 'module',
      devDependencies: {
        vue: '^2.7.0',
      },
    }, null, 2))

    const logs: string[] = []
    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-template',
        '--dry-run',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('preflight')
    expect(output).toContain('package.json: found')
    expect(output).toContain('vue already exists in devDependencies; expected dependencies')
    expect(output).toContain('vue has range ^2.7.0; expected compatible ^3.5')
    expect(JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).devDependencies.vue).toBe('^2.7.0')
  })

  test('init preflight explains existing config and template gaps', async () => {
    const tempDir = createTempDir()

    writeFile(path.join(tempDir, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        moduleResolution: 'Node',
        paths: {
          '@/*': ['./src/*'],
        },
      },
    }, null, 2))
    writeFile(path.join(tempDir, 'vite.config.ts'), [
      'import { defineConfig } from \'vite\'',
      '',
      'export default defineConfig({})',
      '',
    ].join('\n'))
    writeFile(path.join(tempDir, 'eslint.config.js'), 'export default []\n')
    writeFile(path.join(tempDir, 'web/pages/SettingsPage.vue'), '<template />\n')
    writeFile(path.join(tempDir, 'README.md'), '# Existing project\n')

    const logs: string[] = []
    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--dry-run',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('tsconfig.json: moduleResolution is not "Bundler"')
    expect(output).toContain('tsconfig.json: resolveJsonModule is not enabled')
    expect(output).toContain('tsconfig.json: @/* path alias does not point to web/*')
    expect(output).toContain('@omnicajs/vue-remote/tooling plugin is missing')
    expect(output).toContain('vite.config.ts: @omnicajs/vue-remote/vite-plugin is missing')
    expect(output).toContain('vite.config.ts: vue-i18n Vite plugin is missing')
    expect(output).toContain('vite.config.ts: SVG component loader is missing')
    expect(output).toContain('vite.config.ts: @ alias is missing')
    expect(output).toContain('eslint.config.js: @intlify/eslint-plugin-vue-i18n is missing')
    expect(output).toContain('eslint.config.js: @omnicajs/eslint-plugin-dependencies is missing')
    expect(output).toContain('web/pages/SettingsPage.vue already exists; starter settings page will not be generated')
    expect(output).toContain('README.md already exists; generated project-level starter file will be skipped')
  })

  test('init can skip generated root configs', async () => {
    const tempDir = createTempDir()
    const logs: string[] = []

    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--no-configs',
        '--no-template',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('configs: disabled')
    expect(fs.existsSync(path.join(tempDir, 'tsconfig.json'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'vite.config.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'eslint.config.js'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'env.d.ts'))).toBe(false)
  })

  test('init delegates MCP setup to endpoint package hook', async () => {
    const tempDir = createTempDir()
    const logs: string[] = []

    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--dry-run',
        '--mcp-client-configs',
        'cursor,vscode',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('v1-endpoint init-config: enabled')
    expect(output).toContain('MCP client configs requested: cursor, vscode')
    expect(output).toContain('npm exec --yes --package @retailcrm/embed-ui-v1-endpoint -- embed-ui-v1-endpoint init-config')
    expect(output).toContain('--mcp-client-configs cursor,vscode')
  })

  test('package hooks prefer local bin and fall back to package-manager dlx commands', () => {
    const tempDir = createTempDir()
    const brokenInstallDir = createTempDir()
    const localBinPath = path.join(
      tempDir,
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'embed-ui-v1-endpoint.cmd' : 'embed-ui-v1-endpoint'
    )

    expect(
      resolvePackageHookCommand(
        tempDir,
        '@retailcrm/embed-ui-v1-endpoint',
        'embed-ui-v1-endpoint',
        'yarn',
        ['init-config', tempDir]
      ).display
    ).toContain('yarn dlx -p @retailcrm/embed-ui-v1-endpoint embed-ui-v1-endpoint init-config')

    writeFile(
      path.join(brokenInstallDir, 'node_modules/@retailcrm/embed-ui-v1-endpoint/package.json'),
      JSON.stringify({ name: '@retailcrm/embed-ui-v1-endpoint' })
    )

    expect(() => resolvePackageHookCommand(
      brokenInstallDir,
      '@retailcrm/embed-ui-v1-endpoint',
      'embed-ui-v1-endpoint',
      'npm',
      ['init-config', brokenInstallDir]
    )).toThrow('@retailcrm/embed-ui-v1-endpoint is installed, but embed-ui-v1-endpoint was not found')

    writeFile(localBinPath, '')

    expect(
      resolvePackageHookCommand(
        tempDir,
        '@retailcrm/embed-ui-v1-endpoint',
        'embed-ui-v1-endpoint',
        'npm',
        ['init-config', tempDir]
      )
    ).toEqual({
      command: localBinPath,
      args: ['init-config', tempDir],
      display: `${localBinPath} init-config ${tempDir}`,
      source: 'local',
    })
  })

  test('endpoint MCP force updates only managed client entries', () => {
    const tempDir = createTempDir()
    const endpointBin = path.resolve('packages/v1-endpoint/bin/embed-ui-v1-endpoint.mjs')
    const cursorConfigPath = path.join(tempDir, '.cursor/mcp.json')
    const vscodeConfigPath = path.join(tempDir, '.vscode/mcp.json')

    writeFile(cursorConfigPath, JSON.stringify({
      mcpServers: {
        'retailcrm-embed-ui-v1-endpoint': {
          command: 'old-command',
          args: ['old-args'],
        },
        'custom-user-server': {
          command: 'node',
          args: ['custom-server.mjs'],
        },
      },
    }, null, 2))

    writeFile(vscodeConfigPath, JSON.stringify({
      inputs: [
        {
          id: 'custom-token',
          type: 'promptString',
        },
      ],
      servers: {
        'retailcrm-embed-ui-v1-endpoint': {
          command: 'old-command',
          args: ['old-args'],
        },
        'custom-vscode-server': {
          command: 'node',
          args: ['vscode-server.mjs'],
        },
      },
    }, null, 2))

    execFileSync('node', [
      endpointBin,
      'init-config',
      tempDir,
      '--mcp-client-configs',
      'cursor,vscode',
      '--force',
    ])

    const cursorConfig = readJsonFile<{
      mcpServers: Record<string, { command: string; args: string[] }>;
    }>(cursorConfigPath)
    const vscodeConfig = readJsonFile<{
      inputs: Array<{ id: string; type: string }>;
      servers: Record<string, { command: string; args: string[] }>;
    }>(vscodeConfigPath)

    expect(cursorConfig.mcpServers['retailcrm-embed-ui-v1-endpoint']).toEqual({
      command: 'npx',
      args: ['-y', '-p', '@retailcrm/embed-ui-v1-endpoint', 'embed-ui-v1-endpoint-mcp'],
    })
    expect(cursorConfig.mcpServers['custom-user-server']).toEqual({
      command: 'node',
      args: ['custom-server.mjs'],
    })
    expect(vscodeConfig.inputs).toEqual([
      {
        id: 'custom-token',
        type: 'promptString',
      },
    ])
    expect(vscodeConfig.servers['retailcrm-embed-ui-v1-endpoint']).toEqual({
      command: 'npx',
      args: ['-y', '-p', '@retailcrm/embed-ui-v1-endpoint', 'embed-ui-v1-endpoint-mcp'],
    })
    expect(vscodeConfig.servers['custom-vscode-server']).toEqual({
      command: 'node',
      args: ['vscode-server.mjs'],
    })
  })

  test('init can force dependency ranges and fix dependency sections', async () => {
    const tempDir = createTempDir()
    const packageJsonPath = path.join(tempDir, 'package.json')

    writeFile(packageJsonPath, JSON.stringify({
      name: 'existing-app',
      type: 'module',
      devDependencies: {
        vue: '^2.7.0',
      },
    }, null, 2))

    vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--no-template',
        '--force-deps',
        '--fix-sections',
      ]),
      version: '1.2.3',
    })

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    expect(packageJson.dependencies.vue).toBe('^3.5')
    expect(packageJson.devDependencies.vue).toBeUndefined()
  })

  test('init skips existing vue-i18n dependency setup', async () => {
    const tempDir = createTempDir()
    const packageJsonPath = path.join(tempDir, 'package.json')

    writeFile(packageJsonPath, JSON.stringify({
      name: 'existing-i18n-app',
      type: 'module',
      devDependencies: {
        'vue-i18n': '^10.0.0',
      },
    }, null, 2))

    const logs: string[] = []
    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--no-template',
        '--force-deps',
        '--fix-sections',
      ]),
      version: '1.2.3',
    })

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const output = logs.join('\n')

    expect(packageJson.devDependencies['vue-i18n']).toBe('^10.0.0')
    expect(packageJson.dependencies?.['vue-i18n']).toBeUndefined()
    expect(output).toContain(
      'vue-i18n: found; i18n dependency setup will be skipped to avoid conflicts with existing project configuration'
    )
    expect(output).toContain(
      'vue-i18n already exists; i18n dependency setup skipped to avoid conflicts with existing project configuration'
    )
  })
})

// @vitest-environment node

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

import { afterEach, describe } from 'vitest'
import { ESLint } from 'eslint'
import { expect, test, vi } from 'vitest'

import { createDevScript, createPublishScript } from '../src/cmd/embed-ui/templates'
import { HELP_TEXT } from '../src/cmd/embed-ui/args'
import { isSameExecutablePath, parseArgs, parseInitArgs } from '../src/cmd/embed-ui'
import { resolveCurrentPackageVersion } from '../src/cmd/embed-ui/packages'
import { resolvePackageHookCommand } from '../src/cmd/embed-ui/package-hook-runner'
import { runAdd, runInit, runUpdate } from '../src/cmd/embed-ui'

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'embed-ui-'))

const writeFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
}

const readJsonFile = <T>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath, 'utf8')) as T

const runGeneratedDevScript = (args: string[]) => {
  const tempDir = createTempDir()
  const scriptPath = path.join(tempDir, 'scripts/dev.mjs')

  writeFile(scriptPath, createDevScript('npm'))

  return spawnSync(process.execPath, [scriptPath, ...args], {
    encoding: 'utf8',
  })
}

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

  test('current package version can be resolved from a bundled bin location', () => {
    const tempDir = createTempDir()
    const binPath = path.join(tempDir, 'bin/embed-ui.mjs')

    writeFile(binPath, '#!/usr/bin/env node\n')
    writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: '@retailcrm/embed-ui', version: '1.2.3' })
    )

    expect(resolveCurrentPackageVersion(binPath)).toBe('1.2.3')
  })

  test.each(['npm', 'yarn', 'pnpm', 'bun'] as const)(
    'development script uses the selected %s package manager',
    packageManager => {
      const script = createDevScript(packageManager)

      expect(script).toContain(`const packageManager = '${packageManager}'`)
      expect(script).toContain('const defaultSandboxPort = 4173')
      expect(script).toContain('const defaultExtensionPort = 4175')
      expect(script).toContain('Development environment is ready.')
      expect(script).toContain('Extension server: http://')
      expect(script).toContain('Press Ctrl+C to stop both servers.')
      expect(script).toContain('scriptArgs: [\'--port\', String(extensionPort)]')
      expect(script).toContain('scriptArgs: [\'--port\', String(sandboxPort)]')
      expect(script).not.toContain('extensionrc.json')
      expect(script).not.toContain('/extension/')
    }
  )

  test.each([
    {
      args: ['--unknown'],
      error: 'Unknown argument: --unknown.',
    },
    {
      args: ['--sandbox-port'],
      error: '--sandbox-port must be an integer between 1 and 65535.',
    },
    {
      args: ['--sandbox-port', '0'],
      error: '--sandbox-port must be an integer between 1 and 65535.',
    },
    {
      args: ['--extension-port=65536'],
      error: '--extension-port must be an integer between 1 and 65535.',
    },
    {
      args: ['--sandbox-port=4273', '--extension-port', '4273'],
      error: 'Sandbox and extension ports must be different.',
    },
  ])('development script rejects invalid arguments: $args', ({ args, error }) => {
    const result = runGeneratedDevScript(args)

    expect(result.status).toBe(1)
    expect(result.stderr).toContain(`[dev] ${error}`)
    expect(result.stdout).not.toContain('[dev] Building extension...')
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

  test('help text documents init force and scaffold controls', () => {
    [
      '--with',
      '--dirs',
      '--src-dir',
      '--template',
      '--page-code',
      '--widget-target',
      '--no-dirs',
      '--no-template',
      '--force',
      '--force-deps',
      '--force-files',
      '--force-agents',
      '--agents-only',
      '--force-skills',
      '--skills-only',
      '--force-mcp',
      '--mcp-client-configs',
    ].forEach((option) => {
      expect(HELP_TEXT).toContain(option)
    })
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
        '--no-skills',
      ]),
      version: '1.2.3',
    })).rejects.toThrow('Interactive init mode requires a TTY')
  })

  test('parseArgs supports opt-in MCP client configs', () => {
    const options = parseArgs([
      'init',
      '--mcp-client-configs',
      'cursor,vscode',
      '--git',
      '--no-install',
      '--no-agents',
    ])

    expect(options.command).toBe('init')
    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    expect(options.mcpClientConfigs).toEqual(['cursor', 'vscode'])
    expect(options.initGit).toBe(true)
  })

  test('parseArgs supports init-skills command', () => {
    const options = parseArgs([
      'init-skills',
      './project',
      '--package-manager',
      'npm',
      '--packages',
      'components,endpoint',
    ])

    expect(options.command).toBe('init')
    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    expect(options.target).toBe(null)
    expect(options.cwd).toBe(path.resolve(process.cwd(), './project'))
    expect(options.packageManager).toBe('npm')
    expect(options.packages).toEqual(['components', 'endpoint'])
    expect(options.skillsOnly).toBe(true)
    expect(options.noSkills).toBe(false)
    expect(options.noAgents).toBe(true)
    expect(options.noMcp).toBe(true)
    expect(options.noInstall).toBe(true)
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
        '--no-skills',
      ]),
      version: '1.2.3',
    })

    const packageJson = JSON.parse(fs.readFileSync(path.join(tempDir, 'package.json'), 'utf8'))

    expect(packageJson.type).toBe('module')
    expect(packageJson.scripts).toMatchObject({
      build: 'vite build',
      dev: 'node scripts/dev.mjs',
      eslint: 'eslint .',
      'eslint:fix': 'eslint --fix .',
      'extension:serve': 'node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175',
      'publish-extension': 'node scripts/publish-extension.mjs',
      'sandbox:serve': 'embed-ui-v1-sandbox serve --host 127.0.0.1 --port 4173',
      test: 'npm run test:unit && npm run test:browser && npm run test:e2e',
      'test:browser': 'vitest --run --config vitest.config.browser.ts',
      'test:browsers:install': 'playwright install chromium',
      'test:e2e': 'playwright test -c vitest.config.playwright.ts',
      'test:unit': 'vitest --run --config vitest.config.ts',
    })
    expect(packageJson.dependencies).toMatchObject({
      '@retailcrm/embed-ui': '^1.2.3',
      '@retailcrm/embed-ui-v1-components': '^1.2.3',
      '@retailcrm/embed-ui-v1-contexts': '^1.2.3',
      '@retailcrm/embed-ui-v1-endpoint': '^1.2.3',
      '@retailcrm/embed-ui-v1-sandbox': '^1.2.3',
      '@retailcrm/embed-ui-v1-types': '^1.2.3',
      '@omnicajs/vue-remote': '^0.2.24',
      '@remote-ui/rpc': '^1.4.7',
      pinia: '^2.2',
      vue: '^3.5',
      'vue-i18n': '^11',
      zod: '^4.4',
    })
    expect(packageJson.devDependencies).toMatchObject({
      '@eslint/js': '^9.39',
      '@intlify/eslint-plugin-vue-i18n': '^4.4',
      '@intlify/unplugin-vue-i18n': '^11.2',
      '@omnicajs/eslint-plugin-dependencies': '^0.0.2',
      '@playwright/test': '^1.58',
      '@testing-library/dom': '^10.4',
      '@types/node': '^22.19',
      '@vitejs/plugin-vue': '^6.0',
      '@vitest/browser': '^4.1',
      '@vitest/browser-playwright': '^4.1',
      '@vue/language-server': '^3.2',
      dotenv: '^17.4',
      eslint: '^9.39',
      'eslint-plugin-vue': '^10.9',
      globals: '^16.5',
      jsdom: '^27.3',
      'jsonc-eslint-parser': '^3.1',
      less: '^4.6',
      playwright: '^1.58',
      typescript: '^5.9',
      'typescript-eslint': '^8.59',
      vite: '^7.3',
      'vite-svg-loader': '^5.1',
      vitest: '^4.1',
      'vue-eslint-parser': '^10.4',
      'yaml-eslint-parser': '^2.0',
    })

    expect(fs.existsSync(path.join(tempDir, 'tsconfig.json'))).toBe(true)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.browser.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.playwright.ts'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, '.gitignore'), 'utf8')).toContain('node_modules/')
    expect(fs.readFileSync(path.join(tempDir, '.gitignore'), 'utf8')).toContain('dist/')
    expect(fs.readFileSync(path.join(tempDir, '.gitignore'), 'utf8')).toContain('.env')
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
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.ts'), 'utf8')).toContain(
      'include: [\'web/sandbox/tests/unit/**/*.test.ts\']'
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.browser.ts'), 'utf8')).toContain(
      'include: [\'web/sandbox/tests/browser/**/*.browser.test.ts\']'
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.browser.ts'), 'utf8')).toContain(
      '@retailcrm/embed-ui-v1-components/remote'
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.browser.ts'), 'utf8')).toContain(
      '\'vue-i18n\''
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.playwright.ts'), 'utf8')).toContain(
      'testDir: \'./web/sandbox/tests/e2e\''
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.playwright.ts'), 'utf8')).toContain(
      'command: \'npm run sandbox:serve\''
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.playwright.ts'), 'utf8')).toContain(
      'command: \'npm run build && npm run extension:serve\''
    )
    expect(fs.readFileSync(path.join(tempDir, 'vitest.config.playwright.ts'), 'utf8')).toContain(
      'http://127.0.0.1:4175/extension/'
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
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/unit/extensionrc.test.ts'), 'utf8')).toContain(
      'expect(extensionrc.targets).toContain(\'order/card:common.after\')'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/browser/starter.browser.test.ts'), 'utf8')).toContain(
      'createSandboxWorkerRuntime'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/browser/starter.browser.test.ts'), 'utf8')).toContain(
      'new URL(\'/web/endpoint/endpoint.worker.ts\', window.location.href)'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      'await expect(page).toHaveURL(/mode=page/u)'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
    )
    const extensionConfig = readJsonFile<{
      pages: Array<{
        code: string;
        menu: string;
        parentMenuItemCode: string;
        menuItemTitle: Record<string, string>;
      }>;
    }>(path.join(tempDir, 'extensionrc.json'))
    expect(extensionConfig.pages).toEqual([{
      code: 'settings',
      menu: 'private_main_menu',
      parentMenuItemCode: 'settings',
      menuItemOrdering: 100,
      menuItemTitle: {
        ru: 'Настройки',
        en: 'Settings',
        es: 'Configuración',
      },
      pageHelpLink: null,
    }])
    expect(fs.readFileSync(path.join(tempDir, 'extensionrc.json'), 'utf8')).toContain(
      '"runner": "worker"'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/publish-extension.mjs'), 'utf8')).toContain(
      'extensionrc.json'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/publish-extension.mjs'), 'utf8')).toContain(
      'uses deprecated string page form'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/serve-extension.mjs'), 'utf8')).toContain(
      'const registry = createExtensionRegistry()'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/serve-extension.mjs'), 'utf8')).toContain(
      'Extension server: http://\' + host + \':\' + port'
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/dev.mjs'), 'utf8')).toContain(
      'const packageManager = \'npm\''
    )
    expect(fs.readFileSync(path.join(tempDir, 'scripts/dev.mjs'), 'utf8')).toContain(
      'Development environment is ready.'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      'settings-page-addon__icon'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      '? new URL(extensionrc.uuid, extensionBaseURL).href'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      'Fill SANDBOX_EXTENSION_URL in .env.sandbox before running starter.e2e.ts.'
    )
    expect(fs.readFileSync(path.join(tempDir, 'web/sandbox/tests/e2e/starter.e2e.ts'), 'utf8')).toContain(
      'console.warn(`[sandbox:e2e] ${missingExtensionUrlMessage}`)'
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
      'строковая форма не подходит для публикации через RetailCRM API'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'npm run eslint'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'npm run dev'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'npm run extension:serve'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      'npm run test:e2e'
    )
    expect(fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')).toContain(
      '`vitest.config.ts`, `vitest.config.browser.ts` и `vitest.config.playwright.ts`'
    )
  })

  test('init mode creates starter files that pass generated eslint formatting rules', async () => {
    const tempDir = createTempDir()

    try {
      vi.spyOn(console, 'log').mockImplementation(() => undefined)

      await runInit({
        ...parseInitArgs([
          './web',
          '--cwd',
          tempDir,
          '--package-manager',
          'npm',
          '--packages',
          'embed-ui',
          '--no-install',
          '--no-agents',
          '--no-mcp',
          '--no-skills',
        ]),
        version: '1.2.3',
      })

      const { default: repositoryEslintConfig } = await import('../eslint.config.js')
      const eslint = new ESLint({
        cwd: tempDir,
        overrideConfigFile: true,
        overrideConfig: [
          ...repositoryEslintConfig,
          {
            files: ['**/*.{js,mjs,cjs,ts}'],
            rules: {
              'comma-dangle': ['error', 'always-multiline'],
            },
          },
        ],
      })
      const results = await eslint.lintFiles([
        'scripts/dev.mjs',
        'scripts/serve-extension.mjs',
        'vitest.config.playwright.ts',
        'web/sandbox/tests/browser/starter.browser.test.ts',
        'web/sandbox/tests/e2e/starter.e2e.ts',
        'web/sandbox/tests/unit/extensionrc.test.ts',
      ])
      const messages = results.flatMap(result => result.messages.map(message => ({
        column: message.column,
        filePath: path.relative(tempDir, result.filePath),
        line: message.line,
        message: message.message,
        ruleId: message.ruleId,
        severity: message.severity,
      })))

      expect(messages).toEqual([])
    } finally {
      fs.rmSync(tempDir, { force: true, recursive: true })
    }
  }, 15_000)

  test('init uses a custom source root in the generated browser test worker URL', async () => {
    const tempDir = createTempDir()

    vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await runInit({
      ...parseInitArgs([
        '--cwd',
        tempDir,
        '--src-dir',
        'frontend',
        '--packages',
        'embed-ui',
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--no-skills',
      ]),
      version: '1.2.3',
    })

    const browserTest = fs.readFileSync(
      path.join(tempDir, 'frontend/sandbox/tests/browser/starter.browser.test.ts'),
      'utf8'
    )

    expect(browserTest).toContain(
      'new URL(\'/frontend/endpoint/endpoint.worker.ts\', window.location.href)'
    )
    expect(browserTest).not.toContain('/web/endpoint/endpoint.worker.ts')
  })

  test('init dry-run reports Playwright Chromium install command', async () => {
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
        'yarn',
        '--no-agents',
        '--no-mcp',
        '--no-skills',
        '--no-template',
        '--dry-run',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('install')
    expect(output).toContain('yarn install')
    expect(output).toContain('browser install')
    expect(output).toContain('yarn test:browsers:install')
  })

  test('init mode can initialize Git metadata', async () => {
    const tempDir = createTempDir()

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
        '--no-skills',
        '--no-configs',
        '--no-template',
        '--git',
      ]),
      version: '1.2.3',
    })

    expect(execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd: tempDir,
      encoding: 'utf8',
    }).trim()).toBe('true')
  })

  test('generated publish script rejects string page descriptors', () => {
    const tempDir = createTempDir()

    writeFile(path.join(tempDir, 'scripts/publish-extension.mjs'), createPublishScript())
    writeFile(path.join(tempDir, 'extensionrc.json'), JSON.stringify({
      uuid: '11111111-1111-1111-1111-111111111111',
      version: '1.0.0',
      targets: [],
      pages: ['settings'],
    }, null, 2))

    const result = spawnSync(process.execPath, [
      path.join(tempDir, 'scripts/publish-extension.mjs'),
      '--archive-only',
    ], {
      cwd: tempDir,
      encoding: 'utf8',
    })

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('uses deprecated string page form')
  })

  test('init mode appends missing gitignore entries without replacing existing content', async () => {
    const tempDir = createTempDir()
    const gitignorePath = path.join(tempDir, '.gitignore')

    writeFile(gitignorePath, [
      '# Existing rules',
      'custom-cache/',
      'dist/',
      '',
    ].join('\n'))
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
        '--no-skills',
        '--no-configs',
        '--no-template',
      ]),
      version: '1.2.3',
    })

    const gitignore = fs.readFileSync(gitignorePath, 'utf8')

    expect(gitignore).toContain('custom-cache/')
    expect(gitignore.match(/^dist\/$/gmu)).toHaveLength(1)
    expect(gitignore).toContain('# RetailCRM embed-ui init')
    expect(gitignore).toContain('node_modules/')
    expect(gitignore).toContain('coverage/')
  })

  test('init renames the generated extension server command', async () => {
    const tempDir = createTempDir()
    const packageJsonPath = path.join(tempDir, 'package.json')

    writeFile(packageJsonPath, JSON.stringify({
      name: 'existing-extension',
      private: true,
      type: 'module',
      scripts: {
        'serve:extension': 'node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175',
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
        '--packages',
        'embed-ui',
        '--no-install',
        '--no-agents',
        '--no-mcp',
        '--no-skills',
        '--no-configs',
        '--no-template',
      ]),
      version: '1.2.3',
    })

    const packageJson = readJsonFile<{
      scripts: Record<string, string>;
    }>(packageJsonPath)

    expect(packageJson.scripts['serve:extension']).toBeUndefined()
    expect(packageJson.scripts['extension:serve'])
      .toBe('node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175')
    expect(packageJson.scripts.dev).toBe('node scripts/dev.mjs')
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

    fs.mkdirSync(path.join(tempDir, '.git'))
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
        '--no-skills',
        '--dry-run',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('.git exists, but Git does not recognize this directory as a repository')
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
        '--no-skills',
        '--no-configs',
        '--no-template',
        '--verbose',
      ]),
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('configs: disabled')
    expect(fs.existsSync(path.join(tempDir, 'tsconfig.json'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'vite.config.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.browser.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'vitest.config.playwright.ts'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'eslint.config.js'))).toBe(false)
    expect(fs.existsSync(path.join(tempDir, 'env.d.ts'))).toBe(false)
  })

  test('init delegates MCP setup to installed package hooks', async () => {
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

    expect(output).toContain('package MCP init-config: enabled for contexts, endpoint')
    expect(output).toContain('MCP client configs requested: cursor, vscode')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-contexts@1.2.3 -- embed-ui-v1-contexts init-config')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-endpoint@1.2.3 -- embed-ui-v1-endpoint init-config')
    expect(output).toContain(`npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-sandbox@1.2.3 -- embed-ui-v1-sandbox init-env ${tempDir}`)
    expect(output).toContain('--mcp-client-configs cursor,vscode')
  })

  test('init-skills delegates project skill setup to selected packages', async () => {
    const tempDir = createTempDir()
    const logs: string[] = []
    const options = parseArgs([
      'init-skills',
      '--cwd',
      tempDir,
      '--package-manager',
      'npm',
      '--packages',
      'components,contexts,endpoint,sandbox',
      '--force-skills',
      '--dry-run',
    ])

    if (options.command !== 'init') {
      throw new Error('Expected init options')
    }

    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...options,
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('skills-only mode: package.json, configs, and template files are skipped')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-components@1.2.3 -- embed-ui-v1-components init-skills')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-contexts@1.2.3 -- embed-ui-v1-contexts init-skills')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-endpoint@1.2.3 -- embed-ui-v1-endpoint init-skills')
    expect(output).toContain(
      `npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-sandbox@1.2.3 -- embed-ui-v1-sandbox init-skills ${tempDir} --force`
    )
  })

  test('init agents-only mode delegates sandbox agent setup to selected packages', async () => {
    const tempDir = createTempDir()
    const logs: string[] = []
    const options = parseInitArgs([
      '--cwd',
      tempDir,
      '--package-manager',
      'npm',
      '--packages',
      'components,sandbox',
      '--agents-only',
      '--dry-run',
    ])

    vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await runInit({
      ...options,
      version: '1.2.3',
    })

    const output = logs.join('\n')

    expect(output).toContain('agents-only mode: package.json, configs, and template files are skipped')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-components@1.2.3 -- embed-ui-v1-components init-agents')
    expect(output).toContain('npm exec --yes --loglevel=error --package @retailcrm/embed-ui-v1-sandbox@1.2.3 -- embed-ui-v1-sandbox init-agents')
  })

  test('package hooks prefer local bin and pick compatible transient commands', () => {
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
        ['init-config', tempDir],
        '1.2.3',
        () => '4.12.0'
      ).display
    ).toContain('yarn dlx -p @retailcrm/embed-ui-v1-endpoint@1.2.3 embed-ui-v1-endpoint init-config')

    expect(
      resolvePackageHookCommand(
        tempDir,
        '@retailcrm/embed-ui-v1-endpoint',
        'embed-ui-v1-endpoint',
        'yarn',
        ['init-config', tempDir],
        '1.2.3',
        () => '1.22.22'
      ).display
    ).toContain('npx -y --loglevel=error -p @retailcrm/embed-ui-v1-endpoint@1.2.3 embed-ui-v1-endpoint init-config')

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
    const readmePath = path.join(tempDir, 'README.md')
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
      mcpServers: Record<string, { command: string; args?: string[] }>;
    }>(cursorConfigPath)
    const vscodeConfig = readJsonFile<{
      inputs: Array<{ id: string; type: string }>;
      servers: Record<string, { command: string; args?: string[]; type?: string }>;
    }>(vscodeConfigPath)

    expect(cursorConfig.mcpServers['retailcrm-embed-ui-v1-endpoint']).toEqual({
      command: '${workspaceFolder}/node_modules/.bin/embed-ui-v1-endpoint-mcp',
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
      type: 'stdio',
      command: '${workspaceFolder}/node_modules/.bin/embed-ui-v1-endpoint-mcp',
    })
    expect(vscodeConfig.servers['custom-vscode-server']).toEqual({
      command: 'node',
      args: ['vscode-server.mjs'],
    })
    expect(fs.readFileSync(readmePath, 'utf8')).toContain(
      'restart or reconnect it before expecting these resources'
    )
    expect(fs.readFileSync(readmePath, 'utf8')).toContain(
      'codex mcp add retailcrm-embed-ui-v1-endpoint'
    )
    expect(fs.readFileSync(readmePath, 'utf8')).toContain(
      '[mcp_servers.retailcrm-embed-ui-v1-endpoint]'
    )
  })

  test('endpoint MCP codex setup creates project config without user-level registration', () => {
    const tempDir = createTempDir()
    const emptyPathDir = createTempDir()
    const endpointBin = path.resolve('packages/v1-endpoint/bin/embed-ui-v1-endpoint.mjs')
    const localMcpBinPath = path.join(
      tempDir,
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'embed-ui-v1-endpoint-mcp.cmd' : 'embed-ui-v1-endpoint-mcp'
    )

    writeFile(localMcpBinPath, '')

    const output = execFileSync(process.execPath, [
      endpointBin,
      'init-config',
      tempDir,
      '--mcp-client-configs',
      'codex',
    ], {
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: emptyPathDir,
      },
    })

    const projectMcpConfig = readJsonFile<{
      mcpServers: Record<string, { command: string }>;
    }>(path.join(tempDir, '.mcp.json'))
    const codexConfig = fs.readFileSync(path.join(tempDir, '.codex/config.toml'), 'utf8')

    expect(projectMcpConfig.mcpServers['retailcrm-embed-ui-v1-endpoint']).toEqual({
      command: '${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/embed-ui-v1-endpoint-mcp',
    })
    expect(codexConfig).toContain('[mcp_servers.retailcrm-embed-ui-v1-endpoint]')
    expect(codexConfig).toContain('command = "./node_modules/.bin/embed-ui-v1-endpoint-mcp"')
    expect(output).toContain('MCP: codex project config points to local binary ./node_modules/.bin/embed-ui-v1-endpoint-mcp')
    expect(output).not.toContain('codex mcp add retailcrm-embed-ui-v1-endpoint')
  })

  test('endpoint init-agents explains MCP session refresh', () => {
    const tempDir = createTempDir()
    const endpointBin = path.resolve('packages/v1-endpoint/bin/embed-ui-v1-endpoint.mjs')

    execFileSync('node', [
      endpointBin,
      'init-agents',
      tempDir,
    ])

    expect(fs.readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8')).toContain(
      'A project `.mcp.json` may require restarting or reconnecting the AI client'
    )
    expect(fs.readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8')).toContain(
      '<!-- embed-ui-agents:@retailcrm/embed-ui-v1-endpoint:start -->'
    )
  })

  test('contexts init-agents and init-config add package-specific MCP setup', () => {
    const tempDir = createTempDir()
    const contextsBin = path.resolve('packages/v1-contexts/bin/embed-ui-v1-contexts.mjs')

    execFileSync(process.execPath, [
      contextsBin,
      'init-agents',
      tempDir,
    ])
    execFileSync(process.execPath, [
      contextsBin,
      'init-config',
      tempDir,
      '--mcp-client-configs',
      'codex,cursor',
    ])

    const agentsContent = fs.readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8')
    const readmeContent = fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')
    const projectMcpConfig = readJsonFile<{
      mcpServers: Record<string, { command: string }>;
    }>(path.join(tempDir, '.mcp.json'))
    const cursorConfig = readJsonFile<{
      mcpServers: Record<string, { command: string }>;
    }>(path.join(tempDir, '.cursor/mcp.json'))
    const codexConfig = fs.readFileSync(path.join(tempDir, '.codex/config.toml'), 'utf8')

    expect(agentsContent).toContain('<!-- embed-ui-agents:@retailcrm/embed-ui-v1-contexts:start -->')
    expect(agentsContent).toContain('embed-ui-v1-contexts://custom-contexts/<encoded-entity>')
    expect(projectMcpConfig.mcpServers['retailcrm-embed-ui-v1-contexts']).toEqual({
      command: '${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/embed-ui-v1-contexts-mcp',
    })
    expect(cursorConfig.mcpServers['retailcrm-embed-ui-v1-contexts']).toEqual({
      command: '${workspaceFolder}/node_modules/.bin/embed-ui-v1-contexts-mcp',
    })
    expect(codexConfig).toContain('[mcp_servers.retailcrm-embed-ui-v1-contexts]')
    expect(readmeContent).toContain('## MCP For AI Assistants: @retailcrm/embed-ui-v1-contexts')
    expect(readmeContent).toContain('embed-ui-v1-contexts://contexts')
  })

  test('endpoint and contexts init-config keep separate MCP entries and README sections', () => {
    const tempDir = createTempDir()
    const endpointBin = path.resolve('packages/v1-endpoint/bin/embed-ui-v1-endpoint.mjs')
    const contextsBin = path.resolve('packages/v1-contexts/bin/embed-ui-v1-contexts.mjs')

    execFileSync(process.execPath, [
      endpointBin,
      'init-config',
      tempDir,
    ])
    execFileSync(process.execPath, [
      contextsBin,
      'init-config',
      tempDir,
    ])

    const projectMcpConfig = readJsonFile<{
      mcpServers: Record<string, { command: string }>;
    }>(path.join(tempDir, '.mcp.json'))
    const readmeContent = fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8')

    expect(projectMcpConfig.mcpServers['retailcrm-embed-ui-v1-endpoint']).toEqual({
      command: '${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/embed-ui-v1-endpoint-mcp',
    })
    expect(projectMcpConfig.mcpServers['retailcrm-embed-ui-v1-contexts']).toEqual({
      command: '${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/embed-ui-v1-contexts-mcp',
    })
    expect(readmeContent).toContain('## MCP For AI Assistants: @retailcrm/embed-ui-v1-endpoint')
    expect(readmeContent).toContain('## MCP For AI Assistants: @retailcrm/embed-ui-v1-contexts')
  })

  test('v1-components init-agents supports transient execution before install', () => {
    const tempDir = createTempDir()
    const componentsBin = path.resolve('packages/v1-components/bin/embed-ui-v1-components.mjs')

    execFileSync('node', [
      componentsBin,
      'init-agents',
      tempDir,
    ])

    expect(fs.readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8')).toContain(
      './node_modules/@retailcrm/embed-ui-v1-components/README.md'
    )
  })

  test('v1-sandbox init-agents supports transient execution before install', () => {
    const tempDir = createTempDir()
    const sandboxBin = path.resolve('packages/v1-sandbox/bin/embed-ui-v1-sandbox.mjs')

    execFileSync('node', [
      sandboxBin,
      'init-agents',
      tempDir,
    ])

    const agentsContent = fs.readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8')

    expect(agentsContent).toContain('./node_modules/@retailcrm/embed-ui-v1-sandbox/README.md')
    expect(agentsContent).toContain('<!-- embed-ui-agents:@retailcrm/embed-ui-v1-sandbox:start -->')
  })

  test('v1-sandbox documents init-skills in CLI help', () => {
    const sandboxBin = path.resolve('packages/v1-sandbox/bin/embed-ui-v1-sandbox.mjs')
    const output = execFileSync(process.execPath, [
      sandboxBin,
      '--help',
    ], {
      encoding: 'utf8',
    })

    expect(output).toContain('init-skills [target] [--force]')
  })

  test('v1-sandbox init-env creates project env template safely', () => {
    const tempDir = createTempDir()
    const sandboxBin = path.resolve('packages/v1-sandbox/bin/embed-ui-v1-sandbox.mjs')
    const envTemplatePath = path.resolve('packages/v1-sandbox/.env.sandbox.dist')
    const envPath = path.join(tempDir, '.env.sandbox')
    const envTemplate = fs.readFileSync(envTemplatePath, 'utf8')

    execFileSync(process.execPath, [
      sandboxBin,
      'init-env',
      tempDir,
    ])

    expect(fs.readFileSync(envPath, 'utf8')).toBe(envTemplate)

    fs.writeFileSync(envPath, 'SANDBOX_BASE_URL=http://already-configured.test\n', 'utf8')

    execFileSync(process.execPath, [
      sandboxBin,
      'init-env',
      tempDir,
    ])

    expect(fs.readFileSync(envPath, 'utf8')).toBe('SANDBOX_BASE_URL=http://already-configured.test\n')

    execFileSync(process.execPath, [
      sandboxBin,
      'init-env',
      tempDir,
      '--force',
    ])

    expect(fs.readFileSync(envPath, 'utf8')).toBe(envTemplate)
  })

  test('package init-skills commands create project-level skills', () => {
    const tempDir = createTempDir()
    const componentsBin = path.resolve('packages/v1-components/bin/embed-ui-v1-components.mjs')
    const contextsBin = path.resolve('packages/v1-contexts/bin/embed-ui-v1-contexts.mjs')
    const endpointBin = path.resolve('packages/v1-endpoint/bin/embed-ui-v1-endpoint.mjs')
    const sandboxBin = path.resolve('packages/v1-sandbox/bin/embed-ui-v1-sandbox.mjs')
    const sandboxSkillPath = path.join(tempDir, '.agents/skills/test-workflow/SKILL.md')

    execFileSync(process.execPath, [componentsBin, 'init-skills', tempDir])
    execFileSync(process.execPath, [contextsBin, 'init-skills', tempDir])
    execFileSync(process.execPath, [endpointBin, 'init-skills', tempDir])
    execFileSync(process.execPath, [sandboxBin, 'init-skills', tempDir])

    expect(fs.readFileSync(
      path.join(tempDir, '.agents/skills/embed-ui-v1-components-ui/SKILL.md'),
      'utf8'
    )).toContain('name: embed-ui-v1-components-ui')
    expect(fs.readFileSync(
      path.join(tempDir, '.agents/skills/embed-ui-v1-contexts-usage/SKILL.md'),
      'utf8'
    )).toContain('name: embed-ui-v1-contexts-usage')
    expect(fs.readFileSync(
      path.join(tempDir, '.agents/skills/embed-ui-v1-endpoint-runtime/SKILL.md'),
      'utf8'
    )).toContain('page/menu hierarchy')

    const sandboxSkill = fs.readFileSync(sandboxSkillPath, 'utf8')

    expect(sandboxSkill).toContain('name: test-workflow')
    expect(sandboxSkill).toContain('./node_modules/@retailcrm/embed-ui-v1-sandbox/docs/strategy.md')
    expect(sandboxSkill).toContain('## Testing Library First')
    expect(sandboxSkill).toContain('### Browser: `test:browser`')
    expect(sandboxSkill).toContain('### Delivery e2e: `test:e2e`')
    expect(sandboxSkill).toContain('Coverage is a quality signal, not the goal of a test.')
  })

  test('v1-sandbox init-skills preserves an existing skill unless forced', () => {
    const tempDir = createTempDir()
    const sandboxBin = path.resolve('packages/v1-sandbox/bin/embed-ui-v1-sandbox.mjs')
    const sandboxSkillPath = path.join(tempDir, '.agents/skills/test-workflow/SKILL.md')

    execFileSync(process.execPath, [sandboxBin, 'init-skills', tempDir])
    fs.writeFileSync(sandboxSkillPath, 'project-specific test doctrine\n', 'utf8')

    execFileSync(process.execPath, [sandboxBin, 'init-skills', tempDir])
    expect(fs.readFileSync(sandboxSkillPath, 'utf8')).toBe('project-specific test doctrine\n')

    execFileSync(process.execPath, [sandboxBin, 'init-skills', tempDir, '--force'])
    expect(fs.readFileSync(sandboxSkillPath, 'utf8')).toContain('name: test-workflow')
  })

  test('v1-sandbox publishes project skill templates', () => {
    const packageJson = readJsonFile<{ files: string[] }>(
      path.resolve('packages/v1-sandbox/package.json')
    )

    expect(packageJson.files).toContain('templates')
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
        '--no-skills',
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
        '--no-skills',
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
      'vue-i18n already exists; i18n dependency setup skipped to avoid conflicts with existing project configuration'
    )
  })
})

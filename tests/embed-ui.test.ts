// @vitest-environment node

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import {
  parseArgs,
  parseInitArgs,
  runAdd,
  runInit,
  runUpdate,
} from '../src/cmd/embed-ui'

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'embed-ui-'))

const writeFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
}

describe('embed-ui CLI', () => {
  afterEach(() => {
    vi.restoreAllMocks()
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

    await runInit({
      ...parseInitArgs([
        './web',
        '--cwd',
        tempDir,
        '--package-manager',
        'npm',
        '--no-install',
        '--no-agents',
      ]),
      version: '1.2.3',
    })

    const packageJson = JSON.parse(fs.readFileSync(path.join(tempDir, 'package.json'), 'utf8'))

    expect(packageJson.type).toBe('module')
    expect(packageJson.scripts).toMatchObject({
      build: 'vite build',
      lint: 'eslint .',
      'lint:fix': 'eslint --fix .',
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
      '@eslint/js': '^9',
      '@omnicajs/eslint-plugin-dependencies': '^0.0',
      '@types/node': '^22',
      '@vitejs/plugin-vue': '^6',
      '@vue/language-server': '^3',
      eslint: '^9',
      'eslint-plugin-vue': '^10',
      globals: '^16',
      typescript: '^5',
      'typescript-eslint': '^8',
      vite: '^7',
      'vue-eslint-parser': '^10',
    })

    expect(fs.existsSync(path.join(tempDir, 'tsconfig.json'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, 'tsconfig.json'), 'utf8')).toContain('"resolveJsonModule": true')
    expect(fs.readFileSync(path.join(tempDir, 'eslint.config.js'), 'utf8')).toContain('static-translation-keys')
    expect(fs.readFileSync(path.join(tempDir, 'web/i18n/index.ts'), 'utf8')).toContain('./locales/en-GB.json')
    expect(fs.existsSync(path.join(tempDir, 'web/i18n/locales/ru-RU.json'))).toBe(true)
    expect(fs.readFileSync(path.join(tempDir, 'web/endpoint/endpoint.worker.ts'), 'utf8')).toContain(
      '\'order/card:common.after\': defineWidgetRunner(OrderCommonAfterWidget, setupApp)'
    )
  })
})

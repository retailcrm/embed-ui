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

import { parseArgs, runAdd, runUpdate } from '../bin/embed-ui-update.mjs'

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'embed-ui-update-'))

const writeFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
}

describe('embed-ui update CLI', () => {
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
})

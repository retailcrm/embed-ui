// @vitest-environment node

import type { AddressInfo } from 'node:net'
import type { Server } from 'node:http'

import { chmodSync } from 'node:fs'
import { createServer } from 'node:http'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { writeFileSync } from 'node:fs'

import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

import {
  createPublicationPlan,
  executePublication,
  runPublication,
} from '../scripts/lib/publication'

const directories: string[] = []
const servers: Server[] = []

afterEach(async () => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  await Promise.all(servers.splice(0).map(server => new Promise<void>((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve())
    server.closeAllConnections()
  })))
  directories.splice(0).forEach(directory => rmSync(directory, { recursive: true, force: true }))
})

function temporaryDirectory () {
  const directory = mkdtempSync(join(tmpdir(), 'embed-ui-publication-'))
  directories.push(directory)
  return directory
}

function git (cwd: string, ...args: string[]) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

function writePackage (cwd: string, name: string, version: string, extra = {}) {
  const path = name === 'root' ? cwd : join(cwd, 'packages', name)
  mkdirSync(path, { recursive: true })
  writeFileSync(join(path, 'package.json'), JSON.stringify({
    name: `@test/${name}`,
    version,
    ...(name === 'root' ? { workspaces: ['packages/*'] } : {}),
    ...extra,
  }))
  return path
}

function snapshot (cwd: string, tag?: string) {
  git(cwd, 'add', '.')
  git(cwd, 'commit', '-m', 'feat: Update packages')
  if (tag) git(cwd, 'tag', tag)
}

function repository () {
  const cwd = temporaryDirectory()
  git(cwd, 'init', '-b', 'master')
  git(cwd, 'config', 'user.name', 'Publication test')
  git(cwd, 'config', 'user.email', 'publication@example.test')
  writePackage(cwd, 'root', '1.0.0')
  writePackage(cwd, 'existing', '1.0.0')
  snapshot(cwd, 'v1.0.0')
  writePackage(cwd, 'root', '1.0.1-alpha.1')
  writePackage(cwd, 'existing', '1.0.1-alpha.1')
  snapshot(cwd, 'v1.0.1-alpha.1')
  return cwd
}

async function registry (packages: Record<string, string[] | number>) {
  const server = createServer((request, response) => {
    const name = decodeURIComponent((request.url ?? '/').slice(1))
    const versions = packages[name] ?? 404
    response.setHeader('content-type', 'application/json')
    if (typeof versions === 'number') {
      response.writeHead(versions).end(JSON.stringify({ error: 'Registry error' }))
    } else {
      response.end(JSON.stringify({ versions: Object.fromEntries(versions.map(version => [version, {}])) }))
    }
  })
  servers.push(server)
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}/`
}

function fakeNpm () {
  const directory = temporaryDirectory()
  const calls = join(directory, 'calls.jsonl')
  const executable = join(directory, 'npm')
  writeFileSync(executable, `#!${process.execPath}
const fs = require('node:fs')
const args = process.argv.slice(2)
fs.appendFileSync(${JSON.stringify(calls)}, JSON.stringify(args) + '\\n')
if (args[0] === '--version') {
  console.log('11.19.0')
} else if (args.includes(process.env.FAIL_PACKAGE)) {
  console.error('Registry rejected upload')
  process.exit(1)
} else {
  console.log('stage-id: test-stage')
}
`)
  chmodSync(executable, 0o755)
  vi.stubEnv('PATH', `${directory}:${process.env.PATH}`)
  return () => {
    try {
      return readFileSync(calls, 'utf8').trim().split('\n').map(line => JSON.parse(line) as string[])
    } catch {
      return []
    }
  }
}

test('Release publishes changed packages and preserves the alpha dist-tag', async () => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': ['1.0.0'] })
  const calls = fakeNpm()
  const plan = await createPublicationPlan({ cwd, mode: 'publish', registry: url })

  await executePublication(plan)

  expect(calls()).toEqual([
    ['publish', cwd, '--access', 'public', '--tag', 'alpha'],
    ['publish', join(cwd, 'packages/existing'), '--access', 'public', '--tag', 'alpha'],
  ])
})

test('Release refuses a newly added workspace even if its name already exists in npm', async () => {
  const cwd = repository()
  writePackage(cwd, 'new', '1.0.1-alpha.1')
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': ['1.0.0'], '@test/new': ['1.0.0'] })

  await expect(createPublicationPlan({ cwd, mode: 'publish', registry: url })).rejects.toThrow('Stage workflow')
  expect(git(cwd, 'log', '-1', '--format=%s').trim()).toBe('feat: Update packages')
})

test('Release refuses an unpublished package already present in the latest Git tag', async () => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.0'] })

  await expect(createPublicationPlan({ cwd, mode: 'publish', registry: url })).rejects.toThrow('@test/existing')
})

test('Release refuses a staging placeholder until a maintainer approves a real version', async () => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': ['0.0.0-stage'] })

  await expect(createPublicationPlan({ cwd, mode: 'publish', registry: url })).rejects.toThrow('approve them in npm')
})

test('Stage uploads all packages including unchanged packages and a new workspace without exports', async () => {
  const cwd = repository()
  writePackage(cwd, 'existing', '1.0.0')
  writePackage(cwd, 'new', '1.0.1-alpha.1', { bin: './cli.mjs' })
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': ['0.9.0'] })
  const calls = fakeNpm()

  await executePublication(await createPublicationPlan({ cwd, mode: 'stage', registry: url }))

  expect(calls()).toEqual([
    ['stage', 'publish', cwd, '--access', 'public', '--tag', 'alpha'],
    ['stage', 'publish', join(cwd, 'packages/existing'), '--access', 'public', '--tag', 'latest'],
    ['stage', 'publish', join(cwd, 'packages/new'), '--access', 'public', '--tag', 'alpha'],
  ])
})

test('private workspaces are never uploaded or required in the registry', async () => {
  const cwd = repository()
  writePackage(cwd, 'internal', '1.0.1-alpha.1', { private: true })
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': ['1.0.0'] })
  const plan = await createPublicationPlan({ cwd, mode: 'publish', registry: url })

  expect(plan.packages.map(pkg => pkg.name)).toEqual(['@test/root', '@test/existing'])
})

test('a retry skips versions already published and uploads the remaining package', async () => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.0', '1.0.1-alpha.1'], '@test/existing': ['1.0.0'] })
  const calls = fakeNpm()

  await executePublication(await createPublicationPlan({ cwd, mode: 'publish', registry: url }))

  expect(calls()).toEqual([
    ['publish', join(cwd, 'packages/existing'), '--access', 'public', '--tag', 'alpha'],
  ])
})

test('Release is a no-op after all staged versions have been approved', async () => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.1-alpha.1'], '@test/existing': ['0.0.0-stage', '1.0.1-alpha.1'] })
  const calls = fakeNpm()

  await executePublication(await createPublicationPlan({ cwd, mode: 'publish', registry: url }))

  expect(calls()).toEqual([])
})

test.each([401, 403, 500])('registry HTTP %s stops the entire plan before any upload', async status => {
  const cwd = repository()
  const url = await registry({ '@test/root': ['1.0.0'], '@test/existing': status })
  const calls = fakeNpm()

  await expect(runPublication({ cwd, mode: 'publish', registry: url })).rejects.toThrow(`HTTP ${status}`)
  expect(calls()).toEqual([['--version']])
})

test('check mode does not upload or change versions and Git tags', async () => {
  const cwd = repository()
  const url = await registry({})
  const calls = fakeNpm()
  const tags = git(cwd, 'tag')
  const manifest = readFileSync(join(cwd, 'package.json'), 'utf8')

  await runPublication({ cwd, mode: 'stage', registry: url, check: true })

  expect(calls()).toEqual([['--version']])
  expect(git(cwd, 'tag')).toBe(tags)
  expect(readFileSync(join(cwd, 'package.json'), 'utf8')).toBe(manifest)
})

test('dry mode prints stage commands without uploading', async () => {
  const cwd = repository()
  const url = await registry({})
  const calls = fakeNpm()
  const output = vi.spyOn(console, 'info').mockImplementation(() => undefined)

  await runPublication({ cwd, mode: 'stage', registry: url, dry: true })

  expect(calls()).toEqual([['--version']])
  expect(output.mock.calls.flat().join('\n')).toContain('npm stage publish')
})

test('a rejected upload stops publication before the remaining packages', async () => {
  const cwd = repository()
  const url = await registry({})
  const calls = fakeNpm()
  vi.stubEnv('FAIL_PACKAGE', cwd)

  await expect(executePublication(await createPublicationPlan({ cwd, mode: 'stage', registry: url }))).rejects.toThrow()
  expect(calls()).toEqual([['stage', 'publish', cwd, '--access', 'public', '--tag', 'alpha']])
})

import type { Manifest } from '@modulify/pkg/types/manifest'

import { execFile } from 'node:child_process'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { relative } from 'node:path'

import { read } from '@modulify/pkg'
import semver from 'semver'
import { walk } from '@modulify/pkg'

import Logger from './Logger'
import Runner from './Runner'

import { readPublishedVersions } from './npm-registry'

type PublicationMode = 'publish' | 'stage'

type PublicationPackage = {
  name: string;
  version: string;
  path: string;
}

type PublicationOptions = {
  cwd?: string;
  mode: PublicationMode;
  registry?: string;
}

export type PublicationPlan = {
  mode: PublicationMode;
  packages: PublicationPackage[];
  skipped: PublicationPackage[];
}

const exec = promisify(execFile)

async function packagesAtTag (cwd: string, tag: string | undefined, packages: PublicationPackage[]) {
  const manifests = new Map<string, Manifest>()
  if (!tag) return manifests

  const { stdout } = await exec('git', ['ls-tree', '-r', '--name-only', tag], { cwd })
  const files = new Set(stdout.trim().split('\n'))

  for (const pkg of packages) {
    const path = relative(cwd, join(pkg.path, 'package.json'))
    if (!files.has(path)) continue

    const { stdout } = await exec('git', ['show', `${tag}:${path}`], { cwd })
    const manifest = JSON.parse(stdout) as Manifest
    if (manifest.name) manifests.set(manifest.name, manifest)
  }

  return manifests
}

export async function createPublicationPlan ({ cwd = process.cwd(), mode, registry }: PublicationOptions): Promise<PublicationPlan> {
  const packages: PublicationPackage[] = []
  await walk([read(cwd)], async (pkg) => {
    const manifest = pkg.manifest as Manifest & { private?: boolean; }
    if (manifest.private) return
    if (!manifest.name || !manifest.version || !semver.valid(manifest.version)) {
      throw new Error(`Invalid package name or version in ${pkg.path}`)
    }

    packages.push({ name: manifest.name, version: manifest.version, path: pkg.path })
  })

  const { stdout } = await exec('git', ['tag', '--merged', 'HEAD', '--list', 'v*'], { cwd })
  const tags = stdout.trim().split('\n').filter(tag => semver.valid(tag)).sort(semver.rcompare)
  const [latestTag, previousTag] = tags
  const latest = await packagesAtTag(cwd, latestTag, packages)
  const previous = await packagesAtTag(cwd, previousTag, packages)
  const plan: PublicationPlan = { mode, packages: [], skipped: [] }
  const needsStage: string[] = []

  // Inspect every package before the first upload, so a new workspace cannot cause a partial release.
  for (const pkg of packages) {
    const versions = await readPublishedVersions(pkg.name, registry)
    if (mode === 'publish' && (!latest.has(pkg.name) || ![...versions].some(version => version !== '0.0.0-stage'))) {
      needsStage.push(pkg.name)
    }

    if (versions.has(pkg.version)) {
      plan.skipped.push(pkg)
    } else if (mode === 'stage' || previous.get(pkg.name)?.version !== pkg.version) {
      plan.packages.push(pkg)
    }
  }

  if (needsStage.length) {
    throw new Error(`Run the Stage workflow for all packages first, approve them in npm, and configure Trusted Publishers: ${needsStage.join(', ')}`)
  }

  return plan
}

export async function executePublication (plan: PublicationPlan, { dry = false } = {}) {
  const log = new Logger({ dry })
  const sh = new Runner(log, dry)

  for (const pkg of plan.skipped) {
    log.info('Skipping %s@%s: already published', [pkg.name, pkg.version])
  }

  for (const pkg of plan.packages) {
    const prerelease = semver.prerelease(pkg.version)
    const publishTag = typeof prerelease?.[0] === 'string' ? prerelease[0] : 'latest'
    const args = [
      ...(plan.mode === 'stage' ? ['stage'] : []),
      'publish', pkg.path,
      '--access', 'public',
      '--tag', publishTag,
    ]

    log.info('npm %s (%s@%s)', [args.join(' '), pkg.name, pkg.version])
    const output = await sh.run('npm', args)
    if (output) console.info(output)
  }

  if (plan.mode === 'stage') {
    console.info('Staged versions require maintainer approval with 2FA in npm before they are available to consumers.')
  }
}

export async function runPublication (options: PublicationOptions & { check?: boolean; dry?: boolean; }) {
  const { stdout } = await exec('npm', ['--version'])
  if (!semver.gte(stdout.trim(), '11.15.0')) {
    throw new Error('Publication requires npm >= 11.15.0 (OIDC and staged publishing)')
  }

  const plan = await createPublicationPlan(options)
  if (options.check) {
    console.info(`Publication prerequisites checked (${options.mode}).`)
    return
  }

  await executePublication(plan, options)
}

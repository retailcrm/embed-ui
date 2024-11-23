import type { BumperRecommendation } from 'conventional-recommended-bump'
import type { ReleaseType } from 'semver'

import { Bumper } from 'conventional-recommended-bump'

import createPreset from 'conventional-changelog-conventionalcommits'
import semver from 'semver'

type StableReleaseType = 'major' | 'minor' | 'patch'

const stableTypeOf = (version: string): StableReleaseType => {
  switch (true) {
    case semver.major(version) > 0:
      return 'major'
    case semver.minor(version) > 0:
      return 'minor'
    case semver.patch(version) > 0:
      return 'patch'
  }

  return 'patch'
}

const priorityOf = (type: ReleaseType | undefined) => type
  ? {
    major: 2,
    minor: 1,
    patch: 0,
    premajor: -1,
    preminor: -1,
    prepatch: -1,
    prerelease: -1,
  }[type] ?? -1
  : -1

const isKnown = (type: unknown): type is ReleaseType => semver.RELEASE_TYPES.includes(type as ReleaseType)
const isStable = (type: ReleaseType): type is StableReleaseType => !type.startsWith('pre')

const normalize = (
  prerelease: 'alpha' | 'beta' | 'rc' | undefined,
  expectedReleaseType: ReleaseType,
  currentVersion: string
): ReleaseType => {
  if (typeof prerelease === 'string' && isStable(expectedReleaseType)) {
    if (Array.isArray(semver.prerelease(currentVersion, {}))) {
      const currentReleaseType = stableTypeOf(currentVersion)
      if (currentReleaseType === expectedReleaseType ||
        priorityOf(currentReleaseType) > priorityOf(expectedReleaseType)
      ) {
        return 'prerelease'
      }
    }

    return ('pre' + expectedReleaseType) as ReleaseType
  }

  return expectedReleaseType
}

type Options = {
  path?: string;
  prerelease?: 'alpha' | 'beta' | 'rc';
  releaseAs?: ReleaseType;
}

export default class VersionGenerator {
  private readonly bumper: Bumper
  private readonly releaseAs: ReleaseType | undefined
  private readonly prerelease: 'alpha' | 'beta' | 'rc' | undefined

  constructor (options: Options) {
    this.bumper = new Bumper(options.path ?? process.cwd())
    this.releaseAs = options.releaseAs
    this.prerelease = options.prerelease
  }

  async next (version: string) {
    const recommendation = await this.bump(this.releaseAs, version)
    const type = isKnown(recommendation?.releaseType)
      ? normalize(this.prerelease, recommendation?.releaseType, version)
      : recommendation?.releaseType ?? 'unknown'

    return {
      type,
      version: isKnown(type) && semver.valid(version, undefined)
        ? semver.inc(version, type, this.prerelease, '1')
        : version,
    }
  }

  async bump (
    releaseType: ReleaseType | undefined,
    version: string
  ): Promise<BumperRecommendation | null> {
    if (releaseType) {
      return Promise.resolve({ releaseType } as BumperRecommendation)
    }

    const preset = Object.assign(await createPreset({
      preMajor: semver.lt(version, '1.0.0', false),
    }), {
      name: 'conventionalcommits',
    })

    this.bumper.loadPreset(preset)

    return this.bumper.bump(commits => {
      return commits.length === 0
        ? Promise.resolve(null)
        : preset.whatBump(commits)
    })
  }
}

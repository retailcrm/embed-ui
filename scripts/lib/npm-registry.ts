export const NPM_REGISTRY = 'https://registry.npmjs.org/'

export async function readPublishedVersions (name: string, registry = NPM_REGISTRY): Promise<Set<string>> {
  const response = await fetch(new URL(encodeURIComponent(name), registry), {
    headers: { accept: 'application/vnd.npm.install-v1+json' },
    signal: AbortSignal.timeout(30_000),
  })

  if (response.status === 404) return new Set()
  if (!response.ok) {
    throw new Error(`Cannot check ${name} in npm: HTTP ${response.status}`)
  }

  const metadata = await response.json() as { versions?: Record<string, unknown>; }
  if (!metadata.versions || typeof metadata.versions !== 'object' || Array.isArray(metadata.versions)) {
    throw new Error(`Invalid npm metadata for ${name}: missing versions`)
  }

  return new Set(Object.keys(metadata.versions))
}

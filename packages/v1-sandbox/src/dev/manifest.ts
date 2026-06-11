import type { SandboxLaunchConfig } from '@/dev/launch'

export type SandboxExtensionRunner = 'iframe' | 'worker'

export type SandboxExtensionPage = {
  code: string;
}

export type SandboxExtensionDescriptor = {
  entrypoint: string;
  pages: string[];
  runner: SandboxExtensionRunner;
  stylesheet: string | null;
  targets: string[];
  uuid: string;
}

export type SandboxExtensionManifest = {
  code?: string;
  entrypoint?: string;
  pages?: Array<string | SandboxExtensionPage>;
  runner?: SandboxExtensionRunner;
  scripts?: string[];
  stylesheet?: string | null;
  targets?: string[];
  uuid?: string;
  version?: string;
}

export type SandboxExtensionSource = {
  descriptor: SandboxExtensionDescriptor;
  entrypoint: URL;
  manifest: SandboxExtensionManifest | null;
  manifestUrl: string | null;
}

type FetchLike = typeof fetch

type ResolveSandboxExtensionSourceOptions = {
  fetch?: FetchLike;
}

export const resolveSandboxExtensionSource = async (
  config: SandboxLaunchConfig,
  options: ResolveSandboxExtensionSourceOptions = {}
): Promise<SandboxExtensionSource> => {
  const fetcher = options.fetch ?? fetch

  if (!config.manifestUrl) {
    const descriptor = createFallbackDescriptor(config)

    return {
      descriptor,
      entrypoint: await resolveWorkerEntrypoint(descriptor.entrypoint, fetcher),
      manifest: null,
      manifestUrl: null,
    }
  }

  const manifestUrl = resolveUrl(config.manifestUrl, window.location.href)
  const response = await fetcher(manifestUrl.href, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(
      `[sandbox:manifest] Failed to load manifest '${manifestUrl.href}' (${response.status})`
    )
  }

  const responseUrl = response.url || manifestUrl.href
  const contentType = response.headers.get('content-type') ?? ''

  if (!isJsonMimeType(contentType)) {
    const descriptor = createDescriptorFromEntrypoint(config, responseUrl)

    return {
      descriptor,
      entrypoint: await resolveWorkerEntrypoint(descriptor.entrypoint, fetcher),
      manifest: null,
      manifestUrl: responseUrl,
    }
  }

  const manifest = await response.json() as SandboxExtensionManifest
  const descriptor = createDescriptorFromManifest(manifest, responseUrl)

  return {
    descriptor,
    entrypoint: await resolveWorkerEntrypoint(descriptor.entrypoint, fetcher),
    manifest,
    manifestUrl: responseUrl,
  }
}

const createFallbackDescriptor = (config: SandboxLaunchConfig): SandboxExtensionDescriptor => ({
  entrypoint: config.extensionUrl,
  pages: config.mode === 'page' ? [config.pageCode] : [],
  runner: 'worker',
  stylesheet: null,
  targets: config.targets,
  uuid: config.widgetId,
})

const createDescriptorFromManifest = (
  manifest: SandboxExtensionManifest,
  responseUrl: string
): SandboxExtensionDescriptor => {
  const runner = manifest.runner ?? 'worker'

  if (runner !== 'worker') {
    throw new Error(`[sandbox:manifest] Unsupported runner '${runner}'. v1-sandbox supports worker runner only.`)
  }

  const rawEntrypoint = resolveManifestEntrypoint(manifest)
  const entrypoint = resolveUrl(rawEntrypoint, responseUrl).href
  const stylesheet = typeof manifest.stylesheet === 'string'
    ? resolveUrl(manifest.stylesheet, responseUrl).href
    : null

  return {
    entrypoint,
    pages: normalizePages(manifest.pages),
    runner,
    stylesheet,
    targets: manifest.targets ?? [],
    uuid: manifest.uuid ?? manifest.code ?? 'sandbox-extension',
  }
}

const createDescriptorFromEntrypoint = (
  config: SandboxLaunchConfig,
  responseUrl: string
): SandboxExtensionDescriptor => ({
  entrypoint: responseUrl,
  pages: config.mode === 'page' ? [config.pageCode] : [],
  runner: 'worker',
  stylesheet: resolveCoreEntrypointStylesheet(responseUrl),
  targets: config.targets,
  uuid: config.widgetId,
})

const resolveManifestEntrypoint = (manifest: SandboxExtensionManifest): string => {
  if (manifest.entrypoint && manifest.entrypoint !== 'script' && manifest.entrypoint !== 'html') {
    return manifest.entrypoint
  }

  const script = manifest.scripts?.[0]
  if (script) return script

  throw new Error('[sandbox:manifest] Manifest must define entrypoint or scripts[0].')
}

const normalizePages = (pages: SandboxExtensionManifest['pages']): string[] =>
  (pages ?? []).flatMap((page) => {
    if (typeof page === 'string') return [page]

    return page.code ? [page.code] : []
  })

const resolveWorkerEntrypoint = async (
  entrypoint: string,
  fetcher: FetchLike
): Promise<URL> => {
  const url = resolveUrl(entrypoint, window.location.href)
  const response = await fetcher(url.href, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`[sandbox:manifest] Failed to load entrypoint '${url.href}' (${response.status})`)
  }

  if (isJavascriptMimeType(response.headers.get('content-type') ?? '')) {
    return resolveUrl(response.url || url.href, window.location.href)
  }

  const resolvedFromHtml = resolveWorkerEntrypointFromHtml(await response.text(), response.url || url.href)
  if (resolvedFromHtml) {
    return resolvedFromHtml
  }

  throw new Error(`[sandbox:manifest] Entrypoint '${url.href}' is not a JS module and does not have a script in <head>.`)
}

const resolveWorkerEntrypointFromHtml = (html: string, responseUrl: string): URL | null => {
  const document = new DOMParser().parseFromString(html, 'text/html')
  const scriptSrc = document.head.querySelector('script[src]')?.getAttribute('src')

  return scriptSrc ? resolveUrl(scriptSrc, responseUrl) : null
}

const isJavascriptMimeType = (contentType: string): boolean => {
  const mimeType = contentType.toLowerCase()

  return mimeType.includes('javascript') || mimeType.includes('ecmascript')
}

const isJsonMimeType = (contentType: string): boolean => {
  const mimeType = contentType.toLowerCase()

  return mimeType.includes('json')
}

const resolveCoreEntrypointStylesheet = (responseUrl: string): string | null => {
  const url = resolveUrl(responseUrl, window.location.href)

  if (!url.pathname.match(/\/extension\/[^/]+$/u)) return null

  url.pathname = `${url.pathname}/stylesheet`

  return url.href
}

const resolveUrl = (value: string, base: string): URL => {
  try {
    return new URL(value, base)
  } catch {
    throw new Error(`[sandbox:manifest] Invalid URL '${value}'.`)
  }
}

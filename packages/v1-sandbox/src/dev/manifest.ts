import type {
  FetchLike,
  ResolveSandboxExtensionSourceOptions,
  SandboxExtensionDescriptor,
  SandboxExtensionManifest,
  SandboxExtensionRunner,
  SandboxExtensionSource,
  SandboxLaunchConfig,
} from '@/dev/types'

import { isHtmlMimeType, isJavascriptMimeType, isJsonMimeType } from '@/dev/predicates'

export type {
  FetchLike,
  ResolveSandboxExtensionSourceOptions,
  SandboxExtensionDescriptor,
  SandboxExtensionManifest,
  SandboxExtensionPage,
  SandboxExtensionRunner,
  SandboxExtensionSource,
} from '@/dev/types'

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
    const source = await resolveEntrypointSource(config, response, responseUrl, contentType, fetcher)

    return {
      descriptor: source.descriptor,
      entrypoint: source.entrypoint,
      manifest: null,
      manifestUrl: responseUrl,
    }
  }

  const manifest = await response.json() as SandboxExtensionManifest
  const descriptor = createDescriptorFromManifest(manifest, responseUrl)

  return {
    descriptor,
    entrypoint: await resolveExtensionEntrypoint(descriptor, fetcher),
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
  responseUrl: string,
  runner: SandboxExtensionRunner,
  stylesheet: string | null,
  pages = config.mode === 'page' ? [config.pageCode] : []
): SandboxExtensionDescriptor => ({
  entrypoint: responseUrl,
  pages,
  runner,
  stylesheet,
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

const resolveEntrypointSource = async (
  config: SandboxLaunchConfig,
  response: Response,
  responseUrl: string,
  contentType: string,
  fetcher: FetchLike
): Promise<Pick<SandboxExtensionSource, 'descriptor' | 'entrypoint'>> => {
  if (!isHtmlMimeType(contentType)) {
    const descriptor = createDescriptorFromEntrypoint(config, responseUrl, 'worker', null)

    return {
      descriptor,
      entrypoint: resolveUrl(response.url || responseUrl, window.location.href),
    }
  }

  const html = await response.text()
  const scriptEntrypoint = resolveWorkerEntrypointFromHtml(html, response.url || responseUrl)

  if (!scriptEntrypoint) {
    throw new Error(`[sandbox:manifest] Entrypoint '${responseUrl}' does not have a script in <head>.`)
  }

  const scriptResponse = await fetcher(scriptEntrypoint.href, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!scriptResponse.ok) {
    throw new Error(`[sandbox:manifest] Failed to load entrypoint '${scriptEntrypoint.href}' (${scriptResponse.status})`)
  }

  const script = await scriptResponse.text()
  const runner = inferRunnerFromScript(script)
  const entrypoint = runner === 'iframe'
    ? resolveUrl(response.url || responseUrl, window.location.href)
    : resolveUrl(scriptResponse.url || scriptEntrypoint.href, window.location.href)
  const stylesheet = runner === 'worker'
    ? await resolveCoreEntrypointStylesheet(responseUrl, fetcher)
    : null
  const pages = runner === 'worker'
    ? resolveEntrypointPages(config, script)
    : []
  const descriptor = createDescriptorFromEntrypoint(config, entrypoint.href, runner, stylesheet, pages)

  return {
    descriptor,
    entrypoint,
  }
}

const resolveExtensionEntrypoint = async (
  descriptor: SandboxExtensionDescriptor,
  fetcher: FetchLike
): Promise<URL> => {
  if (descriptor.runner === 'iframe') {
    return resolveUrl(descriptor.entrypoint, window.location.href)
  }

  return await resolveWorkerEntrypoint(descriptor.entrypoint, fetcher)
}

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

const inferRunnerFromScript = (script: string): SandboxExtensionRunner =>
  script.includes('This does not appear to be a child iframe')
    ? 'iframe'
    : 'worker'

const resolveEntrypointPages = (
  config: SandboxLaunchConfig,
  script: string
): string[] => {
  const pages = inferPageCodesFromScript(script)

  if (pages.length > 0) return pages

  return config.mode === 'page' ? [config.pageCode] : []
}

const inferPageCodesFromScript = (script: string): string[] => {
  const pagesObject = extractPagesObjectBody(script)
  if (!pagesObject) return []

  const codes = new Set<string>()
  let depth = 0
  let index = 0

  while (index < pagesObject.length) {
    const char = pagesObject[index]

    if (char === '"' || char === '\'' || char === '`') {
      index = skipString(pagesObject, index)
      continue
    }

    if (char === '{' || char === '[' || char === '(') {
      depth++
      index++
      continue
    }

    if (char === '}' || char === ']' || char === ')') {
      depth = Math.max(0, depth - 1)
      index++
      continue
    }

    if (depth === 0) {
      const key = readObjectKey(pagesObject, index)

      if (key) {
        codes.add(key.value)
        index = key.end
        continue
      }
    }

    index++
  }

  return Array.from(codes)
}

const extractPagesObjectBody = (script: string): string | null => {
  const pagesMatch = /pages\s*:\s*\[\s*\{/u.exec(script)
  if (!pagesMatch) return null

  const objectStart = script.indexOf('{', pagesMatch.index)
  let depth = 0

  for (let index = objectStart; index < script.length; index++) {
    const char = script[index]

    if (char === '"' || char === '\'' || char === '`') {
      index = skipString(script, index) - 1
      continue
    }

    if (char === '{') {
      depth++
      continue
    }

    if (char === '}') {
      depth--

      if (depth === 0) {
        return script.slice(objectStart + 1, index)
      }
    }
  }

  return null
}

const skipString = (source: string, start: number): number => {
  const quote = source[start]
  let index = start + 1

  while (index < source.length) {
    if (source[index] === '\\') {
      index += 2
      continue
    }

    if (source[index] === quote) {
      return index + 1
    }

    index++
  }

  return index
}

const readObjectKey = (
  source: string,
  start: number
): { end: number; value: string } | null => {
  const match = /^(?:^|,)\s*(?:"(?<double>[^"]+)"|'(?<single>[^']+)'|(?<identifier>[A-Za-z_$][\w$-]*))\s*:/u.exec(source.slice(start))
  const value = match?.groups?.double ?? match?.groups?.single ?? match?.groups?.identifier

  if (!match || !value) return null

  return {
    end: start + match[0].length,
    value,
  }
}

const resolveCoreEntrypointStylesheet = async (
  responseUrl: string,
  fetcher: FetchLike
): Promise<string | null> => {
  const url = resolveUrl(responseUrl, window.location.href)

  if (!url.pathname.match(/\/extension\/[^/]+$/u)) return null

  url.pathname = `${url.pathname}/stylesheet`

  const response = await fetcher(url.href, {
    cache: 'no-store',
    credentials: 'include',
    method: 'HEAD',
  })

  return response.ok ? url.href : null
}

const resolveUrl = (value: string, base: string): URL => {
  try {
    return new URL(value, base)
  } catch {
    throw new Error(`[sandbox:manifest] Invalid URL '${value}'.`)
  }
}

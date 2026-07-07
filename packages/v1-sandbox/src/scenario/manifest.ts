import type {
  FetchLike,
  ResolveSandboxExtensionSourceOptions,
  SandboxExtensionDescriptor,
  SandboxExtensionSource,
  SandboxLaunchConfig,
} from '@/scenario/types'

import { isHtmlMimeType, isJavascriptMimeType } from '@/scenario/predicates'

export type {
  FetchLike,
  ResolveSandboxExtensionSourceOptions,
  SandboxExtensionDescriptor,
  SandboxExtensionRunner,
  SandboxExtensionSource,
} from '@/scenario/types'

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
      httpBaseUrl: resolveExtensionBackendBaseUrl(config.extensionUrl || descriptor.entrypoint),
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
  const source = await resolveEntrypointSource(config, response, responseUrl, contentType, fetcher)

  return {
    descriptor: source.descriptor,
    entrypoint: source.entrypoint,
    httpBaseUrl: resolveSourceBackendBaseUrl(config, responseUrl),
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

const createDescriptorFromEntrypoint = (
  config: SandboxLaunchConfig,
  responseUrl: string,
  stylesheet: string | null,
  pages = config.mode === 'page' ? [config.pageCode] : []
): SandboxExtensionDescriptor => ({
  entrypoint: responseUrl,
  pages,
  runner: 'worker',
  stylesheet,
  targets: config.targets,
  uuid: config.widgetId,
})

const resolveEntrypointSource = async (
  config: SandboxLaunchConfig,
  response: Response,
  responseUrl: string,
  contentType: string,
  fetcher: FetchLike
): Promise<Pick<SandboxExtensionSource, 'descriptor' | 'entrypoint'>> => {
  if (isJavascriptMimeType(contentType)) {
    const entrypoint = resolveUrl(response.url || responseUrl, window.location.href)
    const script = await response.text()
    const pages = resolveEntrypointPages(config, script)
    const descriptor = createDescriptorFromEntrypoint(config, entrypoint.href, null, pages)

    return {
      descriptor,
      entrypoint,
    }
  }

  if (!isHtmlMimeType(contentType)) {
    const descriptor = createDescriptorFromEntrypoint(config, responseUrl, null)

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
  const entrypoint = resolveUrl(scriptResponse.url || scriptEntrypoint.href, window.location.href)
  const stylesheet = await resolveCoreEntrypointStylesheet(responseUrl, fetcher)
  const pages = resolveEntrypointPages(config, script)
  const descriptor = createDescriptorFromEntrypoint(config, entrypoint.href, stylesheet, pages)

  return {
    descriptor,
    entrypoint,
  }
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

const resolveSourceBackendBaseUrl = (
  config: SandboxLaunchConfig,
  responseUrl: string
): string | null => {
  const extensionUrl = config.extensionUrl.trim()

  if (!extensionUrl) {
    return resolveExtensionBackendBaseUrl(responseUrl)
  }

  const url = resolveUrl(extensionUrl, window.location.href)

  return isLocalSandboxEntrypoint(url)
    ? resolveExtensionBackendBaseUrl(responseUrl)
    : resolveExtensionBackendBaseUrl(extensionUrl)
}

const resolveExtensionBackendBaseUrl = (entrypoint: string): string | null => {
  const url = resolveUrl(entrypoint, window.location.href)

  if (isLocalSandboxEntrypoint(url)) {
    return null
  }

  const extensionSegmentIndex = url.pathname.lastIndexOf('/extension/')
  const basePath = extensionSegmentIndex >= 0
    ? url.pathname.slice(0, extensionSegmentIndex)
    : ''

  url.pathname = basePath || '/'
  url.search = ''
  url.hash = ''

  return url.href
}

const isLocalSandboxEntrypoint = (url: URL): boolean =>
  url.origin === window.location.origin
  && (url.pathname.startsWith('/src/') || url.pathname.startsWith('/tests/'))

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
  const match = /^(?:^|,)\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$-]*))\s*:/u.exec(source.slice(start))
  const value = match?.[1] ?? match?.[2] ?? match?.[3]

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

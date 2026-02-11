export const isURL = (href: string, loose = true): boolean => {
  try {
    const url = new URL(href)

    return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)$/.test(url.href)
  } catch {
    if (loose) {
      if (!href.startsWith('/')) return false

      return [
        href.includes('://') ? href : `https://${href}`,
        `https://example.com${href}`,
      ].some(href => isURL(href, false))
    }

    return false
  }
}

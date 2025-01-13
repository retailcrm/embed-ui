export const isURL = (href: string): boolean => {
  try {
    const normalizedHref = href.includes('://') ? href : `http://${href}`

    const url = new URL(normalizedHref)

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)$/

    return urlPattern.test(url.href)
  } catch {
    return false 
  }
}

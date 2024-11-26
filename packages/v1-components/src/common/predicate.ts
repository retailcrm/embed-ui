export const isURL = (href: string): boolean => {
  try {
    new URL(href)
    
    return true
  } catch {
    return false
  }
}

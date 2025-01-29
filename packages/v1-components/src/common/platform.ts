export /*#__PURE__*/ const isBrowser = typeof window !== 'undefined'

declare global {
  interface Window {
    MSStream: unknown
  }
}

export /*#__PURE__*/ const isIOS = () => {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined'
    ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    : false
}
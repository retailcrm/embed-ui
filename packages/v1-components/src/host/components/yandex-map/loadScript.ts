export const load = (document: Document, src: string) => new Promise<Event>((resolve, reject): void => {
  const script = document.createElement('script')

  script.async = true
  script.src = src
  script.onload = event => resolve(event)
  script.onerror = (
    event,
    source,
    lineno,
    colno,
    error
  ) => {
    console.error(`Failed to load script from ${src}`, {
      event,
      source,
      lineno,
      colno,
      error,
    })

    reject(error)
  }

  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(script)
})

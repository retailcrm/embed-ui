const WORKER_READY = 'sandbox:extension-worker-ready'
const WORKER_READY_ERROR = 'sandbox:extension-worker-error'

type BootstrapMessage = {
  extensionUrl?: unknown;
  readyPort?: unknown;
}

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message

  return String(error)
}

let bootstrapReadyPort: MessagePort | null = null

const postReadyMessage = (message: Record<string, unknown>) => {
  if (bootstrapReadyPort) {
    bootstrapReadyPort.postMessage(message)
    return
  }

  self.postMessage(message)
}

const postReadyError = (error: unknown) => {
  postReadyMessage({
    error: toErrorMessage(error),
    type: WORKER_READY_ERROR,
  })
}

self.addEventListener('error', (event) => {
  postReadyError(event.error ?? event.message)
})

self.addEventListener('unhandledrejection', (event) => {
  postReadyError(event.reason)
})

const runExtension = (extensionUrl: unknown) => {
  if (typeof extensionUrl !== 'string' || !extensionUrl) {
    postReadyError('[sandbox:manifest] Missing extension worker URL.')
    return
  }

  import(/* @vite-ignore */ extensionUrl)
    .then(() => {
      postReadyMessage({
        type: WORKER_READY,
      })
    })
    .catch((error) => {
      postReadyError(error)
    })
}

const initialExtensionUrl = new URL(self.location.href).searchParams.get('extension')

if (initialExtensionUrl) {
  runExtension(initialExtensionUrl)
} else {
  self.addEventListener('message', (event: MessageEvent<BootstrapMessage>) => {
    if (event.data.readyPort instanceof MessagePort) {
      bootstrapReadyPort = event.data.readyPort
    }

    runExtension(event.data.extensionUrl)
  }, { once: true })
}

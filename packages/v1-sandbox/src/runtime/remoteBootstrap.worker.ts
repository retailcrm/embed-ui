const WORKER_READY = 'sandbox:extension-worker-ready'
const WORKER_READY_ERROR = 'sandbox:extension-worker-error'

type BootstrapMessage = {
  entrypoint?: unknown;
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

const runExtension = (entrypoint: unknown) => {
  if (typeof entrypoint !== 'string' || !entrypoint) {
    postReadyError('[sandbox:extension] Missing extension worker URL.')
    return
  }

  import(/* @vite-ignore */ entrypoint)
    .then(() => {
      postReadyMessage({
        type: WORKER_READY,
      })
    })
    .catch((error) => {
      postReadyError(error)
    })
}

self.addEventListener('message', (event: MessageEvent<BootstrapMessage>) => {
  if (event.data.readyPort instanceof MessagePort) {
    bootstrapReadyPort = event.data.readyPort
  }

  runExtension(event.data.entrypoint)
}, { once: true })

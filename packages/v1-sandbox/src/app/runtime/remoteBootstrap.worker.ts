const WORKER_READY = 'sandbox:extension-worker-ready'
const WORKER_READY_ERROR = 'sandbox:extension-worker-error'

const extensionUrl = new URL(self.location.href).searchParams.get('extension')

if (!extensionUrl) {
  self.postMessage({
    error: '[sandbox:manifest] Missing extension worker URL.',
    type: WORKER_READY_ERROR,
  })
} else {
  import(/* @vite-ignore */ extensionUrl)
    .then(() => {
      self.postMessage({
        type: WORKER_READY,
      })
    })
    .catch((error) => {
      self.postMessage({
        error: error instanceof Error ? error.message : String(error),
        type: WORKER_READY_ERROR,
      })
    })
}

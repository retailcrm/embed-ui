type LoadExtensionMessage = {
  entrypoint?: string;
  type?: string;
}

const READY_MESSAGE = 'sandbox:test-worker-ready'
const ERROR_MESSAGE = 'sandbox:test-worker-error'
const LOAD_MESSAGE = 'sandbox:test-load-extension'

const createNode = () => ({
  appendChild: (node: unknown) => node,
  insertAdjacentElement: (_position: string, node: unknown) => node,
  nextSibling: null,
  parentNode: null,
  remove: () => {},
  removeChild: (node: unknown) => node,
  setAttribute: () => {},
  textContent: '',
})

const head = createNode()

Object.defineProperty(globalThis, 'document', {
  configurable: true,
  value: {
    createElement: () => createNode(),
    createTextNode: () => ({}),
    head,
    querySelector: () => null,
    querySelectorAll: () => [],
  },
})

addEventListener('message', async (event: MessageEvent<LoadExtensionMessage>) => {
  if (event.data?.type !== LOAD_MESSAGE) return

  try {
    if (!event.data.entrypoint) {
      throw new Error('[sandbox:test] Extension worker entrypoint is required.')
    }

    await import(/* @vite-ignore */ event.data.entrypoint)

    postMessage({
      type: READY_MESSAGE,
    })
  } catch (error) {
    postMessage({
      message: error instanceof Error ? error.message : String(error),
      type: ERROR_MESSAGE,
    })
  }
})

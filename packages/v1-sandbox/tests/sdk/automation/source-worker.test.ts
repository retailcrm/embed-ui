import { expect, test, vi } from 'vitest'

type SourceWorkerMessageListener = (
  event: MessageEvent<{ entrypoint?: string; type?: string }>
) => Promise<void>

test('loads extension entrypoint through generic source worker protocol', async () => {
  const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document')
  const addEventListener = vi.fn()
  const postMessage = vi.fn()

  vi.stubGlobal('self', {
    addEventListener,
    postMessage,
  })

  try {
    await import('@/automation/source.worker')

    const listener = addEventListener.mock.calls[0][1] as SourceWorkerMessageListener
    const workerDocument = globalThis.document as unknown as {
      createElement(): {
        appendChild(node: unknown): unknown;
        insertAdjacentElement(position: string, node: unknown): unknown;
        remove(): void;
        removeChild(node: unknown): unknown;
        setAttribute(): void;
        textContent: string;
      };
      createTextNode(): object;
      querySelector(): null;
      querySelectorAll(): unknown[];
    }
    const node = workerDocument.createElement()
    const child = {}

    expect(node.appendChild(child)).toBe(child)
    expect(node.insertAdjacentElement('beforeend', child)).toBe(child)
    expect(node.removeChild(child)).toBe(child)
    expect(node.textContent).toBe('')
    expect(node.remove()).toBeUndefined()
    expect(node.setAttribute()).toBeUndefined()
    expect(workerDocument.createTextNode()).toEqual({})
    expect(workerDocument.querySelector()).toBeNull()
    expect(workerDocument.querySelectorAll()).toEqual([])

    await listener(new MessageEvent('message', {
      data: { type: 'ignored' },
    }))

    expect(postMessage).not.toHaveBeenCalled()

    await listener(new MessageEvent('message', {
      data: { type: 'sandbox:test-load-extension' },
    }))

    expect(postMessage).toHaveBeenLastCalledWith({
      message: '[sandbox:test] Extension worker entrypoint is required.',
      type: 'sandbox:test-worker-error',
    })

    await listener(new MessageEvent('message', {
      data: {
        entrypoint: 'data:text/javascript,export default true',
        type: 'sandbox:test-load-extension',
      },
    }))

    expect(postMessage).toHaveBeenLastCalledWith({
      type: 'sandbox:test-worker-ready',
    })

    await listener(new MessageEvent('message', {
      data: {
        entrypoint: 'data:text/javascript,throw "extension failed"',
        type: 'sandbox:test-load-extension',
      },
    }))

    expect(postMessage).toHaveBeenLastCalledWith({
      message: 'extension failed',
      type: 'sandbox:test-worker-error',
    })
  } finally {
    vi.unstubAllGlobals()

    if (documentDescriptor) {
      Object.defineProperty(globalThis, 'document', documentDescriptor)
    }
  }
})

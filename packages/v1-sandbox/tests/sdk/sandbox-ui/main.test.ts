import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.restoreAllMocks()
})

test('main entry mounts sandbox app', async () => {
  const mountSandbox = vi.fn()

  vi.doMock('@/app/createSandbox', () => ({
    mountSandbox,
  }))

  await import('@/app/main')

  expect(mountSandbox).toHaveBeenCalledOnce()
  expect(mountSandbox).toHaveBeenCalledWith()
})

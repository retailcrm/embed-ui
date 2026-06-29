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

test('mounts sandbox app with i18n plugin', async () => {
  const app = {
    mount: vi.fn(),
    use: vi.fn(function use() {
      return app
    }),
  }
  const createApp = vi.fn(() => app)
  const appComponent = {
    name: 'SandboxAppStub',
  }
  const i18n = {
    global: {},
  }

  vi.doMock('vue', () => ({
    createApp,
  }))
  vi.doMock('@/app/App.vue', () => ({
    default: appComponent,
  }))
  vi.doMock('@/app/i18n', () => ({
    sandboxI18n: i18n,
  }))

  await import('@/app/main')

  expect(createApp).toHaveBeenCalledWith(appComponent)
  expect(app.use).toHaveBeenCalledWith(i18n)
  expect(app.mount).toHaveBeenCalledWith('#app')
})

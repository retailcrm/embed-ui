import { expect, test } from 'vitest'

import { createSandboxLaunchConfig, resolveSandboxExtensionSource } from '@/scenario'

const descriptor = {
  runner: 'worker' as const,
  entrypoint: 'https://extension.test/runtime/worker.js?version=2',
  stylesheet: 'https://cdn.test/extension.css',
  pages: ['settings'],
  targets: ['order/card:common.after' as const],
}

test('resolves the entrypoint, stylesheet and backend from the descriptor', async () => {
  const source = await resolveSandboxExtensionSource(createSandboxLaunchConfig(
    { descriptor }
  ))

  expect(source).toEqual({
    descriptor,
    entrypoint: new URL(descriptor.entrypoint),
    httpBaseUrl: 'https://extension.test/',
  })
})

test('keeps the extension server path prefix for backend calls', async () => {
  const source = await resolveSandboxExtensionSource(createSandboxLaunchConfig({
    descriptor: {
      ...descriptor,
      entrypoint: 'https://extension.test/app/extension/module-id/script?version=2',
    },
  }))

  expect(source.httpBaseUrl).toBe('https://extension.test/app')
})

test('refuses to resolve an extension without a descriptor', async () => {
  await expect(resolveSandboxExtensionSource(createSandboxLaunchConfig()))
    .rejects.toThrow('Invalid extension descriptor')
})

test('rejects invalid descriptor resource URLs', async () => {
  await expect(resolveSandboxExtensionSource({
    ...createSandboxLaunchConfig(),
    descriptor: { ...descriptor, entrypoint: '/relative/script.js' },
  })).rejects.toThrow('Invalid extension descriptor')
})

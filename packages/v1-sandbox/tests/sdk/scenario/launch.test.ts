import { expect, test } from 'vitest'

import { createSandboxLaunchConfig } from '@/scenario'

const descriptor = {
  runner: 'worker' as const,
  entrypoint: 'https://extension.test/runtime/worker.js',
  pages: ['returns'],
  stylesheet: null,
  targets: ['order/card:common.after' as const],
}

test('uses descriptor targets for a new extension and preserves explicit selection', () => {
  const current = createSandboxLaunchConfig({ targets: ['order/card:payment.before'] })

  expect(createSandboxLaunchConfig({ descriptor }, current).targets).toEqual(descriptor.targets)
  expect(createSandboxLaunchConfig({ descriptor, targets: [] }, current).targets).toEqual([])
  expect(createSandboxLaunchConfig({ fixture: 'order-with-delivery' }, current).targets)
    .toEqual(['order/card:payment.before'])
})

test('does not mutate the selected targets of the current launch', () => {
  const current = createSandboxLaunchConfig({ descriptor })
  const next = createSandboxLaunchConfig({ mode: 'page', pageCode: 'returns' }, current)

  next.targets.length = 0
  expect(current.targets).toEqual(['order/card:common.after'])
})

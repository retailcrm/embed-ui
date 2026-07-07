import type { SandboxLaunchConfig } from '@/scenario'

import { expect, test } from 'vitest'

import { createMounts, DEFAULT_SANDBOX_TARGETS } from '@/runtime'

const baseConfig: SandboxLaunchConfig = {
  extensionUrl: '',
  fixture: 'order-basic',
  manifestUrl: '',
  mode: 'widget',
  pageCode: 'returns',
  targets: DEFAULT_SANDBOX_TARGETS,
  widgetId: 'sandbox-widget',
}

test('creates widget mounts from selected targets', () => {
  const mounts = createMounts(baseConfig)

  expect(mounts).toHaveLength(2)
  expect(mounts[0]).toMatchObject({
    label: 'order/card:common.before',
    type: 'widget',
  })
  expect(mounts[1].id).toBe('sandbox-widget:order-card-common-after')
})

test('creates page mount from page launch config', () => {
  const mounts = createMounts({
    ...baseConfig,
    mode: 'page',
    pageCode: 'returns',
  })

  expect(mounts).toHaveLength(1)
  expect(mounts[0]).toMatchObject({
    id: 'page:returns',
    label: 'returns',
    releaseConfig: {
      code: 'returns',
    },
    runConfig: {
      code: 'returns',
    },
    type: 'page',
  })
})

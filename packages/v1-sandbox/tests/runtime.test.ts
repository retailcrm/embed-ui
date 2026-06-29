import type { SandboxLaunchConfig } from '@/dev/types'

import { expect, test } from 'vitest'

import { createMounts, DEFAULT_SANDBOX_TARGETS } from '@/app/runtime/mounts'
import { isContextName, isRecord, isWorkerReadyMessage } from '@/app/predicates'
import { sandboxI18n } from '@/app/i18n'

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

test('app predicates narrow supported values', () => {
  expect(isRecord({ ok: true })).toBe(true)
  expect(isRecord(null)).toBe(false)
  expect(isRecord([])).toBe(false)
  expect(isContextName({ settings: {} }, 'settings')).toBe(true)
  expect(isContextName({ settings: {} }, 'missing')).toBe(false)
  expect(isWorkerReadyMessage({
    type: 'sandbox:extension-worker-ready',
  })).toBe(true)
  expect(isWorkerReadyMessage({
    type: 1,
  })).toBe(false)
})

test('sandbox i18n exposes supported locales', () => {
  expect(sandboxI18n.global.availableLocales).toEqual(['en-GB', 'es-ES', 'ru-RU'])
})

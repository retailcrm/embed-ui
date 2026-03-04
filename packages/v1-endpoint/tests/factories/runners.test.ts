import type { Component } from 'vue'

import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

import { defineMultiRunner as defineMultiPageRunner } from '../../src/remote/pages'
import { defineMultiRunner as defineMultiWidgetRunner } from '../../src/remote/widgets'
import { definePageRunner, defineWidgetRunner } from '../../src/remote'
import * as pagesModule from '../../src/remote/pages'
import * as widgetsModule from '../../src/remote/widgets'

afterEach(() => {
  vi.restoreAllMocks()
})

test('definePageRunner and defineWidgetRunner mount and unmount apps', async () => {
  const beforePageMount = vi.fn(async () => {})
  const use = vi.fn()
  const mount = vi.fn()
  const unmount = vi.fn()
  const createAppFn = vi.fn(() => ({
    use,
    mount,
    unmount,
  }))

  const pageRunner = definePageRunner({ render: () => null } as Component, beforePageMount)
  const widgetRunner = defineWidgetRunner({ render: () => null } as Component)

  const pageDestroy = await pageRunner.run(createAppFn as never, {} as never, {} as never, 'orders')
  const widgetDestroy = await widgetRunner.run(createAppFn as never, {} as never, {} as never, 'order/card:common.before')

  expect(createAppFn).toHaveBeenCalledTimes(2)
  expect(beforePageMount).toHaveBeenCalledTimes(1)
  expect(use).toHaveBeenCalledTimes(2)
  expect(mount).toHaveBeenCalledTimes(2)

  pageDestroy()
  widgetDestroy()

  expect(unmount).toHaveBeenCalledTimes(2)
})

test('defineMultiRunner for pages and widgets delegates to mapped runners', async () => {
  const pageRun = vi.fn(async () => () => {})
  const widgetRun = vi.fn(async () => () => {})
  const pageWarn = vi.spyOn(pagesModule.log, 'warn').mockImplementation(() => {})
  const widgetWarn = vi.spyOn(widgetsModule.log, 'warn').mockImplementation(() => {})

  const pagesRunner = defineMultiPageRunner({
    customers: { run: pageRun },
  })

  const widgetsRunner = defineMultiWidgetRunner({
    'order/card:common.before': { run: widgetRun },
  })

  await pagesRunner.run(vi.fn() as never, {} as never, {} as never, 'customers')
  await widgetsRunner.run(vi.fn() as never, {} as never, {} as never, 'order/card:common.before')

  expect(pageRun).toHaveBeenCalledTimes(1)
  expect(widgetRun).toHaveBeenCalledTimes(1)

  const pageFallbackDestroy = await pagesRunner.run(vi.fn() as never, {} as never, {} as never, 'unknown')
  const widgetFallbackDestroy = await widgetsRunner.run(vi.fn() as never, {} as never, {} as never, 'order/card:common.after')

  expect(typeof pageFallbackDestroy).toBe('function')
  expect(typeof widgetFallbackDestroy).toBe('function')
  expect(pageWarn).toHaveBeenCalledTimes(1)
  expect(pageWarn).toHaveBeenCalledWith('No runner for code "unknown"')
  expect(widgetWarn).toHaveBeenCalledTimes(1)
  expect(widgetWarn).toHaveBeenCalledWith('No runner for target "order/card:common.after"')
})

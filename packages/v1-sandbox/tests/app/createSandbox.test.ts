import { afterEach, expect, test } from 'vitest'

import { mountSandbox } from '@/app/createSandbox'

let app: ReturnType<typeof mountSandbox> | null = null
let root: HTMLElement | null = null

afterEach(() => {
  app?.unmount()
  root?.remove()
  app = null
  root = null
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
})

test('mounts sandbox with default onboarding screen', () => {
  root = document.createElement('div')
  document.body.append(root)

  app = mountSandbox(root)

  expect(root.textContent).toContain('Подключите внешнее расширение')
  expect(root.querySelector('[role="status"]')?.textContent).toBe('Виджеты: 2')
})

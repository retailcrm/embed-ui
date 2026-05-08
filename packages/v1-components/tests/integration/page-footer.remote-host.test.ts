import { afterEach, expect, test } from 'vitest'

import { createApp } from 'vue'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createRemoteRenderer } from '@omnicajs/vue-remote/remote'
import { defineComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'

import { UiButton } from '@/remote/components/button'
import { UiPageFooter } from '@/remote/components/page-footer'

import { createProvider as createHostProvider } from '@/host'
import { mountEndpointRoot } from '@/remote/endpoint'

let hostRoot: HTMLElement | null = null

afterEach(() => {
  hostRoot?.remove()
  hostRoot = null
})

test('renders page footer slots in host DOM through remote runtime', async () => {
  const receiver = createReceiver()

  hostRoot = document.createElement('div')
  document.body.appendChild(hostRoot)

  createApp({
    setup () {
      return () => h(HostedTree, {
        provider: createHostProvider(),
        receiver,
      })
    },
  }).mount(hostRoot)

  const root = await mountEndpointRoot(receiver.receive)

  createRemoteRenderer(root).createApp(defineComponent({
    setup () {
      return () => h(UiPageFooter, {}, {
        actions: () => [
          h(UiButton, {
            variant: 'success',
          }, () => 'Сохранить'),
        ],
        aside: () => [
          h(UiButton, {
            appearance: 'tertiary',
            variant: 'danger',
          }, () => 'Удалить'),
        ],
      })
    },
  })).mount(root)

  await receiver.flush()
  await flushPromises()

  expect(hostRoot.querySelector('.ui-v1-page-footer')).not.toBeNull()
  expect(hostRoot.querySelector('.ui-v1-page-footer__actions')?.textContent).toBe('Сохранить')
  expect(hostRoot.querySelector('.ui-v1-page-footer__aside')?.textContent).toBe('Удалить')
})

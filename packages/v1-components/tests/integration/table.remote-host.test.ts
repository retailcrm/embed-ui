import { afterEach, expect, test } from 'vitest'

import { createApp } from 'vue'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createRemoteRenderer } from '@omnicajs/vue-remote/remote'
import { defineComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'

import UiTable from '@/remote/components/table/UiTable.vue'
import UiTableColumn from '@/remote/components/table/UiTableColumn.vue'

import { createProvider as createHostProvider } from '@/host'
import { mountEndpointRoot } from '@/remote/endpoint'

let hostRoot: HTMLElement | null = null

afterEach(() => {
  hostRoot?.remove()
  hostRoot = null
})

test('renders col width and style in host DOM through remote runtime', async () => {
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
      return () => h(UiTable, {
        rowKey: 'id',
        rows: [{ id: 1, name: 'Alice' }],
      }, () => [
        h(UiTableColumn, {
          label: 'Name',
          maxWidth: '40%',
          minWidth: '160px',
          width: 240,
        }, {
          default: ({ row }: { row: { name: string } }) => row.name,
        }),
      ])
    },
  })).mount(root)

  await receiver.flush()
  await flushPromises()

  const col = hostRoot.querySelector('col')

  expect(col).not.toBeNull()
  expect(col?.getAttribute('width')).toBe('240')
  expect(col?.getAttribute('style')).toContain('width: 240px;')
  expect(col?.getAttribute('style')).toContain('min-width: 160px;')
  expect(col?.getAttribute('style')).toContain('max-width: 40%;')
})

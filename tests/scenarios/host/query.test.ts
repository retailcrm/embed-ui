import type {
  HostLocation,
  HostQueryInput,
  HostQueryOptions,
} from '@retailcrm/embed-ui-v1-types/host'

import type { Component, PropType } from 'vue'

import type { MessageEndpoint } from '@remote-ui/rpc'

import type { Receiver } from '@omnicajs/vue-remote/host'

import type { WidgetEndpoint, WidgetTarget } from '~types/widget'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import {
  createApp,
  h,
  onMounted,
  ref,
} from 'vue'

import { createProvider, createReceiver } from '@omnicajs/vue-remote/host'

import { createContextAccessor } from '@retailcrm/embed-ui-v1-contexts/host'

import { createEndpoint, fromMessagePort } from '@remote-ui/rpc'

import { createHostContext as createSettingsHostContext } from '~tests/__util__/settings'

import { flushPromises } from '@vue/test-utils'

import { createWidgetEndpoint } from '@/index'

import { useHost } from '@/composables'

describe('scenarios/host/query', () => {
  let el: HTMLElement | null = null
  let actions: {
    replace: null | (() => Promise<void>);
    push: null | (() => Promise<void>);
  } = {
    replace: null,
    push: null,
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
    actions = {
      replace: null,
      push: null,
    }
  })

  afterEach(() => {
    el?.remove()
    el = null
  })

  test('forwards location and query methods', async () => {
    const { port1, port2 } = new MessageChannel()

    port1.start()
    port2.start()

    const receiver = createReceiver()
    const host = createHostContext(fromMessagePort(port1))

    createHostApp(receiver).mount(el as HTMLElement)

    createWidgetEndpoint({
      async run (createApp, root, pinia, target) {
        const app = createApp({
          props: {
            target: {
              type: String as PropType<WidgetTarget>,
              required: true,
            },
          },

          setup (props) {
            const host = useHost()
            const location = ref<HostLocation | null>(null)

            const sync = async () => {
              location.value = await host.getLocation()
            }

            const replace = async () => {
              await host.replaceQuery({
                page: 2,
                filter: null,
              }, {
                preserveExisting: true,
              })

              await sync()
            }

            const push = async () => {
              await host.pushQuery({
                sort: ['date', 'desc'],
              }, {
                preserveExisting: true,
              })

              await sync()
            }

            actions.replace = replace
            actions.push = push

            onMounted(() => {
              void sync()
            })

            return () => h('div', [
              h('div', `Target: ${props.target}`),
              h('div', {
                'aria-label': 'HostLocation',
              }, JSON.stringify(location.value)),
            ])
          },
        }, {
          target,
        })

        app.use(pinia)
        app.mount(root)

        return () => app.unmount()
      },
    }, fromMessagePort(port2))

    await host.endpoint.call.run(receiver.receive, 'customer/card:phone')
    await receiver.flush()
    await flushPromises()

    expect(el?.innerHTML).toContain('Target: customer/card:phone')
    expect(getHostLocationText(el)).toContain('"search":"?page=1&filter=open"')
    expect(getHostLocationText(el)).toContain('"query":{"page":"1","filter":"open"}')

    await actions.replace?.()
    await receiver.flush()
    await flushPromises()

    expect(host.data.location.value.search).toBe('?page=2')
    expect(host.data.location.value.query).toEqual({
      page: '2',
    })
    expect(getHostLocationText(el)).toContain('"search":"?page=2"')

    await actions.push?.()
    await receiver.flush()
    await flushPromises()

    expect(host.data.location.value.search).toBe('?page=2&sort=date&sort=desc')
    expect(host.data.location.value.query).toEqual({
      page: '2',
      sort: ['date', 'desc'],
    })
    expect(getHostLocationText(el)).toContain('"search":"?page=2&sort=date&sort=desc"')

    await host.endpoint.call.release()
    await receiver.flush()
    await flushPromises()

    expect(el?.innerHTML).toBe('')
  })
})

function createHostContext (messenger: MessageEndpoint) {
  const settings = createSettingsHostContext('settings')
  const endpoint = createEndpoint<WidgetEndpoint>(messenger)
  const data = {
    location: ref<HostLocation>({
      pathname: '/modules/example/catalog',
      search: '?page=1&filter=open',
      hash: '#results',
      query: {
        page: '1',
        filter: 'open',
      },
    }),
  }

  const applyQuery = (query: HostQueryInput, options: HostQueryOptions = {}) => {
    const searchParams = new URLSearchParams()
    const nextQuery = options.preserveExisting
      ? cloneQuery(data.location.value.query)
      : {}

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) {
        continue
      }

      delete nextQuery[key]

      if (value === null) {
        continue
      }

      if (Array.isArray(value)) {
        const normalized = value
          .filter(item => item !== null && item !== undefined)
          .map(item => String(item))

        if (normalized.length > 0) {
          nextQuery[key] = normalized
        }

        continue
      }

      nextQuery[key] = String(value)
    }

    for (const [key, value] of Object.entries(nextQuery)) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item))
        continue
      }

      searchParams.set(key, value)
    }

    data.location.value = {
      ...data.location.value,
      search: searchParams.size > 0 ? `?${searchParams.toString()}` : '',
      query: nextQuery,
    }
  }

  endpoint.expose(Object.assign(createContextAccessor({
    'settings': settings.accessor,
  }), {
    getLocation: () => data.location.value,
    replaceQuery: (query: HostQueryInput, options?: HostQueryOptions) => applyQuery(query, options),
    pushQuery: (query: HostQueryInput, options?: HostQueryOptions) => applyQuery(query, options),
  }))

  return {
    data,
    endpoint,
  }
}

function cloneQuery (query: HostLocation['query']): HostLocation['query'] {
  return Object.fromEntries(Object.entries(query).map(([key, value]) => [
    key,
    Array.isArray(value) ? [...value] : value,
  ]))
}

function getHostLocationText (el: HTMLElement | null): string {
  return el?.querySelector('[aria-label="HostLocation"]')?.textContent ?? ''
}

function createHostApp (receiver: Receiver, components: {
  [key: string]: Component<NonNullable<unknown>>;
} = {}) {
  const provider = createProvider(components)

  return createApp({
    setup () {
      const tree = ref<{ forceUpdate (): void } | null>(null)

      return () => h(HostedTree, {
        ref: tree,
        provider,
        receiver,
      })
    },
  })
}

import type {
  ContextAccessor,
  Field,
  Rejection,
} from '@retailcrm/embed-ui-v1-types/context'

import type { MessageEndpoint } from '@remote-ui/rpc'

import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import { RuntimeError } from '@/host'

import {
  expect,
  test,
} from 'vitest'

import {
  flushPromises,
  mount,
} from '@vue/test-utils'

import {
  createApp,
  nextTick,
  reactive,
} from 'vue'

import { createPinia } from 'pinia'

import {
  createEndpoint,
  fromMessagePort,
} from '@remote-ui/rpc'

import { createContextAccessor } from '@/host'

import {
  defineContext,
  injectEndpoint,
} from '@/remote'

import { createAccessor } from '~tests/__util__/createAccessor'

type User = {
  id: Field<number, true>;
  name: Field<string, true>;
}

type Article = {
  title: Field<string>;
  text: Field<string>;
}

test('serves bidirectional connection', async () => {
  const { port1, port2 } = new MessageChannel()

  port1.start()
  port2.start()

  const host = createHost(fromMessagePort(port1))

  const remote = createEndpoint<ContextAccessor<{
    'user': User,
    'article': Article,
  }>>(fromMessagePort(port2))

  const pinia = createPinia()

  pinia.use(injectEndpoint(remote))

  createApp({ template: '<div />' }).use(pinia)

  const wrapper = mount({
    setup () {
      const user = useUserContext()
      const article = useArticleContext()

      Promise.all([user, article].map(c => c.initialize()))

      return { user, article }
    },

    template: `
        <div data-qa="id">{{ user.id }}</div>
        <div data-qa="name">{{ user.name }}</div>

        <input
            type="text"
            name="article[title]"
            :value="article.title"
            @input="article.set('title', $event.target.value)"
        />

        <textarea
            name="article[text]"
            :value="article.text"
            @input="article.set('text', $event.target.value)"
        />
    `,
  }, {
    plugins: [pinia],
  })

  await flushPromises()

  const id = wrapper.find<HTMLDivElement>('[data-qa="id"]')

  expect(id.exists()).toBe(true)
  expect(id.text()).toBe('1')

  const name = wrapper.find<HTMLDivElement>('[data-qa="name"]')

  expect(name.exists()).toBe(true)
  expect(name.text()).toBe('Ivan')

  const title = wrapper.find<HTMLInputElement>('[name="article[title]"]')

  expect(title.exists()).toBe(true)
  expect(title.element.value).toBe('How to cook soup')

  const text = wrapper.find<HTMLTextAreaElement>('[name="article[text]"]')

  expect(text.exists()).toBe(true)
  expect(text.element.value).toBe('The recipe description')

  title.element.value = 'How to cook soup with cheese'

  await title.trigger('input')

  text.element.value = 'A new recipe that includes previous + cheese'

  await text.trigger('input')

  expect(host['article']).toEqual({
    title: 'How to cook soup with cheese',
    text: 'A new recipe that includes previous + cheese',
  })

  host['user'].id = 2
  host['user'].name = 'Peter'

  host['article'].title = 'Getting started with reactive context'
  host['article'].text = 'A description how reactive context can be used'

  await nextTick()

  expect(id.text()).toBe('2')
  expect(name.text()).toBe('Peter')

  expect(title.element.value).toBe('Getting started with reactive context')
  expect(text.element.value).toBe('A description how reactive context can be used')
})

test('serves host errors', async () => {
  const { port1, port2 } = new MessageChannel()

  port1.start()
  port2.start()

  const contexts = {
    'article': createBrokenArticleAccessor('article'),
  }

  const endpoint = createEndpoint(fromMessagePort(port1))

  endpoint.expose(createContextAccessor({
    'article': contexts['article'].accessor,
  }, () => {}))

  const host = {
    'article': contexts['article'].data,
    endpoint,
  }

  const remote = createEndpoint<ContextAccessor<{
    'article': Article,
  }>>(fromMessagePort(port2))

  const pinia = createPinia()

  pinia.use(injectEndpoint(remote))

  createApp({ template: '<div />' }).use(pinia)

  let rejection: Rejection | null = null

  const wrapper = mount({
    setup () {
      const article = useArticleContext()

      article.initialize()

      return { article, onReject: (r: Rejection) => rejection = r }
    },

    template: `
        <input
            type="text"
            name="article[title]"
            :value="article.title"
            @input="article.set('title', $event.target.value, onReject)"
        />
    `,
  }, {
    plugins: [pinia],
  })

  await flushPromises()

  const title = wrapper.find<HTMLInputElement>('[name="article[title]"]')

  expect(title.exists()).toBe(true)
  expect(title.element.value).toBe('How to cook soup')

  title.element.value = 'How to cook soup with cheese'

  await title.trigger('input')

  expect(rejection).toEqual({
    type: 'runtime',
    message: '[crm:embed:host] Value was rejected',
  })

  expect(host['article']).toEqual({
    title: 'How to cook soup',
    text: 'The recipe description',
  })
})

function createUserAccessor (id: string) {
  const data = reactive({
    id: 1,
    name: 'Ivan',
  })

  return {
    data,
    accessor: createAccessor<User>(id, {
      'id': () => data.id,
      'name': () => data.name,
    }, {}),
  }
}

function useUserContext () {
  return defineContext<'user', User>('user', {
    'id': {
      accepts: (value: unknown) => typeof value === 'number',
      defaults: () => 0,
      readonly: true,
    },
    'name': {
      accepts: (value: unknown) => typeof value === 'string',
      defaults: () => '',
      readonly: true,
    },
  })()
}

function createArticleAccessor (id: string) {
  const data = reactive({
    title: 'How to cook soup',
    text: 'The recipe description',
  })

  return {
    data,
    accessor: createAccessor<Article>(id, {
      'title': () => data.title,
      'text': () => data.text,
    }, {
      'title': (title) => data.title = title,
      'text': (text) => data.text = text,
    }),
  }
}

function useArticleContext () {
  return defineContext<'article', Article>('article', {
    'title': {
      accepts: (value: unknown) => typeof value === 'string',
      defaults: () => '',
      readonly: false,
    },
    'text': {
      accepts: (value: unknown) => typeof value === 'string',
      defaults: () => '',
      readonly: false,
    },
  })()
}

function createBrokenArticleAccessor (id: string) {
  const fail = () => { throw new RuntimeError('Value was rejected') }
  const data = reactive({
    title: 'How to cook soup',
    text: 'The recipe description',
  })

  return {
    data,
    accessor: createAccessor<Article>(id, {
      'title': () => data.title,
      'text': () => data.text,
    }, {
      'title': fail,
      'text': fail,
    }),
  }
}

function createHost (messenger: MessageEndpoint) {
  const contexts = {
    'user': createUserAccessor('user'),
    'article': createArticleAccessor('article'),
  }

  const endpoint = createEndpoint(messenger)

  endpoint.expose(createContextAccessor({
    'user': contexts['user'].accessor,
    'article': contexts['article'].accessor,
  }))

  return {
    'user': contexts['user'].data,
    'article': contexts['article'].data,
    endpoint,
  }
}

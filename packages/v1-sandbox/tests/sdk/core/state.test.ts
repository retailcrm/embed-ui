import type { Field } from '@retailcrm/embed-ui-v1-types/context'

import type { SandboxSnapshot } from '@/core'

import { expect, test } from 'vitest'

import { applySandboxSnapshot, captureSandboxSnapshot, createSandboxState } from '@/core'

type Contexts = {
  article: {
    title: Field<string>;
  };
}

const schemas = {
  article: {
    title: {
      accepts: (value: unknown): value is string => typeof value === 'string',
      defaults: () => 'Draft',
      readonly: false,
    },
  },
} satisfies Contexts

test('creates state with scalar and array query values', () => {
  const state = createSandboxState({
    location: {
      query: {
        page: '2',
        tags: ['vip', 'new'],
      },
    },
    schemas,
  })

  expect(state.host.location).toMatchObject({
    hash: '',
    pathname: '/',
    search: '?page=2&tags=vip&tags=new',
  })
})

test('applies snapshots with removed, existing and new context records', () => {
  const state = createSandboxState({
    custom: {
      dictionaries: {
        status: [{
          code: 'new',
          cursor: 'new',
          text: 'New',
        }],
      },
    },
    schemas,
  })
  const snapshot: SandboxSnapshot<typeof schemas> = captureSandboxSnapshot(state)
  const contextRecords = snapshot.contexts as unknown as Record<string, Record<string, unknown>>

  snapshot.contexts.article.title = 'Published'
  delete snapshot.custom.dictionaries.status
  contextRecords.extra = {
    enabled: true,
  }
  applySandboxSnapshot(state, snapshot)

  expect(state.contexts.article.title).toBe('Published')
  expect((state.contexts as unknown as Record<string, unknown>).extra).toEqual({
    enabled: true,
  })

  delete contextRecords.article
  applySandboxSnapshot(state, snapshot)

  expect('article' in state.contexts).toBe(false)
})

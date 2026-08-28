import { describe, expect, test } from 'vitest'

import {
  parseSandboxExtensionDescriptor,
  parseSandboxExtensionDescriptorJson,
} from '@/scenario'

const descriptor = {
  baseUrl: 'https://extension.test/runtime/',
  code: 'returns-module',
  entrypoint: 'worker.js',
  pages: ['returns'],
  stylesheet: 'styles.css',
  targets: ['order/card:common.after'],
}

describe('sandbox extension descriptor', () => {
  test('parses a strict runtime descriptor', () => {
    expect(parseSandboxExtensionDescriptor(descriptor)).toEqual(descriptor)
    expect(parseSandboxExtensionDescriptorJson(JSON.stringify(descriptor))).toEqual(descriptor)
  })

  test('rejects runner and other fields', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      runner: 'worker',
    })).toThrow('Invalid extension descriptor')
  })

  test('requires an absolute http/https base url and resolvable resource paths', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      baseUrl: '/runtime/',
    })).toThrow('Invalid extension descriptor')
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      stylesheet: 'ftp://extension.test/styles.css',
    })).toThrow('Invalid extension descriptor')
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      entrypoint: 'http://[invalid',
    })).toThrow('Invalid extension descriptor')
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      pages: [''],
    })).toThrow('Invalid extension descriptor')
  })

  test('rejects malformed descriptor json', () => {
    expect(() => parseSandboxExtensionDescriptorJson('{')).toThrow(
      'Invalid extension descriptor JSON'
    )
  })
})

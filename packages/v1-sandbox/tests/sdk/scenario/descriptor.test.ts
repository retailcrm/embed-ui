import { describe, expect, test } from 'vitest'

import {
  parseSandboxExtensionDescriptor,
  parseSandboxExtensionDescriptorJson,
} from '@/scenario'

const descriptor = {
  runner: 'worker' as const,
  entrypoint: 'https://extension.test/runtime/worker.js',
  pages: ['returns'],
  stylesheet: 'https://extension.test/runtime/styles.css',
  targets: ['order/card:common.after'],
}

describe('sandbox extension descriptor', () => {
  test('parses a strict runtime descriptor', () => {
    expect(parseSandboxExtensionDescriptor(descriptor)).toEqual(descriptor)
    expect(parseSandboxExtensionDescriptorJson(JSON.stringify(descriptor))).toEqual(descriptor)
  })

  test('rejects unsupported runners', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      runner: 'iframe',
    })).toThrow('Invalid extension descriptor')
  })

  test('requires absolute http/https resource urls', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      entrypoint: '/runtime/worker.js',
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

  test('requires worker runner', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      runner: undefined,
    })).toThrow('Invalid extension descriptor')
  })

  test('rejects obsolete descriptor fields and unknown targets', () => {
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      uuid: 'returns-module',
    })).toThrow('Invalid extension descriptor')
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      baseUrl: 'https://extension.test/',
    })).toThrow('Invalid extension descriptor')
    expect(() => parseSandboxExtensionDescriptor({
      ...descriptor,
      targets: ['order/card:unknown'],
    })).toThrow('Invalid extension descriptor')
  })

  test('rejects malformed descriptor json', () => {
    expect(() => parseSandboxExtensionDescriptorJson('{')).toThrow(
      'Invalid extension descriptor JSON'
    )
  })
})

import type { Component } from 'vue'

import { createProvider as _createProvider } from '@omnicajs/vue-remote/host'

import * as components from '@/host/components'

export type Provider = {
  get (type: string): Component<NonNullable<unknown>>;
}

export const createProvider = (): Provider => _createProvider(components)

export const provider: Provider = createProvider()

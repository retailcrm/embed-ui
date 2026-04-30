import type { Component } from 'vue'

import type { HostComponentName } from './host-components'

import { createProvider as createRemoteHostProvider } from '@omnicajs/vue-remote/host'

import * as hostComponents from '@/host/components'

import { hostComponentNames } from './host-components'

type StorybookHostProviderComponents = Record<HostComponentName, Component>

const storybookHostProviderComponents = Object.fromEntries(
  hostComponentNames.map((name) => [name, hostComponents[name]])
) as StorybookHostProviderComponents

export const createStorybookHostProvider = () => createRemoteHostProvider(storybookHostProviderComponents)

export const storybookHostProvider = createStorybookHostProvider()

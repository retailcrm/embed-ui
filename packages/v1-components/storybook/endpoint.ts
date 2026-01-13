import type {
  Channel,
  RemoteRoot,
  SchemaOf,
} from '@omnicajs/vue-remote/remote'
import type { ShallowReactive } from 'vue'

import {
  Component,
  CreateAppFunction,
  shallowReactive,
} from 'vue'

import type {
  Endpoint,
  MessageEndpoint,
} from '@remote-ui/rpc'

import {
  createEndpoint,
  release,
  retain,
} from '@remote-ui/rpc'


import {
  createRemoteRenderer,
  createRemoteRoot,
} from '@omnicajs/vue-remote/remote'

export type Lifecycle<T extends object = object> = {
  run (channel: Channel, props?: Partial<T>): Promise<void>;
  release (): void;
}

export interface Callable<T extends object = object> {
  setProps (props: Partial<T>): void;
}

export interface Runner<T extends object = object> {
  run(
    createApp: CreateAppFunction<
      | Component<RemoteRoot<SchemaOf<string>>>
      | RemoteRoot<SchemaOf<string>>
    >,
    root: RemoteRoot<SchemaOf<string>>,
    props: ShallowReactive<Partial<T>>,
  ): Promise<() => void>;

}

const createRoot = async (channel: Channel) => {
  const root = createRemoteRoot(channel, {
    components: [
      'UiMenuItem',
      'UiMenuItemGroup',
      'UiPopperConnector',
      'UiSelectPopper',
      'UiSelectTrigger',
    ],
  })

  await root.mount()

  return root
}

export const createComponentEndpoint = <T extends object = object>(
  runner: Runner<T>,
  messenger: MessageEndpoint
): Endpoint<Callable<T> & Lifecycle> => {
  const endpoint = createEndpoint<Callable<T> & Lifecycle>(messenger)

  let onRelease = () => {}

  const currentProps = shallowReactive<Partial<T>>({})

  endpoint.expose({
    async run (channel: Channel, props?: Partial<T> ) {
      retain(channel)
      Object.assign(currentProps, props)

      const root = await createRoot(channel)
      await root.mount()

      const { createApp } = createRemoteRenderer(root)

      const destroy = await runner.run(createApp, root, currentProps)

      onRelease = () => {
        destroy()
        release(channel)
      }
    },

    setProps (props: Partial<T>) {
      Object.assign(currentProps, props)
    },

    release () {
      onRelease()
      onRelease = () => {}
    },
  })

  return endpoint
}

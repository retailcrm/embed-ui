import type { RemoteCallable } from '@remote-ui/rpc'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { RemoteProperties } from '@/remote/scaffolding'
import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import { defineRemoteComponent, defineRemoteMethod } from '@omnicajs/vue-remote/remote'

import { events } from '@/common/components/page-header'

export const UiPageHeaderTitleType = 'UiPageHeaderTitle' as SchemaType<
  'UiPageHeaderTitle',
  RemoteProperties<UiPageHeaderProperties>,
  RemoteCallable<UiPageHeaderMethods>
>

export const UiPageHeaderTitle = defineRemoteComponent(UiPageHeaderTitleType, {
  emits: events as unknown as {
    'blur': (event: Event) => boolean;
    'change': (event: Event) => boolean;
    'focus': (event: FocusEvent) => boolean;
    'keydown': (event: KeyboardEvent) => boolean;
    'update:value': (value: string | number) => boolean;
  },

  methods: {
    focus: defineRemoteMethod<[], void>(),
    blur: defineRemoteMethod<[], void>(),
  },
})

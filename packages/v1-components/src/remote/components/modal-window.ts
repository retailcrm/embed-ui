import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { SerializedDOMRect } from '@/common/types'

import type {
  SerializedEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiModalWindowProperties,
  UiModalWindowMethods,
} from '@/common/components/modal-window'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiModalWindowType = 'UiModalWindow' as SchemaType<
  'UiModalWindow',
  RemoteProperties<UiModalWindowProperties>,
  RemoteCallable<UiModalWindowMethods>
>

export const UiModalWindow = defineRemoteComponent(
  UiModalWindowType,
  [
    'open',
    'opened',
    'close',
    'close-cancel',
    'closed',
    'container:scroll:y',
    'container:scroll:y:end',
    'content:scroll:y:end',
    'toggle',
    'update:opened',
  ] as unknown as {
    'open': () => boolean;
    'opened': () => boolean;
    'close': () => boolean;
    'close-cancel': () => boolean;
    'closed': () => boolean;
    'container:scroll:y': (event: SerializedEvent, bounding: SerializedDOMRect | null) => boolean;
    'container:scroll:y:end': (event: SerializedEvent) => boolean;
    'content:scroll:y:end': () => boolean;
    'toggle': (opened: boolean) => boolean;
    'update:opened': (opened: boolean) => boolean;
  },
  [
    'icon',
    'title',
    'footer',
  ]
)

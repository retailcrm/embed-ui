import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { SerializedDOMRect } from '@/common/types'

import type {
  SerializedEvent,
} from '@omnicajs/vue-remote/types/events'

import type {
  UiModalWindowSurfaceProperties,
  UiModalWindowSurfaceMethods,
} from '@/common/components/modal-window'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiModalWindowSurfaceType = 'UiModalWindowSurface' as SchemaType<
  'UiModalWindowSurface',
  RemoteProperties<UiModalWindowSurfaceProperties>,
  RemoteCallable<UiModalWindowSurfaceMethods>
>

export const UiModalWindowSurface = defineRemoteComponent(
  UiModalWindowSurfaceType,
  [
    'open',
    'close',
    'close-cancel',
    'shown',
    'showing',
    'hidden',
    'hiding',
    'scroll:y',
    'scroll:y:end',
    'update:opened',
    'update:overlapped',
  ] as unknown as {
    'open': () => boolean;
    'close': () => boolean;
    'close-cancel': () => boolean;
    'shown': () => boolean;
    'showing': () => boolean;
    'hidden': () => boolean;
    'hiding': () => boolean;
    'scroll:y': (event: SerializedEvent, bounding: SerializedDOMRect | null) => boolean;
    'scroll:y:end': (event: SerializedEvent) => boolean;
    'update:opened': (opened: boolean) => boolean;
    'update:overlapped': (overlapped: boolean) => boolean;
  }
)

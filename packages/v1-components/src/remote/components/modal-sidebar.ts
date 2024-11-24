import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiModalSidebarProperties } from '@/common/components/modal-sidebar'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

import { CLOSE_METHOD } from '@/common/components/modal-sidebar'

export const UiModalSidebarType = 'UiModalSidebar' as SchemaType<
  'UiModalSidebar',
  RemoteProperties<UiModalSidebarProperties>,
  Record<string, never>
>

export const UiModalSidebar = defineRemoteComponent(
  UiModalSidebarType,
  [
    'open',
    'close',
    'close-cancel',
    'toggle',
    'shown',
    'showing',
    'hidden',
    'hiding',
    'update:opened',
    'update:overlapped',
    'scroll:y:end',
  ] as unknown as {
    'open': () => boolean,
    'close': (method: CLOSE_METHOD | undefined) => boolean,
    'close-cancel': (method: CLOSE_METHOD | undefined) => boolean,
    'toggle': (opened: boolean) => boolean,
    'shown': () => boolean,
    'showing': () => boolean,
    'hidden': () => boolean,
    'hiding': () => boolean,
    'update:opened': (opened: boolean) => boolean,
    'update:overlapped': (overlapped: boolean) => boolean,
    'scroll:y:end': () => boolean,
  }
)

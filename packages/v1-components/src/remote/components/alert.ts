import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiAlertMethods, UiAlertProperties } from '@/common/components/alert'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiAlertType = 'UiAlert' as SchemaType<
  'UiAlert',
  RemoteProperties<UiAlertProperties>,
  RemoteCallable<UiAlertMethods>
>

export const UiAlert = defineRemoteComponent(
  UiAlertType,
  [
    'showing',
    'shown',
    'hiding',
    'hidden',
  ] as unknown as {
    'showing': () => boolean;
    'shown': () => boolean;
    'hiding': () => boolean;
    'hidden': () => boolean;
  }
)

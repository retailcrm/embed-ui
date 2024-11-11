import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/dist/remote'

import type { UiTransitionProps } from '@/common/components/transition'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTransitionType = 'UiTransition' as SchemaType<
  'UiTransition',
  RemoteProperties<UiTransitionProps>,
  Record<string, never>
>

export const UiTransition = defineRemoteComponent(UiTransitionType)

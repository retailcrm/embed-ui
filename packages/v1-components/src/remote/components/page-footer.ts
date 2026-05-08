import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { UiPageFooterProperties } from '@/common/components/page-footer'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiPageFooterType = 'UiPageFooter' as SchemaType<
  'UiPageFooter',
  RemoteProperties<UiPageFooterProperties>
>

export const UiPageFooter = defineRemoteComponent(
  UiPageFooterType,
  [],
  [
    'actions',
    'aside',
  ]
)

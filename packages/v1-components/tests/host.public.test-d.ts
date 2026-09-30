import type { UiSelectPopper } from '@retailcrm/embed-ui-v1-components/host'

import { expectTypeOf, test } from 'vitest'

test('publishes UiSelectPopper with its exposed methods', () => {
  expectTypeOf<InstanceType<typeof UiSelectPopper>>().toMatchTypeOf<{
    adjust: () => Promise<void>;
    autoScroll: () => void;
    dispose: () => void;
    hide: () => void;
    show: () => void;
    updateWidth: () => void;
  }>()
})

import type { UiPageFooter } from '@/remote/components/page-footer'

import UiPageFooterExample from './UiPageFooter.example.vue'

import { createComponentEndpoint } from '../endpoint'

type UiPageFooterStoryProps = InstanceType<typeof UiPageFooter>['$props'] & {
  disabled?: boolean;
  locked?: boolean;
  showAside?: boolean;
  showSecondary?: boolean;
  styles?: Record<string, string>;
}

createComponentEndpoint<UiPageFooterStoryProps>({
  async run (createApp, root, props) {
    const app = createApp(UiPageFooterExample, props)

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

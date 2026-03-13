import UiTableReferenceExample from './UiTable.reference.example.vue'

import { createComponentEndpoint } from '../endpoint'

type UiTableStoryExtras = {
  empty?: boolean;
}
createComponentEndpoint<UiTableStoryExtras>({
  async run (createApp, root, props) {
    const app = createApp(UiTableReferenceExample, props)

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

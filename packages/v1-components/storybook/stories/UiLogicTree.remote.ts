import { h } from 'vue'

import { UiLogicTree } from '../../src/remote/components/logic-tree'

import { createComponentEndpoint } from '../endpoint'

type UiLogicTreeProps = InstanceType<typeof UiLogicTree>['$props']

createComponentEndpoint<UiLogicTreeProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        return () => h(UiLogicTree, props)
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

import { h } from 'vue'

import { UiButton } from '../../src/remote/components/button'
import { UiPopconfirm } from '../../src/remote/components/popconfirm'

import { createComponentEndpoint } from '../endpoint'

type UiPopconfirmProps = InstanceType<typeof UiPopconfirm>['$props']

createComponentEndpoint<UiPopconfirmProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        return () => h(UiPopconfirm, props, {
          trigger: ({ open }: { open: boolean }) => h(UiButton, { active: open }, () => 'Открыть'),
          default: () => 'Здесь указывается короткое описание действия.',
        })
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

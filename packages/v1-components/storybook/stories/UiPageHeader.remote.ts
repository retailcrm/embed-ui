import { h, ref } from 'vue'

import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'

import { UiButton } from '@/remote/components/button'
import { UiLink } from '@/remote/components/link'
import { UiPageHeader } from '@/remote/components/page-header'

import { createComponentEndpoint } from '../endpoint'

type UiPageHeaderProps = InstanceType<typeof UiPageHeader>['$props']

createComponentEndpoint<UiPageHeaderProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const value = ref(String(props.value ?? ''))

        return () => h('div', { style: 'width: 100%; max-width: 960px;' }, [
          h(UiPageHeader, {
            ...props,
            value: value.value,
            'onUpdate:value': (next: string | number) => {
              value.value = String(next ?? '')
            },
          }, {
            addon: () => [
              h(UiLink, {}, 'Свернуть фильтр'),
              h(UiLink, {}, 'Отправить'),
            ],
            actions: () => [
              h(UiButton, {
                appearance: 'tertiary',
              }, {
                default: () => [
                  'Действия',
                  h(IconCaretDown, { 'aria-hidden': 'true' }),
                ],
              }),
              h(UiButton, {
                size: 'md',
              }, {
                default: () => 'Сохранить',
              }),
            ],
          }),
        ])
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

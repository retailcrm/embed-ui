import { UiSelect } from '../../src/remote/components/select'
import { UiSelectOption } from '../../src/remote/components/select'

import { createComponentEndpoint } from '../endpoint'
import { h } from 'vue'

import IconNotification from '../../assets/sprites/alerts/notifications.svg'
import IconWarning from '../../assets/sprites/alerts/warning.svg'
import IconError from '../../assets/sprites/alerts/error-outlined.svg'

type UiSelectProps = InstanceType<typeof UiSelect>['$props']

createComponentEndpoint<UiSelectProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup ( ) {
        return () => h(UiSelect, {
          ...props,
          equalsFn: (a: unknown, b: unknown) => a === b,
        },{
          default: () =>
            [
              'Kyle Simmmons',
              'Eduardo Henry',
              'Philip Williamson',
              'Max Miles',
              'Caroline Allen',
              'Joanne Thompson Joanne Thompson Joanne Thompson Thompson Thompson',
              'DAD',
            ].map(t =>
              h(UiSelectOption, {
                value: t,
                label: t,
              }, {
                'leading-icon': ({ selected }: { selected: boolean }) => {
                  if (selected) {
                    return h(IconWarning, {
                      class: 'ui-v1-select-option__checkmark-icon',
                      'aria-hidden': 'true',
                    })
                  }

                  return null
                },

                'trailing-icon': ({ selected }: { selected: boolean }) => {
                  if (selected) {
                    return h(IconNotification, {
                      class: 'ui-v1-select-option__checkmark-icon',
                      'aria-hidden': 'true',
                    })
                  }

                  if (props.multiple) {
                    return h(IconError, {
                      class: 'ui-v1-select-option__add-icon',
                      'aria-hidden': 'true',
                    })
                  }

                  return null
                },
              })
            ),
        })
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

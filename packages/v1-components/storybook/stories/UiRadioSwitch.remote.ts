import { h, ref, watch } from 'vue'

import IconAdd from '../../assets/sprites/actions/add.svg'

import { APPEARANCE } from '../../src/common/components/radio-switch'
import {
  UiRadioSwitch,
  UiRadioSwitchOption,
} from '../../src/remote/components/radio-switch'

import { createComponentEndpoint } from '../endpoint'

type UiRadioSwitchProps = InstanceType<typeof UiRadioSwitch>['$props']
type UiRadioSwitchStoryExtras = {
  withSlots?: boolean;
}
type UiRadioSwitchWorkerProps = UiRadioSwitchProps & UiRadioSwitchStoryExtras

const items = [
  {
    label: 'Авто',
    value: { key: 'auto' },
    description: 'Автоматический режим',
  },
  {
    label: 'Ручной',
    value: { key: 'manual' },
    description: 'Ручная настройка',
  },
  {
    label: 'Архив',
    value: { key: 'archived' },
    description: 'Недоступно для выбора',
    disabled: true,
  },
] as const

createComponentEndpoint<UiRadioSwitchWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const value = ref<unknown>(props.value ?? items[0]?.value ?? null)

        watch(() => props.value, (nextValue) => {
          if (typeof nextValue !== 'undefined') {
            value.value = nextValue
          }
        })

        const equalFn = (a: unknown, b: unknown): boolean => {
          return Boolean(
            a
            && b
            && typeof a === 'object'
            && typeof b === 'object'
            && 'key' in a
            && 'key' in b
            && a.key === b.key
          )
        }

        return () => h(UiRadioSwitch, {
          appearance: props.appearance ?? APPEARANCE.DEFAULT,
          size: props.size,
          rubber: props.rubber,
          value: value.value,
          equalFn,
          options: props.withSlots
            ? undefined
            : items.map((item) => ({
              label: item.label,
              value: item.value,
              disabled: item.disabled,
            })),
          'onUpdate:value': (nextValue: unknown) => {
            value.value = nextValue
          },
        }, props.withSlots
          ? {
            default: () => items.map((item) => h(UiRadioSwitchOption, {
              label: item.label,
              value: item.value,
              description: item.description,
              disabled: item.disabled,
            }, {
              icon: () => h(IconAdd),
            })),
          }
          : {
            icon: () => h(IconAdd),
          })
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

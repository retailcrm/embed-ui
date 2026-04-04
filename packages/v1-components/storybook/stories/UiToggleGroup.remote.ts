import { h, ref, watch } from 'vue'

import IconAdd from '../../assets/sprites/actions/add.svg'

import { UiToggleButtonSize } from '../../src/common/components/toggle-button'
import {
  UiToggleGroup,
  UiToggleGroupOption,
} from '../../src/remote/components/toggle-group'

import { createComponentEndpoint } from '../endpoint'

type UiToggleGroupProps = InstanceType<typeof UiToggleGroup>['$props']
type UiToggleGroupStoryExtras = {
  withSlots?: boolean;
}
type UiToggleGroupWorkerProps = UiToggleGroupProps & UiToggleGroupStoryExtras

const items = [
  {
    label: 'Пн',
    value: 'monday',
  },
  {
    label: 'Вт',
    value: 'tuesday',
  },
  {
    label: 'Ср',
    value: 'wednesday',
  },
  {
    label: 'Чт',
    value: 'thursday',
  },
  {
    label: 'Пт',
    value: 'friday',
  },
  {
    label: 'Сб',
    value: 'saturday',
  },
  {
    label: 'Вс',
    value: 'sunday',
  },
] as const

createComponentEndpoint<UiToggleGroupWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const model = ref<unknown[]>(Array.isArray(props.model) ? props.model : [
          'monday',
          'wednesday',
          'friday',
        ])

        watch(() => props.model, (nextModel) => {
          if (Array.isArray(nextModel)) {
            model.value = nextModel
          }
        })

        return () => h(UiToggleGroup, {
          disabled: props.disabled,
          model: model.value,
          options: props.withSlots ? undefined : items,
          rubber: props.rubber,
          size: props.size ?? UiToggleButtonSize.SM,
          'onUpdate:model': (nextModel: unknown[]) => {
            model.value = nextModel
          },
        }, props.withSlots
          ? {
            default: () => items.map((item) => h(UiToggleGroupOption, {
              disabled: item.disabled,
              label: item.label,
              value: item.value,
            }, {
              icon: () => h(IconAdd),
            })),
          }
          : undefined)
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

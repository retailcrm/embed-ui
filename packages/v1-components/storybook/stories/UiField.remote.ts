import type { UiFieldSlotProps } from '../../src/common/components/field'

import { h, ref } from 'vue'

import { UiField } from '../../src/remote/components/field'
import { UiTextbox } from '../../src/remote/components/textbox'

import { createComponentEndpoint } from '../endpoint'

type UiFieldProps = InstanceType<typeof UiField>['$props']
type UiFieldStoryExtras = {
  withAddon?: boolean;
  addonText?: string;
  customLabel?: boolean;
  customHint?: boolean;
  hideLabel?: boolean;
  textboxPlaceholder?: string;
  containerWidth?: number;
}
type UiFieldWorkerProps = UiFieldProps & UiFieldStoryExtras

createComponentEndpoint<UiFieldWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const value = ref('')

        return () => {
          const {
            withAddon = false,
            addonText = '',
            customLabel = false,
            customHint = false,
            hideLabel = false,
            textboxPlaceholder = 'Type value',
            containerWidth = 360,
            ...fieldProps
          } = props

          const resolvedFieldProps = hideLabel
            ? { ...fieldProps, label: '' }
            : fieldProps

          const slots: Record<string, unknown> = {
            default: (slotProps: UiFieldSlotProps) => h(UiTextbox, {
              id: slotProps.id,
              value: value.value,
              placeholder: textboxPlaceholder,
              invalid: resolvedFieldProps.invalid,
              required: resolvedFieldProps.required,
              disabled: resolvedFieldProps.disabled,
              readonly: resolvedFieldProps.readonly,
              inputAttributes: {
                'aria-labelledby': slotProps.ariaLabelledby,
                'aria-invalid': slotProps.ariaInvalid,
              },
              'onUpdate:value': (next: string | number) => {
                value.value = String(next ?? '')
              },
            }),
          }

          if (customLabel) {
            slots.label = () => h('span', { style: 'display:inline-flex;gap:4px;align-items:center;' }, [
              h('strong', 'Custom label'),
              h('span', { style: 'opacity:.65;' }, '(slot)'),
            ])
          }

          if (customHint) {
            slots.hint = () => h('div', { style: 'display:grid;gap:2px;' }, [
              h('div', { style: 'font-weight:600;' }, 'Custom hint'),
              h('div', 'Use 3-32 characters'),
            ])
          }

          if (withAddon) {
            slots.addon = () => h('span', addonText)
          }

          return h('div', { style: `width: ${containerWidth}px;` }, [
            h(UiField, resolvedFieldProps, slots),
          ])
        }
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

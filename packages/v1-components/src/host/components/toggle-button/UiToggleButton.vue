<script lang="ts">
import type { PropType } from 'vue'

import type {
  UiToggleButtonMethods,
  UiToggleButtonProperties,
} from '@/common/components/toggle-button'

import { defineComponent, h } from 'vue'

import { normalize } from '@/host/render'
import { useElementRef } from '@/host/composables'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

export default defineComponent({
  name: 'UiToggleButton',

  props: {
    id: {
      type: String,
      default: undefined,
    },

    type: {
      type: String as PropType<UiToggleButtonProperties['type']>,
      default: 'button',
    },

    pressed: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    focused: {
      type: Boolean,
      default: false,
    },

    grouped: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<UiToggleButtonProperties['size']>,
      default: UiToggleButtonSize.SM,
      validator: (size: string) => {
        return Object.values(UiToggleButtonSize).includes(size as UiToggleButtonSize)
      },
    },
  },

  setup (props, { attrs, expose, slots }) {
    const root = useElementRef<HTMLButtonElement>()

    expose({
      click: () => root.value?.click(),
      focus: () => root.value?.focus(),
      blur: () => root.value?.blur(),
    } satisfies UiToggleButtonMethods)

    return () => {
      const content = normalize('default' in slots ? slots.default?.() ?? [] : [])

      return h('button', {
        ref: root,
        ...attrs,
        id: props.id,
        type: props.type,
        disabled: props.disabled,
        class: [attrs.class, {
          'ui-v1-toggle-button': true,
          [`ui-v1-toggle-button_${props.size}`]: true,
          'ui-v1-toggle-button_pressed': props.pressed,
          'ui-v1-toggle-button_disabled': props.disabled,
          'ui-v1-toggle-button_focused': props.focused,
          'ui-v1-toggle-button_grouped': props.grouped,
        }],
      }, h('span', { class: 'ui-v1-toggle-button__content' }, content.map(([node, isIcon]) => {
        const nodeProps = node.props ?? {}

        return h('span', {
          class: {
            'ui-v1-toggle-button__icon': isIcon,
            'ui-v1-toggle-button__text': !isIcon,
          },
          ...('aria-hidden' in nodeProps ? { 'aria-hidden': nodeProps['aria-hidden'] } : {}),
        }, node)
      })))
    }
  },
})
</script>

<style lang="less" src="./toggle-button.less" />

<script lang="ts">
import type { PropType } from 'vue'

import type { UiToggleGroupRootProperties } from '@/common/components/toggle-group'

import { defineComponent, h } from 'vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

export default defineComponent({
  name: 'UiToggleGroupRoot',

  props: {
    size: {
      type: String as PropType<UiToggleGroupRootProperties['size']>,
      default: UiToggleButtonSize.SM,
      validator: (size: string) => {
        return Object.values(UiToggleButtonSize).includes(size as UiToggleButtonSize)
      },
    },

    rubber: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    ariaLabel: {
      type: String,
      default: undefined,
    },

    ariaLabelledby: {
      type: String,
      default: undefined,
    },

    ariaDescribedby: {
      type: String,
      default: undefined,
    },

    ariaOrientation: {
      type: String as PropType<UiToggleGroupRootProperties['ariaOrientation']>,
      default: 'horizontal',
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('span', {
      ...attrs,
      role: attrs.role ?? 'toolbar',
      'aria-label': attrs['aria-label'] ?? props.ariaLabel,
      'aria-labelledby': attrs['aria-labelledby'] ?? props.ariaLabelledby,
      'aria-describedby': attrs['aria-describedby'] ?? props.ariaDescribedby,
      'aria-disabled': attrs['aria-disabled'] ?? `${props.disabled}`,
      'aria-orientation': attrs['aria-orientation'] ?? props.ariaOrientation,
      class: [attrs.class, {
        'ui-v1-toggle-group': true,
        [`ui-v1-toggle-group_${props.size}`]: true,
        'ui-v1-toggle-group_rubber': props.rubber,
        'ui-v1-toggle-group_disabled': props.disabled,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./toggle-group.less" />

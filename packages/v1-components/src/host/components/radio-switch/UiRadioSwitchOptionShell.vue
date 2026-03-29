<script lang="ts">
import type { PropType } from 'vue'

import type { UiRadioSwitchOptionShellMethods } from '@/common/components/radio-switch'
import type { UiRadioSwitchOptionShellProperties } from '@/common/components/radio-switch'

import { defineComponent, h, ref } from 'vue'

import { APPEARANCE, SIZE } from '@/common/components/radio-switch'

export default defineComponent({
  name: 'UiRadioSwitchOptionShell',
  inheritAttrs: false,

  props: {
    id: {
      type: String,
      default: undefined,
    },

    appearance: {
      type: String as PropType<UiRadioSwitchOptionShellProperties['appearance']>,
      default: APPEARANCE.DEFAULT,
      validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    },

    size: {
      type: String as PropType<UiRadioSwitchOptionShellProperties['size']>,
      default: SIZE.MD,
      validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    },

    checked: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, expose, slots }) {
    const root = ref<HTMLElement | null>(null)

    expose({
      focus: () => root.value?.focus(),
      blur: () => root.value?.blur(),
    } satisfies UiRadioSwitchOptionShellMethods)

    return () => h('div', {
      ref: root,
      ...attrs,
      id: props.id,
      role: attrs.role ?? 'radio',
      'aria-checked': `${props.checked}`,
      'aria-disabled': `${props.disabled}`,
      class: [attrs.class, {
        'ui-v1-radio-switch-option': true,
        'ui-v1-radio-switch-option_standalone': props.appearance === APPEARANCE.SECTION,
        'ui-v1-radio-switch-option_default': props.appearance === APPEARANCE.DEFAULT,
        [`ui-v1-radio-switch-option_${props.size}`]: props.appearance === APPEARANCE.DEFAULT,
        'ui-v1-radio-switch-option_active': props.checked,
        'ui-v1-radio-switch-option_disabled': props.disabled,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./radio-switch.less" />

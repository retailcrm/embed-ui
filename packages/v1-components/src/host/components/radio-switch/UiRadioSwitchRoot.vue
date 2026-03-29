<script lang="ts">
import type { PropType } from 'vue'

import type { UiRadioSwitchRootProperties } from '@/common/components/radio-switch'

import { defineComponent, h } from 'vue'

import { APPEARANCE, SIZE } from '@/common/components/radio-switch'

export default defineComponent({
  name: 'UiRadioSwitchRoot',

  props: {
    appearance: {
      type: String as PropType<UiRadioSwitchRootProperties['appearance']>,
      default: APPEARANCE.DEFAULT,
      validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    },

    size: {
      type: String as PropType<UiRadioSwitchRootProperties['size']>,
      default: SIZE.MD,
      validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    },

    rubber: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('div', {
      ...attrs,
      role: attrs.role ?? 'radiogroup',
      class: [attrs.class, {
        'ui-v1-radio-switch': true,
        [`ui-v1-radio-switch_${props.size}`]: props.appearance === APPEARANCE.DEFAULT,
        'ui-v1-radio-switch_borderless': props.appearance === APPEARANCE.SECTION,
        'ui-v1-radio-switch_rubber': props.rubber,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./radio-switch.less" />

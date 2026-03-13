<script lang="ts">
import type { PropType } from 'vue'

import { defineComponent, h } from 'vue'

import { ALIGN } from '@/common/components/table'

export default defineComponent({
  name: 'UiTableHeadCell',

  props: {
    align: {
      type: String as PropType<ALIGN | `${ALIGN}`>,
      default: ALIGN.LEFT,
      validator: (align: string) => Object.values(ALIGN).includes(align as ALIGN),
    },

    trim: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('th', {
      ...attrs,
      scope: attrs.scope ?? 'col',
      class: [attrs.class, {
        'ui-v1-table__head-cell': true,
        [`ui-v1-table__head-cell_align-${props.align}`]: true,
        'ui-v1-table__head-cell_trim': props.trim,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./table.less" />

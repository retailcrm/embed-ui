<script lang="ts">
import type { PropType } from 'vue'

import type { UiTableBodyCellTheme } from '@/common/components/table'

import { defineComponent, h } from 'vue'

import { ALIGN, VALIGN } from '@/common/components/table'

export default defineComponent({
  name: 'UiTableBodyCell',

  props: {
    align: {
      type: String as PropType<ALIGN | `${ALIGN}`>,
      default: ALIGN.LEFT,
      validator: (align: string) => Object.values(ALIGN).includes(align as ALIGN),
    },

    valign: {
      type: String as PropType<VALIGN | `${VALIGN}`>,
      default: VALIGN.MIDDLE,
      validator: (valign: string) => Object.values(VALIGN).includes(valign as VALIGN),
    },

    colspan: {
      type: Number,
      default: undefined,
    },

    rowspan: {
      type: Number,
      default: undefined,
    },

    trim: {
      type: Boolean,
      default: false,
    },

    theme: {
      type: String as PropType<UiTableBodyCellTheme>,
      default: 'default' as UiTableBodyCellTheme,
      validator: (theme: string) => ['default', 'group'].includes(theme),
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('td', {
      ...attrs,
      colspan: props.colspan,
      rowspan: props.rowspan,
      class: [attrs.class, {
        'ui-v1-table__body-cell': true,
        [`ui-v1-table__body-cell_align-${props.align}`]: true,
        [`ui-v1-table__body-cell_valign-${props.valign}`]: true,
        [`ui-v1-table__body-cell_theme-${props.theme}`]: true,
        'ui-v1-table__body-cell_trim': props.trim,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./table.less" />

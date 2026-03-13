<script lang="ts" remote>
import type { PropType } from 'vue'

import { defineComponent } from 'vue'

import { ALIGN, VALIGN } from '@/common/components/table'

export default defineComponent({
  name: 'UiTableColumn',

  props: {
    label: {
      type: String,
      default: '',
    },

    width: {
      type: [String, Number],
      default: undefined,
    },

    minWidth: {
      type: [String, Number],
      default: undefined,
    },

    maxWidth: {
      type: [String, Number],
      default: undefined,
    },

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

    trim: {
      type: Boolean,
      default: false,
    },

    colspan: {
      type: Function as PropType<(row: unknown, index: number) => number | undefined>,
      default: undefined,
    },

    rowspan: {
      type: Function as PropType<(row: unknown, index: number) => number | undefined>,
      default: undefined,
    },
  },

  setup () {
    return () => null
  },
})
</script>

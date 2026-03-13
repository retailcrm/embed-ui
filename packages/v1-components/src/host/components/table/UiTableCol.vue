<script lang="ts">
import type { Numeric } from '@/common/types'

import { defineComponent, h } from 'vue'

const toCssSize = (value: Numeric | undefined): string | undefined => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

export default defineComponent({
  name: 'UiTableCol',

  props: {
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
  },

  setup (props, { attrs }) {
    return () => h('col', {
      ...attrs,
      style: [
        attrs.style ?? null,
        {
          width: toCssSize(props.width),
          minWidth: toCssSize(props.minWidth),
          maxWidth: toCssSize(props.maxWidth),
        },
      ],
    })
  },
})
</script>

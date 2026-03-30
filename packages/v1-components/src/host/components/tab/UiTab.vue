<script lang="ts">
import type { PropType } from 'vue'

import type { UiTabProperties } from '@/common/components/tab'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiTab',
  inheritAttrs: false,

  props: {
    id: {
      type: String as PropType<UiTabProperties['id']>,
      required: true,
    },

    label: {
      type: String as PropType<UiTabProperties['label']>,
      default: '',
    },

    counter: {
      type: [String, Number] as PropType<UiTabProperties['counter']>,
      default: null,
    },

    disabled: {
      type: Boolean as PropType<UiTabProperties['disabled']>,
      default: false,
    },
  },

  setup () {
    return () => null
  },
})
</script>

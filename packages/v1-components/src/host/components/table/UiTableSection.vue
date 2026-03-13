<script lang="ts">
import type { PropType } from 'vue'

import type { UiTableSectionKind } from '@/common/components/table'

import { defineComponent, h } from 'vue'

const sectionTagByKind: Record<UiTableSectionKind, 'thead' | 'tbody' | 'tfoot'> = {
  head: 'thead',
  body: 'tbody',
  foot: 'tfoot',
}

export default defineComponent({
  name: 'UiTableSection',

  props: {
    kind: {
      type: String as PropType<UiTableSectionKind>,
      default: 'body' as UiTableSectionKind,
      validator: (kind: string) => Object.keys(sectionTagByKind).includes(kind),
    },
  },

  setup (props, { attrs, slots }) {
    return () => h(sectionTagByKind[props.kind], {
      ...attrs,
      class: [attrs.class, {
        'ui-v1-table__section': true,
        [`ui-v1-table__section_${props.kind}`]: true,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./table.less" />

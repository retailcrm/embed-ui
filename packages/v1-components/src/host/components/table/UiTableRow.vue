<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'UiTableRow',

  props: {
    interactive: {
      type: Boolean,
      default: false,
    },

    expanded: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('tr', {
      ...attrs,
      class: [attrs.class, {
        'ui-v1-table__row': true,
        'ui-v1-table__row_interactive': props.interactive,
        'ui-v1-table__row_expanded': props.expanded,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./table.less" />

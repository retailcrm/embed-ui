<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'UiTableRoot',

  props: {
    bordered: {
      type: Boolean,
      default: false,
    },

    fixed: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, slots }) {
    return () => h('table', {
      ...attrs,
      class: [attrs.class, {
        'ui-v1-table': true,
        'ui-v1-table_bordered': props.bordered,
        'ui-v1-table_fixed': props.fixed,
      }],
    }, slots.default?.())
  },
})
</script>

<style lang="less" src="./table.less" />

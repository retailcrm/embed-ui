<script lang="ts">
import type { PropType } from 'vue'
import type { UiTabGroupProperties } from '@/common/components/tab'

import type { TabDefinition } from './tabs'

import {
  computed,
  defineComponent,
  h,
  ref,
} from 'vue'

import { APPEARANCE, SIZE } from '@/common/components/tab'

const hasCounter = (value: string | number | null | undefined): boolean => {
  return value !== null && typeof value !== 'undefined'
}

export default defineComponent({
  name: 'UiTabButton',
  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<TabDefinition>,
      required: true,
    },

    active: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<UiTabGroupProperties['size']>,
      default: SIZE.MD,
      validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    },

    appearance: {
      type: String as PropType<UiTabGroupProperties['appearance']>,
      default: APPEARANCE.TEXT,
      validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    },
  },

  setup (props, { attrs, expose }) {
    const root = ref<HTMLButtonElement | null>(null)

    const isIconOnly = computed(() => {
      return Boolean(props.item.iconOnly)
    })

    const focus = () => {
      root.value?.focus()
    }

    const getWidth = () => {
      return Math.ceil(root.value?.offsetWidth ?? 0)
    }

    expose({
      focus,
      getWidth,
    })

    return () => h('button', {
      ...attrs,
      ref: root,
      class: [attrs.class, {
        'ui-v1-tab': true,
        [`ui-v1-tab_${props.appearance}`]: true,
        [`ui-v1-tab_${props.size}`]: true,
        'ui-v1-tab_active': props.active,
        'ui-v1-tab_disabled': Boolean(props.item.disabled),
        'ui-v1-tab_icon-without-text': isIconOnly.value,
      }],
      disabled: props.item.disabled,
      type: 'button',
    }, [
      props.item.iconSlot
        ? h('span', { class: 'ui-v1-tab__icon' }, props.item.iconSlot())
        : null,
      props.item.labelSlot || props.item.label
        ? h('span', { class: 'ui-v1-tab__label' }, props.item.labelSlot?.() ?? [props.item.label])
        : null,
      props.item.counterSlot || hasCounter(props.item.counter)
        ? h('span', { class: 'ui-v1-tab__counter' }, props.item.counterSlot?.() ?? [String(props.item.counter ?? '')])
        : null,
    ])
  },
})
</script>

<style lang="less" src="./tab.less" />

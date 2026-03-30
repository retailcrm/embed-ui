<script lang="ts">
import type { PropType } from 'vue'
import type { UiTabGroupProperties } from '@/common/components/tab'

import type { TabDefinition } from './tabs'

import { computed, defineComponent, h } from 'vue'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'

import { SIZE as MENU_SIZE } from '@/common/components/menu'
import { SIZE } from '@/common/components/tab'

export default defineComponent({
  name: 'UiTabGroupMenu',

  props: {
    items: {
      type: Array as PropType<TabDefinition[]>,
      default: () => [],
    },

    activeId: {
      type: String as PropType<UiTabGroupProperties['activeId']>,
      default: null,
    },

    menuExpanded: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<UiTabGroupProperties['size']>,
      default: SIZE.MD,
      validator: (size: string) => Object.values(SIZE).includes(size as SIZE),
    },
  },

  emits: {
    'select': (id: string) => {
      void id
      return true
    },

    'update:menuExpanded': (expanded: boolean) => {
      void expanded
      return true
    },
  },

  setup (props, { emit }) {
    const resolvedMenuItemSize = computed(() => {
      return props.size === SIZE.SM ? MENU_SIZE.SM : MENU_SIZE.MD
    })

    const onMenuItemKeydown = (id: string, event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
          event.preventDefault()
          emit('select', id)
      }
    }

    const onUpdateVisible = (expanded: boolean) => {
      if (expanded !== props.menuExpanded) {
        emit('update:menuExpanded', expanded)
      }
    }

    return () => {
      if (!props.items.length) {
        return null
      }

      return h(UiPopper, {
        visible: props.menuExpanded,
        targetTriggers: {
          hide: ['click'],
          show: ['click'],
        },
        globalTriggers: ['miss-click', 'reference-hidden'],
        class: 'ui-v1-tab-group__popper',
        placement: 'bottom-end',
        'onUpdate:visible': onUpdateVisible,
      }, {
        default: () => h('div', {
          class: 'ui-v1-tab-group__menu',
          role: 'menu',
        }, props.items.map((item) => h(UiMenuItem, {
          key: `menu-${item.id}`,
          active: props.activeId === item.id,
          'aria-checked': props.activeId === item.id ? 'true' : 'false',
          'aria-disabled': item.disabled ? 'true' : 'false',
          class: 'ui-v1-tab-group__menu-item',
          counter: item.counter ?? null,
          disabled: item.disabled,
          role: 'menuitemradio',
          size: resolvedMenuItemSize.value,
          tabindex: item.disabled ? -1 : 0,
          onClick: () => emit('select', item.id),
          onKeydown: (event: KeyboardEvent) => {
            onMenuItemKeydown(item.id, event)
          },
        }, {
          default: () => item.labelSlot?.() ?? [item.label ?? item.id],
          'leading-icon': item.iconSlot ? () => item.iconSlot?.() ?? null : undefined,
        }))),
      })
    }
  },
})
</script>

<style lang="less" src="./tab.less" />

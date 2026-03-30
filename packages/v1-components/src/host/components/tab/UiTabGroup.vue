<script lang="ts">
import type { PropType } from 'vue'
import type {
  TabLayout,
  TabMoveFocusIntent,
  UiTabGroupProperties,
} from '@/common/components/tab'

import type { TabDefinition } from './tabs'

import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue'

import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'

import UiTabGroupHead from './UiTabGroupHead.vue'
import UiTabGroupMenu from './UiTabGroupMenu.vue'

import { APPEARANCE, SIZE } from '@/common/components/tab'

import { collectTabs, createTabDefinitions, resolveActiveId } from './tabs'

import { resolveTabLayout } from './layout'

let counter = 0

type UiTabGroupHeadMethods = {
  focusTab: (id: string) => void;
  measure: () => {
    availableWidth: number;
    widths: Map<string, number>;
  };
}

export default defineComponent({
  name: 'UiTabGroup',
  inheritAttrs: false,

  props: {
    items: {
      type: Array as PropType<UiTabGroupProperties['items']>,
      default: () => [],
    },

    activeId: {
      type: String as PropType<UiTabGroupProperties['activeId']>,
      default: null,
    },

    focusableId: {
      type: String as PropType<UiTabGroupProperties['focusableId']>,
      default: undefined,
    },

    menuExpanded: {
      type: Boolean as PropType<UiTabGroupProperties['menuExpanded']>,
      default: undefined,
    },

    overflowing: {
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

  emits: {
    'layout': (layout: TabLayout) => {
      void layout
      return true
    },

    'change': (id: string) => {
      void id
      return true
    },

    'update:activeId': (id: string) => {
      void id
      return true
    },

    'update:focusableId': (id: string | null) => {
      void id
      return true
    },

    'update:menuExpanded': (expanded: boolean) => {
      void expanded
      return true
    },
  },

  setup (props, { attrs, emit, slots }) {
    const groupId = `ui-v1-tab-group-${++counter}`
    const root = ref<HTMLElement | null>(null)
    const headView = ref<UiTabGroupHeadMethods | null>(null)
    const widths = ref(new Map<string, number>())
    const availableWidth = ref(0)
    const localFocusableId = ref<string | null>(null)
    const localMenuExpanded = ref(false)
    const resolvedMenuExpanded = computed(() => {
      return typeof props.menuExpanded === 'undefined'
        ? localMenuExpanded.value
        : props.menuExpanded
    })

    let currentLayout: TabLayout = {
      headIds: [],
      menuIds: [],
    }
    let currentResolvedFocusableId: string | null = null
    let currentTabs: TabDefinition[] = props.items.length ? createTabDefinitions(props.items) : []
    let lastEmittedLayoutKey = ''
    let lastFocusedId: string | null = null
    let observer: ResizeObserver | null = null

    const updateMetrics = () => {
      const metrics = headView.value?.measure()

      availableWidth.value = metrics?.availableWidth ?? 0
      widths.value = metrics?.widths ?? new Map<string, number>()
    }

    const setFocusableId = (id: string | null) => {
      if (typeof props.focusableId === 'undefined') {
        localFocusableId.value = id
      }

      emit('update:focusableId', id)
    }

    const setMenuExpanded = (expanded: boolean) => {
      if (typeof props.menuExpanded === 'undefined') {
        localMenuExpanded.value = expanded
      }

      emit('update:menuExpanded', expanded)
    }

    const resolveFocusableId = (enabledHeadItems: readonly TabDefinition[]): string | null => {
      const enabledIds = new Set(enabledHeadItems.map((item) => item.id))
      const candidateFocusableId = typeof props.focusableId === 'undefined'
        ? localFocusableId.value
        : props.focusableId

      if (candidateFocusableId && enabledIds.has(candidateFocusableId)) {
        return candidateFocusableId
      }

      const resolvedActiveId = resolveActiveId(currentTabs, props.activeId)

      if (resolvedActiveId && enabledIds.has(resolvedActiveId)) {
        return resolvedActiveId
      }

      return enabledHeadItems[0]?.id ?? null
    }

    const moveFocus = (intent: TabMoveFocusIntent) => {
      const headIds = new Set(currentLayout.headIds)
      const enabledHeadItems = currentTabs.filter((item) => {
        return headIds.has(item.id) && !item.disabled
      })

      if (!enabledHeadItems.length) {
        setFocusableId(null)
        return
      }

      let target = enabledHeadItems[0]

      if (intent.direction === 'first') {
        target = enabledHeadItems[0]
      } else if (intent.direction === 'last') {
        target = enabledHeadItems.at(-1) ?? enabledHeadItems[0]
      } else {
        const currentIndex = enabledHeadItems.findIndex((tab) => tab.id === intent.id)
        const fallbackIndex = currentResolvedFocusableId
          ? enabledHeadItems.findIndex((tab) => tab.id === currentResolvedFocusableId)
          : -1
        const baseIndex = currentIndex === -1 ? Math.max(fallbackIndex, 0) : currentIndex
        const offset = intent.direction === 'next' ? 1 : -1
        const nextIndex = (baseIndex + offset + enabledHeadItems.length) % enabledHeadItems.length

        target = enabledHeadItems[nextIndex] ?? enabledHeadItems[0]
      }

      if (!target) {
        return
      }

      setFocusableId(target.id)
      emit('change', target.id)
      emit('update:activeId', target.id)
    }

    const selectTab = (id: string) => {
      const tab = currentTabs.find((item) => item.id === id)

      if (!tab || tab.disabled) {
        return
      }

      setFocusableId(id)
      setMenuExpanded(false)
      emit('change', id)
      emit('update:activeId', id)
    }

    const shouldMoveDomFocus = () => {
      const activeElement = document.activeElement

      return Boolean(activeElement && root.value?.contains(activeElement))
    }

    const syncAfterRender = () => {
      const layoutKey = `${currentLayout.headIds.join('|')}::${currentLayout.menuIds.join('|')}`

      if (layoutKey !== lastEmittedLayoutKey) {
        lastEmittedLayoutKey = layoutKey
        emit('layout', currentLayout)
      }

      if (!currentResolvedFocusableId || currentResolvedFocusableId === lastFocusedId || !shouldMoveDomFocus()) {
        return
      }

      lastFocusedId = currentResolvedFocusableId

      void nextTick(() => {
        headView.value?.focusTab(currentResolvedFocusableId!)
      })
    }

    onMounted(() => {
      updateMetrics()
      syncAfterRender()

      if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'function' && root.value) {
        observer = new window.ResizeObserver(() => {
          requestAnimationFrame(updateMetrics)
        })
        observer.observe(root.value)
      }
    })

    onUpdated(syncAfterRender)

    onBeforeUnmount(() => {
      observer?.disconnect()
      observer = null
    })

    watch(() => props.items, () => {
      void nextTick(updateMetrics)
    }, { deep: true })

    watch(() => [props.appearance, props.size], () => {
      void nextTick(updateMetrics)
    })

    return () => {
      const tabs = props.items.length
        ? createTabDefinitions(props.items)
        : collectTabs(slots.default?.() ?? [])
      const resolvedActiveId = resolveActiveId(tabs, props.activeId)
      const layout = resolveTabLayout({
        items: tabs,
        widths: widths.value,
        availableWidth: availableWidth.value,
        size: props.size ?? SIZE.MD,
        appearance: props.appearance ?? APPEARANCE.TEXT,
        overflowing: props.overflowing,
        activeId: resolvedActiveId,
      })
      const headIds = new Set(layout.headIds)
      const menuIds = new Set(layout.menuIds)
      const headItems = tabs.filter((item) => headIds.has(item.id))
      const menuItems = tabs.filter((item) => menuIds.has(item.id))
      const enabledHeadItems = headItems.filter((item) => !item.disabled)
      const activeItem = resolvedActiveId
        ? tabs.find((item) => item.id === resolvedActiveId) ?? null
        : null

      currentTabs = tabs
      currentLayout = layout
      currentResolvedFocusableId = resolveFocusableId(enabledHeadItems)

      return h('div', {
        ...attrs,
        ref: root,
        class: [attrs.class, {
          'ui-v1-tab-group': true,
          [`ui-v1-tab-group_${props.appearance}`]: true,
          [`ui-v1-tab-group_${props.size}`]: true,
        }],
      }, [
        h(UiPopperConnector, null, {
          default: () => [
            h(UiTabGroupHead, {
              ref: headView,
              activeId: resolvedActiveId,
              appearance: props.appearance,
              focusableId: currentResolvedFocusableId,
              groupId,
              hasMenuItems: menuItems.length > 0,
              headItems,
              items: tabs,
              menuExpanded: resolvedMenuExpanded.value,
              size: props.size,
              onFocusTab: (id: string) => {
                setFocusableId(id)
              },
              onMoveFocus: (intent: TabMoveFocusIntent) => {
                moveFocus(intent)
              },
              onSelect: (id: string) => {
                selectTab(id)
              },
            }),
            h(UiTabGroupMenu, {
              activeId: resolvedActiveId,
              items: menuItems,
              menuExpanded: resolvedMenuExpanded.value,
              size: props.size,
              onSelect: (id: string) => {
                selectTab(id)
              },
              'onUpdate:menuExpanded': (expanded: boolean) => {
                setMenuExpanded(expanded)
              },
            }),
          ],
        }),
        activeItem?.contentSlot
          ? h('div', {
            id: `${groupId}-panel-${activeItem.id}`,
            class: 'ui-v1-tab-group__panel',
            role: 'tabpanel',
            'aria-labelledby': `${groupId}-tab-${activeItem.id}`,
          }, activeItem.contentSlot())
          : null,
      ])
    }
  },
})
</script>

<style lang="less" src="./tab.less" />

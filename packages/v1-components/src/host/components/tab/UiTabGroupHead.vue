<template>
    <div
        aria-hidden="true"
        class="ui-v1-tab-group__measure"
    >
        <UiTabButton
            v-for="item in items"
            :id="`${item.id}-measure`"
            :key="`measure-${item.id}`"
            :ref="element => setMeasureRef(item.id, element as TabButtonRef | null)"
            :active="activeId === item.id"
            :appearance="appearance"
            class="ui-v1-tab-group__measure-button"
            :item="item"
            :size="size"
            tabindex="-1"
        />
    </div>

    <div
        ref="head"
        class="ui-v1-tab-group__head"
        role="tablist"
    >
        <div class="ui-v1-tab-group__content">
            <UiTabButton
                v-for="item in headItems"
                :id="`${props.groupId}-tab-${item.id}`"
                :key="`head-${item.id}`"
                :ref="element => setHeadRef(item.id, element as TabButtonRef | null)"
                :active="activeId === item.id"
                :aria-disabled="item.disabled ? 'true' : 'false'"
                :aria-selected="activeId === item.id ? 'true' : 'false'"
                :aria-controls="item.contentSlot ? `${props.groupId}-panel-${item.id}` : undefined"
                :appearance="appearance"
                :item="item"
                :size="size"
                :tabindex="!item.disabled && focusableId === item.id ? 0 : -1"
                role="tab"
                @click="$emit('select', item.id)"
                @focus="$emit('focus-tab', item.id)"
                @keydown="onTabKeydown(item.id, $event)"
            />
        </div>

        <UiButton
            v-if="hasMenuItems"
            :active="menuExpanded"
            :aria-expanded="menuExpanded ? 'true' : 'false'"
            aria-label="More tabs"
            aria-haspopup="menu"
            appearance="tertiary"
            class="ui-v1-tab-group__trigger"
            size="sm"
            type="button"
        >
            <IconMoreHorizontal
                aria-hidden="true"
                class="ui-v1-tab-group__trigger-icon"
            />
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TabFocusDirection } from '@/common/components/tab'
import type { TabMoveFocusIntent } from '@/common/components/tab'
import type { UiTabGroupProperties } from '@/common/components/tab'

import type { TabDefinition } from './tabs'

import { ref } from 'vue'

import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import UiButton from '@/host/components/button/UiButton.vue'
import UiTabButton from '@/host/components/tab/UiTabButton.vue'

import { APPEARANCE, SIZE } from '@/common/components/tab'

type TabButtonRef = {
  focus: () => void;
  getWidth: () => number;
}

const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },

  items: {
    type: Array as PropType<TabDefinition[]>,
    default: () => [],
  },

  headItems: {
    type: Array as PropType<TabDefinition[]>,
    default: () => [],
  },

  activeId: {
    type: String as PropType<UiTabGroupProperties['activeId']>,
    default: null,
  },

  focusableId: {
    type: String as PropType<UiTabGroupProperties['focusableId']>,
    default: null,
  },

  menuExpanded: {
    type: Boolean,
    default: false,
  },

  hasMenuItems: {
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
})

const emit = defineEmits<{
  'focus-tab': [id: string];
  'move-focus': [intent: TabMoveFocusIntent];
  'select': [id: string];
}>()

const head = ref<HTMLElement | null>(null)
const headRefs = new Map<string, TabButtonRef | null>()
const measureRefs = new Map<string, TabButtonRef | null>()

const createIntent = (id: string, direction: TabFocusDirection): TabMoveFocusIntent => {
  return { id, direction }
}

const onTabKeydown = (id: string, event: KeyboardEvent) => {
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault()
      emit('select', id)
      return

    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      emit('move-focus', createIntent(id, 'next'))
      return

    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      emit('move-focus', createIntent(id, 'prev'))
      return

    case 'Home':
      event.preventDefault()
      emit('move-focus', createIntent(id, 'first'))
      return

    case 'End':
      event.preventDefault()
      emit('move-focus', createIntent(id, 'last'))
  }
}

const setHeadRef = (id: string, element: TabButtonRef | null) => {
  if (element) {
    headRefs.set(id, element)
    return
  }

  headRefs.delete(id)
}

const setMeasureRef = (id: string, element: TabButtonRef | null) => {
  if (element) {
    measureRefs.set(id, element)
    return
  }

  measureRefs.delete(id)
}

const focusTab = (id: string) => {
  headRefs.get(id)?.focus()
}

const measure = () => {
  const widths = new Map<string, number>()

  props.items.forEach((item) => {
    widths.set(item.id, measureRefs.get(item.id)?.getWidth() ?? 0)
  })

  return {
    availableWidth: Math.ceil(head.value?.clientWidth ?? 0),
    widths,
  }
}

defineExpose({
  focusTab,
  measure,
})
</script>

<style lang="less" src="./tab.less" />

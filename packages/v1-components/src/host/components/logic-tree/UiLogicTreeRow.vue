<template>
    <div
        ref="rowRef"
        :class="{
            'ui-v1-logic-tree__row': true,
            'ui-v1-logic-tree__row_grouped-header': groupedHeader,
            'ui-v1-logic-tree__row_grouped': grouped,
            'ui-v1-logic-tree__row_grouped-start': grouped && groupedPosition === 'start',
            'ui-v1-logic-tree__row_grouped-middle': grouped && groupedPosition === 'middle',
            'ui-v1-logic-tree__row_grouped-end': grouped && groupedPosition === 'end',
            'ui-v1-logic-tree__row_grouped-single': grouped && groupedPosition === 'single',
        }"
        :data-row-path-key="pathKey"
    >
        <div class="ui-v1-logic-tree__row-main">
            <div
                v-if="connectors.length > 0"
                class="ui-v1-logic-tree__connectors"
            >
                <span
                    v-for="(connector, index) in connectors"
                    :key="index"
                    :class="{
                        'ui-v1-logic-tree__connector': true,
                        'ui-v1-logic-tree__connector_placeholder': connector.placeholder,
                        'ui-v1-logic-tree__connector_visible': connector.visible,
                        'ui-v1-logic-tree__connector_branch': index === connectors.length - 1,
                        'ui-v1-logic-tree__connector_terminal': index === connectors.length - 1 && !connector.continues,
                        'ui-v1-logic-tree__connector_with-relation': Boolean(conjunction) && index === connectors.length - 1 && !connector.placeholder,
                        [`ui-v1-logic-tree__connector_${connector.tone}`]: true,
                    }"
                >
                    <span
                        v-if="!connector.placeholder"
                        class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_top"
                    />
                    <span
                        v-if="connector.continues && !connector.placeholder"
                        class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_bottom"
                    />
                    <span
                        v-if="index === connectors.length - 1 && !connector.placeholder"
                        class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_middle"
                    />
                </span>
            </div>

            <span
                v-if="conjunction && connectors.length > 0"
                :class="{
                    'ui-v1-logic-tree__relation-badge': true,
                    'ui-v1-logic-tree__relation-badge_or': conjunctionKind === 'or',
                    'ui-v1-logic-tree__relation-badge_and': conjunctionKind === 'and',
                    [`ui-v1-logic-tree__relation-badge_${conjunctionTone}`]: true,
                }"
                :style="conjunctionBadgeStyle"
            >
                {{ conjunctionLabel || conjunction }}
            </span>

            <div
                class="ui-v1-logic-tree__surface-row"
                :data-path-key="pathKey"
                v-bind="$attrs"
            >
                <div
                    :class="{
                        'ui-v1-logic-tree__grouped-block': grouped,
                        'ui-v1-logic-tree__grouped-block_start': grouped && groupedPosition === 'start',
                        'ui-v1-logic-tree__grouped-block_middle': grouped && groupedPosition === 'middle',
                        'ui-v1-logic-tree__grouped-block_end': grouped && groupedPosition === 'end',
                        'ui-v1-logic-tree__grouped-block_single': grouped && groupedPosition === 'single',
                    }"
                >
                    <div
                        v-if="rowView === LogicTreeRowView.ACTIONS"
                        class="ui-v1-logic-tree__actions-row"
                    >
                        <div class="ui-v1-logic-tree__row-prefix">
                            <slot name="prefix" />
                        </div>

                        <div class="ui-v1-logic-tree__actions-row-content">
                            <slot name="content" />
                        </div>

                        <div class="ui-v1-logic-tree__row-trailing">
                            <slot name="trailing" />
                        </div>
                    </div>

                    <div
                        v-else
                        :class="{
                            'ui-v1-logic-tree__surface-row-content': true,
                            'ui-v1-logic-tree__surface-row-content_active': selected,
                            'ui-v1-logic-tree__surface-row-content_editing': isEditable,
                            'ui-v1-logic-tree__surface-row-content_editor': isEditable,
                            'ui-v1-logic-tree__surface-row-content_highlighted': highlighted,
                            'ui-v1-logic-tree__surface-row-content_simple': true,
                        }"
                        tabindex="0"
                        @click="onClick"
                        @keydown.enter.prevent="onKeydownActivate"
                        @keydown.space.prevent="onKeydownActivate"
                    >
                        <div class="ui-v1-logic-tree__surface-row-content__main">
                            <div class="ui-v1-logic-tree__row-prefix">
                                <slot name="prefix" />
                            </div>

                            <div class="ui-v1-logic-tree__row-content">
                                <slot name="content" />
                            </div>
                        </div>

                        <div class="ui-v1-logic-tree__row-trailing">
                            <slot name="trailing" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type {
  LogicTreeTone,
  UiLogicTreeConnector,
  UiLogicTreeRowProperties,
} from '@/common/components/logic-tree'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from 'vue'

import { LogicTreeConjunction, LogicTreeRowView } from '@/common/components/logic-tree'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  connectors: {
    type: Array as PropType<UiLogicTreeConnector[]>,
    default: () => [],
  },

  editable: {
    type: Boolean,
    default: false,
  },

  grouped: {
    type: Boolean,
    default: false,
  },

  groupedHeader: {
    type: Boolean,
    default: false,
  },

  groupedPosition: {
    type: String as PropType<UiLogicTreeRowProperties['groupedPosition']>,
    default: undefined,
  },

  highlighted: {
    type: Boolean,
    default: false,
  },

  pathKey: {
    type: String,
    default: '',
  },

  conjunction: {
    type: String,
    default: '',
  },

  conjunctionLabel: {
    type: String,
    default: '',
  },

  conjunctionEndPathKey: {
    type: String,
    default: '',
  },

  conjunctionOffset: {
    type: Number,
    default: undefined,
  },

  conjunctionStartPathKey: {
    type: String,
    default: '',
  },

  conjunctionTone: {
    type: String as PropType<LogicTreeTone>,
    default: undefined,
  },

  rowView: {
    type: String as PropType<LogicTreeRowView>,
    default: LogicTreeRowView.SUMMARY,
  },

  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'row-click': [pathKey: string];
  'row-edit': [value: boolean];
}>()

const isEditable = computed(() => props.editable)

const onClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null

  if (
    target?.closest(
      'button, input, select, textarea, [role="button"], [role="option"], [data-skip-row-click="true"]'
    )
  ) {
    return
  }

  if (!props.editable) {
    emit('row-edit', true)
  }

  emit('row-click', props.pathKey)
}

const onKeydownActivate = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null

  if (
    target?.closest(
      'button, input, select, textarea, [role="button"], [role="option"], [data-skip-row-click="true"]'
    )
  ) {
    return
  }

  if (!props.editable) {
    emit('row-edit', true)
  }

  emit('row-click', props.pathKey)
}

const conjunctionKind = computed(() => {
  if (props.conjunction === LogicTreeConjunction.OR) {
    return 'or'
  }

  if (props.conjunction === LogicTreeConjunction.AND) {
    return 'and'
  }

  return ''
})

const rowRef = ref<HTMLElement | null>(null)
const conjunctionCalculatedOffset = ref<number | undefined>(
  props.conjunction && props.conjunctionStartPathKey && props.conjunctionEndPathKey
    ? undefined
    : props.conjunctionOffset
)

const resolveRelationElement = (root: HTMLElement, pathKey: string): HTMLElement | null => (
  root.querySelector<HTMLElement>(`[data-path-key="${pathKey}"]`)
  ?? root.querySelector<HTMLElement>(`[data-row-path-key="${pathKey}"]`)
)

const resolveRelationAnchor = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect()

  return rect.top + (rect.height / 2)
}

const recalculateConjunctionOffset = async () => {
  if (!props.conjunction || !props.conjunctionStartPathKey || !props.conjunctionEndPathKey) {
    conjunctionCalculatedOffset.value = props.conjunctionOffset
    return
  }

  await nextTick()

  const currentRow = rowRef.value
  const root = currentRow?.closest('.ui-v1-logic-tree')

  if (!currentRow || !root) {
    conjunctionCalculatedOffset.value = props.conjunctionOffset
    return
  }

  const startRow = resolveRelationElement(root, props.conjunctionStartPathKey)
  const endRow = resolveRelationElement(root, props.conjunctionEndPathKey)

  if (!startRow || !endRow) {
    conjunctionCalculatedOffset.value = props.conjunctionOffset
    return
  }

  const currentTop = currentRow.getBoundingClientRect().top
  const startAnchor = resolveRelationAnchor(startRow)
  const endAnchor = resolveRelationAnchor(endRow)

  conjunctionCalculatedOffset.value = ((startAnchor + endAnchor) / 2) - currentTop
}

const onResize = () => {
  void recalculateConjunctionOffset()
}

onMounted(() => {
  void recalculateConjunctionOffset()
  window.addEventListener('resize', onResize)
})

onUpdated(() => {
  void recalculateConjunctionOffset()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

const conjunctionBadgeStyle = computed(() => (
  props.conjunction && props.conjunctionStartPathKey && props.conjunctionEndPathKey && conjunctionCalculatedOffset.value === undefined
    ? {
      left: `${Math.max(0, (props.connectors.length - 1) * 32 + 8)}px`,
      visibility: 'hidden',
    }
    : conjunctionCalculatedOffset.value === undefined
      ? {
        left: `${Math.max(0, (props.connectors.length - 1) * 32 + 8)}px`,
      }
      : {
        left: `${Math.max(0, (props.connectors.length - 1) * 32 + 8)}px`,
        top: `${conjunctionCalculatedOffset.value}px`,
      }
))
</script>

<style lang="less" src="./logic-tree.less" />

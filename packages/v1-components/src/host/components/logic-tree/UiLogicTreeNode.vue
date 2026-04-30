<template>
    <div
        ref="nodeRef"
        :class="{
            'ui-v1-logic-tree__node': true,
            'ui-v1-logic-tree__node_grouped-header': groupedHeader,
            'ui-v1-logic-tree__node_grouped': grouped,
            'ui-v1-logic-tree__node_grouped-start': grouped && groupedPosition === 'start',
            'ui-v1-logic-tree__node_grouped-middle': grouped && groupedPosition === 'middle',
            'ui-v1-logic-tree__node_grouped-end': grouped && groupedPosition === 'end',
            'ui-v1-logic-tree__node_grouped-single': grouped && groupedPosition === 'single',
        }"
        :data-node-path-key="pathKey"
    >
        <div class="ui-v1-logic-tree__node-main">
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

            <UiPopperConnector
                v-if="conjunction && connectors.length > 0"
            >
                <UiPopperTarget
                    :class="{
                        'ui-v1-logic-tree__relation-badge': true,
                        'ui-v1-logic-tree__relation-badge_or': conjunctionKind === 'or',
                        'ui-v1-logic-tree__relation-badge_and': conjunctionKind === 'and',
                        [`ui-v1-logic-tree__relation-badge_${conjunctionTone}`]: true,
                    }"
                    :style="conjunctionBadgeStyle"
                    data-skip-node-click="true"
                    tag="button"
                    type="button"
                >
                    {{ conjunctionLabel || conjunction }}
                </UiPopperTarget>

                <slot name="conjunction-poppers" />
            </UiPopperConnector>

            <div
                class="ui-v1-logic-tree__surface-node"
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
                        v-if="nodeView === LogicTreeNodeView.ACTIONS"
                        class="ui-v1-logic-tree__actions-node"
                    >
                        <div class="ui-v1-logic-tree__node-prefix">
                            <slot name="prefix" />
                        </div>

                        <div class="ui-v1-logic-tree__actions-node-content">
                            <slot name="content" />
                        </div>

                        <div class="ui-v1-logic-tree__node-trailing">
                            <slot name="trailing" />
                        </div>
                    </div>

                    <div
                        v-else
                        :class="{
                            'ui-v1-logic-tree__surface-node-content': true,
                            'ui-v1-logic-tree__surface-node-content_active': selected,
                            'ui-v1-logic-tree__surface-node-content_disabled': disabled,
                            'ui-v1-logic-tree__surface-node-content_editing': isEditable,
                            'ui-v1-logic-tree__surface-node-content_editor': isEditable,
                            'ui-v1-logic-tree__surface-node-content_highlighted': highlighted,
                            'ui-v1-logic-tree__surface-node-content_simple': true,
                        }"
                        :aria-disabled="disabled || undefined"
                        role="button"
                        :tabindex="disabled ? undefined : 0"
                        @click="onClick"
                        @keydown.enter.prevent="onKeydownActivate"
                        @keydown.space.prevent="onKeydownActivate"
                    >
                        <div class="ui-v1-logic-tree__surface-node-content__main">
                            <div class="ui-v1-logic-tree__node-prefix">
                                <slot name="prefix" />
                            </div>

                            <div class="ui-v1-logic-tree__node-content">
                                <slot name="content" />
                            </div>
                        </div>

                        <div class="ui-v1-logic-tree__node-trailing">
                            <slot name="trailing" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CSSProperties, PropType } from 'vue'

import type {
  LogicTreeTone,
  UiLogicTreeConnector,
  UiLogicTreeNodeProperties,
} from '@/common/components/logic-tree'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from 'vue'

import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'

import { LogicTreeConjunction, LogicTreeNodeView } from '@/common/components/logic-tree'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  connectors: {
    type: Array as PropType<UiLogicTreeConnector[]>,
    default: () => [],
  },

  disabled: {
    type: Boolean,
    default: false,
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
    type: String as PropType<UiLogicTreeNodeProperties['groupedPosition']>,
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

  nodeView: {
    type: String as PropType<LogicTreeNodeView>,
    default: LogicTreeNodeView.SUMMARY,
  },

  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'node-click': [pathKey: string];
  'node-edit': [value: boolean];
}>()

const isEditable = computed(() => props.editable)

const isInteractiveDescendant = (event: Event): boolean => {
  const target = event.target as HTMLElement | null
  const currentTarget = event.currentTarget as HTMLElement | null
  const interactiveTarget = target?.closest(
    'button, input, select, textarea, [role="button"], [role="option"], [data-skip-node-click="true"]'
  )

  return Boolean(interactiveTarget && interactiveTarget !== currentTarget)
}

const onClick = (event: MouseEvent) => {
  if (props.disabled || isInteractiveDescendant(event)) {
    return
  }

  if (!props.editable) {
    emit('node-edit', true)
  }

  emit('node-click', props.pathKey)
}

const onKeydownActivate = (event: KeyboardEvent) => {
  if (props.disabled || isInteractiveDescendant(event)) {
    return
  }

  if (!props.editable) {
    emit('node-edit', true)
  }

  emit('node-click', props.pathKey)
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

const nodeRef = ref<HTMLElement | null>(null)
const conjunctionCalculatedOffset = ref<number | undefined>(
  props.conjunction && props.conjunctionStartPathKey && props.conjunctionEndPathKey
    ? undefined
    : props.conjunctionOffset
)

const resolveRelationElement = (root: HTMLElement, pathKey: string): HTMLElement | null => (
  root.querySelector<HTMLElement>(`[data-path-key="${pathKey}"]`)
  ?? root.querySelector<HTMLElement>(`[data-node-path-key="${pathKey}"]`)
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

  const currentNode = nodeRef.value
  const root = currentNode?.closest<HTMLElement>('.ui-v1-logic-tree')

  if (!currentNode || !root) {
    conjunctionCalculatedOffset.value = props.conjunctionOffset
    return
  }

  const startNode = resolveRelationElement(root, props.conjunctionStartPathKey)
  const endNode = resolveRelationElement(root, props.conjunctionEndPathKey)

  if (!startNode || !endNode) {
    conjunctionCalculatedOffset.value = props.conjunctionOffset
    return
  }

  const currentTop = currentNode.getBoundingClientRect().top
  const startAnchor = resolveRelationAnchor(startNode)
  const endAnchor = resolveRelationAnchor(endNode)

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

const conjunctionBadgeStyle = computed<CSSProperties>(() => {
  const left = `${Math.max(0, (props.connectors.length - 1) * 32 + 8)}px`
  const offset = conjunctionCalculatedOffset.value

  if (
    props.conjunction
    && props.conjunctionStartPathKey
    && props.conjunctionEndPathKey
    && offset === undefined
  ) {
    return {
      left,
      visibility: 'hidden',
    }
  }

  return offset !== undefined
    ? { left, top: `${offset}px` }
    : { left }
})
</script>

<style lang="less" src="./logic-tree.less" />

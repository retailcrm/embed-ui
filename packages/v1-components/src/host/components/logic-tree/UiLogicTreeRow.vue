<template>
    <div
        :class="{
            'ui-v1-logic-tree__row': true,
            'ui-v1-logic-tree__row_grouped-header': groupedHeader,
            'ui-v1-logic-tree__row_grouped': grouped,
            'ui-v1-logic-tree__row_grouped-start': grouped && groupedPosition === 'start',
            'ui-v1-logic-tree__row_grouped-middle': grouped && groupedPosition === 'middle',
            'ui-v1-logic-tree__row_grouped-end': grouped && groupedPosition === 'end',
            'ui-v1-logic-tree__row_grouped-single': grouped && groupedPosition === 'single',
        }"
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

                    <span
                        v-if="conjunction && index === connectors.length - 1 && !connector.placeholder"
                        :class="{
                            'ui-v1-logic-tree__relation-badge': true,
                            'ui-v1-logic-tree__relation-badge_or': conjunctionKind === 'or',
                            'ui-v1-logic-tree__relation-badge_and': conjunctionKind === 'and',
                            [`ui-v1-logic-tree__relation-badge_${conjunctionTone}`]: true,
                        }"
                    >
                        {{ conjunctionLabel || conjunction }}
                    </span>
                </span>
            </div>

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
                            'ui-v1-logic-tree__surface-row-content_editing': editing,
                            'ui-v1-logic-tree__surface-row-content_editor': rowView === LogicTreeRowView.EDITOR,
                            'ui-v1-logic-tree__surface-row-content_highlighted': highlighted,
                            'ui-v1-logic-tree__surface-row-content_simple': !surface,
                        }"
                        tabindex="0"
                        @click="onClick"
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

import { computed } from 'vue'

import { LogicTreeConjunction, LogicTreeRowView } from '@/common/components/logic-tree'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  connectors: {
    type: Array as PropType<UiLogicTreeConnector[]>,
    default: () => [],
  },

  editing: {
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

  surface: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  'row-click': [pathKey: string];
}>()

const onClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null

  if (
    target?.closest(
      'button, input, select, textarea, [role="button"], [role="option"], [data-skip-row-click="true"]'
    )
  ) {
    return
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
</script>

<style lang="less" src="./logic-tree.less" />

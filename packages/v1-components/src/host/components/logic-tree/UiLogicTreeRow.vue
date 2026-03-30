<template>
    <div class="ui-v1-logic-tree__row">
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
                        'ui-v1-logic-tree__connector_visible': connector.visible,
                        'ui-v1-logic-tree__connector_branch': index === connectors.length - 1,
                        [`ui-v1-logic-tree__connector_${connector.tone}`]: true,
                    }"
                >
                    <span class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_top" />
                    <span
                        v-if="connector.continues"
                        class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_bottom"
                    />
                    <span
                        v-if="index === connectors.length - 1"
                        class="ui-v1-logic-tree__connector-stroke ui-v1-logic-tree__connector-stroke_middle"
                    />

                    <span
                        v-if="relation && index === connectors.length - 1"
                        :class="{
                            'ui-v1-logic-tree__relation-badge': true,
                            'ui-v1-logic-tree__relation-badge_or': relationKind === 'or',
                            'ui-v1-logic-tree__relation-badge_and': relationKind === 'and',
                            [`ui-v1-logic-tree__relation-badge_${relationTone}`]: true,
                        }"
                    >
                        {{ relation }}
                    </span>
                </span>
            </div>

            <div
                ref="surfaceRow"
                :class="{
                    'ui-v1-logic-tree__surface-row': true,
                    'ui-v1-logic-tree__surface-row_actions': rowKind === UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                    'ui-v1-logic-tree__surface-row_editor': rowKind === UI_LOGIC_TREE_ROW_KIND.EDITOR,
                    'ui-v1-logic-tree__surface-row_highlighted': highlighted || isDragging,
                    'ui-v1-logic-tree__surface-row_plain': !surface,
                    'ui-v1-logic-tree__surface-row_selected': selected,
                }"
                :data-path-key="pathKey"
                :tabindex="rowKind !== UI_LOGIC_TREE_ROW_KIND.ACTIONS ? 0 : undefined"
                v-bind="$attrs"
                @click="onClick"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type {
  UiLogicTreeConnector,
  UiLogicTreeRowKind,
  UiLogicTreeTone,
} from '@/common/components/logic-tree'

import { useDraggable } from '@vueuse/core'

import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  UI_LOGIC_TREE_RELATION,
  UI_LOGIC_TREE_ROW_KIND,
} from '@/common/components/logic-tree'

defineOptions({
  inheritAttrs: false,
})

type UiLogicTreeRowDragEvent = {
  clientX: number;
  clientY: number;
  sourcePathKey: string;
  targetPathKey: string;
}

const props = defineProps({
  /** Набор колонок связей, которые рисуются слева от строки */
  connectors: {
    type: Array as PropType<UiLogicTreeConnector[]>,
    default: () => [],
  },

  /** Разрешает перетаскивание строки за drag-handle */
  draggable: {
    type: Boolean,
    default: false,
  },

  /** Подсвечивает строку как наведённую или активную */
  highlighted: {
    type: Boolean,
    default: false,
  },

  /** Уникальный путь строки внутри дерева, используется для клика и drag&drop */
  pathKey: {
    type: String,
    default: '',
  },

  /** Текст логической связи перед строкой, например И или ИЛИ */
  relation: {
    type: String,
    default: '',
  },

  /** Цветовая схема бейджа связи и примыкающей ветки */
  relationTone: {
    type: String as PropType<UiLogicTreeTone>,
    default: undefined,
  },

  /** Состояние строки: просмотр с текстом/иконками или редактирование с инпутами и селектами */
  rowKind: {
    type: String as PropType<UiLogicTreeRowKind>,
    default: UI_LOGIC_TREE_ROW_KIND.SUMMARY,
  },

  /** Выделяет строку как выбранную */
  selected: {
    type: Boolean,
    default: false,
  },

  /** Включает карточный фон и рамку у строки */
  surface: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  'row-click': [pathKey: string];
  'row-drag-end': [payload: UiLogicTreeRowDragEvent];
  'row-drag-move': [payload: UiLogicTreeRowDragEvent];
  'row-drag-start': [payload: UiLogicTreeRowDragEvent];
}>()

const surfaceRow = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

const syncHandle = () => {
  handle.value = surfaceRow.value?.querySelector('.ui-v1-logic-tree__handle') as HTMLElement | null
}

const resolveDragPayload = (event: PointerEvent): UiLogicTreeRowDragEvent => {
  const targetPathKey = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest<HTMLElement>('[data-path-key]')
    ?.dataset.pathKey
    ?? ''

  return {
    clientX: event.clientX,
    clientY: event.clientY,
    sourcePathKey: props.pathKey,
    targetPathKey,
  }
}

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

const relationKind = computed(() => {
  if (props.relation === UI_LOGIC_TREE_RELATION.OR) {
    return 'or'
  }

  if (props.relation === UI_LOGIC_TREE_RELATION.AND) {
    return 'and'
  }

  return ''
})

const { isDragging } = useDraggable(surfaceRow, {
  disabled: computed(() => !props.draggable),
  handle,
  preventDefault: true,
  stopPropagation: true,
  onEnd: (_, event) => {
    emit('row-drag-end', resolveDragPayload(event))
  },
  onMove: (_, event) => {
    emit('row-drag-move', resolveDragPayload(event))
  },
  onStart: (_, event) => {
    emit('row-drag-start', resolveDragPayload(event))
  },
})

watch(() => [props.draggable, props.rowKind], async () => {
  await nextTick()
  syncHandle()
}, { immediate: true })

onMounted(() => {
  void nextTick(syncHandle)
})
</script>

<style lang="less" src="./logic-tree.less" />

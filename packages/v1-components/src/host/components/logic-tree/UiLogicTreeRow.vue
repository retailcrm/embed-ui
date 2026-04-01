<template>
    <div
        :class="{
            'ui-v1-logic-tree__row': true,
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
                        v-if="conjunction && index === connectors.length - 1"
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
                :class="{
                    'ui-v1-logic-tree__surface-row': true,
                    'ui-v1-logic-tree__surface-row_offset-ghost': isOffsetGhostDragging,
                }"
                :data-path-key="pathKey"
                :style="surfaceRowContainerStyle"
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
                        v-if="rowKind === LogicTreeRowKind.ACTIONS"
                        ref="surfaceRow"
                        class="ui-v1-logic-tree__actions-row"
                        :style="surfaceRowStyle"
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
                        ref="surfaceRow"
                        :class="{
                            'ui-v1-logic-tree__surface-row-content': true,
                            'ui-v1-logic-tree__surface-row-content_active': selected,
                            'ui-v1-logic-tree__surface-row-content_editing': editing,
                            'ui-v1-logic-tree__surface-row-content_editor': rowKind === LogicTreeRowKind.EDITOR,
                            'ui-v1-logic-tree__surface-row-content_highlighted': highlighted || isDragging,
                            'ui-v1-logic-tree__surface-row-content_simple': !surface,
                        }"
                        :style="surfaceRowStyle"
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
import type { CSSProperties, PropType } from 'vue'

import type {
  LogicTreeTone,
  UiLogicTreeConnector,
  UiLogicTreeRowProperties,
} from '@/common/components/logic-tree'

import { useDraggable } from '@vueuse/core'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  LogicTreeConjunction,
  LogicTreeNodeKind,
  LogicTreeRowKind,
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

  /** Переводит строку в режим редактирования и удерживает активные действия видимыми */
  editing: {
    type: Boolean,
    default: false,
  },

  /** Включает отдельный grouped-блок вокруг контентной зоны строки */
  grouped: {
    type: Boolean,
    default: false,
  },

  /** Позиция строки внутри grouped-блока */
  groupedPosition: {
    type: String as PropType<UiLogicTreeRowProperties['groupedPosition']>,
    default: undefined,
  },

  /** Подсвечивает строку как наведённую или активную */
  highlighted: {
    type: Boolean,
    default: false,
  },

  /** Логический тип узла, нужен для специальных сценариев drag&drop у групп */
  nodeKind: {
    type: String as PropType<LogicTreeNodeKind>,
    default: undefined,
  },

  /** Уникальный путь строки внутри дерева, используется для клика и drag&drop */
  pathKey: {
    type: String,
    default: '',
  },

  /** Значение конъюнкции перед строкой, например AND или OR */
  conjunction: {
    type: String,
    default: '',
  },

  /** Локализованный текст бейджа конъюнкции, например AND/OR или И/ИЛИ */
  conjunctionLabel: {
    type: String,
    default: '',
  },

  /** Цветовая схема бейджа конъюнкции и примыкающей ветки */
  conjunctionTone: {
    type: String as PropType<LogicTreeTone>,
    default: undefined,
  },

  /** Состояние строки: просмотр с текстом/иконками или редактирование с инпутами и селектами */
  rowKind: {
    type: String as PropType<LogicTreeRowKind>,
    default: LogicTreeRowKind.SUMMARY,
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
const dragRect = ref<DOMRect | null>(null)
const dragPointer = ref({
  x: 0,
  y: 0,
})

const syncHandle = () => {
  handle.value = surfaceRow.value?.querySelector('.ui-v1-logic-tree__handle') as HTMLElement | null
}

const resolveDragPayload = (event: PointerEvent): UiLogicTreeRowDragEvent => {
  const targetPathKey = typeof document === 'undefined'
    ? ''
    : document
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

const conjunctionKind = computed(() => {
  if (props.conjunction === LogicTreeConjunction.OR) {
    return 'or'
  }

  if (props.conjunction === LogicTreeConjunction.AND) {
    return 'and'
  }

  return ''
})

const isOffsetGhostDragging = computed(() => (
  isDragging.value
  && (props.grouped || props.nodeKind === LogicTreeNodeKind.GROUP)
))

const { isDragging } = useDraggable(surfaceRow, {
  disabled: computed(() => !props.draggable),
  handle,
  preventDefault: true,
  stopPropagation: true,
  onEnd: (_, event) => {
    dragRect.value = null
    dragPointer.value = { x: 0, y: 0 }
    emit('row-drag-end', resolveDragPayload(event))
  },
  onMove: (_, event) => {
    dragPointer.value = {
      x: event.clientX,
      y: event.clientY,
    }
    emit('row-drag-move', resolveDragPayload(event))
  },
  onStart: (_, event) => {
    dragRect.value = surfaceRow.value?.getBoundingClientRect() ?? null
    dragPointer.value = {
      x: event.clientX,
      y: event.clientY,
    }
    emit('row-drag-start', resolveDragPayload(event))
  },
})

const surfaceRowContainerStyle = computed<CSSProperties | undefined>(() => {
  if (!isOffsetGhostDragging.value || !dragRect.value) {
    return undefined
  }

  return {
    minHeight: `${dragRect.value.height}px`,
  }
})

const surfaceRowStyle = computed<CSSProperties | undefined>(() => {
  if (!isOffsetGhostDragging.value || !dragRect.value) {
    return undefined
  }

  return {
    left: '0',
    pointerEvents: 'none',
    position: 'fixed',
    top: '0',
    transform: `translate3d(${dragPointer.value.x + 24}px, ${dragPointer.value.y - 28}px, 0)`,
    width: `${dragRect.value.width}px`,
    zIndex: '20',
  }
})

watch(() => [props.draggable, props.rowKind], async () => {
  await nextTick()
  syncHandle()
}, { immediate: true })

onMounted(() => {
  void nextTick(syncHandle)
})

onBeforeUnmount(() => {
  dragRect.value = null
  dragPointer.value = { x: 0, y: 0 }
})
</script>

<style lang="less" src="./logic-tree.less" />

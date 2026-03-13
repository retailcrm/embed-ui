import type {
  Column,
  CssClass,
  DataForCell,
  DataForGroupHead,
  DataForLabel,
  RowAttrs,
  RowKey,
  RowRendererArgs,
} from '@/common/components/table'
import type { Slot, VNode, VNodeArrayChildren } from 'vue'

import {
  Comment,
  Fragment,
  isVNode,
  Text,
} from 'vue'

import UiTableColumn from './UiTableColumn.vue'

import { ALIGN, VALIGN } from '@/common/components/table'

import { UiTableBodyCell, UiTableHeadCell } from './parts'

type TableSlot<Props> = Slot<Props>

type TableColumnSlots<T> = {
  defaultSlot?: TableSlot<DataForCell<T>>;
  cellSlot?: TableSlot<DataForCell<T>>;
  labelSlot?: TableSlot<DataForLabel<T>>;
}

export type TableColumnDefinition<T> = Column<T> & TableColumnSlots<T>

export type RenderedBodyCell<T> = {
  column: TableColumnDefinition<T>;
  colspan: number | undefined;
  rowspan: number | undefined;
  slotProps: DataForCell<T>;
}

export type RenderedBodyRow<T> = RowRendererArgs<T> & {
  attrs: RowAttrs;
  className: Array<CssClass | undefined>;
  expanded: boolean;
  toggle: () => void;
  cells: RenderedBodyCell<T>[];
}

type SignificantNode = VNode | string | number

const isNamedComponent = (node: VNode, name: string): boolean => {
  if (typeof node.type !== 'object' || node.type === null) {
    return false
  }

  return 'name' in node.type && node.type.name === name
}

const isTableColumnVNode = (node: VNode): boolean => {
  return node.type === UiTableColumn || isNamedComponent(node, 'UiTableColumn')
}

const isWhitespaceText = (value: string): boolean => value.trim().length === 0

const normalizeNodes = (children: VNodeArrayChildren): SignificantNode[] => {
  const normalized: SignificantNode[] = []

  children.forEach((child) => {
    if (Array.isArray(child)) {
      normalized.push(...normalizeNodes(child))
      return
    }

    if (typeof child === 'string') {
      if (!isWhitespaceText(child)) {
        normalized.push(child)
      }

      return
    }

    if (typeof child === 'number') {
      normalized.push(child)
      return
    }

    if (!isVNode(child)) {
      return
    }

    if (child.type === Comment) {
      return
    }

    if (child.type === Text) {
      const text = typeof child.children === 'string' ? child.children : ''

      if (!isWhitespaceText(text)) {
        normalized.push(text)
      }

      return
    }

    if (child.type === Fragment && Array.isArray(child.children)) {
      normalized.push(...normalizeNodes(child.children))
      return
    }

    normalized.push(child)
  })

  return normalized
}

const normalizeBoolean = (value: unknown): boolean => value === '' || value === true

const normalizeString = (value: unknown): string => typeof value === 'string' ? value : ''

const normalizeAlign = (value: unknown): ALIGN | `${ALIGN}` => {
  return Object.values(ALIGN).includes(value as ALIGN) ? value as ALIGN : ALIGN.LEFT
}

const normalizeValign = (value: unknown): VALIGN | `${VALIGN}` => {
  return Object.values(VALIGN).includes(value as VALIGN) ? value as VALIGN : VALIGN.MIDDLE
}

const normalizeSlotRecord = <T>(node: VNode): TableColumnSlots<T> => {
  const children = node.children

  if (!children || Array.isArray(children) || typeof children === 'string') {
    return {}
  }

  const slots = children as Record<string, Slot | undefined>

  return {
    defaultSlot: slots.default as TableSlot<DataForCell<T>> | undefined,
    cellSlot: slots.cell as TableSlot<DataForCell<T>> | undefined,
    labelSlot: slots.label as TableSlot<DataForLabel<T>> | undefined,
  }
}

const resolveFunction = <T>(
  value: unknown
): ((row: T, index: number) => number | undefined) => {
  if (typeof value === 'function') {
    return value as (row: T, index: number) => number | undefined
  }

  return () => undefined
}

export const collectTableColumns = <T>(children: VNodeArrayChildren): TableColumnDefinition<T>[] => {
  return normalizeNodes(children)
    .filter((node): node is VNode => isVNode(node))
    .filter(isTableColumnVNode)
    .map((node, index) => {
      const props = (node.props ?? {}) as Record<string, unknown>
      const slots = normalizeSlotRecord<T>(node)

      return {
        id: String(node.key ?? `ui-v1-table-column-${index}`),
        label: normalizeString(props.label),
        width: props.width as string | number | undefined,
        minWidth: (props.minWidth ?? props['min-width']) as string | number | undefined,
        maxWidth: (props.maxWidth ?? props['max-width']) as string | number | undefined,
        align: normalizeAlign(props.align),
        valign: normalizeValign(props.valign),
        trim: normalizeBoolean(props.trim),
        getColspan: resolveFunction<T>(props.colspan),
        getRowspan: resolveFunction<T>(props.rowspan),
        cellSlot: slots.cellSlot,
        defaultSlot: slots.defaultSlot,
        labelSlot: slots.labelSlot,
      }
    })
}

const normalizeSpan = (value: unknown): number | undefined => {
  if (typeof value === 'undefined') {
    return undefined
  }

  const normalized = Math.trunc(Number(value))

  if (!Number.isFinite(normalized) || normalized < 1) {
    return undefined
  }

  return normalized
}

export const renderLabel = <T>(
  column: TableColumnDefinition<T>
): VNodeArrayChildren => column.labelSlot?.({ column }) ?? [column.label]

export const renderCell = <T>(
  column: TableColumnDefinition<T>,
  props: DataForCell<T>
): VNodeArrayChildren => column.cellSlot?.(props) ?? column.defaultSlot?.(props) ?? []

export const buildRenderedRows = <T>(options: {
  columns: TableColumnDefinition<T>[];
  rows: readonly T[];
  expandedKeys: ReadonlySet<RowKey>;
  extraClass?: CssClass;
  resolveKey: (row: T, index: number) => RowKey;
  resolveRowAttrs: (row: T, index: number) => RowAttrs;
  resolveRowClass: (row: T, index: number) => CssClass | undefined;
  toggle: (key: RowKey) => void;
}): RenderedBodyRow<T>[] => {
  const activeRowspans = Array.from({ length: options.columns.length }, () => 0)

  return options.rows.map((row, index) => {
    const key = options.resolveKey(row, index)
    const expanded = options.expandedKeys.has(key)
    const toggle = () => options.toggle(key)
    const attrs = options.resolveRowAttrs(row, index)
    const cells: RenderedBodyCell<T>[] = []
    let pendingColspan = 0

    options.columns.forEach((column, columnIndex) => {
      if (pendingColspan > 0) {
        pendingColspan -= 1
        return
      }

      if (activeRowspans[columnIndex] > 0) {
        activeRowspans[columnIndex] -= 1
        return
      }

      const slotProps: DataForCell<T> = {
        row,
        index,
        key,
        expanded,
        toggle,
        column,
      }

      const colspan = normalizeSpan(column.getColspan(row, index))
      const rowspan = normalizeSpan(column.getRowspan(row, index))
      const resolvedColspan = colspan && colspan > 1 ? colspan : undefined
      const resolvedRowspan = rowspan && rowspan > 1 ? rowspan : undefined

      if (resolvedColspan) {
        pendingColspan = resolvedColspan - 1
      }

      if (resolvedRowspan) {
        for (let spanIndex = 0; spanIndex < (resolvedColspan ?? 1); spanIndex++) {
          activeRowspans[columnIndex + spanIndex] = Math.max(
            activeRowspans[columnIndex + spanIndex] ?? 0,
            resolvedRowspan - 1
          )
        }
      }

      cells.push({
        column,
        colspan: resolvedColspan,
        rowspan: resolvedRowspan,
        slotProps,
      })
    })

    return {
      row,
      index,
      key,
      attrs,
      expanded,
      toggle,
      cells,
      className: [
        options.resolveRowClass(row, index),
        attrs.class,
        options.extraClass,
      ],
    }
  })
}

const isCellVNode = (node: SignificantNode): boolean => {
  if (typeof node === 'string' || typeof node === 'number') {
    return false
  }

  return node.type === UiTableBodyCell
    || node.type === UiTableHeadCell
    || isNamedComponent(node, 'UiTableBodyCell')
    || isNamedComponent(node, 'UiTableHeadCell')
    || node.type === 'td'
    || node.type === 'th'
}

export const slotNeedsBodyCellWrapper = (children: VNodeArrayChildren): boolean => {
  const nodes = normalizeNodes(children)

  if (nodes.length === 0) {
    return true
  }

  return !nodes.every(isCellVNode)
}

export const renderGroupHead = <T, GroupData>(
  slot: Slot<DataForGroupHead<T, GroupData>> | undefined,
  props: DataForGroupHead<T, GroupData>
): VNodeArrayChildren => {
  return slot?.(props) ?? [String(props.group.key)]
}

export const renderExpand = <T>(
  slot: Slot<RowRendererArgs<T>> | undefined,
  props: RowRendererArgs<T>
): VNodeArrayChildren => slot?.(props) ?? []

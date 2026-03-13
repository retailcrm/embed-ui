<script lang="ts" remote>
import type {
  CssClass,
  DataForFooter,
  Group,
  GroupBy,
} from '@/common/components/table'
import type { PropType } from 'vue'
import type {
  RowAttrs,
  RowAttrsGetter,
  RowClassGetter,
  RowClickPayload,
  RowKey,
  RowKeyGetter,
} from '@/common/components/table'
import type { SerializedEvent } from '@omnicajs/vue-remote/types/events'
import type { UiTableMethods } from '@/common/components/table'

import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  ref,
  watch,
} from 'vue'

import {
  buildRenderedRows,
  collectTableColumns,
  renderCell,
  renderExpand,
  renderGroupHead,
  renderLabel,
  slotNeedsBodyCellWrapper,
} from './render'
import {
  UiTableBodyCell,
  UiTableCol,
  UiTableHeadCell,
  UiTableRoot,
  UiTableRow,
  UiTableSection,
} from './parts'

const getRowClass = (
  rowClass: CssClass | RowClassGetter<unknown> | undefined,
  row: unknown,
  index: number
): CssClass | undefined => {
  if (typeof rowClass === 'function') {
    return rowClass(row, index)
  }

  return rowClass
}

const getRowAttrs = (
  rowAttrs: RowAttrsGetter<unknown> | undefined,
  row: unknown,
  index: number
): RowAttrs => rowAttrs?.(row, index) ?? {}

const resolveRowKey = (
  rowKey: string | number | RowKeyGetter<unknown> | undefined,
  row: unknown,
  index: number
): RowKey => {
  if (typeof rowKey === 'function') {
    return rowKey(row, index)
  }

  if (
    typeof rowKey !== 'undefined'
    && typeof row === 'object'
    && row !== null
    && rowKey in row
  ) {
    const value = row[rowKey as keyof typeof row]

    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }
  }

  return index
}

const withoutClass = (attrs: RowAttrs): Omit<RowAttrs, 'class'> => {
  const next = { ...attrs }
  delete next.class

  return next
}

export default defineComponent({
  name: 'UiTable',
  inheritAttrs: false,

  props: {
    rows: {
      type: Array as PropType<readonly unknown[]>,
      default: () => [],
    },

    rowKey: {
      type: [String, Number, Function] as PropType<string | number | RowKeyGetter<unknown>>,
      default: undefined,
    },

    headless: {
      type: Boolean,
      default: false,
    },

    bordered: {
      type: Boolean,
      default: false,
    },

    fixed: {
      type: Boolean,
      default: false,
    },

    rowClass: {
      type: [String, Array, Object, Function] as PropType<CssClass | RowClassGetter<unknown>>,
      default: undefined,
    },

    rowAttrs: {
      type: Function as PropType<RowAttrsGetter<unknown>>,
      default: undefined,
    },

    groupBy: {
      type: Function as PropType<GroupBy<unknown, unknown>>,
      default: undefined,
    },

    groupHeadClass: {
      type: [String, Array, Object] as PropType<CssClass>,
      default: undefined,
    },

    groupBodyClass: {
      type: [String, Array, Object] as PropType<CssClass>,
      default: undefined,
    },
  },

  emits: {
    'row:click': (payload: RowClickPayload<unknown>, event: SerializedEvent) => {
      void payload
      void event

      return true
    },
  },

  setup (props, { attrs, emit, expose, slots }) {
    const instance = getCurrentInstance()
    const expandedKeys = ref<RowKey[]>([])

    const isInteractive = computed(() => Boolean(
      instance?.vnode.props?.onRowClick
        || instance?.vnode.props?.['onRow:click']
    ))

    const toggleExpanded = (key: RowKey) => {
      expandedKeys.value = expandedKeys.value.includes(key)
        ? expandedKeys.value.filter((item) => item !== key)
        : [...expandedKeys.value, key]
    }

    const resetExpanded = () => {
      expandedKeys.value = []
    }

    const expand = (key: RowKey) => {
      if (!expandedKeys.value.includes(key)) {
        expandedKeys.value = [...expandedKeys.value, key]
      }
    }

    const collapse = (key: RowKey) => {
      expandedKeys.value = expandedKeys.value.filter((item) => item !== key)
    }

    expose({
      resetExpanded,
      expand,
      collapse,
      toggle: toggleExpanded,
    } as UiTableMethods)

    watch([() => props.rows, () => props.rowKey], () => {
      const availableKeys = new Set(
        props.rows.map((row, index) => resolveRowKey(props.rowKey, row, index))
      )
      const next = expandedKeys.value.filter((key) => availableKeys.has(key))

      if (next.length !== expandedKeys.value.length) {
        expandedKeys.value = next
      }
    }, { deep: false })

    const resolveColumns = () => collectTableColumns(slots.default?.() ?? [])

    const resolveGroups = (): Group<unknown, unknown>[] => {
      return props.groupBy
        ? props.groupBy(props.rows)
        : []
    }

    const resolveFooterData = (
      currentColumns: ReturnType<typeof resolveColumns>,
      currentGroups: Group<unknown, unknown>[]
    ): DataForFooter<unknown, unknown> => ({
      columnsCount: currentColumns.length,
      rowsCount: props.rows.length,
      groupsCount: currentGroups.length,
      groups: currentGroups,
    })

    const hasStructuredFooter = () => {
      return [
        'footer-summary',
        'footer-page-size',
        'footer-export',
        'footer-pagination',
      ].some((name) => Boolean(slots[name]))
    }

    const hasFooter = () => Boolean(slots.footer) || hasStructuredFooter()

    const resolveColumnsCount = (currentColumns: ReturnType<typeof resolveColumns>) => {
      return Math.max(currentColumns.length, 1)
    }

    const buildPlainRows = (currentColumns: ReturnType<typeof resolveColumns>) => buildRenderedRows({
      columns: currentColumns,
      rows: props.rows,
      expandedKeys: new Set(expandedKeys.value),
      resolveKey: (row, index) => resolveRowKey(props.rowKey, row, index),
      resolveRowAttrs: (row, index) => getRowAttrs(props.rowAttrs, row, index),
      resolveRowClass: (row, index) => getRowClass(props.rowClass, row, index),
      toggle: toggleExpanded,
    })

    const buildGroupedRows = (
      currentColumns: ReturnType<typeof resolveColumns>,
      currentGroups: Group<unknown, unknown>[]
    ) => currentGroups.map((group) => ({
      group,
      rows: buildRenderedRows({
        columns: currentColumns,
        rows: group.rows,
        expandedKeys: new Set(expandedKeys.value),
        extraClass: props.groupBodyClass,
        resolveKey: (row, index) => resolveRowKey(props.rowKey, row, index),
        resolveRowAttrs: (row, index) => getRowAttrs(props.rowAttrs, row, index),
        resolveRowClass: (row, index) => getRowClass(props.rowClass, row, index),
        toggle: toggleExpanded,
      }),
    }))

    const emitRowClick = (payload: RowClickPayload<unknown>, event: SerializedEvent) => {
      emit('row:click', payload, event)
    }

    const renderBodyRow = (
      row: ReturnType<typeof buildPlainRows>[number],
      columnsCount: number,
      suffix = 'row'
    ) => {
      const rowKey = `${String(row.key)}:${suffix}`

      return [
        h(UiTableRow, {
          key: rowKey,
          interactive: isInteractive.value,
          expanded: row.expanded,
          ...withoutClass(row.attrs),
          class: row.className,
          onClick: (event: SerializedEvent) => emitRowClick({
            row: row.row,
            index: row.index,
            key: row.key,
            expanded: row.expanded,
            toggle: row.toggle,
          }, event),
        }, () => row.cells.map((cell, cellIndex) => h(UiTableBodyCell, {
          key: `${rowKey}:cell:${cell.column.id}:${cellIndex}`,
          align: cell.column.align,
          valign: cell.column.valign,
          colspan: cell.colspan,
          rowspan: cell.rowspan,
          trim: cell.column.trim,
        }, () => renderCell(cell.column, cell.slotProps)))),
        slots.expand && row.expanded
          ? h(UiTableRow, {
            key: `${rowKey}:expand`,
            expanded: true,
          }, () => h(UiTableBodyCell, {
            colspan: columnsCount,
          }, () => renderExpand(slots.expand, {
            row: row.row,
            index: row.index,
            key: row.key,
          })))
          : null,
      ]
    }

    const renderGroupHeadRow = (
      group: Group<unknown, unknown>,
      index: number,
      columnsCount: number
    ) => {
      const content = renderGroupHead(slots['group-head'], {
        group,
        index,
      })

      return h(UiTableRow, {
        key: `${String(group.key)}:group-head`,
        class: props.groupHeadClass,
      }, () => {
        if (slotNeedsBodyCellWrapper(content)) {
          return h(UiTableBodyCell, {
            colspan: columnsCount,
            theme: 'group',
          }, () => h('div', { class: 'ui-v1-table__group-head' }, content))
        }

        return content
      })
    }

    const renderEmptyRow = (columnsCount: number) => h(UiTableRow, { key: 'empty' }, () => h(UiTableBodyCell, {
      colspan: columnsCount,
    }, () => h('div', { class: 'ui-v1-table__empty' }, slots.empty?.() ?? [])))

    const renderFooter = (
      footerData: DataForFooter<unknown, unknown>,
      columnsCount: number
    ) => {
      if (!hasFooter()) {
        return null
      }

      if (hasStructuredFooter()) {
        const summary = slots['footer-summary']?.(footerData)
        const pageSize = slots['footer-page-size']?.(footerData)
        const exportControl = slots['footer-export']?.(footerData)
        const pagination = slots['footer-pagination']?.(footerData)

        return h(UiTableSection, { kind: 'foot', key: 'footer' }, () => h(UiTableRow, () => h(UiTableBodyCell, {
          colspan: columnsCount,
          class: 'ui-v1-table__footer-cell',
        }, () => h('div', { class: 'ui-v1-table__footer' }, [
          summary
            ? h('div', { class: 'ui-v1-table__footer-meta' }, [summary])
            : null,
          pageSize || exportControl || pagination
            ? h('div', { class: 'ui-v1-table__footer-controls' }, [
              pageSize || exportControl
                ? h('div', { class: 'ui-v1-table__footer-main' }, [
                  pageSize,
                  exportControl,
                ])
                : null,
              pagination
                ? h('div', { class: 'ui-v1-table__footer-side' }, [pagination])
                : null,
            ])
            : null,
        ]))))
      }

      const content = slots.footer?.(footerData) ?? []

      return h(UiTableSection, { kind: 'foot', key: 'footer' }, () => h(UiTableRow, () => {
        if (slotNeedsBodyCellWrapper(content)) {
          return h(UiTableBodyCell, {
            colspan: columnsCount,
          }, () => content)
        }

        return content
      }))
    }

    return () => h(UiTableRoot, {
      ...attrs,
      bordered: props.bordered,
      fixed: props.fixed,
    }, () => [
      (() => {
        const currentColumns = resolveColumns()
        const currentColumnsCount = resolveColumnsCount(currentColumns)
        const currentGroups = resolveGroups()
        const currentFooterData = resolveFooterData(currentColumns, currentGroups)
        const currentPlainRows = buildPlainRows(currentColumns)
        const currentGroupedRows = buildGroupedRows(currentColumns, currentGroups)

        return [
          currentColumns.length > 0
            ? h('colgroup', { key: 'colgroup' }, currentColumns.map((column) => h(UiTableCol, {
              key: `col:${column.id}`,
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            })))
            : null,
          !props.headless && currentColumns.length > 0
            ? h(UiTableSection, { key: 'head', kind: 'head' }, () => h(UiTableRow, () => currentColumns.map((column) => h(UiTableHeadCell, {
              key: `head:${column.id}`,
              align: column.align,
              trim: column.trim,
            }, () => renderLabel(column)))))
            : null,
          h(UiTableSection, { key: 'body', kind: 'body' }, () => {
            if (props.rows.length === 0) {
              return renderEmptyRow(currentColumnsCount)
            }

            if (props.groupBy) {
              return currentGroupedRows.flatMap(({ group, rows }, index) => [
                renderGroupHeadRow(group, index, currentColumnsCount),
                ...rows.flatMap((row) => renderBodyRow(row, currentColumnsCount, `${String(group.key)}:row`)),
              ])
            }

            return currentPlainRows.flatMap((row) => renderBodyRow(row, currentColumnsCount))
          }),
          renderFooter(currentFooterData, currentColumnsCount),
        ]
      })(),
    ])
  },
})
</script>

import type { Group } from '../../src/common/components/table'

import { h, ref } from 'vue'

import { UiCheckbox } from '../../src/remote/components/checkbox'
import {
  UiTable,
  UiTableColumn,
  UiTableFooterButton,
  UiTableFooterSection,
} from '../../src/remote/components/table'
import { UiTag } from '../../src/remote/components/tag'

import { createComponentEndpoint } from '../endpoint'

type TableRow = {
  id: number;
  title: string;
  customer: string;
  status: string;
  sentAt: string;
  phone: string;
  description: string;
}

const statusBackgroundByName: Record<TableRow['status'], string> = {
  Запланирована: '#005EEB',
  Отправлена: '#1FA971',
  Черновик: '#7A8797',
}

type UiTableProps = InstanceType<typeof UiTable>['$props']
type UiTableStoryExtras = {
  dense?: boolean;
  empty?: boolean;
  footerMode?: 'none' | 'simple' | 'structured';
  showServiceColumn?: boolean;
  withExpand?: boolean;
  withGrouping?: boolean;
}
type UiTableWorkerProps = UiTableProps & UiTableStoryExtras

const rows: TableRow[] = [
  {
    id: 101,
    title: 'Весенняя рассылка',
    customer: 'Анна Смирнова',
    status: 'Запланирована',
    sentAt: '12 марта, 10:00',
    phone: '+7 (999) 123-45-67',
    description: 'Сегмент: постоянные клиенты. Канал: SMS + email.',
  },
  {
    id: 102,
    title: 'Скидка на аксессуары',
    customer: 'Илья Кузнецов',
    status: 'Отправлена',
    sentAt: '11 марта, 17:40',
    phone: '+7 (912) 555-20-10',
    description: 'Тестовая партия для витрины маркетинга.',
  },
  {
    id: 103,
    title: 'Повторный контакт',
    customer: 'Мария Власова',
    status: 'Черновик',
    sentAt: 'Черновик',
    phone: '+7 (921) 888-01-19',
    description: 'Нужно уточнить шаблон и лимиты отправки.',
  },
]

const groupByStatus = (items: readonly TableRow[]): Group<TableRow, { title: string }>[] => {
  const order = ['Запланирована', 'Отправлена', 'Черновик']

  return order
    .map((status) => ({
      key: status,
      data: { title: status },
      rows: items.filter((row) => row.status === status),
    }))
    .filter((group) => group.rows.length > 0)
}

createComponentEndpoint<UiTableWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const selectedIds = ref<number[]>([])

        return () => {
          const {
            footerMode = 'none',
            withGrouping = false,
            withExpand = false,
            showServiceColumn = true,
            empty = false,
            dense = false,
            ...tableProps
          } = props

          const resolvedRows = empty ? [] : rows
          const showSelectionColumn = showServiceColumn && !withExpand
          const visibleRowIds = resolvedRows.map((row) => row.id)
          const selectedVisibleIds = selectedIds.value.filter((id) => visibleRowIds.includes(id))
          const allVisibleSelected = visibleRowIds.length > 0 && selectedVisibleIds.length === visibleRowIds.length
          const partiallyVisibleSelected = selectedVisibleIds.length > 0 && !allVisibleSelected
          const tableSlots: Record<string, unknown> = {
            empty: () => h('div', {
              style: 'padding: 8px 0; color: #636F7F;',
            }, 'Нет данных для отображения'),
          }

          if (withGrouping) {
            tableSlots['group-head'] = ({ group }: { group: { data: { title: string } } }) => {
              return h('span', { style: 'font-weight: 600;' }, group.data.title)
            }
          }

          if (withExpand) {
            tableSlots.expand = ({ row }: { row: TableRow }) => h('div', {
              style: 'display: grid; gap: 6px; padding: 8px 0;',
            }, [
              h('strong', 'Подробности'),
              h('div', row.description),
              h('div', `Контакт: ${row.phone}`),
            ])
          }

          if (footerMode === 'simple') {
            tableSlots.footer = ({ rowsCount }: { rowsCount: number }) => h('div', {
              style: 'display: flex; justify-content: space-between; gap: 16px;',
            }, [
              h('span', `Всего строк: ${rowsCount}`),
              h('button', {
                type: 'button',
                style: 'border: none; padding: 0; background: transparent; color: #005EEB; cursor: pointer;',
              }, 'Выгрузить CSV'),
            ])
          }

          if (footerMode === 'structured') {
            tableSlots['footer-summary'] = ({ rowsCount }: { rowsCount: number }) => h('span', `Всего строк: ${rowsCount}`)
            tableSlots['footer-page-size'] = () => h(UiTableFooterSection, () => h('span', '20 / 50 / 100'))
            tableSlots['footer-export'] = () => h(UiTableFooterSection, () => h(UiTableFooterButton, {
              type: 'button',
            }, () => 'Выгрузить таблицу'))
            tableSlots['footer-pagination'] = () => h(UiTableFooterSection, () => h('span', '1 / 3'))
          }

          const columns = []

          if (showServiceColumn) {
            columns.push(h(UiTableColumn, {
              label: '',
              width: withExpand ? 44 : 56,
              trim: true,
            }, {
              label: () => {
                if (!showSelectionColumn) {
                  return null
                }

                return h('div', {
                  style: 'display: flex; align-items: center; justify-content: center;',
                }, [
                  h(UiCheckbox, {
                    model: allVisibleSelected,
                    indeterminate: partiallyVisibleSelected,
                    'onUpdate:model': (next: unknown) => {
                      selectedIds.value = next === true ? visibleRowIds : []
                    },
                  }),
                ])
              },
              default: ({ row, toggle, expanded }: { expanded: boolean; row: TableRow; toggle: () => void }) => {
                const content = []

                if (showSelectionColumn) {
                  content.push(h('div', {
                    style: 'display: flex; align-items: center; justify-content: center;',
                  }, [
                    h(UiCheckbox, {
                      model: selectedIds.value,
                      value: row.id,
                      'onUpdate:model': (next: unknown) => {
                        selectedIds.value = Array.isArray(next)
                          ? next.filter((value): value is number => typeof value === 'number')
                          : []
                      },
                    }),
                  ]))
                }

                if (withExpand) {
                  content.push(h('button', {
                    type: 'button',
                    style: 'width: 28px; height: 28px; border: 1px solid #DEE2E6; background: #fff; border-radius: 6px; cursor: pointer;',
                    onClick: toggle,
                  }, expanded ? '−' : '+'))
                }

                return h('div', {
                  style: 'display: flex; align-items: center; justify-content: center; gap: 8px;',
                }, content)
              },
            }))
          }

          columns.push(
            h(UiTableColumn, { label: 'Название', minWidth: 240 }, {
              default: ({ row }: { row: TableRow }) => h('div', { style: 'display: grid; gap: 2px;' }, [
                h('strong', row.title),
                h('span', { style: 'color: #636F7F;' }, row.description),
              ]),
            }),
            h(UiTableColumn, { label: 'Клиент', width: 180 }, {
              default: ({ row }: { row: TableRow }) => row.customer,
            }),
            h(UiTableColumn, { label: 'Статус', width: 160 }, {
              default: ({ row }: { row: TableRow }) => h(UiTag, {
                background: statusBackgroundByName[row.status],
                size: 'md',
                saturated: true,
                ticker: false,
              }, () => row.status),
            }),
            h(UiTableColumn, { label: 'Дата отправки', width: 160 }, {
              default: ({ row }: { row: TableRow }) => row.sentAt,
            }),
            h(UiTableColumn, {
              label: 'Телефон',
              width: 180,
              align: 'right',
            }, {
              default: ({ row }: { row: TableRow }) => row.phone,
            })
          )

          tableSlots.default = () => columns

          return h('div', {
            style: 'width: 100%; max-width: 1040px; background: #FFFFFF;',
          }, [
            h(UiTable, {
              ...tableProps,
              class: dense ? 'ui-table-story_dense' : undefined,
              rows: resolvedRows,
              rowKey: 'id',
              groupBy: withGrouping ? groupByStatus : undefined,
            }, tableSlots),
          ])
        }
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)

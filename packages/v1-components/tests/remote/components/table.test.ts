import type { UiTableMethods } from '@/common/components/table'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

vi.mock('@/remote/components/table/parts', async () => {
  const { defineComponent, h } = await import('vue')

  return {
    UiTableRoot: defineComponent({
      name: 'UiTableRoot',
      props: {
        bordered: {
          type: Boolean,
          default: false,
        },
        fixed: {
          type: Boolean,
          default: false,
        },
      },
      template: `
        <table
          class="ui-v1-table-root-stub"
          :data-bordered="bordered ? 'true' : 'false'"
          :data-fixed="fixed ? 'true' : 'false'"
        >
          <slot />
        </table>
      `,
    }),
    UiTableSection: defineComponent({
      name: 'UiTableSection',
      props: {
        kind: {
          type: String,
          default: 'body',
        },
      },
      setup (props, { slots }) {
        return () => h(
          props.kind === 'head'
            ? 'thead'
            : props.kind === 'foot'
              ? 'tfoot'
              : 'tbody',
          {
            class: `ui-v1-table-section-stub ui-v1-table-section-stub_${props.kind}`,
          },
          slots.default?.()
        )
      },
    }),
    UiTableRow: defineComponent({
      name: 'UiTableRow',
      props: {
        interactive: {
          type: Boolean,
          default: false,
        },
        expanded: {
          type: Boolean,
          default: false,
        },
      },
      emits: ['click'],
      template: `
        <tr
          class="ui-v1-table-row-stub"
          :data-interactive="interactive ? 'true' : 'false'"
          :data-expanded="expanded ? 'true' : 'false'"
          @click="$emit('click', $event)"
        >
          <slot />
        </tr>
      `,
    }),
    UiTableCol: defineComponent({
      name: 'UiTableCol',
      props: {
        width: {
          type: [String, Number],
          default: undefined,
        },
        minWidth: {
          type: [String, Number],
          default: undefined,
        },
        maxWidth: {
          type: [String, Number],
          default: undefined,
        },
      },
      template: '<col :data-width="width" :data-min-width="minWidth" :data-max-width="maxWidth" />',
    }),
    UiTableHeadCell: defineComponent({
      name: 'UiTableHeadCell',
      props: {
        align: {
          type: String,
          default: 'left',
        },
      },
      template: '<th class="ui-v1-table-head-cell-stub" :data-align="align"><slot /></th>',
    }),
    UiTableBodyCell: defineComponent({
      name: 'UiTableBodyCell',
      props: {
        align: {
          type: String,
          default: 'left',
        },
        valign: {
          type: String,
          default: 'middle',
        },
        colspan: {
          type: Number,
          default: undefined,
        },
        rowspan: {
          type: Number,
          default: undefined,
        },
        trim: {
          type: Boolean,
          default: false,
        },
        theme: {
          type: String,
          default: 'default',
        },
      },
      template: `
        <td
          class="ui-v1-table-body-cell-stub"
          :data-align="align"
          :data-valign="valign"
          :data-trim="trim ? 'true' : 'false'"
          :data-theme="theme"
          :colspan="colspan"
          :rowspan="rowspan"
        >
          <slot />
        </td>
      `,
    }),
  }
})

import UiTable from '@/remote/components/table/UiTable.vue'
import UiTableColumn from '@/remote/components/table/UiTableColumn.vue'

describe('remote/components/table', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders columns and supports headless mode', async () => {
    wrapper = mount(UiTable, {
      props: {
        rows: [{ id: 1, name: 'Alice' }],
        rowKey: 'id',
      },
      slots: {
        default: () => [
          h(UiTableColumn, { label: 'Name', width: 240 }, {
            default: ({ row }: { row: { name: string } }) => row.name,
          }),
        ],
      },
    })

    expect(wrapper.findAll('th').map((node) => node.text())).toEqual(['Name'])
    expect(wrapper.find('tbody td').text()).toBe('Alice')
    expect(wrapper.find('col').attributes('data-width')).toBe('240')

    await wrapper.setProps({ headless: true })

    expect(wrapper.find('thead').exists()).toBe(false)
    expect(wrapper.find('tbody td').text()).toBe('Alice')
  })

  test('keeps declarative column order after conditional column toggle', async () => {
    const Harness = defineComponent({
      components: {
        UiTable,
        UiTableColumn,
      },
      data: () => ({
        rows: [{ id: 1, first: 'A1', middle: 'B1', last: 'C1' }],
        showMiddle: true,
      }),
      methods: {
        setShowMiddle (value: boolean) {
          this.showMiddle = value
        },
      },
      template: `
        <UiTable :rows="rows" row-key="id">
          <UiTableColumn label="First">
            <template #default="{ row }">
              {{ row.first }}
            </template>
          </UiTableColumn>

          <UiTableColumn v-if="showMiddle" label="Middle">
            <template #default="{ row }">
              {{ row.middle }}
            </template>
          </UiTableColumn>

          <UiTableColumn label="Last">
            <template #default="{ row }">
              {{ row.last }}
            </template>
          </UiTableColumn>
        </UiTable>
      `,
    })

    wrapper = mount(Harness)

    expect(wrapper.findAll('th').map((node) => node.text())).toEqual(['First', 'Middle', 'Last'])

    ;(wrapper.vm as { setShowMiddle: (value: boolean) => void }).setShowMiddle(false)
    await nextTick()
    expect(wrapper.findAll('th').map((node) => node.text())).toEqual(['First', 'Last'])

    ;(wrapper.vm as { setShowMiddle: (value: boolean) => void }).setShowMiddle(true)
    await nextTick()

    expect(wrapper.findAll('th').map((node) => node.text())).toEqual(['First', 'Middle', 'Last'])
    expect(wrapper.findAll('tbody tr').at(0)?.text()).toContain('A1')
    expect(wrapper.findAll('tbody tr').at(0)?.text()).toContain('B1')
    expect(wrapper.findAll('tbody tr').at(0)?.text()).toContain('C1')
  })

  test('exposes expansion methods and keeps rowKey stable in click payload after row reordering', async () => {
    const rows = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ]

    wrapper = mount(UiTable, {
      props: {
        rows,
        rowKey: 'id',
      },
      slots: {
        default: () => [
          h(UiTableColumn, { label: 'Name' }, {
            default: ({ row }: { row: { id: number; name: string } }) => row.name,
          }),
        ],
      },
    })

    const methods = wrapper.vm.$.exposed as UiTableMethods<number>
    expect(typeof methods.expand).toBe('function')
    expect(typeof methods.collapse).toBe('function')
    expect(typeof methods.toggle).toBe('function')
    expect(typeof methods.resetExpanded).toBe('function')

    await wrapper.findAll('tbody tr')[1].trigger('click')

    const firstPayload = wrapper.emitted('row:click')?.at(0)?.[0] as { key: number; row: { id: number } }

    expect(firstPayload.key).toBe(2)
    expect(firstPayload.row.id).toBe(2)

    await wrapper.setProps({
      rows: [rows[1], rows[0]],
    })
    await nextTick()

    await wrapper.findAll('tbody tr')[0].trigger('click')

    const secondPayload = wrapper.emitted('row:click')?.at(1)?.[0] as { key: number; row: { id: number } }

    expect(secondPayload.key).toBe(2)
    expect(secondPayload.row.id).toBe(2)
  })

  test('renders grouping and structured footer slots', () => {
    wrapper = mount(UiTable, {
      props: {
        rows: [{ id: 1, label: 'Invoice #1', group: 'today' }],
        rowKey: 'id',
        groupBy: (rows: readonly { id: number; label: string; group: string }[]) => [{
          key: 'today',
          data: { title: 'Today' },
          rows,
        }],
      },
      slots: {
        default: () => [
          h(UiTableColumn, { label: 'Label' }, {
            default: ({ row }: { row: { label: string } }) => row.label,
          }),
        ],
        'group-head': ({ group }: { group: { data: { title: string } } }) => group.data.title,
        'footer-summary': ({ rowsCount }: { rowsCount: number }) => h('span', { class: 'footer-summary' }, `Rows: ${rowsCount}`),
        'footer-page-size': () => h('span', { class: 'footer-page-size' }, '20 / 50 / 100'),
        'footer-export': () => h('button', { class: 'footer-export' }, 'Export'),
        'footer-pagination': () => h('span', { class: 'footer-pagination' }, '1 / 1'),
      },
    })

    const bodyRows = wrapper.findAll('tbody tr')

    expect(bodyRows.at(0)?.text()).toContain('Today')
    expect(bodyRows.at(1)?.text()).toContain('Invoice #1')
    expect(wrapper.find('.ui-v1-table__footer-meta').text()).toContain('Rows: 1')
    expect(wrapper.find('.ui-v1-table__footer-main').text()).toContain('20 / 50 / 100')
    expect(wrapper.find('.ui-v1-table__footer-main').text()).toContain('Export')
    expect(wrapper.find('.ui-v1-table__footer-side').text()).toContain('1 / 1')
  })
})

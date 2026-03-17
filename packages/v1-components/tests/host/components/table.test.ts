import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiTableBodyCell from '@/host/components/table/UiTableBodyCell.vue'
import UiTableCol from '@/host/components/table/UiTableCol.vue'
import UiTableRoot from '@/host/components/table/UiTableRoot.vue'
import UiTableSorter from '@/host/components/table/UiTableSorter.vue'

describe('host/components/table', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('applies root modifiers for bordered and fixed layout', () => {
    wrapper = mount(UiTableRoot, {
      props: {
        bordered: true,
        fixed: true,
      },
      slots: {
        default: '<tbody />',
      },
    })

    const root = wrapper.find('table')

    expect(root.classes()).toContain('ui-v1-table')
    expect(root.classes()).toContain('ui-v1-table_bordered')
    expect(root.classes()).toContain('ui-v1-table_fixed')
  })

  test('renders body cell attributes and modifiers', () => {
    wrapper = mount(UiTableBodyCell, {
      props: {
        align: 'right',
        valign: 'top',
        trim: true,
        theme: 'group',
        colspan: 2,
        rowspan: 3,
      },
      slots: {
        default: 'Cell content',
      },
    })

    const cell = wrapper.find('td')

    expect(cell.attributes('colspan')).toBe('2')
    expect(cell.attributes('rowspan')).toBe('3')
    expect(cell.classes()).toContain('ui-v1-table__body-cell')
    expect(cell.classes()).toContain('ui-v1-table__body-cell_align-right')
    expect(cell.classes()).toContain('ui-v1-table__body-cell_valign-top')
    expect(cell.classes()).toContain('ui-v1-table__body-cell_theme-group')
    expect(cell.classes()).toContain('ui-v1-table__body-cell_trim')
    expect(cell.text()).toBe('Cell content')
  })

  test('renders col width as attribute and style', () => {
    wrapper = mount(UiTableCol, {
      props: {
        width: 240,
        minWidth: '160px',
        maxWidth: '40%',
      },
    })

    const col = wrapper.find('col')

    expect(col.attributes('width')).toBe('240')
    expect(col.attributes('style')).toContain('width: 240px;')
    expect(col.attributes('style')).toContain('min-width: 160px;')
    expect(col.attributes('style')).toContain('max-width: 40%;')
  })

  test('renders sorter state in inline table control', () => {
    wrapper = mount(UiTableSorter, {
      props: {
        direction: 'asc',
      },
      slots: {
        default: 'Название',
      },
    })

    const root = wrapper.find('button')
    const paths = wrapper.findAll('path')

    expect(root.classes()).toContain('ui-v1-table__sorter')
    expect(root.text()).toBe('Название')
    expect(paths[0]?.classes()).toContain('ui-v1-table__sorter-path_active')
    expect(paths[1]?.classes()).not.toContain('ui-v1-table__sorter-path_active')
  })
})

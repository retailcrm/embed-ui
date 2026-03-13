import type { Meta, StoryObj } from '@storybook/vue3'

import { createProvider } from '@omnicajs/vue-remote/host'

import UiAvatar from '@/host/components/avatar/UiAvatar.vue'
import UiCheckbox from '@/host/components/checkbox/UiCheckbox.vue'
import UiLink from '@/host/components/link/UiLink.vue'
import UiTableBodyCell from '@/host/components/table/UiTableBodyCell.vue'
import UiTableCol from '@/host/components/table/UiTableCol.vue'
import UiTableFooterButton from '@/host/components/table/UiTableFooterButton.vue'
import UiTableFooterSection from '@/host/components/table/UiTableFooterSection.vue'
import UiTableHeadCell from '@/host/components/table/UiTableHeadCell.vue'
import UiTableRoot from '@/host/components/table/UiTableRoot.vue'
import UiTableRow from '@/host/components/table/UiTableRow.vue'
import UiTableSection from '@/host/components/table/UiTableSection.vue'
import UiTableSorter from '@/host/components/table/UiTableSorter.vue'
import UiTag from '@/host/components/tag/UiTag.vue'

import { UiTable } from '../../src/remote/components/table'
import UiTableReferenceWorker from './UiTable.reference.remote.ts?worker'
import UiTableWorker from './UiTable.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'
import './UiTable.reference.example.less'
import './UiTable.stories.less'
import page from './UiTable.mdx'

type UiTableProps = InstanceType<typeof UiTable>['$props']
type UiTableStoryExtras = {
  dense?: boolean;
  footerMode?: 'none' | 'simple' | 'structured';
  withGrouping?: boolean;
  withExpand?: boolean;
  showServiceColumn?: boolean;
  empty?: boolean;
}
type UiTableStoryArgs = UiTableProps & UiTableStoryExtras

const provider = createProvider({
  UiAvatar,
  UiCheckbox,
  UiLink,
  UiTableBodyCell,
  UiTableCol,
  UiTableFooterButton,
  UiTableFooterSection,
  UiTableHeadCell,
  UiTableRoot,
  UiTableRow,
  UiTableSection,
  UiTableSorter,
  UiTag,
})

const meta = {
  title: 'Components/UiTable',

  component: UiTable,

  argTypes: {
    rows: { control: false },
    rowKey: { control: false },
    rowClass: { control: false },
    rowAttrs: { control: false },
    groupBy: { control: false },
    groupHeadClass: { control: false },
    groupBodyClass: { control: false },

    headless: { control: 'boolean' },
    bordered: { control: 'boolean' },
    fixed: { control: 'boolean' },
    withGrouping: { control: 'boolean' },
    withExpand: { control: 'boolean' },
    showServiceColumn: { control: 'boolean' },
    empty: { control: 'boolean' },
    dense: { control: 'boolean' },

    footerMode: {
      control: 'select',
      options: ['none', 'simple', 'structured'],
    },
  },

  render: createRemoteStoryRender({
    provider,
    worker: UiTableWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<UiTableStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    headless: false,
    bordered: false,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    showServiceColumn: true,
    footerMode: 'none',
    empty: false,
  },
}

export const Basic: Story = docsOnlyStory({
  args: {
    bordered: false,
    fixed: false,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none',
  },
})

export const BorderedFixed: Story = docsOnlyStory({
  args: {
    bordered: true,
    fixed: true,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none',
  },
})

export const ExpandableRows: Story = docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withExpand: true,
    withGrouping: false,
    footerMode: 'none',
  },
})

export const GroupedRows: Story = docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: true,
    withExpand: false,
    footerMode: 'none',
  },
})

export const Headless: Story = docsOnlyStory({
  args: {
    headless: true,
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'simple',
  },
})

export const Dense: Story = docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'none',
    dense: true,
  },
})

export const EmptyState: Story = docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'structured',
    empty: true,
  },
})

export const CampaignsOverview: Story = {
  args: {
    empty: false,
  },

  render: createRemoteStoryRender({
    provider,
    worker: UiTableReferenceWorker,
  }),

  name: 'Кампании и отправки',

  parameters: {
    layout: 'fullscreen',
  },
}

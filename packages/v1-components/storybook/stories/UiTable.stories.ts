import './UiTable.reference.example.less'
import './UiTable.stories.less'

import type { Meta, StoryObj } from '@storybook/vue3'

import { UiTable } from '../../src/remote/components/table'
import UiTableReferenceWorker from './UiTable.reference.remote.ts?worker'
import UiTableWorker from './UiTable.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'

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
    worker: UiTableReferenceWorker,
  }),

  name: 'Кампании и отправки',

  parameters: {
    layout: 'fullscreen',
  },
}
